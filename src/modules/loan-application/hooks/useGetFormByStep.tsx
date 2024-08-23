import { isKansasCity, isLaunchKC, isSbb } from "@/utils/domain.utils.ts"
import {
  isEnabledBankAccountConnectionV2,
  isEnablePandaDocESign
} from "@/utils/feature-flag.utils"
import { useMemo } from "react"
import { PreQualificationForm } from "../components/organisms/loan-application-form/pre-qualification/LaunchKCPreQualification"
import { LoanRequest } from "../components/layouts/LoanRequest"
import { BusinessModelForm } from "../components/organisms/loan-application-form/business-model/BusinessModelForm"
import { CashFlowVerificationForm } from "../components/organisms/loan-application-form/cash-flow/CashFlowVerificationForm"
import { ConfirmationForm } from "../components/organisms/loan-application-form/confirmation/ConfirmationForm"
import { CurrentLoansForm } from "../components/organisms/loan-application-form/current-loan/CurrentLoansForm"
import { ESignForm } from "../components/organisms/loan-application-form/ESignForm"
import { ExecutionForm } from "../components/organisms/loan-application-form/execution/ExecutionForm"
import { FinancialInformationForm } from "../components/organisms/loan-application-form/financial-information/FinancialInformationForm"
import { IdentityVerificationForm } from "../components/organisms/loan-application-form/IdentityVerificationForm"
import { MarketOpportunityForm } from "../components/organisms/loan-application-form/market-opportunity/MarketOpportunityForm"
import { OperatingExpensesForm } from "../components/organisms/loan-application-form/operating-expenses/OperatingExpensesForm"
import { OwnerInformationForm } from "../components/organisms/loan-application-form/kyc/KycForm"
import { ProductServiceForm } from "../components/organisms/loan-application-form/product-service/ProductServiceForm"
import { ReviewApplication } from "../components/organisms/loan-application-form/review-application/ReviewApplication"
import { CashFlowVerificationFormV2 } from "../components/organisms/loan-application-form/cash-flow/CashFlowVerificationFormV2"
import { LOAN_APPLICATION_STEPS } from "../models/LoanApplicationStep/type"
import { SBBCurrentLoanForm } from "@/modules/loan-application/components/organisms/loan-application-form/current-loan/sbb/SbbCurrentLoanForm"
import { LaunchKCBusinessDocumentsForm } from "@/modules/loan-application/components/organisms/loan-application-form/DocumentUploadForm.tsx"
import { BusinessEinLetterForm } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/BusinessEinLetterForm.tsx"
import { ArticlesOfOrganizationForm } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/ArticlesOfOrganizationForm.tsx"
import { ByLawsForm } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/ByLawsForm.tsx"
import { FictitiousNameCertificationForm } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/FictitiousNameCertification.tsx"
import { CertificateGoodStandingForm } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/CertificateGoodStandingForm.tsx"
import { LaunchKCBusinessInformationForm } from "@/modules/loan-application/components/organisms/loan-application-form/kyb/launchkc/LaunchKCBusinessInformationForm.tsx"
import { BusinessInformationForm } from "@/modules/loan-application/components/organisms/loan-application-form/kyb/KybForm.tsx"
import { LaunchKCFitForm } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/launchkc/launchkc-fit/LaunchKcFitForm.tsx"
import { LaunchKCOwnerInformationForm } from "@/modules/loan-application/components/organisms/loan-application-form/kyc/launchkc/LaunchKCOwnerInformationForm.tsx"
import { SBBKybFormPartOne } from "../components/organisms/loan-application-form/kyb/sbb/SBBKybFormPartOne"
import { SBBKybFormPartTwo } from "../components/organisms/loan-application-form/kyb/sbb/SbbKybFormPartTwo"
import { KansasCityOwnerInformationForm } from "../components/organisms/loan-application-form/kyc/kansascity/KansasCityOwnerInformationForm"
import { KansasCityBusinessInformationForm } from "../components/organisms/loan-application-form/kyb/kansascity/KansasCityBusinessInformationForm"

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
        if (isLaunchKC()) {
          return <LaunchKCBusinessInformationForm />
        }
        if (isKansasCity()) {
          return <KansasCityBusinessInformationForm />
        }
        return <BusinessInformationForm />
      case LOAN_APPLICATION_STEPS.SBB_BUSINESS_INFORMATION_PART_ONE:
        return <SBBKybFormPartOne />
      case LOAN_APPLICATION_STEPS.SBB_BUSINESS_INFORMATION_PART_TWO:
        return <SBBKybFormPartTwo />
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
        if (isSbb() && isEnablePandaDocESign()) {
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
      case LOAN_APPLICATION_STEPS.LAUNCH_KC_BUSINESS_DOCUMENTS:
        return <LaunchKCBusinessDocumentsForm />
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
