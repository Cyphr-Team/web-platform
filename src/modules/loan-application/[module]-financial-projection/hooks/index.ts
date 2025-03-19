import { postRequest } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import { type ErrorResponse } from "react-router-dom"

const useCreateMutation = <T, P>(path: string) => {
  return useMutation<AxiosResponse<P>, AxiosError<ErrorResponse>, T>({
    mutationFn: (data) => postRequest<T, P>({ path, data })
  })
}

export { useCreateMutation }
