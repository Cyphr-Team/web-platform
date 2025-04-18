import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout"
import { useTenant } from "@/providers/tenant-provider"
import { type CheckedState } from "@radix-ui/react-checkbox"

interface PlaidConfirmAuthorizeProps {
  wrapperClassName?: string
  confirmCheckbox: {
    disabled: boolean
    checked: CheckedState
    onCheckedChange?: (checked: CheckedState) => void
  }
}

export function PlaidConfirmAuthorize({
  wrapperClassName,
  confirmCheckbox
}: PlaidConfirmAuthorizeProps) {
  const { tenantData } = useTenant()

  return (
    <FormLayout cardClassName={wrapperClassName} title="Cash Flow Verification">
      <h5 className="text-lg font-semibold">Cash Flow Verification</h5>

      <Separator />

      <div className="flex flex-col gap-x-4xl gap-y-2xl">
        <div className="flex flex-col gap-y-sm">
          <p className="financial-projection text-sm text-muted-foreground">
            Connect your bank accounts securely. This step helps us understand
            your business financial health through cash flow data and expedite
            the loan approval process. Learn how it works{" "}
            <a
              className="text-black underline"
              href="https://plaid.com/legal/#consumers"
              rel="noopener noreferrer"
              target="_blank"
            >
              here
            </a>
            .
          </p>
        </div>
        <div className="flex flex-col gap-lg">
          <div className="mt-1 flex gap-2">
            <Checkbox className="size-5" {...confirmCheckbox} />
            <p className="text-sm text-gray-700">
              <b>I understand</b> that, by connecting my accounts, I authorize
              Plaid to share my business transaction history with{" "}
              {tenantData?.name ?? ""} for the purpose of evaluating my loan
              application.
            </p>
          </div>
        </div>
      </div>
    </FormLayout>
  )
}
