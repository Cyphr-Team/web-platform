import { ButtonLoading } from "@/components/ui/button"
import { useLazyConnectPlaidEffect } from "@/modules/loan-application/hooks/form-cash-flow/useLazyConnectPlaidEffect.ts"
import { usePlaidContext } from "@/modules/loan-application/providers"
import { generateToken } from "@/modules/loan-application/services"
import { Link } from "lucide-react"
import { useState } from "react"

interface Props {
  disabled: boolean
  hasConnectedAccounts: boolean
  isBankAccountsLoading?: boolean
}

export const ConnectBankAccountsButton: React.FC<Props> = ({
  disabled,
  hasConnectedAccounts,
  isBankAccountsLoading
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = usePlaidContext()

  const handleOnClick = async () => {
    setIsLoading(true)
    await generateToken(dispatch)
    setIsLoading(false)
  }

  useLazyConnectPlaidEffect()

  return (
    <ButtonLoading
      className="rounded-lg border bg-white px-lg py-md text-gray-700 hover:bg-zinc-100"
      disabled={disabled}
      isLoading={isLoading || isBankAccountsLoading}
      type="button"
      onClick={handleOnClick}
    >
      <Link className="mr-1 w-4" />
      {hasConnectedAccounts ? "Connect More" : "Connect"}
    </ButtonLoading>
  )
}
