import { API_PATH } from "@/constants"
import { userKeys } from "@/constants/query-key"
import { postRequest } from "@/services/client.service"
import { type ListResponse, type PaginateParams } from "@/types/common.type"
import { type UserDetailInfo } from "@/types/user.type"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { createSearchParams } from "react-router-dom"
import * as z from "zod"

type ListUserResponse = ListResponse<UserDetailInfo>

export const UserFilterSchema = z.object({
  institutionIds: z.array(z.object({ label: z.string(), value: z.string() }))
})

export type UserFilterValues = z.infer<typeof UserFilterSchema>

export interface FilterParams {
  institutionIds?: string[]
}

type Params = PaginateParams & Partial<FilterParams>

export const useQueryListPaginateUser = ({
  limit,
  offset,
  institutionIds
}: Params) => {
  return useQuery<ListUserResponse>({
    queryKey: userKeys.list(
      createSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
        institutionIds: institutionIds ?? []
      }).toString()
    ),
    queryFn: async () => {
      const response = await postRequest<Params, ListUserResponse>({
        path: API_PATH.admin.user.list(),
        data: {
          limit,
          offset,
          institutionIds: institutionIds?.length ? institutionIds : undefined
        }
      })

      return response.data
    },
    placeholderData: keepPreviousData
  })
}
