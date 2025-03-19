import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { type ErrorResponse } from "@/types/common.type"
import { type UserDetailInfo } from "@/types/user.type"

export const useGetUserInformation = () => {
  return useQuery<UserDetailInfo, ErrorResponse>({
    queryKey: ["me"],
    queryFn: async () => {
      return getRequest({ path: API_PATH.users.me })
    }
  })
}
