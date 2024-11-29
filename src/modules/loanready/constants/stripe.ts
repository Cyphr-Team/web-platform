import { type StripeElementsOptions } from "@stripe/stripe-js"

const StripeOptions: StripeElementsOptions = {
  mode: "payment",
  amount: 50000, // Please do not remove this field, we use it to set the default amount
  currency: "usd",
  paymentMethodTypes: ["card"],
  paymentMethodCreation: "manual",
  locale: "en",
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  }
}

export { StripeOptions }
