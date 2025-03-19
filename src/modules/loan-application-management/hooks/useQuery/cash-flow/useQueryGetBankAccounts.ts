import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { type ErrorResponse } from "@/types/common.type"
import { useQuery } from "@tanstack/react-query"
import { QUERY_KEY } from "../../../constants/query-key"
import { type BankAccountsResponse } from "../../../constants/types/cashflow.type"

export const useQueryGetBankAccounts = ({
  applicationId,
  enabledByInstitution
}: {
  applicationId: string
  enabledByInstitution: boolean
}) => {
  return useQuery<BankAccountsResponse, ErrorResponse>({
    queryKey: [QUERY_KEY.GET_BANK_ACCOUNTS, applicationId],
    queryFn: () => {
      return getRequest({
        path: API_PATH.loanApplicationDetails.getBankAccounts(applicationId)
      })
    },
    enabled: enabledByInstitution && !!applicationId
  })
}
