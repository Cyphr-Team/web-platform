import { Dispatch, ReactNode, useReducer } from "react"
import {
  LOAN_APPLICATION_STEP_STATUS,
  LOAN_APPLICATION_STEPS,
  ProgressType,
  STEPS
} from "../constants"
import { createContext } from "use-context-selector"

interface LoanApplicationStepsState {
  step: LOAN_APPLICATION_STEPS
  progress: ProgressType[]
}

export enum LOAN_PROGRESS_ACTION {
  CHANGE_STEP = "CHANGE_STEP",
  CHANGE_PROGRESS = "CHANGE_PROGRESS"
}

type Action = StepAction | ProgressAction

type ProgressAction = {
  type: LOAN_PROGRESS_ACTION.CHANGE_PROGRESS
  progress: LOAN_APPLICATION_STEPS
}

type StepAction = {
  type: LOAN_PROGRESS_ACTION.CHANGE_STEP
  step: LOAN_APPLICATION_STEPS
}

interface LoanApplicationStatusContext extends LoanApplicationStepsState {
  dispatch: Dispatch<Action>
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
    default:
      return state
  }
}

const initSteps: LoanApplicationStepsState = {
  step: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
  progress: STEPS
}

export const LoanProgressContext = createContext<LoanApplicationStatusContext>(
  initSteps as LoanApplicationStatusContext
)

const { Provider } = LoanProgressContext

export const LoanProgressProvider: React.FC<{ children: ReactNode }> = (
  props
) => {
  const [state, dispatch] = useReducer(reducer, initSteps)

  return <Provider value={{ ...state, dispatch }}>{props.children}</Provider>
}
