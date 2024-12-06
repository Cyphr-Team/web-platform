import { type ErrorResponse } from "@/types/common.type"
import { useMutation, useQuery } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"

export interface FormDetailsQueryOptions {
  applicationId: string
  enabled?: boolean
}

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

export const useMutationFactory = <R, T>(
  mutationFn: (data: R) => Promise<AxiosResponse<T>>,
  onSuccess?: (data: AxiosResponse<T>) => void
) => {
  return useMutation<AxiosResponse<T>, AxiosError<ErrorResponse>, R>({
    mutationFn,
    onSuccess
  })
}
