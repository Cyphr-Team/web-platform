import { API_PATH } from "@/constants"
import { invitationKeys } from "@/constants/query-key"
import { getRequest } from "@/services/client.service"
import { type ListResponse, type PaginateParams } from "@/types/common.type"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { createSearchParams } from "react-router-dom"
import { type Invitation } from "@/types/invitation.type.ts"

type ListInvitationResponse = ListResponse<Invitation>

type Params = PaginateParams

export const useQueryListPaginateInvitation = ({ limit, offset }: Params) => {
  return useQuery<ListInvitationResponse>({
    queryKey: invitationKeys.list(
      createSearchParams({
        limit: limit.toString(),
        offset: offset.toString()
      }).toString()
    ),
    queryFn: async () => {
      const response = await getRequest<Params, ListInvitationResponse>({
        path: API_PATH.admin.invitation.list,
        params: { limit, offset }
      })

      return response
    },
    placeholderData: keepPreviousData
  })
}
