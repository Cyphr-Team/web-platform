import { IOptionWithOther, Option } from "@/types/common.type"
import { get } from "lodash"
import { ExecutionFormRequest, ExecutionFormResponse } from "./type"
import { ExecutionFormValue } from "@/modules/loan-application/constants/form"

export const enum LAUNCH_KC_EXECUTION_FIELD_NAMES {
  ID = "id",
  LOAN_APPLICATION_ID = "loanApplicationId",
  MONTHLY_EXPENSE_RANGE = "monthlyExpenseRange",
  GROWTH_METRIC = "growthMetric",
  RECENT_MILESTONE = "recentMilestone",
  NEXT_MILESTONE = "nextMilestone",
  GREATEST_CHALLENGE = "greatestChallenge",
  BUSINESS_STAGE = "businessStage",
  BUSINESS_MODEL = "businessModels",
  BUSINESS_MODEL_OTHER_TEXT = "businessModelsOtherText",
  PARTNERSHIP_TYPE = "partnershipTypes",
  FUNDING_SOURCES = "fundingSources",
  FOUNDERS = "founders"
}

export const questions = [
  {
    question: "What metrics do you use to measure the growth of your business?",
    field: LAUNCH_KC_EXECUTION_FIELD_NAMES.GROWTH_METRIC
  },
  {
    question:
      "What is the most recent product development or traction milestone you have achieved?",
    field: LAUNCH_KC_EXECUTION_FIELD_NAMES.RECENT_MILESTONE
  },
  {
    question:
      "What is the next milestone for your business and how long will it take you to reach it?",
    field: LAUNCH_KC_EXECUTION_FIELD_NAMES.NEXT_MILESTONE
  },
  {
    question:
      "What are the greatest near-term challenges facing your company? How do you plan to confront them?",
    field: LAUNCH_KC_EXECUTION_FIELD_NAMES.GREATEST_CHALLENGE
  }
]

export const businessStage: Option[] = [
  {
    label: "Idea stage",
    value: "idea"
  },
  {
    label: "Developing a minimum viable product (MVP)",
    value: "mvp"
  },
  {
    label: "Launched MVP to early adopters and pilot partners",
    value: "pilot_launch"
  },
  {
    label:
      "Between MVP and having a whole product ready for a full commercial launch",
    value: "beta"
  },
  {
    label:
      "Developed a scalable business model and go-to-market strategy, now scaling sales and marketing efforts to generate significant revenue",
    value: "growth"
  }
]

export const jobTypes: Option[] = [
  {
    label: "Full-time",
    value: "full_time"
  },
  {
    label: "Part-time",
    value: "part_time"
  }
]

export const BUSINESS_MODEL_OTHER_OPTION = "other"
export const businessModel: IOptionWithOther[] = [
  {
    label: "Business model",
    value: "business_model"
  },
  {
    label: "Strategy",
    value: "strategy"
  },
  {
    label: "Human resources",
    value: "human_resource"
  },
  {
    label: "Financial modeling",
    value: "financial"
  },
  {
    label: "Marketing",
    value: "marketing"
  },
  {
    label: "Other",
    value: BUSINESS_MODEL_OTHER_OPTION,
    otherFieldName: LAUNCH_KC_EXECUTION_FIELD_NAMES.BUSINESS_MODEL_OTHER_TEXT
  }
]

export const partnershipType: Option[] = [
  {
    label: "Joint ventures",
    value: "joint_venture"
  },
  {
    label: "Marketing alliances",
    value: "marketing_alliance"
  },
  {
    label: "Licensing arrangements",
    value: "licensing_arrangement"
  },
  {
    label: "Selling/distribution agreements",
    value: "distribution_agreement"
  },
  {
    label: "Channel partnerships",
    value: "channel_partnership"
  },
  {
    label: "Software partnerships",
    value: "software_partnership"
  }
]

export const monthlyExpenseRangeOptions: Option[] = [
  {
    label: "No revenue",
    value: "no_revenue"
  },
  {
    label: "$1 - $1,000",
    value: "one_to_one_thousand"
  },
  {
    label: "$1,001 - $3,000",
    value: "one_thousand_one_to_three_thousands"
  },
  {
    label: "$3,001 - $6,000",
    value: "three_thousands_one_to_six_thousands"
  },
  {
    label: "$6,001 - $10,000",
    value: "six_thousands_one_to_ten_thousands"
  },
  {
    label: "$10,001 - $15,000",
    value: "ten_thousands_one_to_fifteen_thousands"
  },
  {
    label: "More than $15,000",
    value: "more_than_fifteen_thousands"
  }
]

export const fundingSourcesOptions: Option[] = [
  {
    label: "Bootstrapped",
    value: "bootstrapped"
  },
  {
    label: "Bank loans",
    value: "bank_loan"
  },
  {
    label: "Friends and family",
    value: "friends_and_family"
  },
  {
    label: "Venture capital",
    value: "venture_capital"
  },
  {
    label: "Angel investors",
    value: "angel_investors"
  },
  {
    label: "Crowdfunding",
    value: "crowdfunding"
  },
  {
    label: "Debt",
    value: "debt"
  },
  {
    label: "Non-dilutive grant",
    value: "non_dilutive_grants"
  },

  {
    label: "Startup/Pitch competitions",
    value: "startup_competitions"
  }
]

export const getLabelByValue = (value: string, options: Option[]) => {
  const option = options.find((opt) => opt.value === value)
  return option?.label ?? ""
}

export const getLabelsByValues = (values: string[], options: Option[]) => {
  return values.map((value) => getLabelByValue(value, options))
}

export const getOptionsByField = (field: string) => {
  switch (field) {
    case LAUNCH_KC_EXECUTION_FIELD_NAMES.BUSINESS_STAGE:
      return businessStage
    case LAUNCH_KC_EXECUTION_FIELD_NAMES.BUSINESS_MODEL:
      return businessModel
    case LAUNCH_KC_EXECUTION_FIELD_NAMES.PARTNERSHIP_TYPE:
      return partnershipType
    case LAUNCH_KC_EXECUTION_FIELD_NAMES.MONTHLY_EXPENSE_RANGE:
      return monthlyExpenseRangeOptions
    case LAUNCH_KC_EXECUTION_FIELD_NAMES.FUNDING_SOURCES:
      return fundingSourcesOptions
    default:
      return []
  }
}

// TODO: we've won... but at what cost?
export const transformExecutionResponseToForm = (
  data: ExecutionFormResponse
): ExecutionFormValue => {
  const otherOption = data?.businessModels?.find(
    (val) => val?.businessModel?.startsWith(BUSINESS_MODEL_OTHER_OPTION)
  )

  return {
    ...data,
    id: get(data, "id", ""),
    businessModels: data?.businessModels.map(
      (businessModel) => businessModel?.businessModel
    ),
    businessModelsOtherText: otherOption?.otherMessage ?? ""
  }
}

export function transformExecutionFormToRequest(
  data: ExecutionFormValue
): ExecutionFormRequest {
  const formatted = { ...data }
  return {
    ...formatted,
    businessModelsOtherText: undefined,
    businessModels: getBusinessModels({
      businessModels: formatted.businessModels,
      otherMessage: data.businessModelsOtherText
    })
  }
}

interface GetBusinessModelsProps {
  businessModels: string[]
  otherMessage?: string
}

const getBusinessModels = ({
  businessModels,
  otherMessage
}: GetBusinessModelsProps) => {
  return businessModels.map((businessModel) => ({
    businessModel,
    otherMessage:
      businessModel === BUSINESS_MODEL_OTHER_OPTION ? otherMessage : undefined
  }))
}
