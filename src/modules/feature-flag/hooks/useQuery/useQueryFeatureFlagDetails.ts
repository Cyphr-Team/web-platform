import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { FeatureFlag } from "@/types/feature-flag.types.ts"
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
      return await getRequest<Params, FeatureFlag>({
        path: API_PATH.featureFlag.detail(id)
      })
    },
    enabled: !!id.length,
    placeholderData: keepPreviousData
  })
}
