import useBoolean, { type UseBooleanReturn } from "@/hooks/useBoolean"
import {
  AddressElement,
  LinkAuthenticationElement
} from "@stripe/react-stripe-js"
import {
  type StripeAddressElementChangeEvent,
  type StripeLinkAuthenticationElementChangeEvent
} from "@stripe/stripe-js"
import { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { PHONE_COUNTRIES_WHITELIST } from "@/components/ui/phone-input.tsx"

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
  const form = useFormContext()
  const isAddressValid = useBoolean(false)
  const isLinkAuthenticationValid = useBoolean(false)

  useEffect(() => {
    isAddressElementValid.setValue(
      isAddressValid.value && isLinkAuthenticationValid.value
    )
  }, [isAddressElementValid, isAddressValid, isLinkAuthenticationValid])

  const handleAddressElementChange = (
    event: StripeAddressElementChangeEvent
  ) => {
    // Set button state based on validation status
    isAddressValid.setValue(event.complete as boolean)
  }

  const handleLinkAuthenticationElementChange = async (
    event: StripeLinkAuthenticationElementChangeEvent
  ) => {
    // Set button state based on validation status
    isLinkAuthenticationValid.setValue(event.complete as boolean)
    form.setValue("email", event.value.email)
    await form.trigger("email")
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
          allowedCountries: PHONE_COUNTRIES_WHITELIST,
          display: { name: "split" },
          autocomplete: { mode: "disabled" }
        }}
        onChange={handleAddressElementChange}
      />
    </div>
  )
}
