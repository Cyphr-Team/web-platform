import { postRequest } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { ErrorResponse } from "react-router-dom"

const useCreateMutation = <T, P>(path: string) => {
  return useMutation<AxiosResponse<P>, AxiosError<ErrorResponse>, T>({
    mutationFn: (data) => postRequest<T, P>({ path, data })
  })
}

export { useCreateMutation }
