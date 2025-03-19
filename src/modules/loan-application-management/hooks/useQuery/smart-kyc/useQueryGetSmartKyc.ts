import { useQuery } from "@tanstack/react-query"
import { type ErrorResponse } from "react-router-dom"
import { QUERY_KEY } from "../../../constants/query-key"
import { getRequest } from "../../../../../services/client.service"
import { API_PATH } from "../../../../../constants"
import { type SmartKyc } from "../../../../../lib/persona/persona.types"
import { isIgnoredKycSubmission } from "@/utils/feature-flag.utils.ts"

export const useQueryGetSmartKyc = ({
  applicationId,
  enabledByInstitution
}: {
  applicationId?: string
  enabledByInstitution: boolean
}) => {
  return useQuery<SmartKyc, ErrorResponse>({
    queryKey: [QUERY_KEY.GET_SMART_KYC_DETAIL, applicationId],
    queryFn: () => {
      return getRequest({
        path: API_PATH.loanApplicationDetails.getSmartKycPersonaDetail(
          applicationId!
        )
      })
    },
    enabled:
      enabledByInstitution && !!applicationId && !isIgnoredKycSubmission()
  })
}
