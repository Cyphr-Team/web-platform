import { type QueryKey } from "react-query"
import { useQueryClient } from "@tanstack/react-query"
import { postRequest } from "@/services/client.service.ts"
import { customRequestHeader } from "@/utils/request-header.ts"
import { useMutationFactory } from "@/modules/loan-application/hooks/form-common"

interface MutateLoanRequestOptions {
  path: string
  queryKeysToInvalidate: QueryKey[]
}

const useSubmitFormV2 = <R, T>(props: MutateLoanRequestOptions) => {
  const queryClient = useQueryClient()

  return useMutationFactory<R, T>(
    (data: R) => {
      return postRequest({
        path: props.path,
        data,
        customHeader: customRequestHeader.customHeaders
      })
    },
    () => {
      props.queryKeysToInvalidate.forEach((queryKey) => {
        queryClient.invalidateQueries({
          queryKey: [queryKey]
        })
      })
    }
  )
}

const useUpdateFormV2 = <R, T>(props: MutateLoanRequestOptions) => {
  const queryClient = useQueryClient()

  return useMutationFactory<R, T>(
    (data) => {
      return postRequest({
        path: props.path,
        data,
        customHeader: customRequestHeader.customHeaders
      })
    },
    () => {
      props.queryKeysToInvalidate.forEach((queryKey) => {
        queryClient.invalidateQueries({
          queryKey: [queryKey]
        })
      })
    }
  )
}

export { useSubmitFormV2, useUpdateFormV2 }
