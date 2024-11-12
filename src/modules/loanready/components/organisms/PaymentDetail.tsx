import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Elements, PaymentElement } from "@stripe/react-stripe-js"
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js"
import { LoanReadyPlanSelection } from "@/modules/loanready/components/molecules/LoanReadyPlanSelection"
import { Separator } from "@/components/ui/separator"
import { SelectApplicationDialog } from "@/modules/loanready/components/molecules/SelectApplicationDialog"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import { APP_CONFIGS } from "@/configs"
import useBoolean from "@/hooks/useBoolean"
import { OrderSummary } from "@/modules/loanready/components/molecules/OrderSummary.tsx"

export const paymentItemSchema = z.object({
  loanReady: z.string().min(1)
})

const stripePromise = loadStripe(APP_CONFIGS.VITE_STRIPE_PUBLIC_TOKEN)

type PaymentOptions = "payment" | "setup" | "subscription" | undefined

const planDetails = {
  loanReady: { label: "Loan Ready", price: 99 },
  loanReadyPlus: { label: "Loan Ready+", price: 150 }
}

export function PaymentDetail() {
  const isSelectAppDialogOpen = useBoolean(false)
  const isConfirmPurchaseDialogOpen = useBoolean(false)
  const form = useForm({
    resolver: zodResolver(paymentItemSchema),
    reValidateMode: "onChange",
    defaultValues: { loanReady: "" }
  })

  const onSelect = (value: string) => {
    form.setValue("loanReady", value)
    form.trigger("loanReady")
  }

  const onSubmit = () => {
    const selectedPlan = form.watch("loanReady")

    if (selectedPlan === "loanReady") {
      isConfirmPurchaseDialogOpen.onTrue()
    } else if (selectedPlan === "loanReadyPlus") {
      isSelectAppDialogOpen.onTrue()
    }
  }

  const selectedPlan = form.watch("loanReady")
  const selectedPlanDetail =
    (selectedPlan && planDetails[selectedPlan as keyof typeof planDetails]) ||
    null

  const options: StripeElementsOptions = {
    mode: "payment" as PaymentOptions,
    amount: 1099,
    currency: "usd",
    paymentMethodCreation: "manual",
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    }
  }

  return (
    <Elements options={options} stripe={stripePromise}>
      <Form {...form}>
        <div className="grid grid-cols-10 p-0 h-full">
          <div className="col-span-7 bg-white m-0 py-4xl px-6xl h-full flex flex-col">
            <h3 className="text-[18px] text-[#252828] font-semibold mb-4">
              Select your Product
            </h3>
            <LoanReadyPlanSelection onSelect={onSelect} />
            <Separator />
            <div className="mt-6">
              <PaymentElement />
            </div>
          </div>
          <div className="col-span-3 py-4xl px-3xl h-full flex flex-col justify-between">
            <OrderSummary selectedPlanDetail={selectedPlanDetail} />
            <Button
              className="w-full mt-4xl"
              disabled={!form.formState.isValid}
              onClick={(e) => {
                e.preventDefault()
                onSubmit()
              }}
            >
              Purchase
            </Button>
            <SelectApplicationDialog
              isOpen={isSelectAppDialogOpen.value}
              onClose={() => isSelectAppDialogOpen.onFalse()}
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
              onConfirmed={() => isConfirmPurchaseDialogOpen.onFalse()}
            />
          </div>
        </div>
      </Form>
    </Elements>
  )
}
