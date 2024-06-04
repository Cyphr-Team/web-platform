import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { ListResponse, PaginateParams } from "@/types/common.type"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { createSearchParams } from "react-router-dom"

import { whitelistedUserKeys } from "@/constants/query-key"
import { WhitelistedUser } from "@/types/user.type"

type ListWhitelistedUsersResponse = ListResponse<WhitelistedUser>

type Params = PaginateParams

export const useQueryWhitelistedUsers = ({ limit, offset }: Params) => {
  return useQuery<ListWhitelistedUsersResponse>({
    queryKey: whitelistedUserKeys.list(
      createSearchParams({
        limit: limit.toString(),
        offset: offset.toString()
      }).toString()
    ),
    queryFn: async () => {
      const response = await postRequest<Params, ListWhitelistedUsersResponse>({
        path: API_PATH.whitelistedUser.all,
        data: {
          limit,
          offset
        }
      })

      return response.data
    },
    placeholderData: keepPreviousData
  })
}
