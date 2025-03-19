import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service.ts"
import { type ErrorResponse } from "@/types/common.type.ts"
import { downloadPDFFile } from "@/utils"
import { configWithResponseType } from "@/utils/request-config.ts"
import { useQuery } from "@tanstack/react-query"
import { QUERY_KEY } from "../../constants/query-key.ts"

interface GetRequestParams {
  documentId: string
  setupId: string
}

export interface DownloadFinancialDocumentProps {
  setupId?: string
  documentId?: string
  fileName?: string
  preventCacheCount?: number
}

export const useQueryDownloadFinancialDocument = ({
  setupId,
  documentId,
  fileName,
  preventCacheCount
}: DownloadFinancialDocumentProps) => {
  return useQuery<string, ErrorResponse>({
    queryKey: [
      QUERY_KEY.GET_DOWNLOAD_FINANCIAL_DOCUMENT,
      setupId,
      documentId,
      preventCacheCount
    ],
    queryFn: async () => {
      const data = await getRequest<GetRequestParams, string>({
        path: API_PATH.financialProjection.financialStatement.download,
        params: { setupId: setupId!, documentId: documentId! },
        config: configWithResponseType("arraybuffer")
      })

      downloadPDFFile(data, fileName ?? "document")

      return data
    },
    enabled: !!documentId && !!preventCacheCount && !!setupId
  })
}
