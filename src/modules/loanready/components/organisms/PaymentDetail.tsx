import { ButtonLoading } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useStripe } from "@stripe/react-stripe-js"
import { LoanReadyPlanSelection } from "@/modules/loanready/components/molecules/LoanReadyPlanSelection"
import { Separator } from "@/components/ui/separator"
import useBoolean from "@/hooks/useBoolean"
import { OrderSummary } from "@/modules/loanready/components/molecules/OrderSummary.tsx"
import { useCreateConfirmIntent } from "@/modules/loanready/hooks/payment/useCreateConfirmIntent"
import { toastError } from "@/utils"
import {
  LoanReadyPlan,
  LoanReadyPlanEnum
} from "@/modules/loanready/constants/package"
import { TOAST_MSG } from "@/constants/toastMsg"
import { PaymentForm } from "@/modules/loanready/components/organisms/PaymentForm"
import { BillingAddressForm } from "@/modules/loanready/components/organisms/BillingAddressForm"
import { usePayment } from "@/modules/loanready/hooks/payment/usePayment"
import { useLocation, useNavigate } from "react-router-dom"
import { APP_PATH } from "@/constants"
import { useLinkApplicationToLoanReadySubscription } from "@/modules/loanready/hooks/payment/useUpdateLinkTransactionAndApplication.ts"
import { UseOfLoan } from "@/types/loan-application.type.ts"
import { useCreateLoanApplicationMutation } from "@/modules/loan-application/hooks/application/useCreateLoanApplicationMutation.ts"
import { LoanType } from "@/types/loan-program.type.ts"
import { useQueryLoanProgramDetailsByType } from "@/modules/loan-application/hooks/program/useQueryLoanProgramDetails.ts"
import { useQueryClient } from "@tanstack/react-query"
import { loanReadyTransactionKeys } from "@/constants/query-key"
import { ThankYouDialog } from "@/modules/loanready/components/molecules/ThankYouDialog.tsx"
import { useState } from "react"

const paymentItemSchema = z.object({
  package: z.string().min(1),
  email: z.string().email()
})

type PaymentItemValue = z.infer<typeof paymentItemSchema>

export function PaymentDetail() {
  // Page states
  const { state } = useLocation()
  const navigate = useNavigate()

  // Boolean States
  const isThankYouDialogOpen = useBoolean(false)
  const isPaymentElementValid = useBoolean(false)
  const isAddressElementValid = useBoolean(false)
  const applicationId = state?.applicationId as string
  const loanProgramId = state?.loanProgramId as string
  const [createdApplicationId, setCreatedApplicationId] = useState<string>()

  // Payment Form
  const form = useForm<PaymentItemValue>({
    resolver: zodResolver(paymentItemSchema),
    defaultValues: { package: state.package ?? "", email: "" }
  })

  const { mutateLinkForUpgrade, mutateLink } =
    useLinkApplicationToLoanReadySubscription()

  // Loan Request v1 aka Application creation
  const { mutateAsync: createLoanApplication } =
    useCreateLoanApplicationMutation(LoanType.MICRO)

  const loanProgramQuery = useQueryLoanProgramDetailsByType(
    LoanType.MICRO,
    loanProgramId
  )

  // Send the payment request to server
  const { mutateAsync: mutateConfirmIntent, isLoading } =
    useCreateConfirmIntent()

  const queryClient = useQueryClient()

  const submitPurchase = async (confirmationToken: string) => {
    const purchasingPackageType = form.watch("package") as LoanReadyPlanEnum
    const payload = {
      amount: LoanReadyPlan[purchasingPackageType].price,
      confirmationToken: confirmationToken,
      type:
        purchasingPackageType === LoanReadyPlanEnum.UPGRADE
          ? LoanReadyPlanEnum.PLUS
          : purchasingPackageType,
      email: form.watch("email"),
      applicationId: applicationId
    }

    await mutateConfirmIntent.mutateAsync(payload, {
      onSuccess: async (data) => {
        const paymentTransactionId = data.data.id

        queryClient.invalidateQueries({
          queryKey: loanReadyTransactionKeys.lists()
        })

        if (!applicationId) {
          // create draft application
          createLoanApplication(
            {
              loanProgramId: state.loanProgramId as string,
              loanAmount: loanProgramQuery?.data?.minLoanAmount ?? 0,
              loanTermInMonth: loanProgramQuery?.data?.minTermInMonth ?? 0,
              proposeUseOfLoan: UseOfLoan.OTHER
            },
            {
              onSuccess: async ({ data: createdApplicationData }) => {
                await mutateLink(
                  createdApplicationData.id,
                  paymentTransactionId
                )
                setCreatedApplicationId(createdApplicationData.id)
                isThankYouDialogOpen.onTrue()
              }
            }
          )
        } else {
          await mutateLinkForUpgrade(
            paymentTransactionId,
            applicationId,
            loanProgramId
          )
          isThankYouDialogOpen.onTrue()
        }
      }
    })
  }

  // Stripe
  const stripe = useStripe()
  const { mutateAsync: mutatePayment } = usePayment({
    isLoading,
    submitPurchase
  })

  // Check if form is valid to enable "Purchase" button
  // We'll leave Stripe to handle the form validation for its built-in components
  const isValidForm = () => {
    return (
      form.formState.isValid &&
      stripe &&
      isPaymentElementValid.value &&
      isAddressElementValid.value
    )
  }

  // Handle form submission when user clicks "Purchase"
  const onSubmit = async () => {
    // Edge case: When user refreshes the page and we lost LoanProgramId
    if (!state.loanProgramId) {
      handleInvalidProgramId()

      return
    }
    switch (form.watch("package")) {
      case LoanReadyPlanEnum.BASIC:
      case LoanReadyPlanEnum.PLUS:
      case LoanReadyPlanEnum.UPGRADE:
        await mutatePayment()
        break
      default:
        toastError({
          title: TOAST_MSG.loanApplication.payment.title,
          description: "Please select a plan"
        })
    }
  }

  const handleCloseThankYouDialog = () => {
    isThankYouDialogOpen.onFalse()
    if (createdApplicationId) {
      navigate(
        APP_PATH.LOAN_APPLICATION.APPLICATIONS.editing(
          createdApplicationId,
          loanProgramId
        ),
        { replace: true }
      )
    } else {
      navigate(
        APP_PATH.LOAN_APPLICATION.APPLICATIONS.financialApplicationDetails(
          applicationId,
          loanProgramId
        ),
        { replace: true }
      )
    }
  }

  // Handle invalid program id
  const handleInvalidProgramId = () => {
    toastError({
      title: TOAST_MSG.loanApplication.payment.title,
      description:
        "There's a problem with your payment process page. Please start over."
    })
    navigate(APP_PATH.LOAN_APPLICATION.APPLICATIONS.index, {
      replace: true
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => onSubmit())}>
        <div className="grid h-full grid-cols-10 p-0">
          <div className="col-span-7 m-0 flex h-full flex-col bg-white px-6xl py-4xl">
            <LoanReadyPlanSelection isUpgrade={!!applicationId} />
            <Separator />
            <div className="mt-6 flex flex-col gap-6">
              <PaymentForm isPaymentElementValid={isPaymentElementValid} />
              <Separator />
              <BillingAddressForm
                isAddressElementValid={isAddressElementValid}
              />
            </div>
          </div>
          <div className="sticky top-0 col-span-3 flex h-[calc(100vh-104px)] flex-col justify-between bg-gray-50 px-3xl py-4xl">
            <OrderSummary
              selectedPlan={form.watch("package") as LoanReadyPlanEnum}
            />

            <div className="ml-auto mt-auto flex flex-row gap-2">
              <ButtonLoading variant="outline" onClick={() => navigate(-1)}>
                Cancel
              </ButtonLoading>
              <ButtonLoading
                disabled={!isValidForm()}
                isLoading={isLoading.value}
                onClick={onSubmit}
              >
                Purchase
              </ButtonLoading>
            </div>

            <div className="mt-4 text-right text-xs font-normal">
              By clicking “Purchase” you agree to Cyphr’s{" "}
              <a
                className="font-semibold underline"
                href="https://www.cyphrai.com/terms"
                rel="noopener noreferrer"
                target="_blank"
              >
                Terms
              </a>
              .
            </div>
            <ThankYouDialog
              isOpen={isThankYouDialogOpen.value}
              plan={form.watch("package") as LoanReadyPlanEnum}
              onClose={handleCloseThankYouDialog}
            />
          </div>
        </div>
      </form>
    </Form>
  )
}
