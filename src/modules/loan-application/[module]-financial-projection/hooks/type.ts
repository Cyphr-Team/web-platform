import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
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

export interface FinancialApplicationDetailData {
  id: LOAN_APPLICATION_STEPS
  subId?: string
  title?: ReactNode
  subTitle?: ReactNode
  financialApplicationFormData: FinancialApplicationFormDetailData[]
  subChildren?: ReactNode
}
