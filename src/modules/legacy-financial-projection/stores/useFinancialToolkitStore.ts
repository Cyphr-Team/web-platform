import { create } from "zustand"
import { createSelectors } from "@/utils/store.ts"

interface FinancialToolkitSlice {
  ching: string | number | null
  action: {
    chong: (a: string | number | null) => void
  }
}

const useFinancialToolkitStoreBase = create<FinancialToolkitSlice>()((set) => ({
  ching: "",
  action: {
    chong: (a) => set({ ching: a })
  }
}))

export const useFinancialToolkitStore = createSelectors(
  useFinancialToolkitStoreBase
)
