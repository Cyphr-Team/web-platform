import {
  revenueLastMonthOptions,
  revenueToDateOptions
} from "@/modules/loan-application/constants/options"

export const questions = [
  {
    question: "What is your total revenue to date?",
    field: "totalRevenueRange",
    options: revenueToDateOptions
  },
  {
    question: "What was your total revenue last month?",
    field: "lastMonthRevenueRange",
    options: revenueLastMonthOptions
  },
  {
    question: "What was your total revenue in 2023?",
    field: "lastYearRevenueRange",
    options: revenueLastMonthOptions
  }
]

export const strategies = [
  {
    label: "To operate and grow in a single market (city or state)",
    value: "operate_in_single_market"
  },
  {
    label:
      "To grow in a single market initially and then expand to other markets",
    value: "grow_in_single_market_and_expand"
  },
  {
    label: "To continue growing my national (US) operations",
    value: "continue_growing_national_operations"
  },
  {
    label:
      "To continue operating nationally and grow internationally in the future",
    value: "continue_operating_nationally_and_grow_internationally"
  },
  {
    label: "To continue growing internationally",
    value: "continue_growing_internationally"
  },
  {
    label: "Other",
    value: "other"
  }
]

export const getQuestionLabel = (field: string) => {
  return questions.find((item) => item.field === field)?.question ?? ""
}

export const getStrategyLabel = (value: string) => {
  return strategies.find((item) => item.value === value)?.label ?? ""
}
