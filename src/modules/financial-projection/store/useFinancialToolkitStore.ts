import { create } from "zustand"
import { SCREEN } from "@/modules/financial-projection/constants"
import {
  ContractRevenue,
  DirectCost,
  FinancialCompany,
  PeopleExpense,
  RecurringCharge,
  SaasRevenue,
  TransactionalMarketplaceRevenue,
  UnitSale
} from "@/modules/financial-projection/types"
import { createSelectors } from "@/utils/store.ts"

interface FinancialToolkitSlice {
  currentScreen: SCREEN
  companies: FinancialCompany[]
  directCosts: DirectCost[]
  transactionalMarketplaceRevenue: TransactionalMarketplaceRevenue[]
  saasRevenue: SaasRevenue[]
  recurringCharges: RecurringCharge[]
  contractRevenues: ContractRevenue[]
  peopleExpenses: PeopleExpense[]
  unitSales: UnitSale[]
  action: {
    setCurrentScreen: (screen: SCREEN) => void
    setCompanies: (companies: FinancialCompany[]) => void
    setDirectCost: (directCosts: DirectCost[]) => void
    // Transactional Marketplace Revenue
    setTransactionalMarketplaceRevenue: (
      data: TransactionalMarketplaceRevenue[]
    ) => void
    // Saas Revenue
    setSaasRevenue: (data: SaasRevenue[]) => void
    // Recurring Charges
    setRecurringCharges: (data: RecurringCharge[]) => void
    // Contract revenues
    setContractRevenues: (data: ContractRevenue[]) => void
    // People expenses
    setPeopleExpenses: (data: PeopleExpense[]) => void
    // Unit sales
    setUnitSales: (data: UnitSale[]) => void
  }
}

const useFinancialToolkitStoreBase = create<FinancialToolkitSlice>()((set) => ({
  currentScreen: SCREEN.INPUT_RECURRING_CHARGES,
  companies: [],
  directCosts: [],
  transactionalMarketplaceRevenue: [],
  saasRevenue: [],
  recurringCharges: [],
  contractRevenues: [],
  peopleExpenses: [],
  unitSales: [],
  action: {
    setCurrentScreen: (screen: SCREEN) => set({ currentScreen: screen }),
    setCompanies: (companies: FinancialCompany[]) => set({ companies }),
    // Direct Costs
    setDirectCost: (directCosts) => set({ directCosts }),
    // Transactional Marketplace Revenue
    setTransactionalMarketplaceRevenue: (data) =>
      set({ transactionalMarketplaceRevenue: data }),
    // Saas Revenue
    setSaasRevenue: (data) => set({ saasRevenue: data }),
    // Recurring charges
    setRecurringCharges: (data) => set({ recurringCharges: data }),
    // Contract Revenues
    setContractRevenues: (data) => set({ contractRevenues: data }),
    // People expenses
    setPeopleExpenses: (data) => set({ peopleExpenses: data }),
    // Unit Sales
    setUnitSales: (data) => set({ unitSales: data })
  }
}))

export const useFinancialToolkitStore = createSelectors(
  useFinancialToolkitStoreBase
)
