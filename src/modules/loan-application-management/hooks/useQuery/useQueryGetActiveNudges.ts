import { useQuery } from "@tanstack/react-query"
import { type ErrorResponse } from "react-router-dom"
import { getRequest } from "../../../../services/client.service"
import { API_PATH } from "../../../../constants"
import { type IGetActiveNudgeResponse } from "@/types/application/application-nudge.type"
import { workspaceAdminNudgeKeys } from "@/constants/query-key"

export const useQueryGetActiveNudges = ({
  applicationId
}: {
  applicationId: string
}) => {
  return useQuery<IGetActiveNudgeResponse, ErrorResponse>({
    queryKey: workspaceAdminNudgeKeys.getActiveNudges(applicationId),
    queryFn: async () => {
      return getRequest<{ applicationId: string }, IGetActiveNudgeResponse>({
        path: API_PATH.workspaceAdmin.getActiveNudges(applicationId)
      })
    }
  })
}
