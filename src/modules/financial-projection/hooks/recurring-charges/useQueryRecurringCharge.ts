import { useQuery } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type.ts"
import { QUERY_KEY } from "@/modules/financial-projection/constants/query-key.ts"
import { getRequest } from "@/services/client.service.ts"
import { API_PATH } from "@/constants"
import { RecurringCharge } from "@/modules/financial-projection/types"
import { useEffect } from "react"
import { useFinancialToolkitStore } from "@/modules/financial-projection/store/useFinancialToolkitStore.ts"

type QueryRecurringChargeByIdRequest = {
  id: string
}

type QueryRecurringChargeByIdResponse = RecurringCharge

export const useQueryRecurringChargeById = (
  request: QueryRecurringChargeByIdRequest
) => {
  return useQuery<QueryRecurringChargeByIdResponse, ErrorResponse>({
    queryKey: [QUERY_KEY.RECURRING_CHARGE, request.id],
    queryFn: () => {
      return getRequest({
        path: API_PATH.financialProjection.recurringCharges.findById,
        params: { id: request.id }
      })
    },
    // TODO: fix me when BE is done
    enabled: false
  })
}

type QueryRecurringChargeFinancialProjectionIdRequest = {
  financialProjectionId: string
}

type QueryRecurringChargeFinancialProjectionIdResponse = {
  form: RecurringCharge[]
}

export const useQueryRecurringChargeFinancialProjectionId = (
  request: QueryRecurringChargeFinancialProjectionIdRequest
) => {
  const { setRecurringCharges: setData } = useFinancialToolkitStore.use.action()

  const { data, ...other } = useQuery<
    QueryRecurringChargeFinancialProjectionIdResponse,
    ErrorResponse
  >({
    queryKey: [QUERY_KEY.RECURRING_CHARGE, request.financialProjectionId],
    queryFn: () => {
      return getRequest({
        path: API_PATH.financialProjection.recurringCharges
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
