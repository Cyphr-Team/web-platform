import { API_PATH } from "@/constants"
import { QUERY_KEY } from "@/modules/notification/constants"
import { postRequest } from "@/services/client.service"
import { type UserDetailInfo } from "@/types/user.type.ts"
import { useQuery } from "@tanstack/react-query"

type ListUserResponse = UserDetailInfo[]

interface UserIdsParams {
  userIds: string[]
}

interface ListUsersResponse {
  users: ListUserResponse
}

export const useQueryGetUsersByIds = (userIds: string[]) => {
  return useQuery<ListUsersResponse>({
    queryKey: [QUERY_KEY.LIST_USERS_BY_USER_IDS, userIds],
    queryFn: async () => {
      const response = await postRequest<UserIdsParams, ListUsersResponse>({
        path: API_PATH.admin.user.listUsersByUserIds,
        data: { userIds }
      })

      return response.data
    },
    enabled: !!userIds.length
  })
}
