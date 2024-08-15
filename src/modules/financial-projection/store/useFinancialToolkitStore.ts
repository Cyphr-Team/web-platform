import { create } from "zustand"
import { SCREEN } from "@/modules/financial-projection/constants"
import { FinancialCompany } from "@/modules/financial-projection/types"
import { createSelectors } from "@/utils/store.ts"

interface FinancialToolkitSlice {
  currentScreen: SCREEN
  companies: FinancialCompany[]
  action: {
    setCurrentScreen: (screen: SCREEN) => void
    setCompanies: (companies: FinancialCompany[]) => void
  }
}

const useFinancialToolkitStoreBase = create<FinancialToolkitSlice>()((set) => ({
  currentScreen: SCREEN.INPUT_REVENUE,
  companies: [],
  action: {
    setCurrentScreen: (screen: SCREEN) => set({ currentScreen: screen }),
    setCompanies: (companies: FinancialCompany[]) => set({ companies })
  }
}))

export const useFinancialToolkitStore = createSelectors(
  useFinancialToolkitStoreBase
)
