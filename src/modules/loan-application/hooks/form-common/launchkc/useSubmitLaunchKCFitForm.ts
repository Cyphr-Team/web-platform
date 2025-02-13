import { useMutateCommonForm } from "@/modules/loan-application/hooks/form-common/useSubmitCommonFormV2"
import { type LaunchKCFitFormValue } from "@/modules/loan-application/constants/form"
import { QUERY_KEY } from "@/modules/loan-application/constants/query-key"
import { type FormV2Data } from "@/modules/loan-application/types/form.v2"
import { FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { serializeLoanLaunchKCFitFormV2 } from "@/modules/loan-application/hooks/form-common/launchkc/stores/launchkc-fit-store"

interface Props {
  rawData: LaunchKCFitFormValue
  onSuccess: (data: FormV2Data) => void
}

export const useSubmitLoanLaunchKCFitForm = ({ rawData, onSuccess }: Props) => {
  const submission = useMutateCommonForm({
    applicationId: rawData?.loanApplicationId ?? "",
    queryKeyToInvalidates: QUERY_KEY.GET_LAUNCH_KC_FIT_FORM,
    formId: rawData?.id ?? "",
    metadata: serializeLoanLaunchKCFitFormV2(rawData),
    onSuccess
  })

  return {
    isLoading: submission.isSubmitting,
    submitLoanLaunchKCFitForm: (applicationId: string) =>
      submission.mutate(applicationId, FORM_TYPE.LAUNCHKC_FIT)
  }
}
