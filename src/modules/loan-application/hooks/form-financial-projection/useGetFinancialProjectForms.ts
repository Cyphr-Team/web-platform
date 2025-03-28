import {
  useQueryGetCurrentAssetsForm,
  useQueryGetLongTermAssetsForm
} from "@/modules/loan-application/[module]-financial-projection/hooks/assets/useQueryGetAssetsForm.ts"
import {
  useQueryGetDebtFinancingForm,
  useQueryGetDebtFinancingLiabilityForm
} from "@/modules/loan-application/[module]-financial-projection/hooks/assets/useQueryGetDebtFinancing.ts"
import { reverseFormatAssetsForm } from "@/modules/loan-application/[module]-financial-projection/hooks/assets/useSubmitAssetsForm.ts"
import { reverseFormatDebtFinancingForm } from "@/modules/loan-application/[module]-financial-projection/hooks/assets/useSubmitDebtFinancingForm.ts"
import { useQueryGetDirectCostsForm } from "@/modules/loan-application/[module]-financial-projection/hooks/direct-costs/useQueryGetDirectCostsForm.ts"
import { reverseFormatDirectCostsForm } from "@/modules/loan-application/[module]-financial-projection/hooks/direct-costs/useSubmitDirectCostsForm.ts"
import { useQueryGetEquityFinancingForm } from "@/modules/loan-application/[module]-financial-projection/hooks/equity-financing/useQueryGetEquityFinancingForm.ts"
import { reverseFormatEquityFinancingForm } from "@/modules/loan-application/[module]-financial-projection/hooks/equity-financing/useSubmitEquityFinancingForm.ts"
import { useQueryGetExpensePeopleForm } from "@/modules/loan-application/[module]-financial-projection/hooks/expense-people/useQueryGetExpensePeopleForm.ts"
import { useQueryGetFpOperatingExpensesForm } from "@/modules/loan-application/[module]-financial-projection/hooks/operating-expenses/useQueryGetFpOperatingExpensesForm.ts"
import { reverseFormatFpOperatingExpensesForm } from "@/modules/loan-application/[module]-financial-projection/hooks/operating-expenses/useSubmitOperatingExpensesForm.ts"
import { useQueryGetTaxRateForm } from "@/modules/loan-application/[module]-financial-projection/hooks/tax-rate/useQueryGetTaxRateForm.ts"
import { reverseFormatExpenseTaxRateForm } from "@/modules/loan-application/[module]-financial-projection/hooks/tax-rate/useSubmitTaxRateForm.ts"
import { reverseFormatExpensePeopleForm } from "@/modules/loan-application/[module]-financial-projection/services/form.services.ts"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import {
  FORM_ACTION,
  type FormStateType
} from "@/modules/loan-application/providers/LoanApplicationFormProvider.tsx"
import { LoanProgressAction } from "@/modules/loan-application/providers/LoanProgressProvider.tsx"
import { useCallback, useEffect } from "react"
import { useParams } from "react-router-dom"
import {
  reverseFormatRevenueResponse,
  useQueryRevenueForm
} from "@/modules/loan-application/[module]-financial-projection/hooks/revenue/useQueryRevenueForm.ts"
import { useQueryGetFinancialStatementForm } from "@/modules/loan-application/[module]-financial-projection/hooks/financial-statement/useQueryGetFinancialStatementForm.ts"
import { reverseFormatFinancialStatementForm } from "@/modules/loan-application/[module]-financial-projection/hooks/financial-statement/useSubmitFinancialStatementForm.ts"
import {
  formatForecastSetupResult,
  useQueryForecastingSetup
} from "@/modules/loan-application/[module]-financial-projection/hooks/forecasting-setup/useQueryForecastingSetup.ts"
import { isLoanReady } from "@/utils/domain.utils"

export const useGetFinancialProjectForms = () => {
  /**
   * Financial Projection Forms
   **/
  const { id: loanApplicationId } = useParams()

  const { dispatchProgress, isInitialized, progress } =
    useLoanApplicationProgressContext()

  const { dispatchFormAction } = useLoanApplicationFormContext()

  const isEnabledQuery = (step: LOAN_APPLICATION_STEPS) =>
    progress.map((item) => item.step).includes(step)

  const changeDataAndProgress = useCallback(
    (data: FormStateType, progress: LOAN_APPLICATION_STEPS, isDone = true) => {
      if (isDone) {
        dispatchProgress({
          type: LoanProgressAction.ChangeProgress,
          progress
        })
      }
      dispatchFormAction({
        action: FORM_ACTION.SET_DATA,
        key: progress,
        state: data
      })
    },
    [dispatchProgress, dispatchFormAction]
  )

  // Financial Statement Form
  const financialStatementQuery = useQueryGetFinancialStatementForm({
    applicationId: loanApplicationId!,
    enabled:
      isLoanReady() &&
      isEnabledQuery(LOAN_APPLICATION_STEPS.FINANCIAL_STATEMENTS)
  })

  useEffect(() => {
    if (financialStatementQuery.data && isInitialized) {
      changeDataAndProgress(
        reverseFormatFinancialStatementForm(financialStatementQuery.data),
        LOAN_APPLICATION_STEPS.FINANCIAL_STATEMENTS
      )
    }
  }, [changeDataAndProgress, financialStatementQuery.data, isInitialized])

  // Expense People Form
  const expensePeopleFormQuery = useQueryGetExpensePeopleForm({
    applicationId: loanApplicationId!,
    enabled: isLoanReady() && isEnabledQuery(LOAN_APPLICATION_STEPS.PEOPLE)
  })

  useEffect(() => {
    if (expensePeopleFormQuery.data && isInitialized) {
      changeDataAndProgress(
        reverseFormatExpensePeopleForm(expensePeopleFormQuery.data),
        LOAN_APPLICATION_STEPS.PEOPLE
      )
    }
  }, [changeDataAndProgress, expensePeopleFormQuery.data, isInitialized])

  // Operating Expenses Form
  const fpOperatingExpensesFormQuery = useQueryGetFpOperatingExpensesForm({
    applicationId: loanApplicationId!,
    enabled:
      isLoanReady() &&
      isEnabledQuery(LOAN_APPLICATION_STEPS.FP_OPERATING_EXPENSES)
  })

  useEffect(() => {
    if (fpOperatingExpensesFormQuery.data && isInitialized) {
      changeDataAndProgress(
        reverseFormatFpOperatingExpensesForm(fpOperatingExpensesFormQuery.data),
        LOAN_APPLICATION_STEPS.FP_OPERATING_EXPENSES
      )
    }
  }, [changeDataAndProgress, fpOperatingExpensesFormQuery.data, isInitialized])

  // Direct Costs Form
  const directCostsQuery = useQueryGetDirectCostsForm({
    applicationId: loanApplicationId!,
    enabled:
      isLoanReady() && isEnabledQuery(LOAN_APPLICATION_STEPS.DIRECT_COSTS)
  })

  useEffect(() => {
    if (directCostsQuery.data && isInitialized) {
      changeDataAndProgress(
        reverseFormatDirectCostsForm(directCostsQuery.data),
        LOAN_APPLICATION_STEPS.DIRECT_COSTS
      )
    }
  }, [changeDataAndProgress, directCostsQuery.data, isInitialized])

  // Equity Financing Form
  const fpEquityFinancingFormQuery = useQueryGetEquityFinancingForm({
    applicationId: loanApplicationId!,
    enabled: isLoanReady() && isEnabledQuery(LOAN_APPLICATION_STEPS.EQUITY)
  })

  useEffect(() => {
    if (fpEquityFinancingFormQuery.data && isInitialized) {
      changeDataAndProgress(
        reverseFormatEquityFinancingForm(fpEquityFinancingFormQuery.data),
        LOAN_APPLICATION_STEPS.EQUITY
      )
    }
  }, [changeDataAndProgress, fpEquityFinancingFormQuery.data, isInitialized])

  // Assets Form (Current & Long-Term)
  const fpAssetsCurrentFormQuery = useQueryGetCurrentAssetsForm({
    applicationId: loanApplicationId!,
    enabled: isLoanReady() && isEnabledQuery(LOAN_APPLICATION_STEPS.ASSETS)
  })
  const fpAssetsLongTermFormQuery = useQueryGetLongTermAssetsForm({
    applicationId: loanApplicationId!,
    enabled: isLoanReady() && isEnabledQuery(LOAN_APPLICATION_STEPS.ASSETS)
  })

  // Tax Rates Form
  const fpExpenseTaxRateFormQuery = useQueryGetTaxRateForm({
    applicationId: loanApplicationId!,
    enabled: isLoanReady() && isEnabledQuery(LOAN_APPLICATION_STEPS.TAX_RATES)
  })

  useEffect(() => {
    if (fpExpenseTaxRateFormQuery.data && isInitialized) {
      changeDataAndProgress(
        reverseFormatExpenseTaxRateForm(fpExpenseTaxRateFormQuery.data),
        LOAN_APPLICATION_STEPS.TAX_RATES
      )
    }
  }, [changeDataAndProgress, fpExpenseTaxRateFormQuery.data, isInitialized])

  useEffect(() => {
    if (
      fpAssetsCurrentFormQuery.data &&
      fpAssetsLongTermFormQuery.data &&
      isInitialized
    ) {
      changeDataAndProgress(
        reverseFormatAssetsForm(
          fpAssetsCurrentFormQuery.data,
          fpAssetsLongTermFormQuery.data
        ),
        LOAN_APPLICATION_STEPS.ASSETS
      )
    }
  }, [
    changeDataAndProgress,
    fpAssetsCurrentFormQuery.data,
    fpAssetsLongTermFormQuery.data,
    isInitialized
  ])

  // Revenue
  const revenueFormQuery = useQueryRevenueForm({
    applicationId: loanApplicationId!,
    enabled: isLoanReady() && isEnabledQuery(LOAN_APPLICATION_STEPS.REVENUE)
  })

  useEffect(() => {
    if (revenueFormQuery.data && isInitialized) {
      const formattedData = reverseFormatRevenueResponse(revenueFormQuery.data)

      changeDataAndProgress(
        formattedData,
        LOAN_APPLICATION_STEPS.REVENUE,
        formattedData.billableHours.length !== 0 ||
          formattedData.unitSales.length !== 0 ||
          formattedData.recurringCharges.length !== 0 ||
          formattedData.contracts.length !== 0
      )
    }
  }, [changeDataAndProgress, isInitialized, revenueFormQuery.data])

  // Debt Financing
  const debtFinancingFormQuery = useQueryGetDebtFinancingForm({
    applicationId: loanApplicationId!,
    enabled:
      isLoanReady() && isEnabledQuery(LOAN_APPLICATION_STEPS.DEBT_FINANCING)
  })
  const debtFinancingLiabilityFormQuery = useQueryGetDebtFinancingLiabilityForm(
    {
      applicationId: loanApplicationId!,
      enabled:
        isLoanReady() && isEnabledQuery(LOAN_APPLICATION_STEPS.DEBT_FINANCING)
    }
  )

  useEffect(() => {
    if (
      (debtFinancingFormQuery?.data || debtFinancingLiabilityFormQuery?.data) &&
      isInitialized
    ) {
      changeDataAndProgress(
        reverseFormatDebtFinancingForm({
          debtFinancingResponse: debtFinancingFormQuery.data,
          debtFinancingLiabilityResponse: debtFinancingLiabilityFormQuery.data
        }),
        LOAN_APPLICATION_STEPS.DEBT_FINANCING,
        !!(debtFinancingFormQuery.data && debtFinancingLiabilityFormQuery.data)
      )
    }
  }, [
    changeDataAndProgress,
    debtFinancingFormQuery.data,
    debtFinancingLiabilityFormQuery.data,
    isInitialized
  ])

  /**
   * Forecasting setup
   * */
  const forecastingSetupQuery = useQueryForecastingSetup(
    {
      applicationId: loanApplicationId
    },
    isLoanReady() && isEnabledQuery(LOAN_APPLICATION_STEPS.FORECASTING_SETUP)
  )

  useEffect(() => {
    if (forecastingSetupQuery.data && isInitialized) {
      changeDataAndProgress(
        formatForecastSetupResult(forecastingSetupQuery.data),
        LOAN_APPLICATION_STEPS.FORECASTING_SETUP
      )
    }
  }, [changeDataAndProgress, forecastingSetupQuery.data, isInitialized])

  return {
    expensePeopleFormQuery,
    fpOperatingExpensesFormQuery,
    revenueFormQuery,
    debtFinancingFormQuery,
    debtFinancingLiabilityFormQuery,
    forecastingSetupQuery,
    financialStatementQuery,
    fpEquityFinancingFormQuery,
    fpAssetsLongTermFormQuery,
    fpAssetsCurrentFormQuery,
    fpExpenseTaxRateFormQuery,
    directCostsQuery
  }
}
