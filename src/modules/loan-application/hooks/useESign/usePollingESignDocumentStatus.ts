import { getRequest } from "@/services/client.service"
import {
  IESignDocument,
  PandaDocDocumentStatus
} from "@/types/esign/document.type"
import { useQuery } from "@tanstack/react-query"
import { E_SIGN_CLIENT } from "../../constants/e-sign"

export const usePollingESignDocumentStatus = ({
  documentId
}: {
  documentId?: string
}) => {
  return useQuery({
    queryKey: [E_SIGN_CLIENT.E_SIGN_QUERY_KEYS.documentStatus, documentId],
    queryFn: () => {
      return getRequest<unknown, IESignDocument>({
        path: E_SIGN_CLIENT.ENDPOINTS.getDocumentStatus(documentId!)
      })
    },
    enabled: !!documentId,
    // Refetch the data every second
    refetchInterval: (data) => {
      return data?.state?.data?.status != PandaDocDocumentStatus.COMPLETED
        ? 3000
        : false
    }
  })
}
