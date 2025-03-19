import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import {
  type SortOrder,
  type ListResponse,
  type PaginateParams
} from "@/types/common.type"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { featureFlagKeys } from "@/constants/query-key"
import { type FeatureFlag } from "../../../../types/feature-flag.types"
import { z } from "zod"

type ListFeatureFlagsResponse = ListResponse<FeatureFlag>

export const enum FormFieldNames {
  STATUS = "status",
  ROLLOUT_TYPE = "rolloutType"
}

interface FeatureFlagSort {
  key?: SortOrder
  description?: SortOrder
  createdAt?: SortOrder
  updatedAt?: SortOrder
}

export const FeatureFlagFilterSchema = z.object({
  status: z.array(z.object({ label: z.string(), value: z.string() })),
  search: z.string(),
  rolloutType: z.array(z.object({ label: z.string(), value: z.string() }))
})

export type FeatureFlagFilterValues = z.infer<typeof FeatureFlagFilterSchema>

interface FilterParams {
  status?: boolean[]
  rolloutType?: string[]
}

export type ListFeatureFlagParams = PaginateParams & {
  filter?: Partial<FilterParams>
} & {
  searchField?: string
} & {
  sort?: FeatureFlagSort
}

export const useQueryFeatureFlags = ({
  limit,
  offset,
  searchField,
  sort,
  filter
}: ListFeatureFlagParams) => {
  return useQuery<ListFeatureFlagsResponse>({
    queryKey: featureFlagKeys.list({
      limit,
      offset,
      sort,
      filter,
      searchField
    }),
    queryFn: async () => {
      const response = await postRequest<
        ListFeatureFlagParams,
        ListFeatureFlagsResponse
      >({
        path: API_PATH.featureFlag.list(),
        data: {
          limit,
          offset,
          searchField: searchField?.trim() ?? "",
          sort,
          filter
        }
      })

      return response.data
    },
    placeholderData: keepPreviousData
  })
}
