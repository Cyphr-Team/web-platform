import { AverageApprovedLoanSizeResponse } from "@/modules/dashboard-v2/types/stats.types"

export const averageApprovedLoanSizeDummyData = {
  averageApprovedLoanSize: [
    {
      date: "2024-02-01",
      value: {
        cyphrLoan: 12953,
        cyphrMicro: 8614.33
      } as unknown
    },
    {
      date: "2024-03-01",
      value: {
        cyphrLoan: 5176.5,
        cyphrMicro: 17554.5
      } as unknown
    },
    {
      date: "2024-04-01",
      value: {
        cyphrLoan: 8966.5,
        cyphrMicro: 12808
      } as unknown
    }
  ]
} as AverageApprovedLoanSizeResponse
