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
import { FpEquityFinancingFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-equity-store"
import { useSubmitEquityFinancingForm } from "@/modules/loan-application/[module]-financial-projection/hooks/equity-financing/useSubmitEquityFinancingForm"
import {
  useSubmitCurrentAssetsForm,
  useSubmitLongTermAssetsForm
} from "@/modules/loan-application/[module]-financial-projection/hooks/assets/useSubmitAssetsForm"
import { AssetsFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-assets-store"

interface FormData {
  peopleFormData: PeopleFormValue
  fpOperatingExpensesData: FpOperatingExpensesFormValue
  forecastingSetupData: ForecastingSetupFormValue
  directCostsData: DirectCostsFormValue
  equityFinancingData: FpEquityFinancingFormValue
  assetsData: AssetsFormValue
}

export const useSubmitFinancialProjectionForms = ({
  peopleFormData,
  fpOperatingExpensesData,
  forecastingSetupData,
  directCostsData,
  equityFinancingData,
  assetsData
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
  const equityFinancingSubmission = useSubmitEquityFinancingForm({
    rawData: equityFinancingData
  })
  const assetsLongTermSubmission = useSubmitLongTermAssetsForm({
    rawData: assetsData
  })
  const assetsCurrentSubmission = useSubmitCurrentAssetsForm({
    rawData: assetsData
  })

  const submissionHooks = {
    [LOAN_APPLICATION_STEPS.PEOPLE]: [peopleSubmission],
    [LOAN_APPLICATION_STEPS.FP_OPERATING_EXPENSES]: [
      operatingExpensesSubmission
    ],
    [LOAN_APPLICATION_STEPS.FORECASTING_SETUP]: [forecastingSetupSubmission],
    [LOAN_APPLICATION_STEPS.DIRECT_COSTS]: [directCostsSubmission],
    [LOAN_APPLICATION_STEPS.EQUITY]: [equityFinancingSubmission],
    [LOAN_APPLICATION_STEPS.ASSETS]: [
      assetsCurrentSubmission,
      assetsLongTermSubmission
    ]
  }

  const handleSubmitFinancialProjection = async (applicationId: string) => {
    const submissionPromises = Object.entries(submissionHooks).reduce(
      (promises, [step, hook]) => {
        if (!getStepStatus(step)) return promises
        hook.forEach((item) => {
          if (item.submitForm) {
            promises.push(item.submitForm(applicationId))
          }
        })
        return promises
      },
      [] as Promise<unknown>[]
    )

    return Promise.allSettled(submissionPromises)
  }

  const isSubmittingFinancialProjection = Object.values(submissionHooks)
    .flat()
    .some((hook) => hook.isLoading)

  return {
    handleSubmitFinancialProjection,
    isSubmittingFinancialProjection
  }
}
