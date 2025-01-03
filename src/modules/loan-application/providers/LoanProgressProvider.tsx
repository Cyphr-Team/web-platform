import { type Institution } from "@/constants/tenant.constants"
import { toPercent } from "@/utils"
import { getSubdomain } from "@/utils/domain.utils"
import {
  type Dispatch,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState
} from "react"
import { createContext } from "use-context-selector"
import { LoanApplicationStepStrategy } from "../models/LoanApplicationStep"
import {
  type FORM_TYPE,
  type ILoanApplicationStep,
  LOAN_APPLICATION_STEP_STATUS,
  type LOAN_APPLICATION_STEPS
} from "../models/LoanApplicationStep/type"
import { formsConfigurationEnabled } from "@/utils/feature-flag.utils"
import { ConfigurationLoanApplicationStep } from "../models/LoanApplicationStep/Configuration"
import { useLoanProgramDetailContext } from "."

interface LoanApplicationStepsState {
  step: LOAN_APPLICATION_STEPS
  progress: ILoanApplicationStep[]
}

export enum LoanProgressAction {
  Init = "Init",
  ChangeStep = "ChangeStep",
  ChangeProgress = "ChangeProgress",
  RemoveComplete = "RemoveComplete",
  BuildStep = "BuildStep",

  GoNextStep = "GoNextStep",
  GoPreviousStep = "GoPreviousStep"
}

type Action =
  | StepAction
  | ProgressAction
  | InitAction
  | NextStepAction
  | PreviousStepAction
  | RemoveCompleteAction
  | BuildStepAction

interface BuildStepAction {
  type: LoanProgressAction.BuildStep
  progress: ILoanApplicationStep[]
}

interface NextStepAction {
  type: LoanProgressAction.GoNextStep
}

interface PreviousStepAction {
  type: LoanProgressAction.GoPreviousStep
}

interface InitAction {
  type: LoanProgressAction.Init
  forms: FORM_TYPE[]
}

interface ProgressAction {
  type: LoanProgressAction.ChangeProgress
  progress: LOAN_APPLICATION_STEPS
}

interface StepAction {
  type: LoanProgressAction.ChangeStep
  step: LOAN_APPLICATION_STEPS
}

interface RemoveCompleteAction {
  type: LoanProgressAction.RemoveComplete
  progress: LOAN_APPLICATION_STEPS
}

interface LoanApplicationStatusContext extends LoanApplicationStepsState {
  /**
   * Complete the current step without moving to the next step
   */
  completeCurrentStep: () => void
  completeSpecificStep: (specificStep: LOAN_APPLICATION_STEPS) => void
  removeCompleteSpecificStep: (specificStep: LOAN_APPLICATION_STEPS) => void
  getCurrentStepIndex: () => number
  getCurrentStep: () => ILoanApplicationStep | undefined
  buildSpecificStep: () => void
  progress: ILoanApplicationStep[]
  isInitialized: boolean
  step: LOAN_APPLICATION_STEPS
  percentComplete: number
  dispatchProgress: Dispatch<Action>

  /**
   * The function return 'true' if the 'step' is complete
   */
  getStepStatus: (step: string) => boolean
  /**
   * Complete the current step and move to the next step
   */
  finishCurrentStep: () => void
  goToPreviousStep: () => void
}

const reducer = (
  state: LoanApplicationStepsState,
  action: Action
): LoanApplicationStepsState => {
  switch (action.type) {
    case LoanProgressAction.GoNextStep: {
      const currentStepIndex = state.progress.findIndex(
        (stepItem) => stepItem.step === state.step
      )
      const nextStepIndex =
        currentStepIndex + 1 < state.progress.length ? currentStepIndex + 1 : -1

      if (nextStepIndex === -1) return state

      return { ...state, step: state.progress[nextStepIndex].step }
    }

    case LoanProgressAction.GoPreviousStep: {
      const currentStepIndex = state.progress.findIndex(
        (stepItem) => stepItem.step === state.step
      )
      const previous = currentStepIndex - 1

      if (previous === -1) return state

      return { ...state, step: state.progress[previous].step }
    }

    case LoanProgressAction.ChangeStep:
      return {
        ...state,
        step: action.step
      }
    case LoanProgressAction.ChangeProgress: {
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
    case LoanProgressAction.RemoveComplete: {
      const newProgress = state.progress.map((item) => {
        if (
          item.step === action.progress &&
          item.status === LOAN_APPLICATION_STEP_STATUS.COMPLETE
        ) {
          return { ...item, status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE }
        }

        return item
      })

      return { ...state, progress: newProgress }
    }
    case LoanProgressAction.Init:
      return initSteps(action.forms)

    case LoanProgressAction.BuildStep: {
      const newProgress = action.progress.filter(
        (val) =>
          state.progress.findIndex((item) => item.step === val.step) === -1
      )

      return {
        ...state,
        progress: state.progress.concat(newProgress)
      }
    }

    default:
      return state
  }
}

/**
 * The init progress should be worked lazy
 * The init progress should be inside a component life-cycle to get all the feature as a component did
 * E.g features - Feature flag.
 */
const getApplicationStrategy = () =>
  new LoanApplicationStepStrategy(getSubdomain() as Institution).getStrategy()

const initProgress = (forms?: FORM_TYPE[]) => {
  return formsConfigurationEnabled()
    ? new ConfigurationLoanApplicationStep(forms).getSteps()
    : new LoanApplicationStepStrategy(getSubdomain() as Institution)
        .getStrategy()
        .getSteps()
}

const initSteps: (forms?: FORM_TYPE[]) => LoanApplicationStepsState = (
  forms
) => {
  const steps = initProgress(forms)

  return {
    step: steps[0].step,
    progress: steps
  }
}

export const LoanProgressContext = createContext<LoanApplicationStatusContext>(
  initSteps() as LoanApplicationStatusContext
)

const { Provider } = LoanProgressContext

export function LoanProgressProvider(props: PropsWithChildren) {
  const { loanProgramFormsConfiguration } = useLoanProgramDetailContext()

  const [isInitialized, setIsInitialized] = useState(false)

  const [{ progress, step }, dispatchProgress] = useReducer(
    reducer,
    initSteps([])
  )

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
      type: LoanProgressAction.ChangeProgress,
      progress: step
    })
    dispatchProgress({ type: LoanProgressAction.GoNextStep })
  }, [step])

  const goToPreviousStep = useCallback(() => {
    dispatchProgress({ type: LoanProgressAction.GoPreviousStep })
  }, [])

  /**
   * This function is use for complete third party step (e.g Persona KYC)
   */
  const completeCurrentStep = useCallback(() => {
    dispatchProgress({
      type: LoanProgressAction.ChangeProgress,
      progress: step
    })
  }, [step])

  const completeSpecificStep = useCallback(
    (specificStep: LOAN_APPLICATION_STEPS) => {
      dispatchProgress({
        type: LoanProgressAction.ChangeProgress,
        progress: specificStep
      })
    },
    []
  )

  const removeCompleteSpecificStep = useCallback(
    (specificStep: LOAN_APPLICATION_STEPS) => {
      dispatchProgress({
        type: LoanProgressAction.RemoveComplete,
        progress: specificStep
      })
    },
    []
  )

  const buildSpecificStep = useCallback(() => {
    const applicationStrategy = getApplicationStrategy()._buildSteps()

    dispatchProgress({
      type: LoanProgressAction.BuildStep,
      progress: applicationStrategy.getSteps()
    })
  }, [])

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

  useEffect(() => {
    // If loanProgramFormsConfiguration is not null, then we will initialize the progress
    if (loanProgramFormsConfiguration?.forms) {
      dispatchProgress({
        type: LoanProgressAction.Init,
        forms: loanProgramFormsConfiguration?.forms
      })
      setIsInitialized(true)
    }
  }, [loanProgramFormsConfiguration?.forms])

  const providerValues: LoanApplicationStatusContext = useMemo(
    () => ({
      getCurrentStepIndex,
      getCurrentStep,
      progress,
      step,
      percentComplete,
      isInitialized: formsConfigurationEnabled() ? isInitialized : true,
      dispatchProgress,
      getStepStatus,
      completeCurrentStep,
      finishCurrentStep,
      completeSpecificStep,
      goToPreviousStep,
      buildSpecificStep,
      removeCompleteSpecificStep
    }),
    [
      removeCompleteSpecificStep,
      completeCurrentStep,
      goToPreviousStep,
      getCurrentStepIndex,
      getCurrentStep,
      buildSpecificStep,
      isInitialized,
      percentComplete,
      finishCurrentStep,
      getStepStatus,
      progress,
      step,
      completeSpecificStep
    ]
  )

  return <Provider value={providerValues}>{props.children}</Provider>
}
