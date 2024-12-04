import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { QUERY_KEY } from "../../constants/dashboard.constants"
import { type Usage } from "@/types/usage.type.ts"

export const useQueryGetInstitutionUsage = () => {
  return useQuery<Usage>({
    queryKey: [QUERY_KEY.INSTITUTION_USAGE],
    queryFn: () => {
      return getRequest({
        path: API_PATH.dashboardV1.getInstitutionUsage()
      })
    },
    placeholderData: keepPreviousData
  })
}
