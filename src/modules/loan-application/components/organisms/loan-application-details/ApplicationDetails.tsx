import { FinancialFormDetails } from "../loan-application-form/financial-information/FinancialFormDetails"
import { KybFormDetails } from "../loan-application-form/kyb/KybFormDetails"
import { KycFormDetails } from "../loan-application-form/kyc/KycFormDetails"
import { LoanRequestDetails } from "../loan-application-form/loan-request/LoanRequestDetails"
import { CashFlowTable } from "./CashFlowTable"
import {
  isCyphrBank,
  isKccBank,
  isLaunchKC,
  isLoanReady,
  isSbb
} from "@/utils/domain.utils"
import { cn } from "@/lib/utils"
import { useBRLoanApplicationDetailsContext } from "@/modules/loan-application/providers"
import { CurrentLoanFormDetails } from "@/modules/loan-application/components/organisms/loan-application-form/current-loan/CurrentLoanFormDetails"
import { OperatingExpensesFormDetails } from "@/modules/loan-application/components/organisms/loan-application-form/operating-expenses/OperatingExpenseFormDetails"
import { ProductServiceFormDetails } from "../loan-application-form/product-service/ProductServiceFormDetails"
import { MarketOpportunityFormDetails } from "../loan-application-form/market-opportunity/MarketOpportunityFormDetails"
import { BusinessModelFormDetails } from "../loan-application-form/business-model/BusinessModelFormDetails"
import { ExecutionFormDetails } from "../loan-application-form/execution/ExecutionFormDetails"
import { PreQualificationFormDetails } from "../loan-application-form/pre-qualification/PreQualificationFormDetails"
import { FeatureRenderer } from "@/shared/layouts/FeatureRenderer"
import { FeatureKey } from "@/hooks/useCanAccess"
import { LaunchKcFitFormDetails } from "../loan-application-form/custom-form/launchkc/launchkc-fit/LaunchKcFitFormDetails"

export const ApplicationDetails = () => {
  const {
    kybFormData,
    kycFormData,
    currentLoanFormData,
    financialFormData,
    operatingExpensesFormData,
    productServiceFormData,
    launchKCFitFormData,
    executionFormData,
    businessModelFormData,
    marketOpportunityFormData,
    preQualificationFormData
  } = useBRLoanApplicationDetailsContext()

  return (
    <div className={cn("flex flex-col gap-2", "md:grid md:grid-cols-4")}>
      <div className="col-span-1">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-semibold">Application</h3>
        </div>
      </div>
      <div className="col-span-3 max-w-screen-sm">
        <div className="flex flex-col gap-4">
          {isLaunchKC() ? (
            <PreQualificationFormDetails data={preQualificationFormData} />
          ) : (
            <LoanRequestDetails />
          )}
          {kybFormData && <KybFormDetails kybFormData={kybFormData} />}
          {kycFormData && <KycFormDetails kycFormData={kycFormData} />}
          {(isLoanReady() ||
            isKccBank() ||
            isCyphrBank() ||
            isSbb() ||
            isLaunchKC()) && <CashFlowTable />}
          {currentLoanFormData && (
            <CurrentLoanFormDetails currentLoanFormData={currentLoanFormData} />
          )}
          <FeatureRenderer featureKey={FeatureKey.OPERATING_EXPENSE}>
            {operatingExpensesFormData && (
              <OperatingExpensesFormDetails
                operatingExpensesFormData={operatingExpensesFormData}
              />
            )}
          </FeatureRenderer>
          {financialFormData && (
            <FinancialFormDetails financialFormData={financialFormData} />
          )}
          {productServiceFormData && (
            <ProductServiceFormDetails data={productServiceFormData} />
          )}
          {marketOpportunityFormData && (
            <MarketOpportunityFormDetails data={marketOpportunityFormData} />
          )}
          {businessModelFormData && (
            <BusinessModelFormDetails data={businessModelFormData} />
          )}
          {executionFormData && (
            <ExecutionFormDetails data={executionFormData} />
          )}
          {launchKCFitFormData && (
            <LaunchKcFitFormDetails data={launchKCFitFormData} />
          )}
        </div>
      </div>
    </div>
  )
}
