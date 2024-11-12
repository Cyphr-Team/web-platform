import { type UseBooleanReturn } from "@/hooks/useBoolean"
import { PaymentElement } from "@stripe/react-stripe-js"
import { type StripePaymentElementChangeEvent } from "@stripe/stripe-js"

/**
 * PaymentForm component renders a payment form using Stripe's PaymentElement.
 * It manages the validation status of the payment input and updates the button state accordingly.
 *
 * Props:
 * - setIsPaymentElementValid: A function to update the validity state of the payment element.
 */
export interface PaymentFormProps {
  isPaymentElementValid: UseBooleanReturn
}

export function PaymentForm({ isPaymentElementValid }: PaymentFormProps) {
  const handlePaymentElementChange = (
    event: StripePaymentElementChangeEvent
  ) => {
    // Set button state based on validation status
    isPaymentElementValid.setValue(event.complete as boolean)
  }

  return (
    <>
      <p className="text-lg text-[#252828] font-semibold">
        Credit Card Information
      </p>
      <PaymentElement onChange={handlePaymentElementChange} />
    </>
  )
}
