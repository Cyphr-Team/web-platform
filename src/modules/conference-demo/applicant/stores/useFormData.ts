import { create } from "zustand"

import { createSelectors } from "@/utils/store.ts"
import { LoanRequest } from "@/modules/conference-demo/applicant/components/organisms/LoanRequestForm.tsx"

interface FormDataSlice {
  loanRequestData: LoanRequest
  action: {
    setLoanRequestData: (data: LoanRequest) => void
  }
}

const useFormDataBase = create<FormDataSlice>()((set) => ({
  loanRequestData: { loanAmount: 0, proposeUseOfLoan: "" },
  action: {
    setLoanRequestData: (data: LoanRequest) => set({ loanRequestData: data })
  }
}))

export const useFormData = createSelectors(useFormDataBase)
