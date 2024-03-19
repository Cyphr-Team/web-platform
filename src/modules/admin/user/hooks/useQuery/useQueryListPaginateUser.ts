import { API_PATH } from "@/constants"
import { userKeys } from "@/constants/query-key"
import { getRequest } from "@/services/client.service"
import { ListResponse, PaginateParams } from "@/types/common.type"
import { UserDetailInfo } from "@/types/user.type"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { createSearchParams } from "react-router-dom"

type ListUserResponse = ListResponse<UserDetailInfo>

type Params = PaginateParams

export const useQueryListPaginateUser = ({ limit, offset }: Params) => {
  return useQuery<ListUserResponse>({
    queryKey: userKeys.list(
      createSearchParams({
        limit: limit.toString(),
        offset: offset.toString()
      }).toString()
    ),
    queryFn: async () => {
      const response = await getRequest<Params, ListUserResponse>({
        path: API_PATH.admin.user.list(),
        params: { limit, offset }
      })
      return response
    },
    placeholderData: keepPreviousData
  })
}
