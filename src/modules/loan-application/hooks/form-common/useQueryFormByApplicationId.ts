import { getRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { type AxiosError } from "axios"
import { type ErrorResponse } from "@/types/common.type"

interface Props {
  applicationId: string
  path: string
  queryKey: readonly string[]
  enabled?: boolean
}

export const useQueryFormByApplicationId = <T>({
  path,
  applicationId,
  queryKey,
  enabled
}: Props) => {
  return useQuery<T, AxiosError<ErrorResponse>>({
    queryKey: [...queryKey, applicationId],
    enabled: !!applicationId && enabled !== false,
    queryFn: () =>
      getRequest({
        path,
        params: { applicationId }
      })
  })
}
