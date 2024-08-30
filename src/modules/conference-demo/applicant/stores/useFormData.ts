import { FORMAT_DATE_MM_DD_YYYY } from "@/constants/date.constants"
import { BusinessInformation } from "@/modules/conference-demo/applicant/components/organisms/BusinessInformationForm.tsx"
import { LoanRequest } from "@/modules/conference-demo/applicant/components/organisms/LoanRequestForm.tsx"
import { SignFormValues } from "@/modules/conference-demo/applicant/components/organisms/SignAndSubmitForm"
import { STEP } from "@/modules/conference-demo/applicant/constants"
import { createSelectors } from "@/utils/store.ts"
import { format } from "date-fns"
import { create } from "zustand"
import { BusinessPlanRequest } from "../components/organisms/BusinessPlanForm"

interface SetFormDataProps {
  step: STEP
  data: LoanRequest
}

interface FormDataSlice {
  loanRequestData: LoanRequest
  businessInformationData: BusinessInformation
  businessPlanData: BusinessPlanRequest
  signData: SignFormValues
  action: {
    setSignData: (data: SignFormValues) => void
    setLoanRequestData: (data: LoanRequest) => void
    setFormData: (props: SetFormDataProps) => void
    setBusinessInformationData: (data: BusinessInformation) => void
    setBusinessPlanData: (data: BusinessPlanRequest) => void
  }
}

const useFormDataBase = create<FormDataSlice>()((set) => ({
  loanRequestData: { loanAmount: 0, proposeUseOfLoan: "" },
  signData: {
    printName: "",
    signatureDate: format(new Date().toString(), FORMAT_DATE_MM_DD_YYYY),
    signature: ""
  },
  businessInformationData: {
    name: "",
    address: "",
    ein: "",
    website: ""
  },
  businessPlanData: {
    businessPlan: "",
    businessDescription: "",
    socialImpact: "",
    grantsInThreeYears: "",
    revenueGoal: "",
    marketPotential: "",
    briefOverview: "",
    uploadedFiles: undefined
  },
  action: {
    setLoanRequestData: (data: LoanRequest) => set({ loanRequestData: data }),
    setBusinessInformationData: (data: BusinessInformation) =>
      set({ businessInformationData: data }),
    setBusinessPlanData: (data: BusinessPlanRequest) =>
      set({ businessPlanData: data }),
    setSignData: (data) => set({ signData: data }),
    setFormData: ({ step, data }) => {
      const form = getFormByStep(step)
      if (!form) return

      return set({ [form]: data })
    }
  }
}))

export const useFormData = createSelectors(useFormDataBase)

const getFormByStep = (step: STEP) => {
  switch (step) {
    case STEP.LOAN_REQUEST:
      return "loanRequestData"
    case STEP.BUSINESS_INFORMATION:
      return "businessInformationData"
    case STEP.BUSINESS_PLAN:
      return "businessPlanData"
  }

  return null
}
