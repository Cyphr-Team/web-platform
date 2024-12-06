import { Button } from "@/components/ui/button"
import { useConnectPlaid } from "../../../hooks/form-cash-flow/useConnectPlaid.ts"
import { ArrowRight, Check } from "lucide-react"
import { useEffect } from "react"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"

interface Props {
  disabled: boolean
}

export const ConnectBankAccountsButton: React.FC<Props> = ({ disabled }) => {
  const { open, ready, linkSuccess } = useConnectPlaid()
  const { financialInformationForm, dispatchFormAction } =
    useLoanApplicationFormContext()

  const { completeSpecificStep, progress, getStepStatus } =
    useLoanApplicationProgressContext()

  useEffect(() => {
    if (
      linkSuccess &&
      !getStepStatus(LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION)
    ) {
      dispatchFormAction({
        action: FORM_ACTION.SET_DATA,
        key: LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION,
        state: {
          id: financialInformationForm?.id ?? "",
          incomeCategories: [],
          w2sFile: []
        }
      })
      completeSpecificStep(LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION)
    }
  }, [
    dispatchFormAction,
    financialInformationForm?.id,
    completeSpecificStep,
    getStepStatus,
    linkSuccess,
    progress
  ])

  return linkSuccess ? (
    <Button
      className="flex w-full gap-1 bg-primary px-lg py-md text-white"
      type="button"
    >
      <p>Connected</p>
      <Check className="text-white" size={20} />
    </Button>
  ) : (
    <Button
      className="w-full bg-black px-lg py-md text-white"
      disabled={!ready || disabled}
      type="button"
      onClick={() => {
        open()
      }}
    >
      Connect Bank Accounts
      <ArrowRight className="ml-1 w-4" />
    </Button>
  )
}
