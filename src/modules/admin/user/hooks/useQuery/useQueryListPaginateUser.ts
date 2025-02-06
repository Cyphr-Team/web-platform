import { API_PATH } from "@/constants"
import { userKeys } from "@/constants/query-key"
import { postRequest } from "@/services/client.service"
import {
  type ListResponse,
  type PaginateParams,
  type SortOrder
} from "@/types/common.type"
import { type UserDetailInfo, UserRoles } from "@/types/user.type"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { createSearchParams } from "react-router-dom"
import * as z from "zod"

type ListUserResponse = ListResponse<UserDetailInfo>

export const UserFilterSchema = z.object({
  institutionIds: z.array(z.object({ label: z.string(), value: z.string() })),
  filter: z
    .object({
      roles: z.array(z.nativeEnum(UserRoles)).optional(),
      statuses: z
        .array(z.object({ label: z.string(), value: z.string() }))
        .optional(),
      accountTypes: z
        .array(z.object({ label: z.string(), value: z.string() }))
        .optional()
    })
    .optional()
})

export type UserFilterValues = z.infer<typeof UserFilterSchema>

export interface FilterParams {
  institutionIds?: string[]
  filter?: {
    roles?: UserRoles[]
    statuses?: string[]
    accountTypes?: string[]
  }
  sort?: {
    name?: SortOrder
    role?: SortOrder
    accountType?: SortOrder
    status?: SortOrder
    lastActive?: SortOrder
  }
  searchFieldByNameAndEmail?: string
}

type Params = PaginateParams & Partial<FilterParams>

export const useQueryListPaginateUser = ({
  limit,
  offset,
  institutionIds,
  filter,
  sort,
  searchFieldByNameAndEmail
}: Params) => {
  return useQuery<ListUserResponse>({
    queryKey: userKeys.list(
      createSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
        institutionIds: institutionIds ?? [],
        filter: createSearchParams(filter).toString(),
        sort: createSearchParams(sort).toString(),
        searchFieldByNameAndEmail: searchFieldByNameAndEmail ?? ""
      }).toString()
    ),
    queryFn: async () => {
      const response = await postRequest<Params, ListUserResponse>({
        path: API_PATH.admin.user.list(),
        data: {
          limit,
          offset,
          institutionIds: institutionIds?.length ? institutionIds : undefined,
          filter: filter,
          sort: sort,
          searchFieldByNameAndEmail: searchFieldByNameAndEmail
        }
      })

      return response.data
    },
    placeholderData: keepPreviousData
  })
}
