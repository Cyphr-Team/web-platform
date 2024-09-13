import { create } from "zustand"
import { createSelectors } from "@/utils/store.ts"

interface FinancialToolkitSlice {
  ching: string
  action: {
    chong: VoidFunction
  }
}

const useFinancialToolkitStoreBase = create<FinancialToolkitSlice>()((set) => ({
  ching: "",
  action: {
    chong: () => set({ ching: "chong" })
  }
}))

export const useFinancialToolkitStore = createSelectors(
  useFinancialToolkitStoreBase
)
