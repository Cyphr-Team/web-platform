import { Button } from "@/components/ui/button"
import { useConnectPlaid } from "../../../hooks/useConnectPlaid"
import { ArrowRight, Check } from "lucide-react"
import { useEffect } from "react"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/constants"
import { useLoanApplicationContext } from "@/modules/loan-application/providers"

interface Props {
  disabled: boolean
}
export const ConnectBankAccountsButton: React.FC<Props> = ({ disabled }) => {
  const { open, ready, linkSuccess } = useConnectPlaid()
  const { changeProgress, changeStep } = useLoanApplicationContext()
  useEffect(() => {
    if (linkSuccess) {
      changeStep(LOAN_APPLICATION_STEPS.CONFIRMATION, true)
      changeProgress(LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION)
    }
  }, [changeProgress, changeStep, linkSuccess])

  return linkSuccess ? (
    <Button
      className="text-primary bg-primary w-full text-white px-lg py-md flex gap-1"
      type="button"
    >
      <p>Connected</p>
      <Check size={20} className="text-white" />
    </Button>
  ) : (
    <Button
      className="text-primary bg-black w-full text-white px-lg py-md"
      onClick={() => open()}
      disabled={!ready || disabled}
      type="button"
    >
      Connect Bank Accounts
      <ArrowRight className="ml-1 w-4" />
    </Button>
  )
}
