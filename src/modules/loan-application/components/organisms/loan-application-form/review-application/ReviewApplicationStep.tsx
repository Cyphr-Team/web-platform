import {
  ILoanApplicationStep,
  LOAN_APPLICATION_STEPS
} from "@/modules/loan-application/models/LoanApplicationStep/type"
import { isEnabledBankAccountConnectionV2 } from "@/utils/feature-flag.utils"
import { forwardRef, useMemo } from "react"
import { LoanRequest } from "../../../layouts/LoanRequest"
import { BusinessInformationForm } from "../kyb/KybForm"
import { CashFlowVerificationForm } from "../cash-flow/CashFlowVerificationForm"
import { ConfirmationForm } from "../confirmation/ConfirmationForm"
import { CurrentLoansForm } from "../current-loan/CurrentLoansForm"
import { FinancialInformationForm } from "../financial-information/FinancialInformationForm"
import { IdentityVerificationForm } from "../IdentityVerificationForm"
import { OperatingExpensesForm } from "../operating-expenses/OperatingExpensesForm"
import { OwnerInformationForm } from "../kyc/KycForm"
import { CashFlowVerificationFormV2 } from "../cash-flow/CashFlowVerificationFormV2"
import { ProductServiceForm } from "../product-service/ProductServiceForm"
import { BusinessModelForm } from "../business-model/BusinessModelForm"
import { LaunchKCBusinessDocumentsForm } from "../DocumentUploadForm"
import { ExecutionForm } from "../execution/ExecutionForm"
import { LaunchKCFitForm } from "../custom-form/launchkc/launchkc-fit/LaunchKcFitForm"
import { MarketOpportunityForm } from "../market-opportunity/MarketOpportunityForm"
import { isKansasCity, isLaunchKC, isSbb } from "@/utils/domain.utils.ts"
import { LaunchKCBusinessInformationForm } from "@/modules/loan-application/components/organisms/loan-application-form/kyb/launchkc/LaunchKCBusinessInformationForm"
import { LaunchKCOwnerInformationForm } from "@/modules/loan-application/components/organisms/loan-application-form/kyc/launchkc/LaunchKCOwnerInformationForm"
import { SBBCurrentLoanForm } from "@/modules/loan-application/components/organisms/loan-application-form/current-loan/sbb/SbbCurrentLoanForm"
import { BusinessEinLetterForm } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/BusinessEinLetterForm.tsx"
import { CertificateGoodStandingForm } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/CertificateGoodStandingForm.tsx"
import { ArticlesOfOrganizationForm } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/ArticlesOfOrganizationForm.tsx"
import { FictitiousNameCertificationForm } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/FictitiousNameCertification.tsx"
import { ByLawsForm } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/ByLawsForm.tsx"
import { KansasCityOwnerInformationForm } from "../kyc/kansascity/KansasCityOwnerInformationForm"

interface IReviewStep {
  stepProgress: ILoanApplicationStep
}

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
        if (isKansasCity()) {
          return <KansasCityOwnerInformationForm />
        }
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
        return isSbb() ? <SBBCurrentLoanForm /> : <CurrentLoansForm />
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
      default:
        return null
    }
  }, [step])
}

export const ReviewApplicationStep = forwardRef<HTMLDivElement, IReviewStep>(
  ({ stepProgress }: IReviewStep, ref) => {
    const componentByStep = useGetReviewFormByStep(stepProgress.step)

    /**
     * Some forms (e.g., PreQualification) are not required to be included in the review application step.
     */
    if (!componentByStep) return null

    return (
      <div className="w-full h-full" ref={ref}>
        {componentByStep}
      </div>
    )
  }
)
