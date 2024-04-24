import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { ListResponse, PaginateParams } from "@/types/common.type"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { createSearchParams } from "react-router-dom"

import { featureFlagKeys } from "@/constants/query-key"
import { FeatureFlag } from "../../../../types/feature-flag.types"

type ListFeatureFlagsResponse = ListResponse<FeatureFlag>

type Params = PaginateParams

export const useQueryFeatureFlags = ({ limit, offset }: Params) => {
  return useQuery<ListFeatureFlagsResponse>({
    queryKey: featureFlagKeys.list(
      createSearchParams({
        limit: limit.toString(),
        offset: offset.toString()
      }).toString()
    ),
    queryFn: async () => {
      const response = await postRequest<Params, ListFeatureFlagsResponse>({
        path: API_PATH.featureFlag.list(),
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
