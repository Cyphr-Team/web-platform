import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { type ErrorResponse } from "react-router-dom"
import { QUERY_KEY } from "../../constants/query-key"
import { type FullAmortizationResponse } from "../../constants/types/debt-schedule.type"

export const useQueryFullAmortization = ({
  applicationId,
  enabledByInstitution
}: {
  applicationId: string
  enabledByInstitution: boolean
}) => {
  return useQuery<FullAmortizationResponse, ErrorResponse>({
    queryKey: [QUERY_KEY.GET_FULL_AMORTIZATION_SCHEDULE],
    queryFn: () => {
      return getRequest({
        path: API_PATH.loanApplicationDetails.getFullAmortizationSchedule(
          applicationId
        )
      })
    },
    enabled: enabledByInstitution && !!applicationId
  })
}
