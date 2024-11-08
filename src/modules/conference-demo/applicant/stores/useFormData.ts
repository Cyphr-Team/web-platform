import { FORMAT_DATE_MM_DD_YYYY } from "@/constants/date.constants"
import { type BusinessInformation } from "@/modules/conference-demo/applicant/components/organisms/BusinessInformationForm.tsx"
import { type LoanRequest } from "@/modules/conference-demo/applicant/components/organisms/LoanRequestForm.tsx"
import { type SignFormValues } from "@/modules/conference-demo/applicant/components/organisms/SignAndSubmitForm"
import { STEP } from "@/modules/conference-demo/applicant/constants"
import { type DocumentFormType } from "@/modules/conference-demo/applicant/types"
import { createSelectors } from "@/utils/store.ts"
import { format } from "date-fns"
import { create } from "zustand"
import { type BusinessPlanRequest } from "../components/organisms/BusinessPlanForm"

/**
 * Set default values helpers
 * */
const initData = (step?: STEP) => {
  switch (step) {
    case STEP.LOAN_REQUEST:
      return { loanAmount: 0, proposeUseOfLoan: "" }
    case STEP.BUSINESS_PLAN:
      return {
        businessPlan: "",
        businessDescription: "",
        socialImpact: "",
        grantsInThreeYears: "",
        revenueGoal: "",
        marketPotential: "",
        briefOverview: ""
      }
    case STEP.BUSINESS_INFORMATION:
      return {
        name: "",
        address: "",
        ein: "",
        website: ""
      }
    case STEP.REVIEW_AND_SUBMIT:
      return {
        printName: "",
        signatureDate: format(new Date().toString(), FORMAT_DATE_MM_DD_YYYY),
        signature: ""
      }
    default:
      return {
        files: []
      }
  }
}

interface SetFormDataProps {
  step: STEP
  data:
    | LoanRequest
    | BusinessInformation
    | BusinessPlanRequest
    | SignFormValues
    | DocumentFormType
}

interface FormDataSlice {
  [STEP.LOAN_REQUEST]: LoanRequest
  [STEP.BUSINESS_INFORMATION]: BusinessInformation
  [STEP.BUSINESS_PLAN]: BusinessPlanRequest
  [STEP.REVIEW_AND_SUBMIT]: SignFormValues
  [STEP.ARTICLES_OF_ORGANIZATION]: DocumentFormType
  [STEP.BANK_STATEMENTS]: DocumentFormType

  action: {
    setFormData: (props: SetFormDataProps) => void
    eraseData: () => void
  }
}

const useFormDataBase = create<FormDataSlice>()((set) => ({
  [STEP.LOAN_REQUEST]: initData(STEP.LOAN_REQUEST) as LoanRequest,
  [STEP.REVIEW_AND_SUBMIT]: initData(STEP.REVIEW_AND_SUBMIT) as SignFormValues,
  [STEP.BUSINESS_INFORMATION]: initData(
    STEP.BUSINESS_INFORMATION
  ) as BusinessInformation,
  [STEP.BUSINESS_PLAN]: initData(STEP.BUSINESS_PLAN) as BusinessPlanRequest,
  [STEP.ARTICLES_OF_ORGANIZATION]: initData() as DocumentFormType,
  [STEP.BANK_STATEMENTS]: initData() as DocumentFormType,
  //
  action: {
    setFormData: ({ step, data }) => set({ [step]: data }),
    eraseData: () =>
      set({
        [STEP.LOAN_REQUEST]: initData(STEP.LOAN_REQUEST) as LoanRequest,
        [STEP.REVIEW_AND_SUBMIT]: initData(
          STEP.REVIEW_AND_SUBMIT
        ) as SignFormValues,
        [STEP.BUSINESS_INFORMATION]: initData(
          STEP.BUSINESS_INFORMATION
        ) as BusinessInformation,
        [STEP.BUSINESS_PLAN]: initData(
          STEP.BUSINESS_PLAN
        ) as BusinessPlanRequest,
        [STEP.ARTICLES_OF_ORGANIZATION]: initData() as DocumentFormType,
        [STEP.BANK_STATEMENTS]: initData() as DocumentFormType
      })
  }
}))

export const useFormData = createSelectors(useFormDataBase)
