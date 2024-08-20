import { useQuery } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type.ts"
import { QUERY_KEY } from "@/modules/financial-projection/constants/query-key.ts"
import { getRequest } from "@/services/client.service.ts"
import { API_PATH } from "@/constants"
import { TransactionalMarketplaceRevenue } from "@/modules/financial-projection/types"
import { useEffect } from "react"
import { useFinancialToolkitStore } from "@/modules/financial-projection/store/useFinancialToolkitStore.ts"

type QueryTransactionalMarketplaceRevenueByIdRequest = {
  id: string
}

type QueryTransactionalMarketplaceRevenueByIdResponse =
  TransactionalMarketplaceRevenue

export const useQueryTransactionalMarketplaceRevenueById = (
  request: QueryTransactionalMarketplaceRevenueByIdRequest
) => {
  return useQuery<
    QueryTransactionalMarketplaceRevenueByIdResponse,
    ErrorResponse
  >({
    queryKey: [QUERY_KEY.TRANSACTIONAL_MARKETPLACE_REVENUE, request.id],
    queryFn: () => {
      return getRequest({
        path: API_PATH.financialProjection.revenueTransactional.findById,
        params: { id: request.id }
      })
    },
    // TODO: fix me when BE is done
    enabled: false
  })
}

type QueryTransactionalMarketplaceRevenueFinancialProjectionIdRequest = {
  financialProjectionId: string
}

type QueryTransactionalMarketplaceRevenueFinancialProjectionIdResponse = {
  form: TransactionalMarketplaceRevenue[]
}

export const useQueryTransactionalMarketplaceRevenueFinancialProjectionId = (
  request: QueryTransactionalMarketplaceRevenueFinancialProjectionIdRequest
) => {
  const { setTransactionalMarketplaceRevenue: setData } =
    useFinancialToolkitStore.use.action()

  const { data, ...other } = useQuery<
    QueryTransactionalMarketplaceRevenueFinancialProjectionIdResponse,
    ErrorResponse
  >({
    queryKey: [
      QUERY_KEY.TRANSACTIONAL_MARKETPLACE_REVENUE_LIST,
      request.financialProjectionId
    ],
    queryFn: () => {
      return getRequest({
        path: API_PATH.financialProjection.revenueTransactional
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
