import { create } from "zustand"
import { SCREEN } from "@/modules/financial-projection/constants"
import {
  DirectCost,
  FinancialCompany,
  TransactionalMarketplaceRevenue
} from "@/modules/financial-projection/types"
import { createSelectors } from "@/utils/store.ts"

interface FinancialToolkitSlice {
  currentScreen: SCREEN
  companies: FinancialCompany[]
  directCosts: DirectCost[]
  transactionalMarketplaceRevenue: TransactionalMarketplaceRevenue[]
  action: {
    setCurrentScreen: (screen: SCREEN) => void
    setCompanies: (companies: FinancialCompany[]) => void
    setDirectCost: (directCosts: DirectCost[]) => void
    addDirectCost: (directCost: DirectCost) => void
    editDirectCost: (directCost: DirectCost) => void
    // Transactional Marketplace Revenue
    setTransactionalMarketplaceRevenue: (
      data: TransactionalMarketplaceRevenue[]
    ) => void
  }
}

const useFinancialToolkitStoreBase = create<FinancialToolkitSlice>()((set) => ({
  currentScreen: SCREEN.INPUT_REVENUE,
  companies: [],
  directCosts: [],
  transactionalMarketplaceRevenue: [],
  action: {
    setCurrentScreen: (screen: SCREEN) => set({ currentScreen: screen }),
    setCompanies: (companies: FinancialCompany[]) => set({ companies }),
    // Direct Costs
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
      }),
    // Transactional Marketplace Revenue
    setTransactionalMarketplaceRevenue: (data) =>
      set({ transactionalMarketplaceRevenue: data })
  }
}))

export const useFinancialToolkitStore = createSelectors(
  useFinancialToolkitStoreBase
)
