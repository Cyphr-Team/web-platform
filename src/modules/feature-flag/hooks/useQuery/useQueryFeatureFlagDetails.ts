import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { FeatureFlag } from "../../../../types/feature-flag.types"
import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { featureFlagKeys } from "@/constants/query-key"

type Params = {
  id: string
}

export const useQueryFeatureFlagDetails = (id: string) => {
  return useQuery<FeatureFlag>({
    queryKey: featureFlagKeys.detail(id),
    queryFn: async () => {
      const response = await getRequest<Params, FeatureFlag>({
        path: API_PATH.featureFlag.detail(id)
      })

      return response
    },
    enabled: !!id.length,
    placeholderData: keepPreviousData
  })
}
