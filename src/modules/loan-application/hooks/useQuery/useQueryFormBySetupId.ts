import { getRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { ErrorResponse } from "@/types/common.type"

type Props = {
  setupId: string
  path: string
  queryKey: readonly string[]
  enabled?: boolean
}

export const useQueryFormBySetupId = <T>({
  path,
  setupId,
  queryKey,
  enabled
}: Props) => {
  return useQuery<T, AxiosError<ErrorResponse>>({
    queryKey: [...queryKey, setupId],
    enabled: !!setupId && enabled !== false,
    queryFn: () =>
      getRequest({
        path,
        params: { setupId }
      })
  })
}
