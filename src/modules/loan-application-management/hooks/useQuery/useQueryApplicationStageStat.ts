import { useQuery } from "@tanstack/react-query"
import { type IWorkspaceAdminApplicationStageStat } from "../../../../types/application/application-assign.type"
import { type ErrorResponse } from "react-router-dom"
import { workspaceAdminAssignJudge } from "../../../../constants/query-key"
import { getRequest } from "../../../../services/client.service"
import { API_PATH } from "../../../../constants"

export const useQueryApplicationStageStat = () => {
  return useQuery<IWorkspaceAdminApplicationStageStat, ErrorResponse>({
    queryKey: workspaceAdminAssignJudge.applicationStageStat(),
    queryFn: async () => {
      return getRequest({
        path: API_PATH.workspaceAdmin.applicationStageStat
      })
    }
  })
}
