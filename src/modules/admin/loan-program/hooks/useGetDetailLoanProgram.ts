import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { loanProgramKeys } from "@/constants/query-key"
import { LoanProgram } from "@/types/loan-program.type"

export const useGetDetailLoanProgram = ({
  loanProgramId
}: {
  loanProgramId?: string
}) => {
  return useQuery<LoanProgram, ErrorResponse>({
    queryKey: loanProgramKeys.detail(loanProgramId!),
    queryFn: () => {
      return getRequest({
        path: API_PATH.loanProgram.cdfi.detail(),
        params: {
          id: loanProgramId
        }
      })
    },
    enabled: !!loanProgramId
  })
}
