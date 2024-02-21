import { useCallback, useMemo, useState } from "react"
import {
  LOAN_APPLICATION_STEPS,
  LOAN_APPLICATION_STEP_STATUS,
  ProgressType,
  STEPS
} from "../constants"
import { createContext } from "use-context-selector"

type LoanApplicationContextType = {
  step: LOAN_APPLICATION_STEPS
  changeStep: (step: LOAN_APPLICATION_STEPS) => void
  progress: ProgressType[]
  loanApplicationId: string
  changeProgress: (step: LOAN_APPLICATION_STEPS) => void
  changeLoanApplicationId: (id: string) => void
}

export const LoanApplicationContext = createContext<LoanApplicationContextType>(
  {
    step: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
    changeStep: () => {},
    progress: STEPS,
    loanApplicationId: "",
    changeProgress: () => {},
    changeLoanApplicationId: () => {}
  }
)

type Props = {
  children: React.ReactNode
}

export const LoanApplicationProvider: React.FC<Props> = ({ children }) => {
  const [step, setStep] = useState<LOAN_APPLICATION_STEPS>(
    LOAN_APPLICATION_STEPS.LOAN_REQUEST
  )

  const [loanApplicationId, setLoanApplicationId] = useState<string>("")

  const [progress, setProgress] = useState<ProgressType[]>(STEPS)

  const changeStep = useCallback((step: LOAN_APPLICATION_STEPS) => {
    setStep(step)
  }, [])

  const changeProgress = useCallback(
    (step: LOAN_APPLICATION_STEPS) => {
      const newProgress = progress.map((item) => {
        if (item.step === step) {
          if (item.status === LOAN_APPLICATION_STEP_STATUS.INCOMPLETE) {
            return {
              ...item,
              status: LOAN_APPLICATION_STEP_STATUS.CURRENT
            }
          }
        }
        if (item.step < step) {
          return {
            ...item,
            status: LOAN_APPLICATION_STEP_STATUS.COMPLETE
          }
        }
        return item
      })
      setProgress(newProgress)
    },
    [progress]
  )

  const changeLoanApplicationId = useCallback((id: string) => {
    setLoanApplicationId(id)
  }, [])

  const value = useMemo(
    () => ({
      step,
      progress,
      loanApplicationId,
      changeStep,
      changeProgress,
      changeLoanApplicationId
    }),
    [
      step,
      progress,
      loanApplicationId,
      changeStep,
      changeProgress,
      changeLoanApplicationId
    ]
  )

  return (
    <LoanApplicationContext.Provider value={value}>
      {children}
    </LoanApplicationContext.Provider>
  )
}
