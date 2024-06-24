import {
  ILoanApplicationStep,
  LOAN_APPLICATION_STEPS
} from "@/modules/loan-application/models/LoanApplicationStep/type"
import { isEnabledBankAccountConnectionV2 } from "@/utils/feature-flag.utils"
import { useMemo } from "react"
import { LoanRequest } from "../../layouts/LoanRequest"
import { BusinessInformationForm } from "./BusinessInformationForm"
import { CashFlowVerificationForm } from "./CashFlowVerificationForm"
import { ConfirmationForm } from "./ConfirmationForm"
import { CurrentLoansForm } from "./CurrentLoansForm"
import { FinancialInformationForm } from "./FinancialInformationForm"
import { IdentityVerificationForm } from "./IdentityVerificationForm"
import { OperatingExpensesForm } from "./OperatingExpensesForm"
import { OwnerInformationForm } from "./OwnerInformationForm"
import { CashFlowVerificationFormV2 } from "./v2/CashFlowVerificationForm"

interface IReviewStep {
  stepProgress: ILoanApplicationStep
}

/**
 * Use a custom hook to prevent fast refresh on save, make development mode smoother
 * This hook doesn't include the review componenet, so it won't make an infinity loop
 */
export const useGetFormByStepLmao = (step: LOAN_APPLICATION_STEPS) => {
  const componentStep = useMemo(() => {
    switch (step) {
      case LOAN_APPLICATION_STEPS.LOAN_REQUEST:
        return <LoanRequest />
      case LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION:
        return <BusinessInformationForm />
      case LOAN_APPLICATION_STEPS.OWNER_INFORMATION:
        return <OwnerInformationForm />
      case LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION:
        if (isEnabledBankAccountConnectionV2()) {
          return <CashFlowVerificationFormV2 />
        } else {
          return <CashFlowVerificationForm />
        }
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
      default:
        return null
    }
  }, [step])

  return componentStep
}

export const ReviewApplicationStep = ({ stepProgress }: IReviewStep) => {
  const componentByStep = useGetFormByStepLmao(stepProgress.step)

  return <div className="w-full">{componentByStep}</div>
}
