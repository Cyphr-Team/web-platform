import { AxiosResponse } from "axios"
import { ReactNode } from "react"

export interface SubmissionHook<T> {
  submitForm: (applicationId: string) => Promise<AxiosResponse<T>>
  isLoading: boolean
}

export interface FinancialApplicationFormDetailData {
  id: string
  title: string
  content: ReactNode
}
