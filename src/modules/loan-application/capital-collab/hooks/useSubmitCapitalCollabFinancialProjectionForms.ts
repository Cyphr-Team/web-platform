import {
  serializeAssetsFormV2,
  type CapitalCollabAssetsFormValue
} from "@/modules/loan-application/capital-collab/stores/assets-store"
import {
  serializeDebtFinancingFormV2,
  type CapitalCollabDebtFinancingFormValue
} from "@/modules/loan-application/capital-collab/stores/debt-financing-store"
import {
  serializeDirectCostsFormV2,
  type CapitalCollabDirectCostsFormValue
} from "@/modules/loan-application/capital-collab/stores/direct-cost-store"
import {
  serializeOperatingExpensesFormV2,
  type CapitalCollabOperatingExpensesFormValue
} from "@/modules/loan-application/capital-collab/stores/operating-expenses-store"
import {
  FORM_TYPE,
  LOAN_APPLICATION_STEPS
} from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { useLoanApplicationProgressContext } from "@/modules/loan-application/providers"
import { useMutateCommonForm } from "@/modules/loan-application/hooks/form-common/useSubmitCommonFormV2"
import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key"

interface FormData {
  fpOperatingExpensesData: CapitalCollabOperatingExpensesFormValue
  directCostsData: CapitalCollabDirectCostsFormValue
  assetsData: CapitalCollabAssetsFormValue
  debtFinancingData: CapitalCollabDebtFinancingFormValue
}

export const useSubmitCapitalCollabFinancialProjectionForms = ({
  fpOperatingExpensesData,
  directCostsData,
  assetsData,
  debtFinancingData
}: FormData) => {
  const { getStepStatus } = useLoanApplicationProgressContext()
  const operatingExpensesSubmission = useMutateCommonForm({
    applicationId: fpOperatingExpensesData?.applicationId ?? "",
    queryKeyToInvalidates: QUERY_KEY.GET_FP_OPERATING_EXPENSES_FORM,
    formId: fpOperatingExpensesData?.id ?? "",
    metadata: serializeOperatingExpensesFormV2(fpOperatingExpensesData)
  })
  const directCostsSubmission = useMutateCommonForm({
    applicationId: directCostsData?.applicationId ?? "",
    queryKeyToInvalidates: QUERY_KEY.GET_DIRECT_COSTS_FORM,
    formId: directCostsData?.id ?? "",
    metadata: serializeDirectCostsFormV2(directCostsData)
  })
  const assetsSubmission = useMutateCommonForm({
    applicationId: assetsData?.applicationId ?? "",
    queryKeyToInvalidates: QUERY_KEY.GET_CURRENT_ASSETS_FORM,
    formId: assetsData?.id ?? "",
    metadata: serializeAssetsFormV2(assetsData)
  })
  const debtFinancingSubmission = useMutateCommonForm({
    applicationId: debtFinancingData?.applicationId ?? "",
    queryKeyToInvalidates: QUERY_KEY.GET_FP_DEBT_FINANCING_FORM,
    formId: debtFinancingData?.id ?? "",
    metadata: serializeDebtFinancingFormV2(debtFinancingData)
  })

  const submissionHooks = {
    [LOAN_APPLICATION_STEPS.FP_OPERATING_EXPENSES]: {
      formType: FORM_TYPE.OPERATING_EXPENSES,
      submission: operatingExpensesSubmission
    },
    [LOAN_APPLICATION_STEPS.DIRECT_COSTS]: {
      formType: FORM_TYPE.DIRECT_COSTS,
      submission: directCostsSubmission
    },
    [LOAN_APPLICATION_STEPS.ASSETS]: {
      formType: FORM_TYPE.ASSETS,
      submission: assetsSubmission
    },
    [LOAN_APPLICATION_STEPS.DEBT_FINANCING]: {
      formType: FORM_TYPE.DEBT_FINANCING,
      submission: debtFinancingSubmission
    }
  }

  // Submission hooks
  const handleSubmitFinancialProjection = async (applicationId: string) => {
    const submissionPromises = Object.entries(submissionHooks).reduce<
      Promise<unknown>[]
    >((promises, [step, hook]) => {
      if (!getStepStatus(step)) return promises
      promises.push(hook.submission.mutate(applicationId, hook.formType))

      return promises
    }, [])

    return Promise.allSettled(submissionPromises)
  }

  const isSubmittingFinancialProjection = [...Object.values(submissionHooks)]
    .flat()
    .some((hook) => hook.submission.isSubmitting)

  return {
    handleSubmitCapitalCollabFinancialProjection:
      handleSubmitFinancialProjection,
    isSubmittingCapitalCollabFinancialProjection:
      isSubmittingFinancialProjection
  }
}
