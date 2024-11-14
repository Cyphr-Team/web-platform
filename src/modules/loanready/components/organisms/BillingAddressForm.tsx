import useBoolean, { type UseBooleanReturn } from "@/hooks/useBoolean"
import {
  AddressElement,
  LinkAuthenticationElement
} from "@stripe/react-stripe-js"
import {
  type StripeLinkAuthenticationElementChangeEvent,
  type StripeAddressElementChangeEvent
} from "@stripe/stripe-js"
import { useEffect } from "react"

/**
 * BillingAddressForm component renders a billing address form using Stripe's AddressElement.
 * It manages the validation status of the address input and updates the button state accordingly.
 *
 * Props:
 * - setIsAddressElementValid: A function to update the validity state of the address element.
 */

interface BillingAddressFormProps {
  isAddressElementValid: UseBooleanReturn
}

export function BillingAddressForm({
  isAddressElementValid
}: BillingAddressFormProps) {
  const isAddressValid = useBoolean(false)
  const isLinkAuthenticationValid = useBoolean(false)

  useEffect(() => {
    isAddressElementValid.setValue(
      isAddressValid.value && isLinkAuthenticationValid.value
    )
  }, [isAddressValid, isLinkAuthenticationValid])

  const handleAddressElementChange = (
    event: StripeAddressElementChangeEvent
  ) => {
    // Set button state based on validation status
    isAddressValid.setValue(event.complete as boolean)
  }

  const handleLinkAuthenticationElementChange = (
    event: StripeLinkAuthenticationElementChangeEvent
  ) => {
    // Set button state based on validation status
    isLinkAuthenticationValid.setValue(event.complete as boolean)
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-semibold text-[#252828]">Billing Address</p>
      <LinkAuthenticationElement
        onChange={handleLinkAuthenticationElementChange}
      />
      <AddressElement
        options={{
          mode: "billing",
          allowedCountries: ["US"],
          display: { name: "split" }
        }}
        onChange={handleAddressElementChange}
      />
    </div>
  )
}
