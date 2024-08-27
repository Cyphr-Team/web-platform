import { createSelectors } from "@/utils/store.ts"
import { OnChangeFn, SortingState } from "@tanstack/react-table"
import { create } from "zustand"

interface LoanReadinessSlice {
  sorting: SortingState
  dummyLevel: string | undefined

  action: {
    setSorting: OnChangeFn<SortingState>
    setDummyLevel: (dummyLevel: string | undefined) => void
  }
}

const useLoanReadinessStoreBase = create<LoanReadinessSlice>()((set) => ({
  sorting: [],
  dummyLevel: undefined,

  action: {
    setSorting: (updaterOrValue) =>
      set((state) => ({
        sorting:
          typeof updaterOrValue === "function"
            ? updaterOrValue(state.sorting)
            : updaterOrValue
      })),
    setDummyLevel: (dummyLevel) => set({ dummyLevel: dummyLevel })
  }
}))

export const useLoanReadinessStore = createSelectors(useLoanReadinessStoreBase)
