import { getRequest } from "@/services/client.service"
import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { ErrorResponse } from "@/types/common.type"

interface Props<T> {
  setupId: string
  path: string
  queryKey: readonly string[]
  enabled?: boolean
  options?: Partial<UndefinedInitialDataOptions<T, AxiosError<ErrorResponse>>>
}

export const useQueryFormBySetupId = <T>(props: Props<T>) => {
  const { path, setupId, queryKey, enabled, options } = props

  return useQuery<T, AxiosError<ErrorResponse>>({
    ...options,
    queryKey: [...queryKey, setupId],
    enabled: !!setupId && enabled !== false,
    queryFn: () =>
      getRequest({
        path,
        params: { setupId }
      })
  })
}
