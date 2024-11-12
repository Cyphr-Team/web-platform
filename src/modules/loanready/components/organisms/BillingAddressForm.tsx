import { type UseBooleanReturn } from "@/hooks/useBoolean"
import { AddressElement } from "@stripe/react-stripe-js"
import { type StripeAddressElementChangeEvent } from "@stripe/stripe-js"

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
  const handleAddressElementChange = (
    event: StripeAddressElementChangeEvent
  ) => {
    // Set button state based on validation status
    isAddressElementValid.setValue(event.complete as boolean)
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg text-[#252828] font-semibold">Billing Address</p>
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
