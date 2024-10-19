import { FeatureKey } from "@/hooks/useCanAccess"
import { cn } from "@/lib/utils"
import { CurrentLoanFormDetails } from "@/modules/loan-application/components/organisms/loan-application-form/current-loan/CurrentLoanFormDetails"
import { OperatingExpensesFormDetails } from "@/modules/loan-application/components/organisms/loan-application-form/operating-expenses/OperatingExpenseFormDetails"
import { useBRLoanApplicationDetailsContext } from "@/modules/loan-application/providers"
import { FeatureRenderer } from "@/shared/layouts/FeatureRenderer"
import {
  isCyphrBank,
  isKccBank,
  isLaunchKC,
  isLoanReady,
  isSbb
} from "@/utils/domain.utils"
import { BusinessModelFormDetails } from "../loan-application-form/business-model/BusinessModelFormDetails"
import { LaunchKcFitFormDetails } from "../loan-application-form/custom-form/launchkc/launchkc-fit/LaunchKcFitFormDetails"
import { ExecutionFormDetails } from "../loan-application-form/execution/ExecutionFormDetails"
import { FinancialFormDetails } from "../loan-application-form/financial-information/FinancialFormDetails"
import { KybFormDetails } from "../loan-application-form/kyb/KybFormDetails"
import { KycFormDetails } from "../loan-application-form/kyc/KycFormDetails"
import { LoanRequestDetails } from "../loan-application-form/loan-request/LoanRequestDetails"
import { MarketOpportunityFormDetails } from "../loan-application-form/market-opportunity/MarketOpportunityFormDetails"
import { PreQualificationFormDetails } from "../loan-application-form/pre-qualification/PreQualificationFormDetails"
import { ProductServiceFormDetails } from "../loan-application-form/product-service/ProductServiceFormDetails"
import { CashFlowTable } from "./CashFlowTable"
import { PreApplicationDisclosuresDetails } from "../loan-application-form/pre-application-disclosures/PreApplicationDisclosuresDetails"
import { SbbKybFormDetails } from "../loan-application-form/kyb/sbb/SbbKybFormDetails"
import { SbbKycFormDetails } from "../loan-application-form/kyc/sbb/SbbKycFormDetails"

export function ApplicationDetails() {
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
          ) : isSbb() ? (
            <PreApplicationDisclosuresDetails />
          ) : (
            <LoanRequestDetails />
          )}
          {kybFormData && isSbb() ? (
            <SbbKybFormDetails kybFormData={kybFormData} />
          ) : (
            <KybFormDetails kybFormData={kybFormData} />
          )}
          {kycFormData && isSbb() ? (
            <SbbKycFormDetails kycFormData={kycFormData} />
          ) : (
            <KycFormDetails kycFormData={kycFormData} />
          )}
          {(isLoanReady() || isKccBank() || isCyphrBank() || isLaunchKC()) && (
            <CashFlowTable />
          )}
          {currentLoanFormData ? (
            <CurrentLoanFormDetails currentLoanFormData={currentLoanFormData} />
          ) : null}
          <FeatureRenderer featureKey={FeatureKey.OPERATING_EXPENSE}>
            {operatingExpensesFormData ? (
              <OperatingExpensesFormDetails
                operatingExpensesFormData={operatingExpensesFormData}
              />
            ) : null}
          </FeatureRenderer>
          {financialFormData ? (
            <FinancialFormDetails financialFormData={financialFormData} />
          ) : null}
          {productServiceFormData ? (
            <ProductServiceFormDetails data={productServiceFormData} />
          ) : null}
          {marketOpportunityFormData ? (
            <MarketOpportunityFormDetails data={marketOpportunityFormData} />
          ) : null}
          {businessModelFormData ? (
            <BusinessModelFormDetails data={businessModelFormData} />
          ) : null}
          {executionFormData ? (
            <ExecutionFormDetails data={executionFormData} />
          ) : null}
          {launchKCFitFormData ? (
            <LaunchKcFitFormDetails data={launchKCFitFormData} />
          ) : null}
        </div>
      </div>
    </div>
  )
}
