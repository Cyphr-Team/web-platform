import { isLaunchKC, isLoanReady, isSbb } from "@/utils/domain.utils.ts"
import {
  isEnablePandaDocESign,
  isEnablePlaidV2
} from "@/utils/feature-flag.utils"
import { useMemo } from "react"
import { PreQualificationForm } from "../components/organisms/loan-application-form/pre-qualification/LaunchKCPreQualification"
import { BusinessModelForm } from "../components/organisms/loan-application-form/business-model/BusinessModelForm"
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
import { SbbKycForm } from "../components/organisms/loan-application-form/kyc/sbb/SbbKycForm"
import SbbPrivacyPolicy from "../components/organisms/loan-application-form/pre-application-disclosures/SbbPrivacyPolicy"
import { SbbPatriotAct } from "../components/organisms/loan-application-form/pre-application-disclosures/SbbPatriotAct"
import { ForecastingSetupForm } from "@/modules/loan-application/[module]-financial-projection/components/organisms/ForecastingSetupForm.tsx"
import { FpOperatingExpensesForm } from "@/modules/loan-application/[module]-financial-projection/components/organisms/FpOperatingExpensesForm"
import { DisclaimerAndDisclosure } from "@/modules/loan-application/components/organisms/loan-application-form/disclaimer-disclosure/DisclaimerAndDisclosure"
import { PeopleForm } from "@/modules/loan-application/[module]-financial-projection/components/organisms/PeopleForm"
import { DirectCostsForm } from "@/modules/loan-application/[module]-financial-projection/components/organisms/DirectCostsForm"
import { EquityForm } from "@/modules/loan-application/[module]-financial-projection/components/organisms/EquityForm"
import { FinancialStatementForm } from "@/modules/loan-application/[module]-financial-projection/components/organisms/FinancialStatementForm.tsx"
import { AssetsForm } from "@/modules/loan-application/[module]-financial-projection/components/organisms/AssetsForm"
import { TaxRateForm } from "@/modules/loan-application/[module]-financial-projection/components/organisms/ExpenseTaxRateForm"
import { DebtFinancingForm } from "@/modules/loan-application/[module]-financial-projection/components/organisms/DebtFinancingForm"
import RevenueForm from "@/modules/loan-application/[module]-financial-projection/components/organisms/RevenueForm.tsx"
import { FinancialProjectionReviewApplication } from "@/modules/loan-application/[module]-financial-projection/components/organisms/review-application/FinancialProjectionReviewApplication"
import { LoanRequest } from "@/modules/loan-application/components/layouts/LoanRequest.tsx"
import { LoanReadyLoanRequestForm } from "@/modules/loan-application/components/organisms/loan-application-form/loan-request/LoanReadyLoanRequestForm.tsx"
import { LoanReadyBusinessInformationForm } from "@/modules/loan-application/components/organisms/loan-application-form/kyb/loanready/LoanReadyKybForm.tsx"
import { LoanReadyOwnerInformationForm } from "@/modules/loan-application/components/organisms/loan-application-form/kyb/loanready/LoanReadyKycForm"
import { CashFlowVerificationFormWithPlaid } from "@/modules/loan-application/components/organisms/loan-application-form/cash-flow/CashFlowVerficiationFormWithPlaid"

/**
 * Use a custom hook to prevent fast refresh on save, make development mode smoother
 * Also remember to update the ReviewApplicationStep
 */
export const useGetFormByStep = (step: LOAN_APPLICATION_STEPS) => {
  return useMemo(() => {
    switch (step) {
      case LOAN_APPLICATION_STEPS.LOAN_REQUEST:
        if (isLoanReady()) {
          return <LoanReadyLoanRequestForm />
        }

        return <LoanRequest />
      case LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION:
        if (isLaunchKC()) {
          return <LaunchKCBusinessInformationForm />
        }
        if (isLoanReady()) {
          return <LoanReadyBusinessInformationForm />
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
        if (isLoanReady()) {
          return <LoanReadyOwnerInformationForm />
        }
        if (isSbb()) {
          return <SbbKycForm />
        }

        return <OwnerInformationForm />
      case LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION:
        if (isEnablePlaidV2()) {
          return <CashFlowVerificationFormWithPlaid />
        }

        return <CashFlowVerificationFormV2 />
      case LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION:
        return <FinancialInformationForm />
      case LOAN_APPLICATION_STEPS.CURRENT_LOANS:
        return <CurrentLoansForm />
      case LOAN_APPLICATION_STEPS.CONFIRMATION:
        if ((isSbb() || isLoanReady()) && isEnablePandaDocESign()) {
          return <ESignForm />
        } else {
          return <ConfirmationForm />
        }
      case LOAN_APPLICATION_STEPS.OPERATING_EXPENSES:
        return <OperatingExpensesForm />
      case LOAN_APPLICATION_STEPS.IDENTITY_VERIFICATION:
        return <IdentityVerificationForm />
      case LOAN_APPLICATION_STEPS.REVIEW_APPLICATION:
        return isLoanReady() ? (
          <FinancialProjectionReviewApplication />
        ) : (
          <ReviewApplication />
        )
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
      case LOAN_APPLICATION_STEPS.PATRIOT_ACT:
        return <SbbPatriotAct />
      case LOAN_APPLICATION_STEPS.PRIVACY_POLICY:
        return <SbbPrivacyPolicy />
      case LOAN_APPLICATION_STEPS.DISCLAIMER_AND_DISCLOSURE:
        return <DisclaimerAndDisclosure />
      case LOAN_APPLICATION_STEPS.DIRECT_COSTS:
        return <DirectCostsForm />
      case LOAN_APPLICATION_STEPS.FORECASTING_SETUP:
        return <ForecastingSetupForm />
      case LOAN_APPLICATION_STEPS.REVENUE:
        return <RevenueForm />
      case LOAN_APPLICATION_STEPS.FP_OPERATING_EXPENSES:
        return <FpOperatingExpensesForm />
      case LOAN_APPLICATION_STEPS.PEOPLE:
        return <PeopleForm />
      case LOAN_APPLICATION_STEPS.EQUITY:
        return <EquityForm />
      case LOAN_APPLICATION_STEPS.FINANCIAL_STATEMENTS:
        return <FinancialStatementForm />
      case LOAN_APPLICATION_STEPS.ASSETS:
        return <AssetsForm />
      case LOAN_APPLICATION_STEPS.DEBT_FINANCING:
        return <DebtFinancingForm />
      case LOAN_APPLICATION_STEPS.TAX_RATES:
        return <TaxRateForm />
      default:
        return null
    }
  }, [step])
}
