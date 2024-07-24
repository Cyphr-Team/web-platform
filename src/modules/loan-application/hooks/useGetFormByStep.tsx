import { LaunchKCBusinessInformationForm } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/launchkc/LaunchKCBusinessInformationForm.tsx"
import { LaunchKCOwnerInformationForm } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/launchkc/LaunchKCOwnerInformationForm.tsx"
import { isLaunchKC } from "@/utils/domain.utils.ts"
import {
  isEnabledBankAccountConnectionV2,
  isEnablePandaDocESign
} from "@/utils/feature-flag.utils"
import { useMemo } from "react"
import { PreQualificationForm } from "../components/layouts/custom/launch-kc/LaunchKCPreQualification"
import { LoanRequest } from "../components/layouts/LoanRequest"
import { BusinessModelForm } from "../components/organisms/loan-application-form/business-model/BusinessModelForm"
import { BusinessInformationForm } from "../components/organisms/loan-application-form/BusinessInformationForm"
import { CashFlowVerificationForm } from "../components/organisms/loan-application-form/CashFlowVerificationForm"
import { ConfirmationForm } from "../components/organisms/loan-application-form/ConfirmationForm"
import { CurrentLoansForm } from "../components/organisms/loan-application-form/CurrentLoansForm"
import { ESignForm } from "../components/organisms/loan-application-form/ESignForm"
import { ExecutionForm } from "../components/organisms/loan-application-form/execution/ExecutionForm"
import { FinancialInformationForm } from "../components/organisms/loan-application-form/FinancialInformationForm"
import { IdentityVerificationForm } from "../components/organisms/loan-application-form/IdentityVerificationForm"
import { LaunchKCFitForm } from "../components/organisms/loan-application-form/launchkc-fit/LaunchKcFitForm"
import { MarketOpportunityForm } from "../components/organisms/loan-application-form/market-opportunity/MarketOpportunityForm"
import { OperatingExpensesForm } from "../components/organisms/loan-application-form/OperatingExpensesForm"
import { OwnerInformationForm } from "../components/organisms/loan-application-form/OwnerInformationForm"
import { ProductServiceForm } from "../components/organisms/loan-application-form/product-service/ProductServiceForm"
import { ReviewApplication } from "../components/organisms/loan-application-form/ReviewApplication"
import { CashFlowVerificationFormV2 } from "../components/organisms/loan-application-form/v2/CashFlowVerificationForm"
import { LOAN_APPLICATION_STEPS } from "../models/LoanApplicationStep/type"
import { DocumentUploadsForm } from "@/modules/loan-application/components/organisms/loan-application-form/DocumentUploadForm.tsx"
import { BusinessEinLetterForm } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/BusinessEinLetterForm.tsx"
import { ArticlesOfOrganizationForm } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/ArticlesOfOrganizationForm.tsx"
import { ByLawsForm } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/ByLawsForm.tsx"
import { FictitiousNameCertificationForm } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/FictitiousNameCertification.tsx"
import { CertificateGoodStandingForm } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/CertificateGoodStandingForm.tsx"

/**
 * Use a custom hook to prevent fast refresh on save, make development mode smoother
 * Also remember to update the ReviewApplicationStep
 */
export const useGetFormByStep = (step: LOAN_APPLICATION_STEPS) => {
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
        return isLaunchKC() ? (
          <LaunchKCOwnerInformationForm />
        ) : (
          <OwnerInformationForm />
        )
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
        if (isEnablePandaDocESign()) {
          return <ESignForm />
        } else {
          return <ConfirmationForm />
        }
      case LOAN_APPLICATION_STEPS.OPERATING_EXPENSES:
        return <OperatingExpensesForm />
      case LOAN_APPLICATION_STEPS.IDENTITY_VERIFICATION:
        return <IdentityVerificationForm />
      case LOAN_APPLICATION_STEPS.REVIEW_APPLICATION:
        return <ReviewApplication />
      case LOAN_APPLICATION_STEPS.PRODUCT_SERVICE:
        return <ProductServiceForm />
      case LOAN_APPLICATION_STEPS.MARKET_OPPORTUNITY:
        return <MarketOpportunityForm />
      case LOAN_APPLICATION_STEPS.BUSINESS_MODEL:
        return <BusinessModelForm />
      case LOAN_APPLICATION_STEPS.EXECUTION:
        return <ExecutionForm />
      case LOAN_APPLICATION_STEPS.DOCUMENT_UPLOADS:
        return <DocumentUploadsForm />
      case LOAN_APPLICATION_STEPS.LAUNCH_KC_FIT:
        return <LaunchKCFitForm />
      case LOAN_APPLICATION_STEPS.PRE_QUALIFICATION:
        return <PreQualificationForm />
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
