import { create } from "zustand"
import { SCREEN } from "@/modules/financial-projection/constants"
import {
  DirectCost,
  FinancialCompany
} from "@/modules/financial-projection/types"
import { createSelectors } from "@/utils/store.ts"

interface FinancialToolkitSlice {
  currentScreen: SCREEN
  companies: FinancialCompany[]
  directCosts: DirectCost[]
  action: {
    setCurrentScreen: (screen: SCREEN) => void
    setCompanies: (companies: FinancialCompany[]) => void
    setDirectCost: (directCosts: DirectCost[]) => void
    addDirectCost: (directCost: DirectCost) => void
    editDirectCost: (directCost: DirectCost) => void
  }
}

const useFinancialToolkitStoreBase = create<FinancialToolkitSlice>()((set) => ({
  currentScreen: SCREEN.INPUT_REVENUE,
  companies: [],
  directCosts: [],
  action: {
    setCurrentScreen: (screen: SCREEN) => set({ currentScreen: screen }),
    setCompanies: (companies: FinancialCompany[]) => set({ companies }),
    setDirectCost: (directCosts) => set({ directCosts }),
    addDirectCost: (directCost) =>
      set((state) => {
        return {
          directCosts: [...state.directCosts, directCost]
        }
      }),
    editDirectCost: (directCost) =>
      set((state) => {
        const idx = state.directCosts.findIndex(
          (value) => value.id === directCost.id
        )
        state.directCosts[idx] = directCost
        return {
          directCosts: [...state.directCosts]
        }
      })
  }
}))

export const useFinancialToolkitStore = createSelectors(
  useFinancialToolkitStoreBase
)
