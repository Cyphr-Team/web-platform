import { FormDetailsQueryProps } from "@/modules/loan-application/hooks/useQuery"
import { useQueryFormBySetupId } from "@/modules/loan-application/hooks/useQuery/useQueryFormBySetupId.ts"
import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key.ts"
import { API_PATH } from "@/constants"
import { ForecastResultsResponse } from "@/modules/loan-application/[module]-financial-projection/types/financial-projection-forecast.ts"

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
      financial_projection_setup_id: "758ea9b2-9ac0-4660-bf5f-0bf728bb9a2a",
      cash_flow_forecast_monthly: [
        {
          forecast_type: "beginningCash",
          forecast_data: [
            {
              value: 1000.0,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 7577087.0,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 1.0134093e7,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "changeInAccountPayable",
          forecast_data: [
            {
              value: 8666718.0,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 7363421.0,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 1.3868071e7,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "changeInAccountReceivable",
          forecast_data: [
            {
              value: 2.0142853e7,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 1.7151587e7,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 3.2302841e7,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "changeInCash",
          forecast_data: [
            {
              value: 7578087.0,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 2557005.0,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 4943457.0,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "changeInFixedAsset",
          forecast_data: [
            {
              value: 4042.0,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 0.0,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 0.0,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "changeInPaidInCapital",
          forecast_data: [
            {
              value: 0.0,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 3373.0,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 0.0,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "depreciation",
          forecast_data: [
            {
              value: 51.0,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 51.0,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 51.0,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "endingCash",
          forecast_data: [
            {
              value: 7577087.0,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 1.0134093e7,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 1.507755e7,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "longTermDebt",
          forecast_data: [
            {
              value: 8676.0,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 0.0,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 0.0,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "netIncome",
          forecast_data: [
            {
              value: 3902037.0,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 7227736.0,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 1.349126e7,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "repaymentOfDebt",
          forecast_data: [
            {
              value: 429.0,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 437.0,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 445.0,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "totalFinancingCashFlow",
          forecast_data: [
            {
              value: 0.0,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 3373.0,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 0.0,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "totalInvestingCashFlow",
          forecast_data: [
            {
              value: 4042.0,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 0.0,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 0.0,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "totalOperatingCashFlows",
          forecast_data: [
            {
              value: 7574045.0,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 2560378.0,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 4943457.0,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        }
      ],
      balance_sheet_forecast_monthly: [
        {
          forecast_type: "accountPayable",
          forecast_data: [
            {
              value: 8666718.0,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 1.603014e7,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 2.9898211e7,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "accountReceivable",
          forecast_data: [
            {
              value: 2.0142853e7,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 3.7294441e7,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 6.9597283e7,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "accumulatedDepreciation",
          forecast_data: [
            {
              value: 51.0,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 103.0,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 154.0,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "accumulatedRetainedEarnings",
          forecast_data: [
            {
              value: 3902037.0,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 1.1129773e7,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 2.4621034e7,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "cash",
          forecast_data: [
            {
              value: 7577087.0,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 1.0134093e7,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 1.507755e7,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "fixedAsset",
          forecast_data: [
            {
              value: 4042.0,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 4042.0,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 4042.0,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "longTermDebt",
          forecast_data: [
            {
              value: 3834.0,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 3684.0,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 3527.0,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "paidInCapital",
          forecast_data: [
            {
              value: 1000.0,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 4373.0,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 4373.0,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "totalAssets",
          forecast_data: [
            {
              value: 1.2569756e7,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 2.7164287e7,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 5.4523619e7,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "totalCurrentAssets",
          forecast_data: [
            {
              value: 1.2565765e7,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 2.7160348e7,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 5.4519732e7,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "totalEquity",
          forecast_data: [
            {
              value: 3903037.0,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 1.1134146e7,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 2.4625407e7,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "totalLiabilities",
          forecast_data: [
            {
              value: 8670552.0,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 1.6033824e7,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 2.9901738e7,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "totalLiabilityAndEquity",
          forecast_data: [
            {
              value: 1.257359e7,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 2.7167971e7,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 5.4527146e7,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        }
      ],
      income_statement_forecast_monthly: [
        {
          forecast_type: "billableHour",
          forecast_data: [
            {
              value: 1.8801312e7,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 3.5724372e7,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 6.7879881e7,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "contractRevenue",
          forecast_data: [
            {
              value: 4343.0,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 4343.0,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 4343.0,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "depreciation",
          forecast_data: [
            {
              value: 51.0,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 51.0,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 51.0,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "directCostRevenue",
          forecast_data: [
            {
              value: 5896101.0,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 1.0916615e7,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 2.0372119e7,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "ebit",
          forecast_data: [
            {
              value: 1.5671677e7,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 2.9027863e7,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 5.4182547e7,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "ebitda",
          forecast_data: [
            {
              value: 1.5671728e7,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 2.9027915e7,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 5.4182599e7,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "grossProfit",
          forecast_data: [
            {
              value: 1.5685527e7,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 2.9041714e7,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 5.4196398e7,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "grossProfitMargin",
          forecast_data: [
            {
              value: 0.73,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 0.73,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 0.73,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "interestExpense",
          forecast_data: [
            {
              value: 209.0,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 201.0,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 193.0,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "netIncome",
          forecast_data: [
            {
              value: 3902037.0,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 7227736.0,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 1.349126e7,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "netProfitMargin",
          forecast_data: [
            {
              value: 0.18,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 0.18,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 0.18,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "operatingExpenses",
          forecast_data: [
            {
              value: 12295.0,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 12295.0,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 12295.0,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "recurringCharge",
          forecast_data: [
            {
              value: 279009.0,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 558018.0,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 837027.0,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "revenue",
          forecast_data: [
            {
              value: 2.1581629e7,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 3.995833e7,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 7.4568517e7,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "salariesAndBenefits",
          forecast_data: [
            {
              value: 1504.0,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 1504.0,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 1504.0,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "taxes",
          forecast_data: [
            {
              value: 1.1769429e7,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 2.1799925e7,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 4.0691093e7,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "totalOperatingExpenses",
          forecast_data: [
            {
              value: 13799.0,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 13799.0,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 13799.0,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        },
        {
          forecast_type: "unitSale",
          forecast_data: [
            {
              value: 2496965.0,
              forecast_date: "09/29/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 3671596.0,
              forecast_date: "10/30/2024",
              forecast_period: "MONTHLY"
            },
            {
              value: 5847266.0,
              forecast_date: "11/29/2024",
              forecast_period: "MONTHLY"
            }
          ]
        }
      ],
      cash_flow_forecast_annually: [
        {
          forecast_type: "beginningCash",
          forecast_data: [
            {
              value: 1000.0,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 2.458934e7,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 4.5069300366e10,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "changeInAccountPayable",
          forecast_data: [
            {
              value: 5.6108229e7,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 1.20266835911e11,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 2.63190044804268e14,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "changeInAccountReceivable",
          forecast_data: [
            {
              value: 1.30648169e8,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 2.80137046245e11,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 6.13047488895872e14,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "changeInCash",
          forecast_data: [
            {
              value: 2.459034e7,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 4.5044711025e10,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 9.8673453445154e13,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "changeInFixedAsset",
          forecast_data: [
            {
              value: 4042.0,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 0.0,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 0.0,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "changeInPaidInCapital",
          forecast_data: [
            {
              value: 3373.0,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 0.0,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 0.0,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "depreciation",
          forecast_data: [
            {
              value: 206.0,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 619.0,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 619.0,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "endingCash",
          forecast_data: [
            {
              value: 2.458934e7,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 4.5069300366e10,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 9.871852274552e13,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "longTermDebt",
          forecast_data: [
            {
              value: 8676.0,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 0.0,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 0.0,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "netIncome",
          forecast_data: [
            {
              value: 4.9950062e7,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 1.14825498688e11,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 2.51183990645829e14,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "repaymentOfDebt",
          forecast_data: [
            {
              value: 1766.0,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 6281.0,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 628.0,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "totalFinancingCashFlow",
          forecast_data: [
            {
              value: 3373.0,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 0.0,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 0.0,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "totalInvestingCashFlow",
          forecast_data: [
            {
              value: 4042.0,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 0.0,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 0.0,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "totalOperatingCashFlows",
          forecast_data: [
            {
              value: 2.4589671e7,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 4.5044711025e10,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 9.8673453445154e13,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        }
      ],
      balance_sheet_forecast_annually: [
        {
          forecast_type: "accountPayable",
          forecast_data: [
            {
              value: 5.6108229e7,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 1.2032294414e11,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 2.63310367748409e14,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "accountReceivable",
          forecast_data: [
            {
              value: 1.30648169e8,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 2.80267694415e11,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 6.13327756590287e14,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "accumulatedDepreciation",
          forecast_data: [
            {
              value: 206.0,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 826.0,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 1446.0,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "accumulatedRetainedEarnings",
          forecast_data: [
            {
              value: 4.9950062e7,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 1.14875448751e11,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 2.5129886609458e14,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "cash",
          forecast_data: [
            {
              value: 2.458934e7,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 4.5069300366e10,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 9.871852274552e13,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "fixedAsset",
          forecast_data: [
            {
              value: 4042.0,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 4042.0,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 4042.0,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "longTermDebt",
          forecast_data: [
            {
              value: 3362.0,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 628.0,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 0.0,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "paidInCapital",
          forecast_data: [
            {
              value: 4373.0,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 4373.0,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 4373.0,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "totalAssets",
          forecast_data: [
            {
              value: 1.06062664e8,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 2.35198397264e11,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 5.14609233847363e14,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "totalCurrentAssets",
          forecast_data: [
            {
              value: 1.06058829e8,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 2.35198394049e11,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 5.14609233844767e14,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "totalEquity",
          forecast_data: [
            {
              value: 4.9954435e7,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 1.14875453124e11,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 2.51298866098953e14,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "totalLiabilities",
          forecast_data: [
            {
              value: 5.6111591e7,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 1.20322944768e11,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 2.63310367748409e14,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "totalLiabilityAndEquity",
          forecast_data: [
            {
              value: 1.06066026e8,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 2.35198397892e11,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 5.14609233847362e14,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        }
      ],
      income_statement_forecast_annually: [
        {
          forecast_type: "billableHour",
          forecast_data: [
            {
              value: 2.51384127e8,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 6.02732462323e11,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 1.334879544531258e15,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "contractRevenue",
          forecast_data: [
            {
              value: 17372.0,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 13029.0,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 0.0,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "depreciation",
          forecast_data: [
            {
              value: 206.0,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 619.0,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 619.0,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "directCostRevenue",
          forecast_data: [
            {
              value: 7.5427421e7,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 1.73342450307e11,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 3.79191318138597e14,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "ebit",
          forecast_data: [
            {
              value: 2.00605834e8,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 4.61146586659e11,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 1.008771046770586e15,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "ebitda",
          forecast_data: [
            {
              value: 2.0060604e8,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 4.61146587279e11,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 1.008771046771207e15,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "grossProfit",
          forecast_data: [
            {
              value: 2.00661237e8,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 4.61146752867e11,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 1.008771046936794e15,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "grossProfitMargin",
          forecast_data: [
            {
              value: 0.73,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 0.73,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 0.73,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "interestExpense",
          forecast_data: [
            {
              value: 790.0,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 1389.0,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 46.0,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "netIncome",
          forecast_data: [
            {
              value: 4.9950062e7,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 1.14825498688e11,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 2.51183990645829e14,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "netProfitMargin",
          forecast_data: [
            {
              value: 0.18,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 0.18,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 0.18,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "operatingExpenses",
          forecast_data: [
            {
              value: 49180.0,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 147540.0,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 147540.0,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "recurringCharge",
          forecast_data: [
            {
              value: 2790090.0,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 5.453613e7,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 1.54012105e8,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "revenue",
          forecast_data: [
            {
              value: 2.76088658e8,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 6.34489203175e11,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 1.387962365075392e15,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "salariesAndBenefits",
          forecast_data: [
            {
              value: 6016.0,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 18048.0,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 18048.0,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "taxes",
          forecast_data: [
            {
              value: 1.50654981e8,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 3.46321086581e11,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 7.5758705612471e14,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "totalOperatingExpenses",
          forecast_data: [
            {
              value: 55196.0,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 165588.0,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 165588.0,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        },
        {
          forecast_type: "unitSale",
          forecast_data: [
            {
              value: 2.1897068e7,
              forecast_date: "2024",
              forecast_period: "ANNUALLY"
            },
            {
              value: 3.1702191692e10,
              forecast_date: "2025",
              forecast_period: "ANNUALLY"
            },
            {
              value: 5.3082666532028e13,
              forecast_date: "2026",
              forecast_period: "ANNUALLY"
            }
          ]
        }
      ]
    }
  }
}
