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
    theme: "stripe",

    variables: {
      colorBackground: "#ffffff",
      colorText: "rgb(9,9,11)",
      fontFamily: "Inter, sans-serif",
      fontSizeBase: "0.945rem",
      fontWeightNormal: "400"
    },

    rules: {
      ".Label": {
        fontWeight: "500",
        lineHeight: "20px",
        textShadow: "none",
        letterSpacing: "normal"
      },
      ".Input": {
        borderRadius: "8px"
      }
    }
  }
}

export { StripeOptions }
