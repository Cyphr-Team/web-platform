import { ErrorResponse } from "@/types/common.type"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"

export const useMutationFactory = <R, T>(
  mutationFn: (data: R) => Promise<AxiosResponse<T>>,
  onSuccess?: (data: AxiosResponse<T>) => void
) => {
  return useMutation<AxiosResponse<T>, AxiosError<ErrorResponse>, R>({
    mutationFn,
    onSuccess
  })
}
