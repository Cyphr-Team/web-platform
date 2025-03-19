import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { userKeys } from "@/constants/query-key.ts"
import { createSearchParams, type Params } from "react-router-dom"
import { type UserDetailInfo } from "@/types/user.type.ts"

type User = UserDetailInfo

export const useQueryGetUser = ({ id }: Params) => {
  return useQuery<User>({
    queryKey: userKeys.detail(createSearchParams(id).toString()),
    queryFn: async () => {
      return await getRequest<Params, User>({
        path: API_PATH.admin.user.get,
        params: { id }
      })
    },
    placeholderData: keepPreviousData
  })
}
