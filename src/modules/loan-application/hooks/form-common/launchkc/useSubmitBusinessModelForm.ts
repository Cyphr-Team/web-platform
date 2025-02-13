import { useMutateCommonForm } from "@/modules/loan-application/hooks/form-common/useSubmitCommonFormV2"
import { QUERY_KEY } from "@/modules/loan-application/constants/query-key"
import { type FormV2Data } from "@/modules/loan-application/types/form.v2"
import { FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { serializeLoanBusinessModelFormV2 } from "@/modules/loan-application/hooks/form-common/launchkc/stores/business-model-store"
import { type BusinessModelFormValue } from "@/modules/loan-application/constants/form"

interface Props {
  rawData: BusinessModelFormValue
  onSuccess: (data: FormV2Data) => void
}

export const useSubmitBusinessModelForm = ({ rawData, onSuccess }: Props) => {
  const submission = useMutateCommonForm({
    applicationId: rawData?.loanApplicationId ?? "",
    queryKeyToInvalidates: QUERY_KEY.GET_BUSINESS_MODEL_FORM,
    formId: rawData?.id ?? "",
    metadata: serializeLoanBusinessModelFormV2(rawData),
    onSuccess
  })

  return {
    isLoading: submission.isSubmitting,
    submitLoanBusinessModelForm: (applicationId: string) =>
      submission.mutate(applicationId, FORM_TYPE.BUSINESS_MODEL)
  }
}
