import { ErrorResponse } from "@/types/common.type"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useQueryDetailsFactory = <T>(
  id: string,
  queryKey: readonly string[],
  queryFn: () => Promise<T>
) => {
  return useQuery<T, AxiosError<ErrorResponse>>({
    queryKey: [...queryKey, id],
    queryFn: queryFn,
    enabled: !!id
  })
}
