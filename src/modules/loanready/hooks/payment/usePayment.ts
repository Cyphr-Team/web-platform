import { TOAST_MSG } from "@/constants/toastMsg"
import { type UseBooleanReturn } from "@/hooks/useBoolean"
import { toastError } from "@/utils"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import { type StripeError } from "@stripe/stripe-js"

// Handle Stripe pre-validation, create confirmation token and proceed to payment
export interface UsePaymentParams {
  isLoading: UseBooleanReturn
  submitPurchase: (
    confirmationTokenId: string,
    isNewApplication: boolean
  ) => Promise<void>
}

export const usePayment = ({ isLoading, submitPurchase }: UsePaymentParams) => {
  const stripe = useStripe()
  const elements = useElements()

  const mutateAsync = async (isNewApplication: boolean) => {
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    isLoading.onTrue()

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit()

    const handleError = (error: StripeError) => {
      isLoading.onFalse()
      toastError({
        title: TOAST_MSG.loanApplication.payment.title,
        description: error.message ?? "An error occurred. Please try again."
      })
    }

    if (submitError) {
      handleError(submitError)

      return
    }

    // Create the ConfirmationToken using the details collected by the Payment Element
    const { error, confirmationToken } = await stripe.createConfirmationToken({
      elements
    })

    if (error) {
      // This point is only reached if there's an immediate error when
      // creating the ConfirmationToken. Show the error to your customer (for example, payment details incomplete)
      handleError(error)

      return
    }

    await submitPurchase(confirmationToken.id, isNewApplication)
  }

  return { mutateAsync }
}
