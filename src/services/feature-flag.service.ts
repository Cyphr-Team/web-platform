import { flatten, get } from "lodash"
import { postRequest } from "./client.service"
import { FeatureFlag } from "@/types/feature-flag.types"
import { ListResponse } from "@/types/common.type"
import { API_PATH } from "@/constants"

export const featureFlagsManager = () => {
  const FEATURE_FLAGS_PER_PAGE = 200
  let featureFlags: FeatureFlag[] = []
  const getFeatureFlags = () => featureFlags

  const fetchMoreFeatureFlags = async (data: FeatureFlag[], count: number) => {
    const maxPage = Math.ceil((count - data.length) / FEATURE_FLAGS_PER_PAGE)
    const featureFlagsPromise = Array(maxPage)
      .fill(null)
      .map((_, page) => fetchFeatureFlags(page + 1))
    const upcomingFeatureFlags = await Promise.all(featureFlagsPromise)
    featureFlags = featureFlags.concat(
      flatten(upcomingFeatureFlags.map((item) => get(item, "data", [])))
    )
  }

  const handleFetchFeatureFlags = async () => {
    const response = await fetchFeatureFlags()
    const { data, total } = response
    featureFlags = data
    if (FEATURE_FLAGS_PER_PAGE < total) {
      fetchMoreFeatureFlags(data, total)
    }
  }

  const fetchFeatureFlags: (
    page?: number
  ) => Promise<ListResponse<FeatureFlag>> = async (page = 0) => {
    return postRequest({
      path: API_PATH.featureFlag.public,
      data: {
        offset: page,
        limit: FEATURE_FLAGS_PER_PAGE
      }
    }).then((res) => res.data as ListResponse<FeatureFlag>)
  }

  return {
    getFeatureFlags,
    handleFetchFeatureFlags
  }
}

export const featureFlagsService = featureFlagsManager()
