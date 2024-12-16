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

import {
  reverseFormatLoanRequestForm,
  useQueryLoanApplicationDetailsByType
} from "@/modules/loan-application/hooks/application/useQueryUserLoanApplicationDetails.ts"
import {
  reverseFormatKybForm,
  reverseFormatKycForm
} from "@/modules/loan-application/services/form.services"
import { LoanType } from "@/types/loan-program.type"
import { useIsFetching } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { isEnableFormV2 } from "@/utils/feature-flag.utils.ts"
import {
  reverseFormatLoanRequestFormV2,
  useQueryLoanRequestForm
} from "@/modules/loan-application/hooks/form-loan-request/useQueryLoanRequest.ts"
import { FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { type LoanReadyOwnerFormValue } from "@/modules/loan-application/constants/form.kyc.ts"
import { type LoanReadyBusinessFormValue } from "@/modules/loan-application/constants/form.kyb.ts"
import { deserializeKycFormV2 } from "@/modules/loan-application/hooks/form-kyc/useSubmitKycFormV2.ts"
import { isSbb } from "@/utils/domain.utils.ts"
import { useGetFinancialProjectForms } from "@/modules/loan-application/hooks/form-financial-projection/useGetFinancialProjectForms.ts"
import {
  useQueryGetKybForm,
  useQueryGetKybFormV2
} from "@/modules/loan-application/hooks/form-kyb/useQueryKybForm.ts"
import {
  useQueryKycForm,
  useQueryKycFormV2
} from "@/modules/loan-application/hooks/form-kyc/useQueryKycForm.ts"
import { deserializeKybFormV2 } from "@/modules/loan-application/hooks/form-kyb/useSubmitKybFormV2.ts"

export function useApplicantFinancialProjectionApplicationDetails() {
  const { id: loanApplicationId } = useParams()

  const financialApplicationForms = useGetFinancialProjectForms()

  const loanApplicationDetailsQuery = useQueryLoanApplicationDetailsByType(
    loanApplicationId!,
    LoanType.MICRO
  )

  const kybFormQuery = useQueryGetKybForm({
    applicationId: loanApplicationId!
  })
  const kybFormQueryV2 = useQueryGetKybFormV2({
    applicationId: loanApplicationId!,
    enabled: isEnableFormV2() && !isSbb() // not support sbb
  })
  const kycFormQuery = useQueryKycForm({
    applicationId: loanApplicationId!
  })
  const kycFormQueryV2 = useQueryKycFormV2({
    applicationId: loanApplicationId!,
    enabled: isEnableFormV2() && !isSbb()
  })
  const loanRequestFormQuery = useQueryLoanRequestForm({
    applicationId: loanApplicationId!,
    formTypes: [FORM_TYPE.LOAN_REQUEST]
  })

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
      ? reverseFormatLoanRequestFormV2(loanRequestFormQuery.data)
      : reverseFormatLoanRequestForm(loanApplicationDetailsQuery.data),
    businessInformation:
      isEnableFormV2() && !isSbb()
        ? kybFormQueryV2.data
          ? // TODO: bring the deserialize to transport layer
            deserializeKybFormV2(kybFormQueryV2.data)
          : undefined
        : kybFormQuery.data
          ? (reverseFormatKybForm(
              kybFormQuery.data
            ) as LoanReadyBusinessFormValue)
          : undefined,
    ownerInformationForm:
      isEnableFormV2() && !isSbb()
        ? kycFormQueryV2.data
          ? deserializeKycFormV2(kycFormQueryV2.data)
          : undefined
        : kycFormQuery.data
          ? (reverseFormatKycForm(kycFormQuery.data) as LoanReadyOwnerFormValue)
          : undefined
  })

  const isFetchingBankAccounts = useIsFetching({
    queryKey: [QUERY_KEY.GET_LOAN_APPLICATION_CASHFLOW_VERIFICATION]
  })

  const isFetching =
    loanApplicationDetailsQuery.isFetching ||
    kybFormQuery.isFetching ||
    kycFormQuery.isFetching

  return { isFetching, isFetchingBankAccounts, financialApplicationDetailData }
}
