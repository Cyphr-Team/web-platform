import { type LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { type AxiosResponse } from "axios"
import { type ReactNode } from "react"

export interface SubmissionHook<T> {
  submitForm: (applicationId: string) => Promise<AxiosResponse<T>>
  isLoading: boolean
}

export interface FinancialApplicationFormDetailData {
  id: string
  title: string
  content: ReactNode
}

export interface FinancialApplicationDetailData {
  id: LOAN_APPLICATION_STEPS
  subId?: string
  title?: ReactNode
  subTitle?: ReactNode
  financialApplicationFormData: FinancialApplicationFormDetailData[]
  subChildren?: ReactNode
}
