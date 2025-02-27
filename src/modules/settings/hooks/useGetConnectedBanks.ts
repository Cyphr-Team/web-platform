import { useQuery } from "@tanstack/react-query"
import { type PostParams, postRequest } from "@/services/client.service.ts"
import { settingKeys } from "@/constants/query-key.ts"
import type { ConnectedApp } from "@/modules/settings/types"

interface GetConnectedBanksResponse {
  connectedBanks: ConnectedApp[]
}

const useGetConnectedBanks = () => {
  return useQuery<GetConnectedBanksResponse>({
    queryKey: settingKeys.connectedBanks,
    queryFn: async () => {
      return (
        await postRequest<
          PostParams<NonNullable<unknown>>,
          GetConnectedBanksResponse
        >({
          path: "api/plaid/item/connected-banks/by-user"
        })
      ).data
    }
  })
}

export default useGetConnectedBanks
