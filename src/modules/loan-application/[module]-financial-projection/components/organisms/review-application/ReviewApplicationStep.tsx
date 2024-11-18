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
import { LoanReadyBusinessInformationForm } from "@/modules/loan-application/components/organisms/loan-application-form/kyb/loanready/LoanReadyKybForm"
import { LoanReadyOwnerInformationForm } from "@/modules/loan-application/components/organisms/loan-application-form/kyb/loanready/LoanReadyKycForm"
import { LoanReadyLoanRequestForm } from "@/modules/loan-application/components/organisms/loan-application-form/loan-request/LoanReadyLoanRequestForm"
import {
  type ILoanApplicationStep,
  LOAN_APPLICATION_STEPS
} from "@/modules/loan-application/models/LoanApplicationStep/type"
import { get } from "lodash"
import { forwardRef, useMemo } from "react"
import { CashFlowVerificationFormWithPlaid } from "@/modules/loan-application/components/organisms/loan-application-form/cash-flow/CashFlowVerficiationFormWithPlaid.tsx"
import { isEnablePlaidV2 } from "@/utils/feature-flag.utils.ts"
// Define a mapping of steps to components
const getStepComponentByStep = () => ({
  [LOAN_APPLICATION_STEPS.LOAN_REQUEST]: LoanReadyLoanRequestForm,
  [LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION]:
    LoanReadyBusinessInformationForm,
  [LOAN_APPLICATION_STEPS.OWNER_INFORMATION]: LoanReadyOwnerInformationForm,
  [LOAN_APPLICATION_STEPS.FORECASTING_SETUP]: ForecastingSetupForm,
  [LOAN_APPLICATION_STEPS.FINANCIAL_STATEMENTS]: FinancialStatementForm,
  [LOAN_APPLICATION_STEPS.REVENUE]: RevenueForm,
  [LOAN_APPLICATION_STEPS.PEOPLE]: PeopleForm,
  [LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION]: isEnablePlaidV2()
    ? CashFlowVerificationFormWithPlaid
    : CashFlowVerificationFormV2,
  [LOAN_APPLICATION_STEPS.DIRECT_COSTS]: DirectCostsForm,
  [LOAN_APPLICATION_STEPS.FP_OPERATING_EXPENSES]: FpOperatingExpensesForm,
  [LOAN_APPLICATION_STEPS.TAX_RATES]: TaxRateForm,
  [LOAN_APPLICATION_STEPS.ASSETS]: AssetsForm,
  [LOAN_APPLICATION_STEPS.DEBT_FINANCING]: DebtFinancingForm,
  [LOAN_APPLICATION_STEPS.EQUITY]: EquityForm
})

interface ReviewStepProps {
  stepProgress: ILoanApplicationStep
}

/**
 * Custom hook to get the appropriate form component for a given step
 */
const useGetReviewFormByStep = (step: LOAN_APPLICATION_STEPS) => {
  return useMemo(() => {
    const STEP_COMPONENT_MAP = getStepComponentByStep()
    const Component = get(STEP_COMPONENT_MAP, step)

    return Component ? (
      <Component wrapperClassName="md:col-start-0 max-w-screen-lg md:col-span-8" />
    ) : null
  }, [step])
}

/**
 * ReviewApplicationStep component
 */
export const ReviewApplicationStep = forwardRef<
  HTMLDivElement,
  ReviewStepProps
>(({ stepProgress }: ReviewStepProps, ref) => {
  const componentByStep = useGetReviewFormByStep(stepProgress.step)

  if (!componentByStep) return null

  return (
    <div ref={ref} className="size-full">
      {componentByStep}
    </div>
  )
})

ReviewApplicationStep.displayName = "ReviewApplicationStep"
