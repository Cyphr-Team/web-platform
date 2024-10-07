import { AssetsForm } from "@/modules/loan-application/[module]-financial-projection/components/organisms/AssetsForm"
import { DebtFinancingForm } from "@/modules/loan-application/[module]-financial-projection/components/organisms/DebtFinancingForm"
import { DirectCostsForm } from "@/modules/loan-application/[module]-financial-projection/components/organisms/DirectCostsForm"
import { EquityForm } from "@/modules/loan-application/[module]-financial-projection/components/organisms/EquityForm"
import { TaxRateForm } from "@/modules/loan-application/[module]-financial-projection/components/organisms/ExpenseTaxRateForm"
import { FinancialStatementForm } from "@/modules/loan-application/[module]-financial-projection/components/organisms/FinancialStatementForm"
import { ForecastingSetupForm } from "@/modules/loan-application/[module]-financial-projection/components/organisms/ForecastingSetupForm"
import { FpOperatingExpensesForm } from "@/modules/loan-application/[module]-financial-projection/components/organisms/FpOperatingExpensesForm"
import { PeopleForm } from "@/modules/loan-application/[module]-financial-projection/components/organisms/PeopleForm"
import RevenueForm from "@/modules/loan-application/[module]-financial-projection/components/organisms/RevenueForm"
import { CashFlowVerificationFormV2 } from "@/modules/loan-application/components/organisms/loan-application-form/cash-flow/CashFlowVerificationFormV2"
import { BusinessInformationForm } from "@/modules/loan-application/components/organisms/loan-application-form/kyb/KybForm"
import { OwnerInformationForm } from "@/modules/loan-application/components/organisms/loan-application-form/kyc/KycForm"
import { LoanReadyLoanRequestForm } from "@/modules/loan-application/components/organisms/loan-application-form/loan-request/LoanReadyLoanRequestForm"
import {
  ILoanApplicationStep,
  LOAN_APPLICATION_STEPS
} from "@/modules/loan-application/models/LoanApplicationStep/type"
import { get } from "lodash"
import { forwardRef, useMemo } from "react"
// Define a mapping of steps to components
const STEP_COMPONENT_MAP = {
  [LOAN_APPLICATION_STEPS.LOAN_REQUEST]: LoanReadyLoanRequestForm,
  [LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION]: BusinessInformationForm,
  [LOAN_APPLICATION_STEPS.OWNER_INFORMATION]: OwnerInformationForm,
  [LOAN_APPLICATION_STEPS.FORECASTING_SETUP]: ForecastingSetupForm,
  [LOAN_APPLICATION_STEPS.FINANCIAL_STATEMENTS]: FinancialStatementForm,
  [LOAN_APPLICATION_STEPS.REVENUE]: RevenueForm,
  [LOAN_APPLICATION_STEPS.PEOPLE]: PeopleForm,
  [LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION]: CashFlowVerificationFormV2,
  [LOAN_APPLICATION_STEPS.DIRECT_COSTS]: DirectCostsForm,
  [LOAN_APPLICATION_STEPS.FP_OPERATING_EXPENSES]: FpOperatingExpensesForm,
  [LOAN_APPLICATION_STEPS.TAX_RATES]: TaxRateForm,
  [LOAN_APPLICATION_STEPS.ASSETS]: AssetsForm,
  [LOAN_APPLICATION_STEPS.DEBT_FINANCING]: DebtFinancingForm,
  [LOAN_APPLICATION_STEPS.EQUITY]: EquityForm
}

interface IReviewStep {
  stepProgress: ILoanApplicationStep
}

/**
 * Custom hook to get the appropriate form component for a given step
 */
const useGetReviewFormByStep = (step: LOAN_APPLICATION_STEPS) => {
  return useMemo(() => {
    const Component = get(STEP_COMPONENT_MAP, step)

    return Component ? (
      <Component wrapperClassName="max-w-screen-lg md:col-span-8 md:col-start-0" />
    ) : null
  }, [step])
}

/**
 * ReviewApplicationStep component
 */
export const ReviewApplicationStep = forwardRef<HTMLDivElement, IReviewStep>(
  ({ stepProgress }: IReviewStep, ref) => {
    const componentByStep = useGetReviewFormByStep(stepProgress.step)

    if (!componentByStep) return null

    return (
      <div className="w-full h-full" ref={ref}>
        {componentByStep}
      </div>
    )
  }
)

ReviewApplicationStep.displayName = "ReviewApplicationStep"
