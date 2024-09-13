import { DirectCostsFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/direct-costs-store"
import { FpOperatingExpensesFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-operating-expenses-store"
import { PeopleFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-people-expenses-store"
import { useSubmitDirectCostsForm } from "@/modules/loan-application/[module]-financial-projection/hooks/direct-costs/useSubmitDirectCostsForm"
import { useSubmitPeopleForm } from "@/modules/loan-application/[module]-financial-projection/hooks/expense-people/useSubmitPeopleForm"
import { useSubmitFpOperatingExpensesForm } from "@/modules/loan-application/[module]-financial-projection/hooks/operating-expenses/useSubmitOperatingExpensesForm"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { useLoanApplicationProgressContext } from "@/modules/loan-application/providers"
import { ForecastingSetupFormValue } from "@/modules/loan-application/[module]-financial-projection/types/forecasting-form.ts"
import { useMutateForecastingSetup } from "@/modules/loan-application/[module]-financial-projection/hooks/forecasting-setup/useMutateForecastingSetup.ts"

interface FormData {
  peopleFormData: PeopleFormValue
  fpOperatingExpensesData: FpOperatingExpensesFormValue
  forecastingSetupData: ForecastingSetupFormValue
  directCostsData: DirectCostsFormValue
}

export const useSubmitFinancialProjectionForms = ({
  peopleFormData,
  fpOperatingExpensesData,
  forecastingSetupData,
  directCostsData
}: FormData) => {
  const { getStepStatus } = useLoanApplicationProgressContext()

  const peopleSubmission = useSubmitPeopleForm({ rawData: peopleFormData })
  const operatingExpensesSubmission = useSubmitFpOperatingExpensesForm({
    rawData: fpOperatingExpensesData
  })
  const forecastingSetupSubmission =
    useMutateForecastingSetup(forecastingSetupData)
  const directCostsSubmission = useSubmitDirectCostsForm({
    rawData: directCostsData
  })

  const submissionHooks = {
    [LOAN_APPLICATION_STEPS.PEOPLE]: peopleSubmission,
    [LOAN_APPLICATION_STEPS.FP_OPERATING_EXPENSES]: operatingExpensesSubmission,
    [LOAN_APPLICATION_STEPS.FORECASTING_SETUP]: forecastingSetupSubmission,
    [LOAN_APPLICATION_STEPS.DIRECT_COSTS]: directCostsSubmission
  }

  const handleSubmitFinancialProjection = async (applicationId: string) => {
    const submissionPromises = Object.entries(submissionHooks).reduce(
      (promises, [step, hook]) => {
        if (getStepStatus(step) && hook.submitForm) {
          promises.push(hook.submitForm(applicationId))
        }
        return promises
      },
      [] as Promise<unknown>[]
    )

    return Promise.allSettled(submissionPromises)
  }

  const isSubmittingFinancialProjection = Object.values(submissionHooks).some(
    (hook) => hook.isLoading
  )

  return {
    handleSubmitFinancialProjection,
    isSubmittingFinancialProjection
  }
}
