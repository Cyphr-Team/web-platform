import { FormDetailsQueryProps } from "@/modules/loan-application/hooks/useQuery"
import { useQueryFormBySetupId } from "@/modules/loan-application/hooks/useQuery/useQueryFormBySetupId.ts"
import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key.ts"
import { API_PATH } from "@/constants"
import {
  ForecastPeriod,
  ForecastResultsResponse,
  ForecastType
} from "@/modules/loan-application/[module]-financial-projection/types/financial-projection-forecast.ts"
import { ForecastRowData } from "@/modules/loan-application/[module]-financial-projection/types"

export const useQueryFinancialProjectionForecast = ({
  applicationId,
  enabled
}: FormDetailsQueryProps) => {
  return useQueryFormBySetupId<ForecastResultsResponse>({
    setupId: applicationId,
    queryKey: [QUERY_KEY.GET_FORECAST_DATA, applicationId],
    enabled,
    path: API_PATH.financialProjection.forecast.index,
    options: {
      /**
       * Enable caching to avoid refetch
       * when useQueryFinancialProjectionForecast being use in multiple place
       * */
      refetchOnMount: false
    }
  })
}

type PossibleSheetName =
  | "cashFlowForecastMonthly"
  | "balanceSheetForecastMonthly"
  | "incomeStatementForecastMonthly"
  | "cashFlowForecastAnnually"
  | "balanceSheetForecastAnnually"
  | "incomeStatementForecastAnnually"

export function parseForecastData(
  data: ForecastResultsResponse,
  sheetName: PossibleSheetName,
  forecastType: ForecastType
): number[] {
  const forecastGroup = data[sheetName] ?? []
  const forecast = forecastGroup.find(
    (item) => item.forecastType === forecastType
  )

  if (!forecast) {
    return []
  }

  return forecast.forecastData.map((item) => item.value)
}

interface getDataPointsFactoryArgs {
  dataSource: ForecastResultsResponse
  sheetName:
    | "cashFlowForecast"
    | "incomeStatementForecast"
    | "balanceSheetForecast"
  dataPoints: ForecastType[]
  period: ForecastPeriod
}

export function getDataPointsFactory(
  args: getDataPointsFactoryArgs
): ForecastRowData {
  const { dataSource, sheetName, dataPoints, period } = args
  const source: PossibleSheetName =
    period === (ForecastPeriod.MONTHLY || ForecastPeriod.CURRENT)
      ? `${sheetName}Monthly`
      : `${sheetName}Annually`

  const result: ForecastRowData = {} as ForecastRowData
  dataPoints.forEach((point) => {
    const data = parseForecastData(dataSource, source, point)
    result[point] = period === ForecastPeriod.CURRENT ? [data[0]] : data
  })

  return result
}
