import { useMutateCommonForm } from "@/modules/loan-application/hooks/form-common/useSubmitCommonFormV2"
import { type ExecutionFormValue } from "@/modules/loan-application/constants/form"
import { QUERY_KEY } from "@/modules/loan-application/constants/query-key"
import { type FormV2Data } from "@/modules/loan-application/types/form.v2"
import { FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { serializeLoanExecutionFormV2 } from "@/modules/loan-application/hooks/form-common/launchkc/stores/execution-store"

interface Props {
  rawData: ExecutionFormValue
  onSuccess: (data: FormV2Data) => void
}

export const useSubmitLoanExecutionForm = ({ rawData, onSuccess }: Props) => {
  const submission = useMutateCommonForm({
    applicationId: rawData?.loanApplicationId ?? "",
    queryKeyToInvalidates: QUERY_KEY.GET_EXECUTION_FORM,
    formId: rawData?.id ?? "",
    metadata: serializeLoanExecutionFormV2(rawData),
    onSuccess
  })

  return {
    isLoading: submission.isSubmitting,
    submitLoanExecutionForm: (applicationId: string) =>
      submission.mutate(applicationId, FORM_TYPE.EXECUTION)
  }
}
