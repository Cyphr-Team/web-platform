import { API_PATH } from "@/constants"
import { QUERY_KEY } from "@/modules/notification/constants"
import { getRequest } from "@/services/client.service"
import { type ErrorResponse } from "@/types/common.type"
import { type Institution } from "@/types/institution.type"
import { useQuery } from "@tanstack/react-query"

export const useQueryGetListAllInstitution = ({
  enabled
}: {
  enabled: boolean
}) => {
  return useQuery<Institution[], ErrorResponse>({
    queryKey: [QUERY_KEY.LIST_ALL_INSTITUTIONS],
    queryFn: () => {
      return getRequest({
        path: API_PATH.institution.listAll
      })
    },
    enabled
  })
}
