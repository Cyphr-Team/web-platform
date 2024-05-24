import { useMemo } from "react"
import { LoanRequest } from "../components/layouts/LoanRequest"
import { BusinessInformationForm } from "../components/organisms/BusinessInformationForm"
import { CashFlowVerificationForm } from "../components/organisms/CashFlowVerificationForm"
import { ConfirmationForm } from "../components/organisms/ConfirmationForm"
import { CurrentLoansForm } from "../components/organisms/CurrentLoansForm"
import { FinancialInformationForm } from "../components/organisms/FinancialInformationForm"
import { OperatingExpensesForm } from "../components/organisms/OperatingExpensesForm"
import { OwnerInformationForm } from "../components/organisms/OwnerInformationForm"
import { LOAN_APPLICATION_STEPS } from "../models/LoanApplicationStep/type"

/**
 * Use a custom hook to prevent fast refresh on save, make development mode smoother
 */
export const useGetFormByStep = (step: LOAN_APPLICATION_STEPS) => {
  const componentStep = useMemo(() => {
    switch (step) {
      case LOAN_APPLICATION_STEPS.LOAN_REQUEST:
        return <LoanRequest />
      case LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION:
        return <BusinessInformationForm />
      case LOAN_APPLICATION_STEPS.OWNER_INFORMATION:
        return <OwnerInformationForm />
      case LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION:
        return <CashFlowVerificationForm />
      case LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION:
        return <FinancialInformationForm />
      case LOAN_APPLICATION_STEPS.CURRENT_LOANS:
        return <CurrentLoansForm />
      case LOAN_APPLICATION_STEPS.CONFIRMATION:
        return <ConfirmationForm />
      case LOAN_APPLICATION_STEPS.OPERATING_EXPENSES:
        return <OperatingExpensesForm />
      default:
        return null
    }
  }, [step])

  return componentStep
}
