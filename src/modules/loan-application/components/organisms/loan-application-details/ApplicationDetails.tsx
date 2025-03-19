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
import { useParams } from "react-router-dom"
import { useQueryGetKybFormV2 } from "@/modules/loan-application/hooks/form-kyb/useQueryKybForm.ts"
import { isEnableFormV2 } from "@/utils/feature-flag.utils.ts"
import { useQueryKycFormV2 } from "@/modules/loan-application/hooks/form-kyc/useQueryKycForm.ts"
import { Loader2 } from "lucide-react"
import { type FormV2Data } from "@/modules/loan-application/types/form.v2.ts"
import {
  type KYBInformationResponse,
  type KYCInformationResponse
} from "@/modules/loan-application/constants/type.ts"
import { deserializeKybFormV2 } from "@/modules/loan-application/hooks/form-kyb/useSubmitKybFormV2.ts"
import { deserializeKycFormV2 } from "@/modules/loan-application/hooks/form-kyc/useSubmitKycFormV2.ts"

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

  const { id: applicationId } = useParams()

  const kybFormV2 = useQueryGetKybFormV2({
    applicationId: applicationId!,
    enabled: isEnableFormV2()
  })

  const kycFormV2 = useQueryKycFormV2({
    applicationId: applicationId!,
    enabled: isEnableFormV2()
  })

  const isLoading = kybFormV2.isLoading && kycFormV2.isLoading

  if (isEnableFormV2() && isLoading) {
    return (
      <div className="flex size-full items-center justify-center">
        <Loader2 className="m-2 size-8 animate-spin text-primary transition-all ease-out" />
      </div>
    )
  }

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
            // TODO: Create an abstraction for KYB/KYC detail review because it's just key-value data showed on screen
            <KybFormDetails
              kybFormData={
                kybFormData ?? toKYBInformationResponse(kybFormV2.data)
              }
            />
          )}
          {kycFormData && isSbb() ? (
            <SbbKycFormDetails kycFormData={kycFormData} />
          ) : (
            // TODO: Create an abstraction for KYB/KYC detail review because it's just key-value data showed on screen
            <KycFormDetails
              kycFormData={
                kycFormData ?? toKYCInformationResponse(kycFormV2.data)
              }
            />
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

// TODO: remove this in the future and use adaptFormV2 instead
function toKYBInformationResponse(
  rawValue?: FormV2Data
): KYBInformationResponse {
  const data = deserializeKybFormV2(rawValue)

  return {
    businessLegalName: data?.businessLegalName,
    businessStreetAddress: {
      addressLine1: data?.addressLine1,
      addressLine2: data?.addressLine2 ?? "",
      city: data?.city,
      state: data?.state,
      postalCode: data?.postalCode
    },
    businessTin: data?.businessTin,
    businessWebsite: data?.businessWebsite ?? "",
    metadata: {
      ...data
    },
    id: "",
    loanApplicationId: "",
    updatedAt: "",
    createdAt: ""
  }
}

// TODO: remove this in the future and use adaptFormV2 instead
function toKYCInformationResponse(
  rawValue?: FormV2Data
): KYCInformationResponse {
  const data = deserializeKycFormV2(rawValue)

  return {
    addressLine1: data.addressLine1,
    addressLine2: data.addressLine2 ?? "",
    businessCity: data.businessCity,
    businessOwnershipPercentage: parseInt(data.businessOwnershipPercentage),
    businessRole: data.businessRole,
    businessState: data.businessState,
    businessZipCode: data.businessZipCode,
    dateOfBirth: data.dateOfBirth,
    email: data.email,
    fullName: data.fullName,
    phoneNumber: data.phoneNumber,
    socialSecurityNumber: data.socialSecurityNumber,
    metadata: {
      ...data
    },
    id: "",
    updatedAt: "",
    createdAt: "",
    loanApplicationId: ""
  }
}
