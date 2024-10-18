import { ButtonLoading } from "@/components/ui/button"
import { PlaidFormValue } from "@/modules/loan-application/constants/plaid"
import { useLazyConnectPlaidEffect } from "@/modules/loan-application/hooks/useLazyConnectPlaidEffect"
import { usePlaidContext } from "@/modules/loan-application/providers"
import { generateToken } from "@/modules/loan-application/services"
import { toastError } from "@/utils"
import { getAxiosError } from "@/utils/custom-error"
import { Link } from "lucide-react"
import React, { useState } from "react"
import { useFormContext } from "react-hook-form"

export const PlaidConnectButton: React.FC<{
  disabled?: boolean
  hasConnectedAccounts?: boolean
  isBankAccountsLoading?: boolean
}> = ({ disabled, hasConnectedAccounts, isBankAccountsLoading }) => {
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

      form.reset({
        institution: undefined,
        routingNumber: undefined
      })
    }
  })

  useLazyConnectPlaidEffect()

  return (
    <div className="self-end">
      <ButtonLoading
        isLoading={isLoading || isBankAccountsLoading}
        onClick={handleSubmit}
        disabled={disabled}
        className="text-sm rounded-lg"
        size="sm"
        variant="outline"
      >
        <Link className="w-4 h-4 mr-1" strokeWidth={2.5} />
        {hasConnectedAccounts ? " Connect More" : " Connect with Plaid"}
      </ButtonLoading>
    </div>
  )
}
