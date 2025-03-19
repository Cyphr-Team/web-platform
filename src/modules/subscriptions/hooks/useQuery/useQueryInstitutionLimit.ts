import { API_PATH } from "@/constants"
import { subscriptionKeys } from "@/constants/query-key"
import { getRequest } from "@/services/client.service"
import { type Usage } from "@/types/usage.type"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { createSearchParams } from "react-router-dom"

interface Params {
  institutionId?: string
}

export const useQueryInstitutionLimit = ({ institutionId = "" }: Params) => {
  return useQuery<Usage>({
    queryKey: subscriptionKeys.list(
      createSearchParams({
        institutionId: institutionId.toString()
      }).toString()
    ),
    queryFn: async () => {
      const response = await getRequest<Params, Usage>({
        path: API_PATH.plan.institutionUsage(institutionId)
      })

      return response
    },
    placeholderData: keepPreviousData,
    enabled: !!institutionId
  })
}
