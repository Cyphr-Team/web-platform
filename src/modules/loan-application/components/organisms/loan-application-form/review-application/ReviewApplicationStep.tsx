import {
  type ILoanApplicationStep,
  LOAN_APPLICATION_STEPS
} from "@/modules/loan-application/models/LoanApplicationStep/type"
import { isEnableFormV2 } from "@/utils/feature-flag.utils"
import { forwardRef, useMemo } from "react"
import { LoanRequest } from "../../../layouts/LoanRequest"
import { BusinessInformationForm } from "../kyb/KybForm"
import { ConfirmationForm } from "../confirmation/ConfirmationForm"
import { CurrentLoansForm } from "../current-loan/CurrentLoansForm"
import { FinancialInformationForm } from "../financial-information/FinancialInformationForm"
import { IdentityVerificationForm } from "../IdentityVerificationForm"
import { OperatingExpensesForm } from "../operating-expenses/OperatingExpensesForm"
import { OwnerInformationForm } from "../kyc/KycForm"
import { ProductServiceForm } from "../product-service/ProductServiceForm"
import { BusinessModelForm } from "../business-model/BusinessModelForm"
import { LaunchKCBusinessDocumentsForm } from "../DocumentUploadForm"
import { ExecutionForm } from "../execution/ExecutionForm"
import { LaunchKCFitForm } from "../custom-form/launchkc/launchkc-fit/LaunchKcFitForm"
import { MarketOpportunityForm } from "../market-opportunity/MarketOpportunityForm"
import { isLaunchKC, isSbb } from "@/utils/domain.utils.ts"
import { LaunchKCBusinessInformationForm } from "@/modules/loan-application/components/organisms/loan-application-form/kyb/launchkc/LaunchKCBusinessInformationForm"
import { LaunchKCOwnerInformationForm } from "@/modules/loan-application/components/organisms/loan-application-form/kyc/launchkc/LaunchKCOwnerInformationForm"
import { BusinessEinLetterForm } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/BusinessEinLetterForm.tsx"
import { CertificateGoodStandingForm } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/CertificateGoodStandingForm.tsx"
import { ArticlesOfOrganizationForm } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/ArticlesOfOrganizationForm.tsx"
import { FictitiousNameCertificationForm } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/FictitiousNameCertification.tsx"
import { ByLawsForm } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/ByLawsForm.tsx"
import { SBBKybFormPartOne } from "../kyb/sbb/SBBKybFormPartOne"
import { SBBKybFormPartTwo } from "../kyb/sbb/SbbKybFormPartTwo"
import { SbbKycForm } from "../kyc/sbb/SbbKycForm"
import { CashFlowVerificationFormWithPlaid } from "@/modules/loan-application/components/organisms/loan-application-form/cash-flow/CashFlowVerficiationFormWithPlaid"
import { ForecastingSetupForm } from "@/modules/loan-application/[module]-financial-projection/components/organisms/ForecastingSetupForm.tsx"
import { CurrentLoanFormV2 } from "@/modules/loan-application/components/organisms/loan-application-form/current-loan/CurrentLoanFormV2.tsx"

/**
 * Use a custom hook to prevent fast refresh on save, make development mode smoother
 * This hook doesn't include the review component, so it won't make an infinity loop
 */
export const useGetReviewFormByStep = (step: LOAN_APPLICATION_STEPS) => {
  return useMemo(() => {
    switch (step) {
      case LOAN_APPLICATION_STEPS.LOAN_REQUEST:
        return <LoanRequest />
      case LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION:
        return isLaunchKC() ? (
          <LaunchKCBusinessInformationForm />
        ) : (
          <BusinessInformationForm />
        )
      case LOAN_APPLICATION_STEPS.OWNER_INFORMATION:
        if (isLaunchKC()) {
          return <LaunchKCOwnerInformationForm />
        }
        if (isSbb()) {
          return <SbbKycForm />
        }

        return <OwnerInformationForm />
      case LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION:
        return <CashFlowVerificationFormWithPlaid />
      case LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION:
        return <FinancialInformationForm />
      case LOAN_APPLICATION_STEPS.CURRENT_LOANS:
        if (isEnableFormV2()) {
          return <CurrentLoanFormV2 />
        }

        return <CurrentLoansForm />
      case LOAN_APPLICATION_STEPS.CONFIRMATION:
        return <ConfirmationForm />
      case LOAN_APPLICATION_STEPS.OPERATING_EXPENSES:
        return <OperatingExpensesForm />
      case LOAN_APPLICATION_STEPS.IDENTITY_VERIFICATION:
        return <IdentityVerificationForm />
      case LOAN_APPLICATION_STEPS.PRODUCT_SERVICE:
        return <ProductServiceForm />
      case LOAN_APPLICATION_STEPS.MARKET_OPPORTUNITY:
        return <MarketOpportunityForm />
      case LOAN_APPLICATION_STEPS.BUSINESS_MODEL:
        return <BusinessModelForm />
      case LOAN_APPLICATION_STEPS.EXECUTION:
        return <ExecutionForm />
      case LOAN_APPLICATION_STEPS.LAUNCH_KC_BUSINESS_DOCUMENTS:
        return <LaunchKCBusinessDocumentsForm />
      case LOAN_APPLICATION_STEPS.LAUNCH_KC_FIT:
        return <LaunchKCFitForm />
      case LOAN_APPLICATION_STEPS.BUSINESS_EIN_LETTER:
        return <BusinessEinLetterForm />
      case LOAN_APPLICATION_STEPS.CERTIFICATE_GOOD_STANDING:
        return <CertificateGoodStandingForm />
      case LOAN_APPLICATION_STEPS.ARTICLES_OF_ORGANIZATION:
        return <ArticlesOfOrganizationForm />
      case LOAN_APPLICATION_STEPS.FICTITIOUS_NAME_CERTIFICATION:
        return <FictitiousNameCertificationForm />
      case LOAN_APPLICATION_STEPS.BY_LAWS:
        return <ByLawsForm />
      case LOAN_APPLICATION_STEPS.SBB_BUSINESS_INFORMATION_PART_ONE:
        return <SBBKybFormPartOne />
      case LOAN_APPLICATION_STEPS.SBB_BUSINESS_INFORMATION_PART_TWO:
        return <SBBKybFormPartTwo />
      case LOAN_APPLICATION_STEPS.FORECASTING_SETUP:
        return <ForecastingSetupForm />
      default:
        return null
    }
  }, [step])
}

interface ReviewStepProps {
  stepProgress: ILoanApplicationStep
}

export const ReviewApplicationStep = forwardRef<
  HTMLDivElement,
  ReviewStepProps
>(({ stepProgress }: ReviewStepProps, ref) => {
  const componentByStep = useGetReviewFormByStep(stepProgress.step)

  /**
   * Some forms (e.g., PreQualification) are not required to be included in the review application step.
   */
  if (!componentByStep) return null

  return (
    <div ref={ref} className="size-full">
      {componentByStep}
    </div>
  )
})

ReviewApplicationStep.displayName = "ReviewApplicationStep"
