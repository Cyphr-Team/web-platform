import { APP_CONFIGS } from "@/configs"
import { PaymentLayout } from "@/modules/loanready/components/layouts/PaymentLayout"
import { PaymentDetail } from "@/modules/loanready/components/organisms/PaymentDetail"
import { StripeOptions } from "@/modules/loanready/constants/stripe"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(APP_CONFIGS.VITE_STRIPE_PUBLIC_TOKEN ?? "")

export function Component() {
  return (
    <Elements options={StripeOptions} stripe={stripePromise}>
      <PaymentLayout>
        <PaymentDetail />
      </PaymentLayout>
    </Elements>
  )
}

Component.displayName = "PurchasePoint"
