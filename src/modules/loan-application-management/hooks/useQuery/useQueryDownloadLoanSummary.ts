import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { type ErrorResponse } from "@/types/common.type"
import { QUERY_KEY } from "../../constants/query-key"
import { LoanSummaryDownloadType } from "../../constants/type"
import { downloadCSVFile, downloadJsonFile } from "@/utils"
import { format } from "date-fns"

export const useQueryDownloadLoanSummary = ({
  applicationId,
  type,
  preventCacheCount
}: {
  applicationId?: string
  type?: LoanSummaryDownloadType
  preventCacheCount?: number
}) => {
  return useQuery<string, ErrorResponse>({
    queryKey: [
      QUERY_KEY.GET_LOAN_SUMMARY_DOWNLOAD,
      applicationId,
      type,
      preventCacheCount
    ],
    queryFn: async () => {
      const data = await getRequest<{ type: LoanSummaryDownloadType }, string>({
        path: API_PATH.loanApplicationDetails.getDownloadLoanSummary(
          applicationId!
        ),
        params: { type: type! }
      })

      if (type === LoanSummaryDownloadType.CSV) {
        downloadCSVFile(
          data,
          `loan_summary_${format(new Date(), "MM-dd-yyyy_HH-mm")}.csv`
        )
      } else {
        downloadJsonFile(
          data,
          `loan_summary_${format(new Date(), "MM-dd-yyyy_HH-mm")}.json`
        )
      }

      return data
    },
    enabled: !!applicationId && !!type
  })
}
