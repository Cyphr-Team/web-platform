import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { whitelistUserKeys } from "@/constants/query-key"
import { type WhitelistedUser } from "@/types/user.type.ts"

interface Params {
  id: string
}

type ListWhitelistResponse = WhitelistedUser[]

export const useQueryWhitelistUsersByFeatureFlagId = (id: string) => {
  return useQuery<ListWhitelistResponse>({
    queryKey: whitelistUserKeys.detail(id),
    queryFn: async () => {
      return getRequest<Params, ListWhitelistResponse>({
        path: API_PATH.whitelistUser.detail(id)
      })
    },
    enabled: !!id?.length,
    placeholderData: keepPreviousData
  })
}
