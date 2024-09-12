import { useQuery } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type.ts"
import {
  ForecastingSetupField,
  ForecastingSetupFormValue
} from "@/modules/loan-application/[module]-financial-projection/types/forecasting-form.ts"
import { QUERY_KEY } from "@/modules/loan-application/constants/query-key.ts"
import { get } from "lodash"
import { getRequest } from "@/services/client.service.ts"
import { API_PATH } from "@/constants"

type QueryForecastingSetupRequest = {
  applicationId?: string
}

type QueryForecastingSetupByIdResponse = ForecastingSetupFormValue & {
  id: string
}

export const useQueryForecastingSetup = (
  request: QueryForecastingSetupRequest
) => {
  const query = useQuery<QueryForecastingSetupByIdResponse, ErrorResponse>({
    queryKey: [QUERY_KEY.GET_FORECASTING_SETUP_FORM, request.applicationId],
    queryFn: () => {
      return getRequest({
        path: API_PATH.financialProjection.forecastingSetup.findById,
        params: { applicationId: request.applicationId }
      })
    },
    enabled: !!request.applicationId
  })

  return {
    ...query,
    data: format(query.data)
  }
}

function format(
  data?: QueryForecastingSetupByIdResponse
): ForecastingSetupFormValue {
  return {
    [ForecastingSetupField.ID]: get(data, "id", ""),
    [ForecastingSetupField.FIRST_YEAR_OF_FORECAST]: get(
      data,
      ForecastingSetupField.FIRST_YEAR_OF_FORECAST,
      ""
    ).toString(),
    [ForecastingSetupField.LENGTH_OF_FORECAST]: get(
      data,
      ForecastingSetupField.LENGTH_OF_FORECAST,
      ""
    ).toString()
  }
}
