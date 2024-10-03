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
  const forecastGroup = data[sheetName]

  const forecast = forecastGroup.find(
    (item) => item.forecastType === forecastType
  )

  if (!forecast) {
    return []
  }

  return forecast.forecastData.map((item) => item.value)
}

export const useQueryFinancialProjectionForecast = ({
  applicationId,
  enabled
}: FormDetailsQueryProps) => {
  useQueryFormBySetupId<ForecastResultsResponse>({
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

  // TODO: remove dummy data
  return {
    isLoading: false,
    data: {
      balanceSheetForecastAnnually: [
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 56108229
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 120322944140
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 263310367748409
            }
          ],
          forecastType: "accountPayable"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 130648169
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 280267694415
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 613327756590287
            }
          ],
          forecastType: "accountReceivable"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 206
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 826
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 1446
            }
          ],
          forecastType: "accumulatedDepreciation"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 49950062
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 114875448751
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 251298866094580
            }
          ],
          forecastType: "accumulatedRetainedEarnings"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 24589340
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 45069300366
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 98718522745520
            }
          ],
          forecastType: "cash"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 4042
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 4042
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 4042
            }
          ],
          forecastType: "fixedAsset"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 3362
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 628
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 0
            }
          ],
          forecastType: "longTermDebt"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 4373
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 4373
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 4373
            }
          ],
          forecastType: "paidInCapital"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 106062664
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 235198397264
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 514609233847363
            }
          ],
          forecastType: "totalAssets"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 106058829
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 235198394049
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 514609233844767
            }
          ],
          forecastType: "totalCurrentAssets"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 49954435
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 114875453124
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 251298866098953
            }
          ],
          forecastType: "totalEquity"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 56111591
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 120322944768
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 263310367748409
            }
          ],
          forecastType: "totalLiabilities"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 106066026
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 235198397892
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 514609233847362
            }
          ],
          forecastType: "totalLiabilityAndEquity"
        }
      ],
      balanceSheetForecastMonthly: [
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 8666718
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 16030140
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 29898211
            }
          ],
          forecastType: "accountPayable"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 20142853
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 37294441
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 69597283
            }
          ],
          forecastType: "accountReceivable"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 51
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 103
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 154
            }
          ],
          forecastType: "accumulatedDepreciation"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 3902037
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 11129773
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 24621034
            }
          ],
          forecastType: "accumulatedRetainedEarnings"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 7577087
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 10134093
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 15077550
            }
          ],
          forecastType: "cash"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 4042
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 4042
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 4042
            }
          ],
          forecastType: "fixedAsset"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 3834
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 3684
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 3527
            }
          ],
          forecastType: "longTermDebt"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 1000
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 4373
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 4373
            }
          ],
          forecastType: "paidInCapital"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 12569756
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 27164287
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 54523619
            }
          ],
          forecastType: "totalAssets"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 12565765
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 27160348
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 54519732
            }
          ],
          forecastType: "totalCurrentAssets"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 3903037
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 11134146
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 24625407
            }
          ],
          forecastType: "totalEquity"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 8670552
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 16033824
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 29901738
            }
          ],
          forecastType: "totalLiabilities"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 12573590
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 27167971
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 54527146
            }
          ],
          forecastType: "totalLiabilityAndEquity"
        }
      ],
      cashFlowForecastAnnually: [
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 1000
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 24589340
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 45069300366
            }
          ],
          forecastType: "beginningCash"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 56108229
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 120266835911
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 263190044804268
            }
          ],
          forecastType: "changeInAccountPayable"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 130648169
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 280137046245
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 613047488895872
            }
          ],
          forecastType: "changeInAccountReceivable"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 24590340
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 45044711025
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 98673453445154
            }
          ],
          forecastType: "changeInCash"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 4042
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 0
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 0
            }
          ],
          forecastType: "changeInFixedAsset"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 3373
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 0
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 0
            }
          ],
          forecastType: "changeInPaidInCapital"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 206
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 619
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 619
            }
          ],
          forecastType: "depreciation"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 24589340
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 45069300366
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 98718522745520
            }
          ],
          forecastType: "endingCash"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 8676
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 0
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 0
            }
          ],
          forecastType: "longTermDebt"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 49950062
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 114825498688
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 251183990645829
            }
          ],
          forecastType: "netIncome"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 1766
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 6281
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 628
            }
          ],
          forecastType: "repaymentOfDebt"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 3373
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 0
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 0
            }
          ],
          forecastType: "totalFinancingCashFlow"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 4042
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 0
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 0
            }
          ],
          forecastType: "totalInvestingCashFlow"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 24589671
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 45044711025
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 98673453445154
            }
          ],
          forecastType: "totalOperatingCashFlows"
        }
      ],
      cashFlowForecastMonthly: [
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 1000
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 7577087
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 10134093
            }
          ],
          forecastType: "beginningCash"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 8666718
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 7363421
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 13868071
            }
          ],
          forecastType: "changeInAccountPayable"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 20142853
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 17151587
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 32302841
            }
          ],
          forecastType: "changeInAccountReceivable"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 7578087
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 2557005
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 4943457
            }
          ],
          forecastType: "changeInCash"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 4042
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 0
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 0
            }
          ],
          forecastType: "changeInFixedAsset"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 0
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 3373
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 0
            }
          ],
          forecastType: "changeInPaidInCapital"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 51
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 51
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 51
            }
          ],
          forecastType: "depreciation"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 7577087
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 10134093
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 15077550
            }
          ],
          forecastType: "endingCash"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 8676
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 0
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 0
            }
          ],
          forecastType: "longTermDebt"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 3902037
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 7227736
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 13491260
            }
          ],
          forecastType: "netIncome"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 429
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 437
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 445
            }
          ],
          forecastType: "repaymentOfDebt"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 0
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 3373
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 0
            }
          ],
          forecastType: "totalFinancingCashFlow"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 4042
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 0
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 0
            }
          ],
          forecastType: "totalInvestingCashFlow"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 7574045
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 2560378
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 4943457
            }
          ],
          forecastType: "totalOperatingCashFlows"
        }
      ],
      financialProjectionSetupId: "758ea9b2-9ac0-4660-bf5f-0bf728bb9a2a",
      incomeStatementForecastAnnually: [
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 251384127
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 602732462323
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 1334879544531258
            }
          ],
          forecastType: "billableHour"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 17372
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 13029
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 0
            }
          ],
          forecastType: "contractRevenue"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 206
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 619
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 619
            }
          ],
          forecastType: "depreciation"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 75427421
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 173342450307
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 379191318138597
            }
          ],
          forecastType: "directCostRevenue"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 200605834
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 461146586659
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 1008771046770586
            }
          ],
          forecastType: "ebit"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 200606040
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 461146587279
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 1008771046771207
            }
          ],
          forecastType: "ebitda"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 200661237
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 461146752867
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 1008771046936794
            }
          ],
          forecastType: "grossProfit"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 0.73
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 0.73
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 0.73
            }
          ],
          forecastType: "grossProfitMargin"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 790
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 1389
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 46
            }
          ],
          forecastType: "interestExpense"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 49950062
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 114825498688
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 251183990645829
            }
          ],
          forecastType: "netIncome"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 0.18
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 0.18
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 0.18
            }
          ],
          forecastType: "netProfitMargin"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 49180
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 147540
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 147540
            }
          ],
          forecastType: "operatingExpenses"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 2790090
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 54536130
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 154012105
            }
          ],
          forecastType: "recurringCharge"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 276088658
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 634489203175
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 1387962365075392
            }
          ],
          forecastType: "revenue"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 6016
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 18048
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 18048
            }
          ],
          forecastType: "salariesAndBenefits"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 150654981
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 346321086581
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 757587056124710
            }
          ],
          forecastType: "taxes"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 55196
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 165588
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 165588
            }
          ],
          forecastType: "totalOperatingExpenses"
        },
        {
          forecastData: [
            {
              forecastDate: "2024",
              forecastPeriod: "ANNUALLY",
              value: 21897068
            },
            {
              forecastDate: "2025",
              forecastPeriod: "ANNUALLY",
              value: 31702191692
            },
            {
              forecastDate: "2026",
              forecastPeriod: "ANNUALLY",
              value: 53082666532028
            }
          ],
          forecastType: "unitSale"
        }
      ],
      incomeStatementForecastMonthly: [
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 18801312
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 35724372
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 67879881
            }
          ],
          forecastType: "billableHour"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 4343
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 4343
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 4343
            }
          ],
          forecastType: "contractRevenue"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 51
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 51
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 51
            }
          ],
          forecastType: "depreciation"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 5896101
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 10916615
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 20372119
            }
          ],
          forecastType: "directCostRevenue"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 15671677
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 29027863
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 54182547
            }
          ],
          forecastType: "ebit"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 15671728
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 29027915
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 54182599
            }
          ],
          forecastType: "ebitda"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 15685527
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 29041714
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 54196398
            }
          ],
          forecastType: "grossProfit"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 0.73
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 0.73
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 0.73
            }
          ],
          forecastType: "grossProfitMargin"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 209
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 201
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 193
            }
          ],
          forecastType: "interestExpense"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 3902037
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 7227736
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 13491260
            }
          ],
          forecastType: "netIncome"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 0.18
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 0.18
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 0.18
            }
          ],
          forecastType: "netProfitMargin"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 12295
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 12295
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 12295
            }
          ],
          forecastType: "operatingExpenses"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 279009
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 558018
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 837027
            }
          ],
          forecastType: "recurringCharge"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 21581629
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 39958330
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 74568517
            }
          ],
          forecastType: "revenue"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 1504
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 1504
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 1504
            }
          ],
          forecastType: "salariesAndBenefits"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 11769429
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 21799925
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 40691093
            }
          ],
          forecastType: "taxes"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 13799
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 13799
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 13799
            }
          ],
          forecastType: "totalOperatingExpenses"
        },
        {
          forecastData: [
            {
              forecastDate: "09/29/2024",
              forecastPeriod: "MONTHLY",
              value: 2496965
            },
            {
              forecastDate: "10/30/2024",
              forecastPeriod: "MONTHLY",
              value: 3671596
            },
            {
              forecastDate: "11/29/2024",
              forecastPeriod: "MONTHLY",
              value: 5847266
            }
          ],
          forecastType: "unitSale"
        }
      ]
    } as unknown as ForecastResultsResponse
  }
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
    period === ForecastPeriod.ANNUALLY || ForecastPeriod.CURRENT
      ? `${sheetName}Annually`
      : `${sheetName}Monthly`

  const result: ForecastRowData = {} as ForecastRowData
  dataPoints.forEach((point) => {
    const data = parseForecastData(dataSource, source, point)
    result[point] = period === ForecastPeriod.CURRENT ? [data[0]] : data
  })

  return result
}
