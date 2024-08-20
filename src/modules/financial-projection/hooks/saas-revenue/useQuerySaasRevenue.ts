import { useQuery } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type.ts"
import { QUERY_KEY } from "@/modules/financial-projection/constants/query-key.ts"
import { getRequest } from "@/services/client.service.ts"
import { API_PATH } from "@/constants"
import { SaasRevenue } from "@/modules/financial-projection/types"
import { useEffect } from "react"
import { useFinancialToolkitStore } from "@/modules/financial-projection/store/useFinancialToolkitStore.ts"

type QuerySaasRevenueByIdRequest = {
  id: string
}

type QuerySaasRevenueByIdResponse = SaasRevenue

export const useQuerySaasRevenueById = (
  request: QuerySaasRevenueByIdRequest
) => {
  return useQuery<QuerySaasRevenueByIdResponse, ErrorResponse>({
    queryKey: [QUERY_KEY.SAAS_REVENUE, request.id],
    queryFn: () => {
      return getRequest({
        path: API_PATH.financialProjection.saasRevenue.findById,
        params: { id: request.id }
      })
    },
    // TODO: fix me when BE is done
    enabled: false
  })
}

type QuerySaasRevenueFinancialProjectionIdRequest = {
  financialProjectionId: string
}

type QuerySaasRevenueFinancialProjectionIdResponse = {
  form: SaasRevenue[]
}

export const useQuerySaasRevenueFinancialProjectionId = (
  request: QuerySaasRevenueFinancialProjectionIdRequest
) => {
  const { setSaasRevenue: setData } = useFinancialToolkitStore.use.action()

  const { data, ...other } = useQuery<
    QuerySaasRevenueFinancialProjectionIdResponse,
    ErrorResponse
  >({
    queryKey: [QUERY_KEY.SAAS_REVENUE_LIST, request.financialProjectionId],
    queryFn: () => {
      return getRequest({
        path: API_PATH.financialProjection.saasRevenue
          .findByFinancialProjectionId,
        params: { financialProjectionId: request.financialProjectionId }
      })
    },
    // TODO: fix me when BE is done
    enabled: false
  })

  useEffect(() => {
    setData(data?.form ?? [])
  }, [data, setData])

  return { ...other }
}
