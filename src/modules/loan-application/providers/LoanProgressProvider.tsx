import {
  Dispatch,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer
} from "react"
import {
  LOAN_APPLICATION_STEP_STATUS,
  LOAN_APPLICATION_STEPS
} from "../constants"
import { createContext } from "use-context-selector"
import { getFormStepStrategy } from "../services/form.services"
import { useLoanProgramDetailContext } from "."
import { LoanType } from "@/types/loan-program.type"
import { ApplicationStep } from "../constants/type"
import { isLoanReady } from "@/utils/domain.utils"

interface LoanApplicationStepsState {
  step: LOAN_APPLICATION_STEPS
  progress: ApplicationStep[]
}

export enum LOAN_PROGRESS_ACTION {
  CHANGE_STEP = "CHANGE_STEP",
  CHANGE_PROGRESS = "CHANGE_PROGRESS",
  INIT = "INIT"
}

type Action = StepAction | ProgressAction | InitAction

type InitAction = {
  type: LOAN_PROGRESS_ACTION.INIT
  progress: ApplicationStep[]
}

type ProgressAction = {
  type: LOAN_PROGRESS_ACTION.CHANGE_PROGRESS
  progress: LOAN_APPLICATION_STEPS
}

type StepAction = {
  type: LOAN_PROGRESS_ACTION.CHANGE_STEP
  step: LOAN_APPLICATION_STEPS
}

interface LoanApplicationStatusContext extends LoanApplicationStepsState {
  dispatchProgress: Dispatch<Action>
  finishCurrentStep: () => void
  getStep: (step: string) => ApplicationStep | undefined
  getStepStatus: (step: string) => boolean
  steps: ApplicationStep[]
  currentStep: ApplicationStep | undefined
}

const reducer = (
  state: LoanApplicationStepsState,
  action: Action
): LoanApplicationStepsState => {
  switch (action.type) {
    case LOAN_PROGRESS_ACTION.CHANGE_STEP:
      return {
        ...state,
        step: action.step
      }
    case LOAN_PROGRESS_ACTION.CHANGE_PROGRESS: {
      const newProgress = state.progress.map((item) => {
        if (
          item.step === action.progress &&
          item.status !== LOAN_APPLICATION_STEP_STATUS.COMPLETE
        ) {
          return {
            ...item,
            status: LOAN_APPLICATION_STEP_STATUS.COMPLETE
          }
        }
        return item
      })
      return {
        ...state,
        progress: newProgress
      }
    }
    case LOAN_PROGRESS_ACTION.INIT:
      return {
        ...state,
        progress: action.progress
      }
    default:
      return state
  }
}

const initSteps: LoanApplicationStepsState = {
  step: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
  progress: []
}

export const LoanProgressContext = createContext<LoanApplicationStatusContext>(
  initSteps as LoanApplicationStatusContext
)

const { Provider } = LoanProgressContext

export const LoanProgressProvider: React.FC<{ children: ReactNode }> = (
  props
) => {
  const [state, dispatchProgress] = useReducer(reducer, initSteps)

  const { loanProgramDetails } = useLoanProgramDetailContext()

  const steps = getFormStepStrategy(
    isLoanReady()
      ? LoanType.READINESS
      : loanProgramDetails?.type ?? LoanType.MICRO
  )

  useEffect(() => {
    if (state.progress.length === 0)
      dispatchProgress({
        type: LOAN_PROGRESS_ACTION.INIT,
        progress: steps.getSteps()
      })
  }, [state.progress.length, steps])

  const getStep = useCallback(
    (step: string) => {
      return steps.getStep(step)
    },
    [steps]
  )

  const getStepStatus = useCallback(
    (step: string) => {
      return (
        state.progress.find((item) => item.step === step)?.status ===
        LOAN_APPLICATION_STEP_STATUS.COMPLETE
      )
    },
    [state.progress]
  )

  const finishCurrentStep = useCallback(() => {
    dispatchProgress({
      type: LOAN_PROGRESS_ACTION.CHANGE_PROGRESS,
      progress: state.step
    })
    const nextStep = steps.getStep(state.step)?.nextStep
    if (nextStep) {
      dispatchProgress({
        type: LOAN_PROGRESS_ACTION.CHANGE_STEP,
        step: nextStep
      })
    }
  }, [state.step, steps])

  const providerValues = useMemo(
    () => ({
      ...state,
      dispatchProgress,
      getStep,
      getStepStatus,
      finishCurrentStep,
      steps: steps.getSteps(),
      currentStep: steps.getStep(state.step)
    }),
    [finishCurrentStep, getStep, getStepStatus, state, steps]
  )

  return <Provider value={providerValues}>{props.children}</Provider>
}
