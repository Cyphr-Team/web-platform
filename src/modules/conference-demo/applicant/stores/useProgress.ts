import { create } from "zustand"

import { createSelectors } from "@/utils/store.ts"
import { SCREEN } from "@/modules/conference-demo/applicant/constants"

interface ProgressSlice {
  currentScreen: SCREEN

  action: {
    setCurrentScreen: (screen: SCREEN) => void
  }
}

const useProgressBase = create<ProgressSlice>()((set) => ({
  currentScreen: SCREEN.LOAN_REQUEST,
  action: {
    setCurrentScreen: (screen: SCREEN) => set({ currentScreen: screen })
  }
}))

export const useProgress = createSelectors(useProgressBase)
