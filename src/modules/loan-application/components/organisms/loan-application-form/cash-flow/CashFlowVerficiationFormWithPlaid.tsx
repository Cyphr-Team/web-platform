import { cn } from "@/lib/utils"
import { PlaidConfirmAuthorize } from "@/modules/loan-application/components/molecules/plaid/ConfirmAuthorize"
import { PlaidConnectForm } from "@/modules/loan-application/components/molecules/plaid/ConnectForm"
import { usePlaidContext } from "@/modules/loan-application/providers"
import { useCallback, useMemo, useState } from "react"
import { type CheckedState } from "@radix-ui/react-checkbox"

interface CashFlowVerificationFormWithPlaidProps {
  wrapperClassName?: string
}

export function CashFlowVerificationFormWithPlaid({
  wrapperClassName
}: CashFlowVerificationFormWithPlaidProps) {
  // ----- Confirm authorize
  const [isConformAuthorize, setIsConformAuthorize] = useState(false)

  const onConfirmAuthorize = useCallback((value: CheckedState) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    setIsConformAuthorize(value)
  }, [])

  // ----- Connected accounts
  // TODO: Refactor get connected accounts with new API
  const { connectedAccounts } = usePlaidContext()

  const isConnected = useMemo(() => {
    return !!connectedAccounts.length || isConformAuthorize
  }, [isConformAuthorize, connectedAccounts.length])

  return (
    <>
      <PlaidConfirmAuthorize
        confirmCheckbox={{
          disabled: !!connectedAccounts.length,
          checked: isConnected,
          onCheckedChange: onConfirmAuthorize
        }}
        wrapperClassName={wrapperClassName}
      />

      {!!connectedAccounts.length || isConformAuthorize ? (
        <PlaidConnectForm wrapperClassName={cn(wrapperClassName, "mt-6")} />
      ) : null}
    </>
  )
}
