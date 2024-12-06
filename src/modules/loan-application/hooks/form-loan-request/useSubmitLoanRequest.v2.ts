import { FORM_TYPE } from "../../models/LoanApplicationStep/type"
import { loanApplicationUserKeys } from "@/constants/query-key"
import type {
  LoanRequestV2,
  LoanRequestV2SubmitRequest,
  LoanRequestV2UpdateRequest
} from "../../constants/type"
import type { ILoanRequestFormValue } from "../../constants/form"
import { QUERY_KEY } from "../../constants/query-key"
import {
  useSubmitFormV2,
  useUpdateFormV2
} from "@/modules/loan-application/hooks/utils/useMutateFormV2.ts"
import { API_PATH } from "@/constants"
import { toastError } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg.ts"
import { getAxiosError } from "@/utils/custom-error.ts"
import { mapMetadataToLoanRequest } from "@/modules/loan-application/services/formv2.services.ts"
import { type NoobRecord } from "@/modules/loan-application/types/form.v2.ts"

// submit or update must be defined
// update will have higher priority than submit
interface UseMutateLoanRequestProps {
  applicationId: string
  formId: string
  metadata: NoobRecord
  onSuccess: (loanRequestV2FormValue: ILoanRequestFormValue) => void
}

const queryKeysToInvalidate = (applicationId: string) => [
  loanApplicationUserKeys.detail(applicationId),
  QUERY_KEY.GET_LOAN_REQUEST_FORM
]

export const useMutateLoanRequest = (props: UseMutateLoanRequestProps) => {
  const { applicationId, formId, metadata } = props

  const submitMutation = useSubmitFormV2<
    LoanRequestV2SubmitRequest,
    LoanRequestV2
  >({
    path: API_PATH.application.formV2.loanRequest.submit,
    queryKeysToInvalidate: queryKeysToInvalidate(applicationId)
  })

  const updateMutation = useUpdateFormV2<
    LoanRequestV2UpdateRequest,
    LoanRequestV2
  >({
    path: API_PATH.application.formV2.loanRequest.update,
    queryKeysToInvalidate: queryKeysToInvalidate(applicationId)
  })

  // We should prioritize update mutation if formId is provided
  const mutationToUse = formId ? updateMutation : submitMutation

  if (!mutationToUse) {
    throw new Error("Invalid mutation")
  }

  const mutateLoanRequest = async (applicationId: string) => {
    return await mutationToUse.mutateAsync(
      {
        applicationId: applicationId,
        formType: FORM_TYPE.LOAN_REQUEST,
        formId: formId ?? "",
        metadata
      },
      {
        onSuccess: ({ data }) => {
          const loanRequestFormValue: ILoanRequestFormValue = {
            id: data.id,
            applicationId: data.applicationId,
            ...mapMetadataToLoanRequest(data?.metadata)
          } as ILoanRequestFormValue

          props.onSuccess(loanRequestFormValue)
        },
        onError: (error) => {
          toastError({
            ...TOAST_MSG.loanApplication.submitError,
            description: getAxiosError(error).message
          })
        }
      }
    )
  }

  return {
    isSubmittingLoanRequestV2: mutationToUse.isPending,
    mutateLoanRequest
  }
}
