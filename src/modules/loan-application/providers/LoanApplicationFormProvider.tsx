import {
  type Dispatch,
  type PropsWithChildren,
  useMemo,
  useReducer
} from "react"
import { useUpdateEffect } from "react-use"
import { createContext } from "use-context-selector"
import { useLoanApplicationProgressContext, usePlaidContext } from "."
import type {
  BusinessFormValue,
  BusinessModelFormValue,
  ConfirmationFormValue,
  DisclaimerAndDisclosureFormValue,
  DocumentUploadsFormValue,
  ESignFormValue,
  ExecutionFormValue,
  FinancialFormValue,
  IBusinessFormValue,
  ICurrentLoanFormValue,
  IdentityVerificationValue,
  ILoanRequestFormValue,
  IOwnerFormValue,
  LaunchKCBusinessFormValue,
  LaunchKCFitFormValue,
  LaunchKCOwnerFormValue,
  LoanReadyBusinessFormValue,
  LoanRequestFormValue,
  MarketOpportunityFormValue,
  OperatingExpensesFormValue,
  OwnerFormValue,
  PreQualificationFormValue,
  ProductServiceFormValue,
  ReviewApplicationValue
} from "../constants/form"
import { type DocumentUploadedResponse } from "../constants/type"
import { useSubmitLoanForm } from "../services/submit-form.strategy"
import { LOAN_APPLICATION_STEPS } from "../models/LoanApplicationStep/type"
import { type ArticlesOfOrganizationFormValue } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/ArticlesOfOrganizationForm.tsx"
import { type BusinessEinLetterFormValue } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/BusinessEinLetterForm.tsx"
import { type CertificateGoodStandingFormValue } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/CertificateGoodStandingForm.tsx"
import { type FictitiousNameCertificationFormValue } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/FictitiousNameCertification.tsx"
import { type ByLawsFormValue } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/ByLawsForm.tsx"
import {
  type SbbKybFormPartOneValue,
  type SbbKybFormPartTwoValue
} from "../components/organisms/loan-application-form/kyb/sbb/const"
import { type SbbPreApplicationDisclosuresValue } from "../components/organisms/loan-application-form/pre-application-disclosures/const"

import { merge } from "lodash"
import { type FpOperatingExpensesFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-operating-expenses-store"
import { type RevenueStream } from "@/modules/loan-application/[module]-financial-projection/types/revenue-form.ts"
import { type ForecastingSetupFormValue } from "@/modules/loan-application/[module]-financial-projection/types/forecasting-form"
import { type PeopleFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-people-expenses-store"
import { type DirectCostsFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/direct-costs-store"
import { type FpEquityFinancingFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-equity-store"
import { type AssetsFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-assets-store"
import { type ExpenseTaxRateFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-expense-tax-rate-store"
import { type DebtFinancingFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-debt-financing"
import { type FinancialStatementFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/financial-statement-store"

export interface LoanApplicationFormState {
  [LOAN_APPLICATION_STEPS.LOAN_REQUEST]: LoanRequestFormValue
  [LOAN_APPLICATION_STEPS.LOAN_REQUEST_V2]: ILoanRequestFormValue
  [LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION]: IBusinessFormValue
  [LOAN_APPLICATION_STEPS.OWNER_INFORMATION]: IOwnerFormValue
  [LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION]: FinancialFormValue
  [LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION]: FinancialFormValue
  [LOAN_APPLICATION_STEPS.IDENTITY_VERIFICATION]: IdentityVerificationValue
  [LOAN_APPLICATION_STEPS.CURRENT_LOANS]: ICurrentLoanFormValue
  [LOAN_APPLICATION_STEPS.OPERATING_EXPENSES]: OperatingExpensesFormValue
  [LOAN_APPLICATION_STEPS.CONFIRMATION]: ConfirmationFormValue
  [LOAN_APPLICATION_STEPS.E_SIGN]: ESignFormValue
  [LOAN_APPLICATION_STEPS.REVIEW_APPLICATION]: ReviewApplicationValue
  [LOAN_APPLICATION_STEPS.PRODUCT_SERVICE]: ProductServiceFormValue
  [LOAN_APPLICATION_STEPS.MARKET_OPPORTUNITY]: MarketOpportunityFormValue
  [LOAN_APPLICATION_STEPS.BUSINESS_MODEL]: BusinessModelFormValue
  [LOAN_APPLICATION_STEPS.EXECUTION]: ExecutionFormValue
  [LOAN_APPLICATION_STEPS.LAUNCH_KC_BUSINESS_DOCUMENTS]: DocumentUploadsFormValue
  [LOAN_APPLICATION_STEPS.LAUNCH_KC_FIT]: LaunchKCFitFormValue
  [LOAN_APPLICATION_STEPS.PRE_QUALIFICATION]: PreQualificationFormValue
  [LOAN_APPLICATION_STEPS.DISCLAIMER_AND_DISCLOSURE]: DisclaimerAndDisclosureFormValue
  // SBB
  [LOAN_APPLICATION_STEPS.SBB_BUSINESS_INFORMATION_PART_ONE]: SbbKybFormPartOneValue
  [LOAN_APPLICATION_STEPS.SBB_BUSINESS_INFORMATION_PART_TWO]: SbbKybFormPartTwoValue
  [LOAN_APPLICATION_STEPS.ARTICLES_OF_ORGANIZATION]: ArticlesOfOrganizationFormValue
  [LOAN_APPLICATION_STEPS.BUSINESS_EIN_LETTER]: BusinessEinLetterFormValue
  [LOAN_APPLICATION_STEPS.CERTIFICATE_GOOD_STANDING]: CertificateGoodStandingFormValue
  [LOAN_APPLICATION_STEPS.FICTITIOUS_NAME_CERTIFICATION]: FictitiousNameCertificationFormValue
  [LOAN_APPLICATION_STEPS.BY_LAWS]: ByLawsFormValue
  [LOAN_APPLICATION_STEPS.PATRIOT_ACT]: SbbPreApplicationDisclosuresValue
  [LOAN_APPLICATION_STEPS.PRIVACY_POLICY]: SbbPreApplicationDisclosuresValue
  // Financial projection
  [LOAN_APPLICATION_STEPS.FORECASTING_SETUP]: ForecastingSetupFormValue
  [LOAN_APPLICATION_STEPS.FINANCIAL_STATEMENTS]: FinancialStatementFormValue
  [LOAN_APPLICATION_STEPS.REVENUE]: RevenueStream
  [LOAN_APPLICATION_STEPS.PEOPLE]: PeopleFormValue
  [LOAN_APPLICATION_STEPS.DIRECT_COSTS]: DirectCostsFormValue
  [LOAN_APPLICATION_STEPS.FP_OPERATING_EXPENSES]: FpOperatingExpensesFormValue
  [LOAN_APPLICATION_STEPS.TAX_RATES]: ExpenseTaxRateFormValue
  [LOAN_APPLICATION_STEPS.ASSETS]: AssetsFormValue
  [LOAN_APPLICATION_STEPS.DEBT_FINANCING]: DebtFinancingFormValue
  [LOAN_APPLICATION_STEPS.EQUITY]: FpEquityFinancingFormValue
}

export interface LoanDocumentsState {
  [LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION]: DocumentUploadedResponse[]
  [LOAN_APPLICATION_STEPS.OWNER_INFORMATION]: DocumentUploadedResponse[]
  [LOAN_APPLICATION_STEPS.LAUNCH_KC_BUSINESS_DOCUMENTS]: DocumentUploadedResponse[]
}

interface LoanApplicationFormContext extends LoanApplicationFormState {
  dispatchFormAction: Dispatch<Action>
  submitLoanForm: () => void
  dispatchDocumentAction: Dispatch<DocumentAction>
  documents: LoanDocumentsState
  isSubmitting: boolean
}

export type FormStateType =
  | BusinessFormValue
  | OwnerFormValue
  | FinancialFormValue
  | ICurrentLoanFormValue
  | OperatingExpensesFormValue
  | ConfirmationFormValue
  | LoanRequestFormValue
  | IdentityVerificationValue
  | ReviewApplicationValue
  | ProductServiceFormValue
  | MarketOpportunityFormValue
  | BusinessModelFormValue
  | ExecutionFormValue
  | DocumentUploadsFormValue
  | PreQualificationFormValue
  | ESignFormValue
  | DisclaimerAndDisclosureFormValue
  // for launch KC only
  | LaunchKCFitFormValue
  | LaunchKCBusinessFormValue
  | LaunchKCOwnerFormValue
  // for SBB only
  | SbbPreApplicationDisclosuresValue
  | SbbKybFormPartOneValue
  | SbbKybFormPartTwoValue
  // sbb documentation form
  | ArticlesOfOrganizationFormValue
  | BusinessEinLetterFormValue
  | ByLawsFormValue
  | CertificateGoodStandingFormValue
  | FictitiousNameCertificationFormValue
  // Financial projection
  | ForecastingSetupFormValue
  | FpOperatingExpensesFormValue
  | RevenueStream
  | PeopleFormValue
  | DirectCostsFormValue
  | FpEquityFinancingFormValue
  | FinancialStatementFormValue
  | AssetsFormValue
  | ExpenseTaxRateFormValue
  | DebtFinancingFormValue
  | LoanReadyBusinessFormValue
  // Form V2
  | ILoanRequestFormValue

export interface Action {
  action: FORM_ACTION
  state: FormStateType
  key: LOAN_APPLICATION_STEPS
}

interface DocumentAction {
  action: DOCUMENT_ACTION
  state: DocumentUploadedResponse | { id: string }
  key:
    | LOAN_APPLICATION_STEPS.OWNER_INFORMATION
    | LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION
    | LOAN_APPLICATION_STEPS.LAUNCH_KC_BUSINESS_DOCUMENTS
}

export enum FORM_ACTION {
  GET_DATA = "GET_DATA",
  SET_DATA = "SET_DATA",
  UPDATE_DATA = "UPDATE_DATA",
  RESET_DATA = "RESET_DATA"
}

export enum DOCUMENT_ACTION {
  GET_DATA = "GET_DATA",
  SET_DATA = "SET_DATA",
  REMOVE_DATA = "REMOVE_DATA"
}

const updateLoanDocuments = (
  state: LoanDocumentsState,
  action: DocumentAction
): LoanDocumentsState => {
  switch (action.action) {
    case DOCUMENT_ACTION.GET_DATA:
      return { ...state }
    case DOCUMENT_ACTION.SET_DATA:
      return {
        ...state,
        [action.key]: action.state
      }
    case DOCUMENT_ACTION.REMOVE_DATA:
      return {
        ...state,
        [action.key]: state[action.key].filter(
          (doc) => doc.id !== action.state.id
        )
      }
  }
}

const updateApplicationForm = (
  state: LoanApplicationFormState,
  action: Action
): LoanApplicationFormState => {
  switch (action.action) {
    case FORM_ACTION.GET_DATA:
      return { ...state }
    case FORM_ACTION.SET_DATA:
      return {
        ...state,
        [action.key]: {
          ...action.state
        }
      }
    case FORM_ACTION.UPDATE_DATA:
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          ...action.state
        }
      }
    case FORM_ACTION.RESET_DATA:
      return {
        ...state,
        [action.key]: {}
      }
  }
}

export const LoanApplicationFormContext =
  createContext<LoanApplicationFormContext>({} as LoanApplicationFormContext)

const { Provider } = LoanApplicationFormContext

export function LoanApplicationFormProvider(props: PropsWithChildren) {
  const [state, dispatchFormAction] = useReducer(
    updateApplicationForm,
    {} as LoanApplicationFormState
  )

  const { itemIds: plaidItemIds } = usePlaidContext()

  const [documents, dispatchDocumentAction] = useReducer(
    updateLoanDocuments,
    {} as LoanDocumentsState
  )

  const { progress } = useLoanApplicationProgressContext()

  const { submitLoanForm, isLoading } = useSubmitLoanForm(
    dispatchFormAction,
    progress,
    state[LOAN_APPLICATION_STEPS.LOAN_REQUEST],
    state[LOAN_APPLICATION_STEPS.LOAN_REQUEST_V2],
    state[LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION],
    state[LOAN_APPLICATION_STEPS.OWNER_INFORMATION],
    state[LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION],
    state[LOAN_APPLICATION_STEPS.CURRENT_LOANS],
    state[LOAN_APPLICATION_STEPS.OPERATING_EXPENSES],
    state[LOAN_APPLICATION_STEPS.CONFIRMATION],
    state[LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION],
    state[LOAN_APPLICATION_STEPS.IDENTITY_VERIFICATION],
    state[LOAN_APPLICATION_STEPS.PRODUCT_SERVICE],
    state[LOAN_APPLICATION_STEPS.LAUNCH_KC_FIT],
    state[LOAN_APPLICATION_STEPS.EXECUTION],
    state[LOAN_APPLICATION_STEPS.BUSINESS_MODEL],
    state[LOAN_APPLICATION_STEPS.MARKET_OPPORTUNITY],
    state[LOAN_APPLICATION_STEPS.E_SIGN],
    state[LOAN_APPLICATION_STEPS.LAUNCH_KC_BUSINESS_DOCUMENTS],
    state[LOAN_APPLICATION_STEPS.ARTICLES_OF_ORGANIZATION],
    state[LOAN_APPLICATION_STEPS.BUSINESS_EIN_LETTER],
    state[LOAN_APPLICATION_STEPS.BY_LAWS],
    state[LOAN_APPLICATION_STEPS.CERTIFICATE_GOOD_STANDING],
    state[LOAN_APPLICATION_STEPS.FICTITIOUS_NAME_CERTIFICATION],
    plaidItemIds,
    merge(
      state[LOAN_APPLICATION_STEPS.SBB_BUSINESS_INFORMATION_PART_ONE],
      state[LOAN_APPLICATION_STEPS.SBB_BUSINESS_INFORMATION_PART_TWO]
    ),
    state[LOAN_APPLICATION_STEPS.PEOPLE],
    state[LOAN_APPLICATION_STEPS.FP_OPERATING_EXPENSES],
    state[LOAN_APPLICATION_STEPS.FORECASTING_SETUP],
    state[LOAN_APPLICATION_STEPS.DIRECT_COSTS],
    state[LOAN_APPLICATION_STEPS.EQUITY],
    state[LOAN_APPLICATION_STEPS.ASSETS],
    state[LOAN_APPLICATION_STEPS.TAX_RATES],
    state[LOAN_APPLICATION_STEPS.REVENUE],
    state[LOAN_APPLICATION_STEPS.DEBT_FINANCING],
    state[LOAN_APPLICATION_STEPS.FINANCIAL_STATEMENTS]
  )

  //Trigger submit form when the confirmation form is submitted
  useUpdateEffect(() => {
    if (state[LOAN_APPLICATION_STEPS.CONFIRMATION]) {
      submitLoanForm()
    }
  }, [state[LOAN_APPLICATION_STEPS.CONFIRMATION]])

  const providerValues = useMemo(
    () => ({
      ...state,
      documents,
      dispatchDocumentAction,
      isSubmitting: isLoading,
      dispatchFormAction,
      submitLoanForm
    }),
    [state, documents, isLoading, submitLoanForm]
  )

  return <Provider value={providerValues}>{props.children}</Provider>
}
