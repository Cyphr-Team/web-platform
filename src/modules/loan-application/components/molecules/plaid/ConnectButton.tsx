import { ButtonLoading } from "@/components/ui/button"
import { type PlaidFormValue } from "@/modules/loan-application/constants/plaid"
import { useLazyConnectPlaidEffect } from "@/modules/loan-application/hooks/useLazyConnectPlaidEffect"
import { usePlaidContext } from "@/modules/loan-application/providers"
import { generateToken } from "@/modules/loan-application/services"
import { toastError } from "@/utils"
import { getAxiosError } from "@/utils/custom-error"
import { Link } from "lucide-react"
import { useState } from "react"
import { useFormContext } from "react-hook-form"

interface PlaidConnectButtonProps {
  disabled?: boolean
  hasConnectedAccounts?: boolean
  isBankAccountsLoading?: boolean
}

export function PlaidConnectButton({
  disabled,
  hasConnectedAccounts,
  isBankAccountsLoading
}: PlaidConnectButtonProps) {
  const form = useFormContext<PlaidFormValue>()
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = usePlaidContext()

  const handleSubmit = form.handleSubmit(async (formValue) => {
    if (!formValue.institution?.value) return

    try {
      setIsLoading(true)
      await generateToken(dispatch, {
        routingNumber: formValue.routingNumber?.value,
        plaidInstitutionId: formValue.institution.value
      })
    } catch (error) {
      toastError({
        title: "Connecting failed",
        description: getAxiosError(error as Error).message
      })
    } finally {
      setIsLoading(false)
    }
  })

  useLazyConnectPlaidEffect()

  return (
    <div className="self-end">
      <ButtonLoading
        className="rounded-lg text-sm"
        disabled={disabled}
        isLoading={isLoading || isBankAccountsLoading}
        size="sm"
        variant="outline"
        onClick={handleSubmit}
      >
        <Link className="mr-1 size-4" strokeWidth={2.5} />
        {hasConnectedAccounts ? " Connect More" : " Connect with Plaid"}
      </ButtonLoading>
    </div>
  )
}
