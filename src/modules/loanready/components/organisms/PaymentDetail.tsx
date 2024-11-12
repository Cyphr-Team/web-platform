import { ButtonLoading } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useStripe } from "@stripe/react-stripe-js"
import { LoanReadyPlanSelection } from "@/modules/loanready/components/molecules/LoanReadyPlanSelection"
import { Separator } from "@/components/ui/separator"
import { SelectApplicationDialog } from "@/modules/loanready/components/molecules/SelectApplicationDialog"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
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

const paymentItemSchema = z.object({
  package: z.string().min(1)
})

type PaymentItemValue = z.infer<typeof paymentItemSchema>

export function PaymentDetail() {
  // Page states
  const { state } = useLocation()
  const navigate = useNavigate()

  // Boolean States
  const isSelectAppDialogOpen = useBoolean(false)
  const isConfirmPurchaseDialogOpen = useBoolean(false)
  const isPaymentElementValid = useBoolean(false)
  const isAddressElementValid = useBoolean(false)

  // Payment Form
  const form = useForm<PaymentItemValue>({
    resolver: zodResolver(paymentItemSchema),
    reValidateMode: "onBlur",
    defaultValues: { package: "" }
  })

  // Send the payment request to server
  const { mutateAsync: mutateConfirmIntent, isLoading } =
    useCreateConfirmIntent()
  const submitPurchase = async (
    confirmationToken: string,
    isNewApplication: boolean
  ) => {
    const purchasingPackageType =
      form.watch("package") === LoanReadyPlanEnum.BASIC
        ? LoanReadyPlanEnum.BASIC
        : LoanReadyPlanEnum.PLUS
    const payload = {
      amount: LoanReadyPlan[purchasingPackageType].price,
      confirmationToken: confirmationToken,
      type: purchasingPackageType
    }

    await mutateConfirmIntent.mutateAsync(payload, {
      onSuccess: (data) => {
        if (isNewApplication) {
          const searchParams = new URLSearchParams({
            transactionId: data.data.id
          })

          navigate(
            `${APP_PATH.LOAN_APPLICATION.INFORMATION.detailWithId(
              state.loanProgramId as string
            )}?${searchParams.toString()}`,
            { replace: true }
          )
        } else {
          navigate(APP_PATH.LOAN_APPLICATION.APPLICATIONS.index, {
            replace: true
          })
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
  const onSubmit = (data: PaymentItemValue) => {
    const selectedPlan = data.package

    if (selectedPlan === LoanReadyPlanEnum.BASIC) {
      isConfirmPurchaseDialogOpen.onTrue()
    } else if (selectedPlan === LoanReadyPlanEnum.PLUS) {
      isSelectAppDialogOpen.onTrue()
    }
  }

  // Handle purchase for LoanReady/ LoanReady+ packages
  const handlePurchase = async () => {
    // Edge case: When user refreshes the page and we lost LoanProgramId
    if (!state.loanProgramId) {
      handleInvalidProgramId()

      return
    }
    switch (form.watch("package")) {
      case LoanReadyPlanEnum.BASIC:
        isConfirmPurchaseDialogOpen.onFalse()
        await mutatePayment(true)
        break
      case LoanReadyPlanEnum.PLUS:
        isSelectAppDialogOpen.onTrue()
        break
      default:
        toastError({
          title: TOAST_MSG.loanApplication.payment.title,
          description: "Please select a plan"
        })
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

  // Handle 2nd step purchase for LoanReady+ packages
  const handleLoanReadyPlusPurchase = async (isNewApplication: boolean) => {
    isSelectAppDialogOpen.onFalse()
    await mutatePayment(isNewApplication)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => onSubmit(data))}>
        <div className="grid h-full grid-cols-10 p-0">
          <div className="col-span-7 m-0 flex h-full flex-col bg-white px-6xl py-4xl">
            <h3 className="mb-4 text-lg font-semibold text-[#252828]">
              Select your Product
            </h3>
            <LoanReadyPlanSelection />
            <Separator />
            <div className="mt-6 flex flex-col gap-4">
              <PaymentForm isPaymentElementValid={isPaymentElementValid} />
              <Separator />
              <BillingAddressForm
                isAddressElementValid={isAddressElementValid}
              />
            </div>
          </div>
          <div className="col-span-3 flex h-full flex-col justify-between bg-gray-50 px-3xl py-4xl">
            <OrderSummary
              selectedPlan={form.watch("package") as LoanReadyPlanEnum}
            />
            <div className="ml-auto flex flex-row gap-2">
              <ButtonLoading variant="outline" onClick={() => navigate(-1)}>
                Cancel
              </ButtonLoading>
              <ButtonLoading
                disabled={!isValidForm()}
                isLoading={isLoading.value}
              >
                Purchase
              </ButtonLoading>
            </div>

            <SelectApplicationDialog
              isOpen={isSelectAppDialogOpen.value}
              onClose={() => isSelectAppDialogOpen.onFalse()}
              onConfirmed={handleLoanReadyPlusPurchase}
            />
            <CustomAlertDialog
              cancelText="Cancel"
              confirmText="Confirm"
              description={
                <span className="break-keep">
                  Are you sure you want to complete this purchase? Click
                  'Confirm' to proceed and finalize your order.
                </span>
              }
              isOpen={isConfirmPurchaseDialogOpen.value}
              title="Confirm your purchase"
              onCanceled={() => isConfirmPurchaseDialogOpen.onFalse()}
              onConfirmed={() => handlePurchase()}
            />
          </div>
        </div>
      </form>
    </Form>
  )
}
