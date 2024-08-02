import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { QUERY_KEY } from "../../constants/query-key"
import { LoanSummaryDownloadType } from "../../constants/type"
import { downloadCSVFile } from "@/utils"
import { customRequestHeader } from "@/utils/request-header"

export const useQueryDownloadBulkCsvInvitationTemplate = ({
  type,
  preventCacheCount
}: {
  type?: LoanSummaryDownloadType
  preventCacheCount?: number
}) => {
  return useQuery<string, ErrorResponse>({
    queryKey: [
      QUERY_KEY.GET_BULK_CSV_INVITATION_TEMPLATE,
      type,
      preventCacheCount
    ],
    queryFn: async () => {
      const data = await getRequest<{ type: LoanSummaryDownloadType }, string>({
        path: API_PATH.admin.invitation.bulkInviteCsvTemplate,
        customHeader: {
          ...customRequestHeader.customHeaders,
          Accept: "text/csv"
        },
        config: {
          responseType: "text"
        }
      })

      if (type === LoanSummaryDownloadType.CSV && preventCacheCount !== 0) {
        downloadCSVFile(data, `invitation_template.csv`)
      }

      return data
    },
    enabled: !!type && !!preventCacheCount,
    // Prevent cache & refetch
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false
  })
}
