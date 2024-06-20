import { useQuery } from "@tanstack/react-query"
import { getRequest } from "@/services/client.service"
import { API_PATH } from "@/constants"
import { ErrorResponse } from "@/types/common.type.ts"
import { userKeys } from "@/constants/query-key.ts"
import { UserDetailInfo } from "@/types/user.type.ts"

type ListUserResponse = UserDetailInfo[]

interface ListUsersResponse {
  users: ListUserResponse
}

export const useQueryGetListUsersByInstitution = ({
  institutionId
}: {
  institutionId: string
}) => {
  return useQuery<ListUsersResponse, ErrorResponse>({
    queryKey: userKeys.detail(institutionId),
    queryFn: () => {
      return getRequest({
        path: API_PATH.admin.user.listUsersByInstitutionId,
        params: {
          id: institutionId
        }
      })
    },
    enabled: !!institutionId
  })
}
