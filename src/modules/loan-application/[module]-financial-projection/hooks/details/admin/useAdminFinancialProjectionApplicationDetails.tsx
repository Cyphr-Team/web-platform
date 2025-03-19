import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { reverseFormatAssetsForm } from "@/modules/loan-application/[module]-financial-projection/hooks/assets/useSubmitAssetsForm"
import { reverseFormatDebtFinancingForm } from "@/modules/loan-application/[module]-financial-projection/hooks/assets/useSubmitDebtFinancingForm"
import { useFinancialApplicationDetail } from "@/modules/loan-application/[module]-financial-projection/hooks/details"
import { reverseFormatDirectCostsForm } from "@/modules/loan-application/[module]-financial-projection/hooks/direct-costs/useSubmitDirectCostsForm"
import { reverseFormatEquityFinancingForm } from "@/modules/loan-application/[module]-financial-projection/hooks/equity-financing/useSubmitEquityFinancingForm"
import { reverseFormatFinancialStatementForm } from "@/modules/loan-application/[module]-financial-projection/hooks/financial-statement/useSubmitFinancialStatementForm"
import { formatForecastSetupResult } from "@/modules/loan-application/[module]-financial-projection/hooks/forecasting-setup/useQueryForecastingSetup"
import { reverseFormatFpOperatingExpensesForm } from "@/modules/loan-application/[module]-financial-projection/hooks/operating-expenses/useSubmitOperatingExpensesForm"
import { reverseFormatRevenueResponse } from "@/modules/loan-application/[module]-financial-projection/hooks/revenue/useQueryRevenueForm"
import { reverseFormatExpenseTaxRateForm } from "@/modules/loan-application/[module]-financial-projection/hooks/tax-rate/useSubmitTaxRateForm"
import { reverseFormatExpensePeopleForm } from "@/modules/loan-application/[module]-financial-projection/services/form.services"
import { QUERY_KEY } from "@/modules/loan-application/constants/query-key"
import { useGetFinancialProjectLoanSummary } from "@/modules/loan-application/hooks/form-financial-projection/useGetFinancialProjectLoanSummary.ts"
import { reverseFormatLoanRequestForm } from "@/modules/loan-application/hooks/application/useQueryUserLoanApplicationDetails.ts"
import {
  reverseFormatKybForm,
  reverseFormatKycForm
} from "@/modules/loan-application/services/form.services"
import { useIsFetching } from "@tanstack/react-query"
import { isEnableFormV2 } from "@/utils/feature-flag.utils.ts"
import {
  adaptFormV2Metadata,
  findSingularFormData,
  findSingularFormMetadata,
  preFormatBusinessInformationForm,
  preFormatOwnerInformationForm
} from "@/modules/loan-application/services/formv2.services.ts"
import { FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import {
  loanReadyOwnerFormSchema,
  type LoanReadyOwnerFormValue
} from "@/modules/loan-application/constants/form.kyc.ts"
import {
  loanReadyBusinessFormSchema,
  type LoanReadyBusinessFormValue
} from "@/modules/loan-application/constants/form.kyb.ts"
import {
  loanReadyLoanRequestFormSchema,
  type LoanReadyLoanRequestFormValue
} from "@/modules/loan-application/constants/form-v2.ts"
import { get } from "lodash"
import type {
  IBusinessFormValue,
  IOwnerFormValue
} from "@/modules/loan-application/constants/form.ts"

export const useAdminFinancialProjectionApplicationDetails = () => {
  const financialApplicationForms = useGetFinancialProjectLoanSummary()

  const {
    loanSummary,
    applicationSummary,
    loanApplicationDetails,
    isFetchingSummary,
    isLoading
  } = useLoanApplicationDetailContext()

  // region Form V2
  const isEnabledFormV2 = isEnableFormV2()

  const adaptedLoanRequestFormMetadata =
    isEnabledFormV2 && applicationSummary?.forms
      ? adaptFormV2Metadata<LoanReadyLoanRequestFormValue>({
          schema: loanReadyLoanRequestFormSchema,
          metadata: findSingularFormMetadata(
            FORM_TYPE.LOAN_REQUEST,
            applicationSummary
          ),
          additionalFields: {
            applicationId: applicationSummary?.applicationId
          }
        })
      : undefined

  const kybFormData =
    isEnabledFormV2 && applicationSummary?.forms
      ? findSingularFormData(FORM_TYPE.KYB, applicationSummary)
      : undefined
  const kybFormMetadata = kybFormData
    ? findSingularFormMetadata(FORM_TYPE.KYB, applicationSummary)
    : undefined

  const adaptedKybFormMetadata = kybFormMetadata
    ? adaptFormV2Metadata<IBusinessFormValue>({
        schema: loanReadyBusinessFormSchema,
        metadata: kybFormMetadata,
        preFormat: () => preFormatBusinessInformationForm(kybFormMetadata),
        additionalFields: {
          id: get(kybFormData, "forms[0].id", "")
        }
      })
    : undefined

  const kycFormData =
    isEnabledFormV2 && applicationSummary?.forms
      ? findSingularFormData(FORM_TYPE.KYC, applicationSummary)
      : undefined

  const kycFormMetadata = kycFormData
    ? findSingularFormMetadata(FORM_TYPE.KYC, applicationSummary)
    : undefined

  const adaptedKycFormMetadata = kycFormMetadata
    ? adaptFormV2Metadata<IOwnerFormValue>({
        schema: loanReadyOwnerFormSchema,
        metadata: kycFormMetadata,
        preFormat: () => preFormatOwnerInformationForm(kycFormMetadata),
        additionalFields: {
          id: get(kycFormData, "forms[0].id", "")
        }
      })
    : undefined

  // endregion

  const { financialApplicationDetailData } = useFinancialApplicationDetail({
    fpForm: {
      forecastingSetup: formatForecastSetupResult(
        financialApplicationForms.forecastingSetupQuery.data
      ),
      financialStatements: financialApplicationForms.financialStatementQuery
        .data
        ? reverseFormatFinancialStatementForm(
            financialApplicationForms.financialStatementQuery.data
          )
        : undefined,
      people: financialApplicationForms.expensePeopleFormQuery.data
        ? reverseFormatExpensePeopleForm(
            financialApplicationForms.expensePeopleFormQuery.data
          )
        : undefined,
      directCosts: financialApplicationForms.directCostsQuery.data
        ? reverseFormatDirectCostsForm(
            financialApplicationForms.directCostsQuery.data
          )
        : undefined,
      fpOperatingExpenses: financialApplicationForms
        .fpOperatingExpensesFormQuery.data
        ? reverseFormatFpOperatingExpensesForm(
            financialApplicationForms.fpOperatingExpensesFormQuery.data
          )
        : undefined,
      taxRates: financialApplicationForms.fpExpenseTaxRateFormQuery.data
        ? reverseFormatExpenseTaxRateForm(
            financialApplicationForms.fpExpenseTaxRateFormQuery.data
          )
        : undefined,
      assets:
        financialApplicationForms.fpAssetsCurrentFormQuery.data &&
        financialApplicationForms.fpAssetsLongTermFormQuery.data
          ? reverseFormatAssetsForm(
              financialApplicationForms.fpAssetsCurrentFormQuery.data,
              financialApplicationForms.fpAssetsLongTermFormQuery.data
            )
          : undefined,
      debtFinancing: reverseFormatDebtFinancingForm({
        debtFinancingResponse:
          financialApplicationForms.debtFinancingFormQuery.data,
        debtFinancingLiabilityResponse:
          financialApplicationForms.debtFinancingLiabilityFormQuery.data
      }),
      equity: financialApplicationForms.fpEquityFinancingFormQuery.data
        ? reverseFormatEquityFinancingForm(
            financialApplicationForms.fpEquityFinancingFormQuery.data
          )
        : undefined,
      revenue: reverseFormatRevenueResponse(
        financialApplicationForms.revenueFormQuery.data
      )
    },
    loanRequest:
      isEnableFormV2() && adaptedLoanRequestFormMetadata
        ? adaptedLoanRequestFormMetadata
        : reverseFormatLoanRequestForm(loanApplicationDetails),

    businessInformation:
      isEnabledFormV2 && adaptedKybFormMetadata
        ? adaptedKybFormMetadata
        : loanSummary?.kybForm
          ? (reverseFormatKybForm(
              loanSummary.kybForm
            ) as LoanReadyBusinessFormValue)
          : undefined,

    ownerInformationForm:
      isEnabledFormV2 && adaptedKycFormMetadata
        ? adaptedKycFormMetadata
        : loanSummary?.kycForm
          ? (reverseFormatKycForm(
              loanSummary.kycForm
            ) as LoanReadyOwnerFormValue)
          : undefined
  })

  const isFetchingBankAccounts = useIsFetching({
    queryKey: [QUERY_KEY.GET_LOAN_APPLICATION_CASHFLOW_VERIFICATION]
  })

  const isFetching = isLoading || isFetchingSummary

  return { isFetching, isFetchingBankAccounts, financialApplicationDetailData }
}
