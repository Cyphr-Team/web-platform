import { Button } from "@/components/ui/button"
import { useConnectPlaid } from "@/modules/loan-application/hooks/useConnectPlaid"
import { usePlaidContext } from "@/modules/loan-application/providers"
import { generateToken } from "@/modules/loan-application/services"
import { Link } from "lucide-react"
import { useUpdateEffect } from "react-use"

interface Props {
  disabled: boolean
  hasConnectedAccounts: boolean
  fetchConnectedAccounts: () => void
}
export const ConnectBankAccountsButton: React.FC<Props> = ({
  disabled,
  hasConnectedAccounts,
  fetchConnectedAccounts
}) => {
  const { open, linkSuccess, ready } = useConnectPlaid()
  const { dispatch } = usePlaidContext()

  useUpdateEffect(() => {
    if (linkSuccess) {
      fetchConnectedAccounts()
    }
  }, [linkSuccess])

  useUpdateEffect(() => {
    open()
  }, [ready])

  const handleOnClick = async () => {
    await generateToken(dispatch)
  }

  return (
    <Button
      className=" border rounded-lg text-primary bg-white text-gray-700 px-lg py-md hover:bg-zinc-100"
      onClick={handleOnClick}
      disabled={!ready || disabled}
      type="button"
    >
      {hasConnectedAccounts ? "Connect More" : "Connect"}
      <Link className="ml-1 w-4" />
    </Button>
  )
}
