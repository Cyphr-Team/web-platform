import { useMemo } from "react"
import { LoanRequest } from "../components/layouts/LoanRequest"
import { BusinessInformationForm } from "../components/organisms/loan-application-form/BusinessInformationForm"
import { CashFlowVerificationForm } from "../components/organisms/loan-application-form/CashFlowVerificationForm"
import { ConfirmationForm } from "../components/organisms/loan-application-form/ConfirmationForm"
import { CurrentLoansForm } from "../components/organisms/loan-application-form/CurrentLoansForm"
import { FinancialInformationForm } from "../components/organisms/loan-application-form/FinancialInformationForm"
import { IdentityVerificationForm } from "../components/organisms/loan-application-form/IdentityVerificationForm"
import { OperatingExpensesForm } from "../components/organisms/loan-application-form/OperatingExpensesForm"
import { OwnerInformationForm } from "../components/organisms/loan-application-form/OwnerInformationForm"
import { LOAN_APPLICATION_STEPS } from "../models/LoanApplicationStep/type"
import { ReviewApplication } from "../components/organisms/loan-application-form/ReviewApplication"

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
      case LOAN_APPLICATION_STEPS.IDENTITY_VERIFICATION:
        return <IdentityVerificationForm />
      case LOAN_APPLICATION_STEPS.REVIEW_APPLICATION:
        return <ReviewApplication />
      default:
        return null
    }
  }, [step])

  return componentStep
}
