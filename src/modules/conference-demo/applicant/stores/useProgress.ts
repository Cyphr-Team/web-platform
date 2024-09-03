import { create } from "zustand"

import {
  INPUT_GROUP,
  Progress,
  STEP,
  StepStatus
} from "@/modules/conference-demo/applicant/constants"
import { createSelectors } from "@/utils/store.ts"
import { produce } from "immer"

const initApplicationGroup = () => ({
  [STEP.LOAN_REQUEST]: { isFinish: false, group: INPUT_GROUP.APPLICATION },
  [STEP.BUSINESS_INFORMATION]: {
    isFinish: false,
    group: INPUT_GROUP.APPLICATION
  },
  [STEP.BUSINESS_PLAN]: { isFinish: false, group: INPUT_GROUP.APPLICATION },
  [STEP.CASH_FLOW_VERIFICATION]: {
    isFinish: false,
    group: INPUT_GROUP.APPLICATION
  }
})

const initDocumentGroup = () => ({
  [STEP.BANK_STATEMENTS]: {
    isFinish: false,
    group: INPUT_GROUP.DOCUMENTATION
  },
  [STEP.ARTICLES_OF_ORGANIZATION]: {
    isFinish: false,
    group: INPUT_GROUP.DOCUMENTATION
  }
})

const initReviewGroup = () => ({
  [STEP.REVIEW_APPLICATION]: {
    isFinish: false,
    group: INPUT_GROUP.REVIEW_AND_SIGN
  },
  [STEP.REVIEW_AND_SUBMIT]: {
    isFinish: false,
    group: INPUT_GROUP.REVIEW_AND_SIGN
  }
})
const initialProgress: Progress = {
  ...initApplicationGroup(),
  ...initDocumentGroup(),
  ...initReviewGroup()
}

interface ProgressSlice {
  currentStep: STEP
  progressDetail: Progress
  progress: number
  action: {
    goToStep: (step: STEP) => void
    finishStep: (step: STEP) => void
    markStepAsUnfinished: (step: STEP) => void
    checkStep: (step: STEP) => boolean
  }
}

const useProgressBase = create<ProgressSlice>()((set, get) => ({
  currentStep: STEP.LOAN_REQUEST,
  progressDetail: initialProgress,
  progress: 0,
  action: {
    goToStep: (step: STEP) => set({ currentStep: step }),
    finishStep: (step: STEP) => {
      set(
        produce((state) => {
          state.progressDetail[step].isFinish = true
          state.progress = calculateProgress(state.progressDetail)
        })
      )
    },
    markStepAsUnfinished: (step: STEP) => {
      set(
        produce((state) => {
          state.progressDetail[step].isFinish = false
          state.progress = calculateProgress(state.progressDetail)
        })
      )
    },
    checkStep: (step: STEP) => get().progressDetail[step].isFinish
  }
}))

export const useProgress = createSelectors(useProgressBase)

/**
 * Reuse logic below
 */
export const useIsReviewApplicationStep = () =>
  useProgress.use.currentStep() === STEP.REVIEW_APPLICATION

export const useProgressSteps = () =>
  Object.entries<StepStatus>(useProgress.use.progressDetail())

/**
 * Private helper function below
 */
const calculateProgress = (progress: Progress): number => {
  const { totalSteps, completedSteps } = Object.values(progress).reduce(
    (acc, step) => {
      acc.totalSteps++
      if (step.isFinish) acc.completedSteps++
      return acc
    },
    { totalSteps: 0, completedSteps: 0 }
  )

  return totalSteps === 0 ? 0 : Math.round((completedSteps / totalSteps) * 100)
}
