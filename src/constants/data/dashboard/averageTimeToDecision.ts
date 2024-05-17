import { AverageTimeToDecisionResponse } from "@/modules/dashboard-v2/types/stats.types"

export const averageTimeToDecisionDummyData = {
  averageTimeToDecision: [
    {
      data: {
        decision: 10.78,
        approval: 10.6,
        denial: 11
      } as unknown,
      date: "2024-02-01"
    },
    {
      data: {
        decision: 20,
        approval: 23.25,
        denial: 17.4
      } as unknown,
      date: "2024-03-01"
    },
    {
      data: {
        decision: 18.8,
        approval: 23,
        denial: 14.6
      } as unknown,
      date: "2024-04-01"
    }
  ]
} as AverageTimeToDecisionResponse
