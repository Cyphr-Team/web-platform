import {
  ForecastPeriod,
  ForecastType
} from "@/modules/loan-application/[module]-financial-projection/types/financial-projection-forecast"

export const MOCK_HISTORICAL_INCOME_STATEMENT_DATA = {
  financialForecastSetupId: "abc",
  data: [
    {
      forecastType: ForecastType.BILLABLE_HOUR,
      forecastData: [
        {
          value: 1875.0,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 1913.0,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 1951.0,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    },
    {
      forecastType: ForecastType.CONTRACT_REVENUE,
      forecastData: [
        {
          value: 0.0,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 0.0,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 0.0,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    },
    {
      forecastType: ForecastType.DEPRECIATION,
      forecastData: [
        {
          value: 0.0,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 0.0,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 0.0,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    },
    {
      forecastType: ForecastType.DIRECT_COST_REVENUE,
      forecastData: [
        {
          value: 0.0,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 0.0,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 195.0,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    },
    {
      forecastType: ForecastType.EBIT,
      forecastData: [
        {
          value: -23125.0,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: -36087.0,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: -36244.0,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    },
    {
      forecastType: ForecastType.EBITDA,
      forecastData: [
        {
          value: -23125.0,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: -36087.0,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: -36244.0,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    },
    {
      forecastType: ForecastType.GROSS_PROFIT,
      forecastData: [
        {
          value: 1875.0,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 1913.0,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 1756.0,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    },
    {
      forecastType: ForecastType.GROSS_PROFIT_MARGIN,
      forecastData: [
        {
          value: 1.0,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 1.0,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 0.9,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    },
    {
      forecastType: ForecastType.INTEREST_EXPENSE,
      forecastData: [
        {
          value: 0.0,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 0.0,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 0.0,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    },
    {
      forecastType: ForecastType.NET_INCOME,
      forecastData: [
        {
          value: -23125.0,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: -36087.0,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: -36244.0,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    },
    {
      forecastType: ForecastType.NET_PROFIT_MARGIN,
      forecastData: [
        {
          value: -12.3333,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: -18.8693,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: -18.5797,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    },
    {
      forecastType: ForecastType.OPERATING_EXPENSES,
      forecastData: [
        {
          value: 15000.0,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 28000.0,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 28000.0,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    },
    {
      forecastType: ForecastType.RECURRING_CHARGE,
      forecastData: [
        {
          value: 0.0,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 0.0,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 0.0,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    },
    {
      forecastType: ForecastType.REVENUE,
      forecastData: [
        {
          value: 1875.0,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 1913.0,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 1951.0,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    },
    {
      forecastType: ForecastType.SALARIES_AND_BENEFITS,
      forecastData: [
        {
          value: 10000.0,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 10000.0,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 10000.0,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    },
    {
      forecastType: ForecastType.TAXES,
      forecastData: [
        {
          value: 0.0,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 0.0,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 0.0,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    },
    {
      forecastType: ForecastType.TOTAL_OPERATING_EXPENSES,
      forecastData: [
        {
          value: 25000.0,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 38000.0,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 38000.0,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    },
    {
      forecastType: ForecastType.UNIT_SALE,
      forecastData: [
        {
          value: 0.0,
          forecastDate: "01/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 0.0,
          forecastDate: "02/28/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        },
        {
          value: 0.0,
          forecastDate: "03/31/2025",
          forecastPeriod: ForecastPeriod.MONTHLY
        }
      ]
    }
  ]
}
