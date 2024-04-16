import { Dispatch, ReactNode, useReducer } from "react"
import { LOAN_APPLICATION_STEPS } from "../constants"
import {
  BusinessFormValue,
  ConfirmationFormValue,
  FinancialFormValue,
  LoanRequestFormValue,
  OwnerFormValue
} from "../constants/form"
import { createContext } from "use-context-selector"
import { useSubmitLoanKYCForm } from "../hooks/useForm/useSubmitLoanKYCForm"
import { useSubmitLoanKYBForm } from "../hooks/useForm/useSubmitLoanKYBForm"
import { useSubmitLoanRequestForm } from "../hooks/useForm/useSubmitLoanRequest"
import { useParams } from "react-router-dom"

type LoanApplicationFormState = {
  [LOAN_APPLICATION_STEPS.LOAN_REQUEST]: LoanRequestFormValue
  [LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION]: BusinessFormValue
  [LOAN_APPLICATION_STEPS.OWNER_INFORMATION]: OwnerFormValue
  [LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION]: FinancialFormValue
  [LOAN_APPLICATION_STEPS.CONFIRMATION]: ConfirmationFormValue
}

interface LoanApplicationFormContext extends LoanApplicationFormState {
  dispatchFormAction: Dispatch<Action>
}

export type FormStateType =
  | BusinessFormValue
  | OwnerFormValue
  | FinancialFormValue
  | ConfirmationFormValue
  | LoanRequestFormValue

type Action = {
  action: FORM_ACTION
  state: FormStateType
  key: LOAN_APPLICATION_STEPS
}

export enum FORM_ACTION {
  GET_DATA = "GET_DATA",
  SET_DATA = "SET_DATA",
  UPDATE_DATA = "UPDATE_DATA",
  RESET_DATA = "RESET_DATA"
}

const updateApplicationForm = (
  state: LoanApplicationFormState,
  action: Action
): LoanApplicationFormState => {
  console.log(state)

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
  const { id: loanApplicationId } = useParams()

  const { submitLoanKYBForm } = useSubmitLoanKYBForm(
    state[LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION],
    state[LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION].id,
    loanApplicationId
  )
  const { submitLoanKYCForm } = useSubmitLoanKYCForm(
    state[LOAN_APPLICATION_STEPS.OWNER_INFORMATION],
    state[LOAN_APPLICATION_STEPS.OWNER_INFORMATION].id,
    loanApplicationId
  )

  const { submitLoanRequestForm } = useSubmitLoanRequestForm(
    state[LOAN_APPLICATION_STEPS.LOAN_REQUEST],
    state[LOAN_APPLICATION_STEPS.LOAN_REQUEST].id,
    loanApplicationId
  )

  console.log(submitLoanKYBForm, submitLoanKYCForm, submitLoanRequestForm)

  return (
    <Provider value={{ ...state, dispatchFormAction }}>
      {props.children}
    </Provider>
  )
}
