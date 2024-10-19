import { API_PATH } from "@/constants"
import { QUERY_KEY } from "@/modules/notification/constants"
import { getRequest } from "@/services/client.service"
import { type ErrorResponse, type ListResponse } from "@/types/common.type"
import { type Institution } from "@/types/institution.type"
import { useQuery } from "@tanstack/react-query"

type ListInstitution = ListResponse<Institution>

export const useQueryGetListInstitution = ({
  enabled
}: {
  enabled: boolean
}) => {
  return useQuery<ListInstitution, ErrorResponse>({
    queryKey: [QUERY_KEY.LIST_INSTITUTION],
    queryFn: () => {
      return getRequest({
        path: API_PATH.institution.list
      })
    },
    enabled
  })
}
