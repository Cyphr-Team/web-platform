import { type FORM_TYPE } from "../../models/LoanApplicationStep/type"
import { loanApplicationUserKeys } from "@/constants/query-key"
import {
  useSubmitFormV2,
  useUpdateFormV2
} from "@/modules/loan-application/hooks/utils/useMutateFormV2.ts"
import { API_PATH } from "@/constants"
import { toastError } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg.ts"
import { getAxiosError } from "@/utils/custom-error.ts"
import {
  type FormV2UpdateRequest,
  type FormV2Data,
  type FormV2SubmitRequest,
  type NoobRecord
} from "@/modules/loan-application/types/form.v2.ts"

// submit or update must be defined
// update will have higher priority than submit
interface UseMutateCommonFormProps {
  applicationId: string
  queryKeyToInvalidates: string
  formId: string
  metadata: NoobRecord
  onSuccess?: (data: FormV2Data) => void
}

const queryKeysToInvalidate = (applicationId: string, queryKey: string) => [
  loanApplicationUserKeys.detail(applicationId),
  queryKey
]

export const useMutateCommonForm = (props: UseMutateCommonFormProps) => {
  const { applicationId, formId, metadata, queryKeyToInvalidates, onSuccess } =
    props

  const submitMutation = useSubmitFormV2<FormV2SubmitRequest, FormV2Data>({
    path: API_PATH.application.formV2.common.submit,
    queryKeysToInvalidate: queryKeysToInvalidate(
      applicationId,
      queryKeyToInvalidates
    )
  })

  const updateMutation = useUpdateFormV2<FormV2UpdateRequest, FormV2Data>({
    path: API_PATH.application.formV2.common.update,
    queryKeysToInvalidate: queryKeysToInvalidate(
      applicationId,
      queryKeyToInvalidates
    )
  })

  // We should prioritize update mutation if formId is provided
  const mutationToUse = formId ? updateMutation : submitMutation

  if (!mutationToUse) {
    throw new Error("Invalid mutation")
  }

  const mutate = async (applicationId: string, formType: FORM_TYPE) => {
    return await mutationToUse.mutateAsync(
      {
        applicationId: applicationId,
        formType,
        formId: formId ?? "",
        metadata
      },
      {
        onError: (error) => {
          toastError({
            ...TOAST_MSG.loanApplication.submitError,
            description: getAxiosError(error).message
          })
        },
        onSuccess: ({ data }) => {
          onSuccess && onSuccess(data)
        }
      }
    )
  }

  return {
    isSubmitting: mutationToUse.isPending,
    mutate
  }
}
