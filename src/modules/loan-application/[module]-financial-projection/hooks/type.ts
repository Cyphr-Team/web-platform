import { AxiosResponse } from "axios"

export interface SubmissionHook<T> {
  submitForm: (applicationId: string) => Promise<AxiosResponse<T>>
  isLoading: boolean
}
