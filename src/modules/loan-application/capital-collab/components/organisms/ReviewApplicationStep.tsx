import {
  type ILoanApplicationStep,
  LOAN_APPLICATION_STEPS
} from "@/modules/loan-application/models/LoanApplicationStep/type"
import { get } from "lodash"
import { forwardRef, useMemo } from "react"
import { CashFlowVerificationFormWithPlaid } from "@/modules/loan-application/components/organisms/loan-application-form/cash-flow/CashFlowVerificationFormWithPlaid"
import { CapitalCollabBusinessInformationForm } from "@/modules/loan-application/capital-collab/components/organisms/CapitalCollabKybForm"
import { CapitalCollabOwnerInformationForm } from "@/modules/loan-application/capital-collab/components/organisms/CapitalCollabOwnerInformationForm"
import { CapitalCollabDirectCostsForm } from "@/modules/loan-application/capital-collab/components/organisms/CapitalCollabDirectCostsForm"
import { CapitalCollabOperatingExpensesForm } from "@/modules/loan-application/capital-collab/components/organisms/CapitalCollabOperatingExpensesForm"
import { CapitalCollabAssetsForm } from "@/modules/loan-application/capital-collab/components/organisms/CapitalCollabAssetsForm"
import { CapitalCollabDebtFinancingForm } from "@/modules/loan-application/capital-collab/components/organisms/CapitalCollabDebtFinancingForm"
import { LoanRequest } from "@/modules/loan-application/components/layouts/LoanRequest"
// Define a mapping of steps to components
const STEP_COMPONENT_MAP = {
  [LOAN_APPLICATION_STEPS.LOAN_REQUEST]: LoanRequest,
  [LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION]:
    CapitalCollabBusinessInformationForm,
  [LOAN_APPLICATION_STEPS.OWNER_INFORMATION]: CapitalCollabOwnerInformationForm,
  [LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION]:
    CashFlowVerificationFormWithPlaid,
  [LOAN_APPLICATION_STEPS.DIRECT_COSTS]: CapitalCollabDirectCostsForm,
  [LOAN_APPLICATION_STEPS.FP_OPERATING_EXPENSES]:
    CapitalCollabOperatingExpensesForm,
  [LOAN_APPLICATION_STEPS.ASSETS]: CapitalCollabAssetsForm,
  [LOAN_APPLICATION_STEPS.DEBT_FINANCING]: CapitalCollabDebtFinancingForm
}

interface ReviewStepProps {
  stepProgress: ILoanApplicationStep
}

/**
 * Custom hook to get the appropriate form component for a given step
 */
const useGetReviewFormByStep = (step: LOAN_APPLICATION_STEPS) => {
  return useMemo(() => {
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

ReviewApplicationStep.displayName = "CapitalCollabReviewApplicationStep"
