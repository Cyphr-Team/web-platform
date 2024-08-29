import { create } from "zustand"

import { createSelectors } from "@/utils/store.ts"
import { LoanRequest } from "@/modules/conference-demo/applicant/components/organisms/LoanRequestForm.tsx"
import { BusinessInformation } from "@/modules/conference-demo/applicant/components/organisms/BusinessInformationForm.tsx"

interface FormDataSlice {
  loanRequestData: LoanRequest
  businessInformationData: BusinessInformation
  action: {
    setLoanRequestData: (data: LoanRequest) => void
    setBusinessInformationData: (data: BusinessInformation) => void
  }
}

const useFormDataBase = create<FormDataSlice>()((set) => ({
  loanRequestData: { loanAmount: 0, proposeUseOfLoan: "" },
  businessInformationData: {
    name: "",
    address: "",
    ein: "",
    website: ""
  },
  action: {
    setLoanRequestData: (data: LoanRequest) => set({ loanRequestData: data }),
    setBusinessInformationData: (data: BusinessInformation) =>
      set({ businessInformationData: data })
  }
}))

export const useFormData = createSelectors(useFormDataBase)
