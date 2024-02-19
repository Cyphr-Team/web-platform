import { useEffect, useMemo } from "react"
import { createContext } from "use-context-selector"
import { useGetLoanProgramDetail } from "../hooks/useGetLoanProgramDetail"
import { useNavigate } from "react-router-dom"
import { APP_PATH } from "@/constants"
import { toastError } from "@/utils"
import { LoanProgramData } from "../constants/type"

type LoanProgramDetailContext = {
  loanProgramDetail?: LoanProgramData
}

export const LoanProgramDetailContext = createContext<LoanProgramDetailContext>(
  {
    loanProgramDetail: undefined
  }
)

type Props = {
  children: React.ReactNode
}

export const LoanProgramDetailProvider: React.FC<Props> = ({ children }) => {
  const loanProgramDetail = useGetLoanProgramDetail()
  const navigate = useNavigate()

  const value = useMemo(() => ({ loanProgramDetail }), [loanProgramDetail])

  useEffect(() => {
    if (!loanProgramDetail) {
      toastError({ title: "Loan program not found!", description: "" })
      navigate(APP_PATH.LOAN_APPLICATION.LOAN_PROGRAM.list)
    }
  }, [loanProgramDetail, navigate])

  return (
    <LoanProgramDetailContext.Provider value={value}>
      {children}
    </LoanProgramDetailContext.Provider>
  )
}
