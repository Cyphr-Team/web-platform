import { LoanType } from "@/types/loan-program.type"
import { Dispatch, ReactNode, useMemo, useReducer } from "react"
import { useUpdateEffect } from "react-use"
import { createContext } from "use-context-selector"
import {
  useLoanApplicationProgressContext,
  useLoanProgramDetailContext
} from "."
import {
  BusinessFormValue,
  ConfirmationFormValue,
  CurrentLoansFormValue,
  FinancialFormValue,
  IdentityVerificationValue,
  LoanRequestFormValue,
  OperatingExpensesFormValue,
  OwnerFormValue,
  ReviewApplicationValue
} from "../constants/form"
import { DocumentUploadedResponse } from "../constants/type"
import { useSubmitLoanForm } from "../services/submit-form.strategy"
import { LOAN_APPLICATION_STEPS } from "../models/LoanApplicationStep/type"

type LoanApplicationFormState = {
  [LOAN_APPLICATION_STEPS.LOAN_REQUEST]: LoanRequestFormValue
  [LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION]: BusinessFormValue
  [LOAN_APPLICATION_STEPS.OWNER_INFORMATION]: OwnerFormValue
  [LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION]: FinancialFormValue
  [LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION]: FinancialFormValue
  [LOAN_APPLICATION_STEPS.IDENTITY_VERIFICATION]: IdentityVerificationValue
  [LOAN_APPLICATION_STEPS.CURRENT_LOANS]: CurrentLoansFormValue
  [LOAN_APPLICATION_STEPS.OPERATING_EXPENSES]: OperatingExpensesFormValue
  [LOAN_APPLICATION_STEPS.CONFIRMATION]: ConfirmationFormValue
  [LOAN_APPLICATION_STEPS.REVIEW_APPLICATION]: ReviewApplicationValue
}

type LoanDocumentsState = {
  [LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION]: DocumentUploadedResponse[]
  [LOAN_APPLICATION_STEPS.OWNER_INFORMATION]: DocumentUploadedResponse[]
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
  | CurrentLoansFormValue
  | OperatingExpensesFormValue
  | ConfirmationFormValue
  | LoanRequestFormValue
  | IdentityVerificationValue
  | ReviewApplicationValue

export type Action = {
  action: FORM_ACTION
  state: FormStateType
  key: LOAN_APPLICATION_STEPS
}

type DocumentAction = {
  action: DOCUMENT_ACTION
  state: DocumentUploadedResponse | { id: string }
  key:
    | LOAN_APPLICATION_STEPS.OWNER_INFORMATION
    | LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION
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

export const LoanApplicationFormProvider: React.FC<{ children: ReactNode }> = (
  props
) => {
  const [state, dispatchFormAction] = useReducer(
    updateApplicationForm,
    {} as LoanApplicationFormState
  )

  const [documents, dispatchDocumentAction] = useReducer(
    updateLoanDocuments,
    {} as LoanDocumentsState
  )

  const { loanProgramDetails } = useLoanProgramDetailContext()
  const { progress } = useLoanApplicationProgressContext()

  const loanType = loanProgramDetails?.type ?? LoanType.MICRO

  // TODO: Handle submit persona inquiry
  const { submitLoanForm, isLoading } = useSubmitLoanForm(
    loanType,
    progress,
    state[LOAN_APPLICATION_STEPS.LOAN_REQUEST],
    state[LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION],
    state[LOAN_APPLICATION_STEPS.OWNER_INFORMATION],
    state[LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION],
    state[LOAN_APPLICATION_STEPS.CURRENT_LOANS],
    state[LOAN_APPLICATION_STEPS.OPERATING_EXPENSES],
    state[LOAN_APPLICATION_STEPS.CONFIRMATION],
    state[LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION],
    state[LOAN_APPLICATION_STEPS.IDENTITY_VERIFICATION]
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
