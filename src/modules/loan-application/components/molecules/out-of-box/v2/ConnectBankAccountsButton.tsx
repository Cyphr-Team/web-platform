import { ButtonLoading } from "@/components/ui/button"
import { useLazyConnectPlaidEffect } from "@/modules/loan-application/hooks/useLazyConnectPlaidEffect"
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
      className=" border rounded-lg text-primary bg-white text-gray-700 px-lg py-md hover:bg-zinc-100"
      onClick={handleOnClick}
      isLoading={isLoading || isBankAccountsLoading}
      disabled={disabled}
      type="button"
    >
      <Link className="w-4 mr-1" />
      {hasConnectedAccounts ? "Connect More" : "Connect"}
    </ButtonLoading>
  )
}
