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

type Action = {
  action: FORM_ACTION
  state:
    | BusinessFormValue
    | OwnerFormValue
    | FinancialFormValue
    | ConfirmationFormValue
    | LoanRequestFormValue
  key: LOAN_APPLICATION_STEPS
}

export enum FORM_ACTION {
  GET_DATA = "GET_DATA",
  SET_DATA = "SET_DATA"
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
  console.log(state)
  console.log("RE_RENDER")

  return (
    <Provider value={{ ...state, dispatchFormAction }}>
      {props.children}
    </Provider>
  )
}
