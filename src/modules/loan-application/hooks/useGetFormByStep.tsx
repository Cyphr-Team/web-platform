import { useMemo } from "react"
import { LoanRequest } from "../components/layouts/LoanRequest"
import { BusinessInformationForm } from "../components/organisms/loan-application-form/BusinessInformationForm"
import { CashFlowVerificationForm } from "../components/organisms/loan-application-form/CashFlowVerificationForm"
import { CashFlowVerificationFormV2 } from "../components/organisms/loan-application-form/v2/CashFlowVerificationForm"
import { ConfirmationForm } from "../components/organisms/loan-application-form/ConfirmationForm"
import { CurrentLoansForm } from "../components/organisms/loan-application-form/CurrentLoansForm"
import { FinancialInformationForm } from "../components/organisms/loan-application-form/FinancialInformationForm"
import { IdentityVerificationForm } from "../components/organisms/loan-application-form/IdentityVerificationForm"
import { OperatingExpensesForm } from "../components/organisms/loan-application-form/OperatingExpensesForm"
import { OwnerInformationForm } from "../components/organisms/loan-application-form/OwnerInformationForm"
import { LOAN_APPLICATION_STEPS } from "../models/LoanApplicationStep/type"
import { ReviewApplication } from "../components/organisms/loan-application-form/ReviewApplication"
import { isEnabledBankAccountConnectionV2 } from "@/utils/feature-flag.utils"
import { ProductServiceForm } from "../components/organisms/loan-application-form/product-service/ProductServiceForm"
import { MarketOpportunityForm } from "../components/organisms/loan-application-form/market-opportunity/MarketOpportunityForm"
import { BusinessModelForm } from "../components/organisms/loan-application-form/business-model/BusinessModelForm"
import { ExecutionForm } from "../components/organisms/loan-application-form/execution/ExecutionForm"
import { DocumentUploadsForm } from "../components/organisms/loan-application-form/DocumentUploadForm"
import { LaunchKCFitForm } from "../components/organisms/loan-application-form/launchkc-fit/LaunchKcFitForm"
import { PreQualificationForm } from "../components/layouts/custom/launch-kc/LaunchKCPreQualification"

/**
 * Use a custom hook to prevent fast refresh on save, make development mode smoother
 * Also remember to update the ReviewApplicationStep
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
      default:
        return null
    }
  }, [step])

  return componentStep
}
