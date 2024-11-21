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
import {
  type ILoanRequestFormValue,
  type LoanReadyBusinessFormValue,
  type LoanReadyOwnerFormValue,
  loanRequestFormSchema
} from "@/modules/loan-application/constants/form"
import { QUERY_KEY } from "@/modules/loan-application/constants/query-key"
import { useGetFinancialProjectLoanSummary } from "@/modules/loan-application/hooks/useGetFinancialProjectLoanSummary"
import { reverseFormatLoanRequestForm } from "@/modules/loan-application/hooks/useQuery/useQueryUserLoanApplicationDetails"
import {
  reverseFormatKybForm,
  reverseFormatKycForm
} from "@/modules/loan-application/services/form.services"
import { useIsFetching } from "@tanstack/react-query"
import { isEnableFormV2 } from "@/utils/feature-flag.utils.ts"
import { adaptFormV2Metadata } from "@/modules/loan-application/services/formv2.services.ts"
import { FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { get } from "lodash"

export const useAdminFinancialProjectionApplicationDetails = () => {
  const financialApplicationForms = useGetFinancialProjectLoanSummary()

  const {
    loanSummary,
    applicationSummary,
    loanApplicationDetails,
    isFetchingSummary,
    isLoading
  } = useLoanApplicationDetailContext()

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
    loanRequest: isEnableFormV2()
      ? adaptFormV2Metadata<ILoanRequestFormValue>({
          schema: loanRequestFormSchema,
          metadata: get(
            applicationSummary?.forms?.find(
              (form) => form.formType === FORM_TYPE.LOAN_REQUEST
            ),
            "metadata",
            {}
          )
        })
      : reverseFormatLoanRequestForm(loanApplicationDetails),

    // TODO(NganPhan): Adapt the KYB and KYC form from applicationSummary
    businessInformation: loanSummary?.kybForm
      ? (reverseFormatKybForm(
          loanSummary.kybForm
        ) as LoanReadyBusinessFormValue)
      : undefined,
    ownerInformationForm: loanSummary?.kycForm
      ? (reverseFormatKycForm(loanSummary.kycForm) as LoanReadyOwnerFormValue)
      : undefined
  })

  const isFetchingBankAccounts = useIsFetching({
    queryKey: [QUERY_KEY.GET_LOAN_APPLICATION_CASHFLOW_VERIFICATION]
  })

  const isFetching = isLoading || isFetchingSummary

  return { isFetching, isFetchingBankAccounts, financialApplicationDetailData }
}
