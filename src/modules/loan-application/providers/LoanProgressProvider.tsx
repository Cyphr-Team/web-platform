import { Institution } from "@/constants/tenant.constants"
import { toPercent } from "@/utils"
import { getSubdomain } from "@/utils/domain.utils"
import { Dispatch, ReactNode, useCallback, useMemo, useReducer } from "react"
import { createContext } from "use-context-selector"
import { LoanApplicationStepStrategy } from "../models/LoanApplicationStep"
import {
  ILoanApplicationStep,
  LOAN_APPLICATION_STEPS,
  LOAN_APPLICATION_STEP_STATUS
} from "../models/LoanApplicationStep/type"

interface LoanApplicationStepsState {
  step: LOAN_APPLICATION_STEPS
  progress: ILoanApplicationStep[]
}

export enum LOAN_PROGRESS_ACTION {
  CHANGE_STEP = "CHANGE_STEP",
  CHANGE_PROGRESS = "CHANGE_PROGRESS",
  INIT = "INIT",
  NEXT_STEP = "NEXT_STEP"
}

type Action = StepAction | ProgressAction | InitAction | NextStepAction

type NextStepAction = {
  type: LOAN_PROGRESS_ACTION.NEXT_STEP
}

type InitAction = { type: LOAN_PROGRESS_ACTION.INIT }

type ProgressAction = {
  type: LOAN_PROGRESS_ACTION.CHANGE_PROGRESS
  progress: LOAN_APPLICATION_STEPS
}

type StepAction = {
  type: LOAN_PROGRESS_ACTION.CHANGE_STEP
  step: LOAN_APPLICATION_STEPS
}

interface LoanApplicationStatusContext extends LoanApplicationStepsState {
  getCurrentStepIndex: () => number
  getCurrentStep: () => ILoanApplicationStep | undefined
  progress: ILoanApplicationStep[]
  step: LOAN_APPLICATION_STEPS
  percentComplete: number
  dispatchProgress: Dispatch<Action>
  getStepStatus: (step: string) => boolean
  finishCurrentStep: () => void
}

const reducer = (
  state: LoanApplicationStepsState,
  action: Action
): LoanApplicationStepsState => {
  switch (action.type) {
    case LOAN_PROGRESS_ACTION.NEXT_STEP: {
      const currentStepIndex = state.progress.findIndex(
        (stepItem) => stepItem.step === state.step
      )
      const nextStepIndex =
        currentStepIndex + 1 < state.progress.length ? currentStepIndex + 1 : -1

      if (nextStepIndex === -1) return state

      return { ...state, step: state.progress[nextStepIndex].step }
    }
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
          return { ...item, status: LOAN_APPLICATION_STEP_STATUS.COMPLETE }
        }
        return item
      })

      return { ...state, progress: newProgress }
    }
    default:
      return state
  }
}

const initSteps: LoanApplicationStepsState = {
  step: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
  progress: new LoanApplicationStepStrategy(getSubdomain() as Institution)
    .getStrategy()
    .getSteps()
}

export const LoanProgressContext = createContext<LoanApplicationStatusContext>(
  initSteps as LoanApplicationStatusContext
)

const { Provider } = LoanProgressContext

export const LoanProgressProvider: React.FC<{ children: ReactNode }> = (
  props
) => {
  const [{ progress, step }, dispatchProgress] = useReducer(reducer, initSteps)

  const getStepStatus = useCallback(
    (step: string) => {
      return (
        progress.find((item) => item.step === step)?.status ===
        LOAN_APPLICATION_STEP_STATUS.COMPLETE
      )
    },
    [progress]
  )

  const finishCurrentStep = useCallback(() => {
    dispatchProgress({
      type: LOAN_PROGRESS_ACTION.CHANGE_PROGRESS,
      progress: step
    })
    dispatchProgress({ type: LOAN_PROGRESS_ACTION.NEXT_STEP })
  }, [step])

  const getCurrentStepIndex = useCallback(() => {
    return progress.findIndex((item) => item.step === step)
  }, [progress, step])

  const getCurrentStep = useCallback(() => {
    return progress.find((item) => item.step === step)
  }, [progress, step])

  /**
   * Calculate progress percent
   */
  const percentComplete = useMemo(() => {
    if (!progress?.length) return 0

    return toPercent(
      progress.filter(
        (step) => step.status === LOAN_APPLICATION_STEP_STATUS.COMPLETE
      ).length / progress.length
    )
  }, [progress])

  const providerValues = useMemo(
    () => ({
      getCurrentStepIndex,
      getCurrentStep,
      progress,
      step,
      percentComplete,
      dispatchProgress,
      getStepStatus,
      finishCurrentStep
    }),
    [
      getCurrentStepIndex,
      getCurrentStep,
      percentComplete,
      finishCurrentStep,
      getStepStatus,
      progress,
      step
    ]
  )

  return <Provider value={providerValues}>{props.children}</Provider>
}
