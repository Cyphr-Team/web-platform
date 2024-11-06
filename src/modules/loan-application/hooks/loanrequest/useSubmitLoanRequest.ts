import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { customRequestHeader } from "@/utils/request-header"
import { FORM_TYPE } from "../../models/LoanApplicationStep/type"
import { useMutationFactory } from "../useMutation"
import { useQueryClient } from "@tanstack/react-query"
import { loanApplicationUserKeys } from "@/constants/query-key"
import type {
  LoanRequestV2,
  LoanRequestV2SubmitRequest,
  LoanRequestV2UpdateRequest
} from "../../constants/type"
import type { ILoanRequestFormValue } from "../../constants/form"
import { mapMetadataToLoanRequest } from "../../services/form.services"
import { QUERY_KEY } from "../../constants/query-key"

// submit or update must be defined
// update will has higher priority than submit
interface PROPS {
  applicationId: string
  formId: string
  metadata: Record<string, unknown>
  onSuccess: (loanRequestV2FormValue: ILoanRequestFormValue) => void
}

export const useMutateLoanRequest = (props: PROPS) => {
  const { applicationId, formId, metadata } = props

  const submitMutation = useSubmit<LoanRequestV2SubmitRequest, LoanRequestV2>(
    applicationId ?? ""
  )
  const updateMutation = useUpdate<LoanRequestV2UpdateRequest, LoanRequestV2>(
    formId ?? ""
  )

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
          props.onSuccess({
            id: data.id,
            ...mapMetadataToLoanRequest(data.metadata)
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

const useSubmit = <R, T>(applicationId: string) => {
  const queryClient = useQueryClient()

  return useMutationFactory<R, T>(
    (data: R) => {
      return postRequest({
        path: API_PATH.application.formV2.loanRequest.submit,
        data,
        customHeader: customRequestHeader.customHeaders
      })
    },
    () => {
      queryClient.invalidateQueries({
        queryKey: loanApplicationUserKeys.detail(applicationId)
      })
    }
  )
}

const useUpdate = <R, T>(applicationId: string) => {
  const queryClient = useQueryClient()

  return useMutationFactory<R, T>(
    (data) => {
      return postRequest({
        path: API_PATH.application.formV2.loanRequest.update,
        data,
        customHeader: customRequestHeader.customHeaders
      })
    },
    () => {
      queryClient.invalidateQueries({
        queryKey: loanApplicationUserKeys.detail(applicationId)
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_LOAN_REQUEST_FORM]
      })
    }
  )
}
