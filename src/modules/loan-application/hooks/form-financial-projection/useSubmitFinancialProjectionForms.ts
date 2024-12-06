import { type DirectCostsFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/direct-costs-store.ts"
import { type FinancialStatementFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/financial-statement-store.ts"
import { type AssetsFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-assets-store.ts"
import { type DebtFinancingFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-debt-financing.tsx"
import { type FpEquityFinancingFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-equity-store.ts"
import { type ExpenseTaxRateFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-expense-tax-rate-store.ts"
import { type FpOperatingExpensesFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-operating-expenses-store.ts"
import { type PeopleFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-people-expenses-store.ts"
import {
  useSubmitCurrentAssetsForm,
  useSubmitLongTermAssetsForm
} from "@/modules/loan-application/[module]-financial-projection/hooks/assets/useSubmitAssetsForm.ts"
import {
  useSubmitDebtFinancingForm,
  useSubmitDebtFinancingLiabilityForm
} from "@/modules/loan-application/[module]-financial-projection/hooks/assets/useSubmitDebtFinancingForm.ts"
import { useSubmitDirectCostsForm } from "@/modules/loan-application/[module]-financial-projection/hooks/direct-costs/useSubmitDirectCostsForm.ts"
import { useSubmitEquityFinancingForm } from "@/modules/loan-application/[module]-financial-projection/hooks/equity-financing/useSubmitEquityFinancingForm.ts"
import { useSubmitPeopleForm } from "@/modules/loan-application/[module]-financial-projection/hooks/expense-people/useSubmitPeopleForm.ts"
import { useSubmitFinancialStatementForm } from "@/modules/loan-application/[module]-financial-projection/hooks/financial-statement/useSubmitFinancialStatementForm.ts"
import { useMutateForecastingSetup } from "@/modules/loan-application/[module]-financial-projection/hooks/forecasting-setup/useMutateForecastingSetup.ts"
import { useSubmitFpOperatingExpensesForm } from "@/modules/loan-application/[module]-financial-projection/hooks/operating-expenses/useSubmitOperatingExpensesForm.ts"
import { useSubmitRevenueForm } from "@/modules/loan-application/[module]-financial-projection/hooks/revenue/useSubmitRevenueForm.ts"
import { useSubmitTaxRateForm } from "@/modules/loan-application/[module]-financial-projection/hooks/tax-rate/useSubmitTaxRateForm.ts"
import { type ForecastingSetupFormValue } from "@/modules/loan-application/[module]-financial-projection/types/forecasting-form.ts"
import { type RevenueStream } from "@/modules/loan-application/[module]-financial-projection/types/revenue-form.ts"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { useLoanApplicationProgressContext } from "@/modules/loan-application/providers"

interface FormData {
  peopleFormData: PeopleFormValue
  fpOperatingExpensesData: FpOperatingExpensesFormValue
  forecastingSetupData: ForecastingSetupFormValue
  directCostsData: DirectCostsFormValue
  equityFinancingData: FpEquityFinancingFormValue
  assetsData: AssetsFormValue
  taxRateData: ExpenseTaxRateFormValue
  revenueData: RevenueStream
  debtFinancingData: DebtFinancingFormValue
  financialStatementData: FinancialStatementFormValue
}

export const useSubmitFinancialProjectionForms = ({
  peopleFormData,
  fpOperatingExpensesData,
  forecastingSetupData,
  directCostsData,
  equityFinancingData,
  assetsData,
  taxRateData,
  revenueData,
  debtFinancingData,
  financialStatementData
}: FormData) => {
  const { getStepStatus } = useLoanApplicationProgressContext()
  const forecastingSetupSubmission =
    useMutateForecastingSetup(forecastingSetupData)
  const peopleSubmission = useSubmitPeopleForm({ rawData: peopleFormData })
  const operatingExpensesSubmission = useSubmitFpOperatingExpensesForm({
    rawData: fpOperatingExpensesData
  })
  const financialStatementSubmission = useSubmitFinancialStatementForm({
    rawData: financialStatementData
  })
  const directCostsSubmission = useSubmitDirectCostsForm({
    rawData: directCostsData
  })
  const equityFinancingSubmission = useSubmitEquityFinancingForm({
    rawData: equityFinancingData
  })
  const revenueSubmission = useSubmitRevenueForm({
    rawData: revenueData
  })
  const taxRateSubmission = useSubmitTaxRateForm({
    rawData: taxRateData
  })
  /**
   * Asset
   */
  const assetsLongTermSubmission = useSubmitLongTermAssetsForm({
    rawData: assetsData
  })
  const assetsCurrentSubmission = useSubmitCurrentAssetsForm({
    rawData: assetsData
  })
  /**
   * Debt Financing
   */
  const debtFinancingSubmission = useSubmitDebtFinancingForm({
    rawData: debtFinancingData
  })
  const debtFinancingLiabilitySubmission = useSubmitDebtFinancingLiabilityForm({
    rawData: debtFinancingData
  })

  const submissionHooks = {
    [LOAN_APPLICATION_STEPS.FORECASTING_SETUP]: [forecastingSetupSubmission],
    [LOAN_APPLICATION_STEPS.PEOPLE]: [peopleSubmission],
    [LOAN_APPLICATION_STEPS.FP_OPERATING_EXPENSES]: [
      operatingExpensesSubmission
    ],
    [LOAN_APPLICATION_STEPS.FINANCIAL_STATEMENTS]: [
      financialStatementSubmission
    ],
    [LOAN_APPLICATION_STEPS.DIRECT_COSTS]: [directCostsSubmission],
    [LOAN_APPLICATION_STEPS.EQUITY]: [equityFinancingSubmission],
    [LOAN_APPLICATION_STEPS.ASSETS]: [
      assetsCurrentSubmission,
      assetsLongTermSubmission
    ],
    [LOAN_APPLICATION_STEPS.TAX_RATES]: [taxRateSubmission],
    [LOAN_APPLICATION_STEPS.REVENUE]: [revenueSubmission],
    [LOAN_APPLICATION_STEPS.DEBT_FINANCING]: [
      debtFinancingSubmission,
      debtFinancingLiabilitySubmission
    ]
  }

  // Submission hooks
  const handleSubmitFinancialProjection = async (applicationId: string) => {
    const submissionPromises = Object.entries(submissionHooks).reduce<
      Promise<unknown>[]
    >((promises, [step, hook]) => {
      if (!getStepStatus(step)) return promises
      hook.forEach((item) => {
        if (item.submitForm) {
          promises.push(item.submitForm(applicationId))
        }
      })

      return promises
    }, [])

    return Promise.allSettled(submissionPromises)
  }

  const isSubmittingFinancialProjection = [...Object.values(submissionHooks)]
    .flat()
    .some((hook) => hook.isLoading)

  return {
    handleSubmitFinancialProjection,
    isSubmittingFinancialProjection
  }
}
