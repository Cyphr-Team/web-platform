import {
  revenueLastMonthOptions,
  revenueToDateOptions
} from "@/modules/loan-application/constants/options"
import { BusinessModelFormResponse } from "./type"

export const questions = [
  {
    question: "What is your total revenue to date?",
    field: "revenueToDate",
    options: revenueToDateOptions
  },
  {
    question: "What was your total revenue last month?",
    field: "revenueLastMonth",
    options: revenueLastMonthOptions
  },
  {
    question: "What was your total revenue in 2023?",
    field: "revenueLastYear",
    options: revenueLastMonthOptions
  }
]

export const strategies = [
  {
    label: "To operate and grow in a single market (city or state)",
    value: "operate_and_grow_in_single_market"
  },
  {
    label:
      "To grow in a single market initially and then expand to other markets",
    value: "grow_in_single_market_then_expand"
  },
  {
    label: "To continue growing my national (US) operations",
    value: "grow_national_operations"
  },
  {
    label:
      "To continue operating nationally and grow internationally in the future",
    value: "grow_internationally_in_future"
  },
  {
    label: "To continue growing internationally",
    value: "grow_internationally"
  },
  {
    label: "Other",
    value: "other"
  }
]

export const FAKE_DATA = {
  id: "1",
  revenueToDate: revenueToDateOptions.find((r) => r.value === "1-5000")?.label,
  revenueLastMonth: revenueLastMonthOptions.find((r) => r.value === "1-5000")
    ?.label,
  revenueLastYear: revenueLastMonthOptions.find((r) => r.value === "1-5000")
    ?.label,
  howDoYouMakeMoney: "I make money by selling products",
  nearTermGrowthStrategy: strategies.find(
    (s) => s.value === "grow_national_operations"
  )?.label
} as BusinessModelFormResponse
