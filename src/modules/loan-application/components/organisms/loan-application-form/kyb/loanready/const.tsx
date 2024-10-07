import { Option } from "@/types/common.type"

export const enum LoanReadyKYBFieldName {
  BUSINESS_LEGAL_NAME = "businessLegalName",
  DBA = "dba",
  ADDRESS_LINE1 = "addressLine1",
  CITY = "city",
  STATE = "state",
  POSTAL_CODE = "postalCode",
  EIN = "businessTin",
  BUSINESS_WEBSITE = "businessWebsite",
  BUSINESS_STAGE = "businessStage",
  INDUSTRY_TYPE = "industryType",
  BUSINESS_DESCRIPTION = "businessDescription"
}

export const enum LoanReadyKYCFieldName {
  PERSONAL_CREDIT_SCORE = "personalCreditScore"
}

// Define an enum for business stage values
export enum BusinessStageValue {
  IDEA_STAGE = "idea_stage",
  STARTUP = "startup",
  GROWTH = "growth",
  ESTABLISHED = "established",
  EXPANSION = "expansion",
  MATURE = "mature"
}

// Update the BusinessStage type to use the enum
type BusinessStage = {
  value: BusinessStageValue
  title: string
  description: string
}

// Update the business stages data to use the enum
const BUSINESS_STAGES: BusinessStage[] = [
  {
    value: BusinessStageValue.IDEA_STAGE,
    title: "Idea stage",
    description: "Conceptualization and validation of the business idea."
  },
  {
    value: BusinessStageValue.STARTUP,
    title: "Startup",
    description: "Launching initial operations and product/service offerings."
  },
  {
    value: BusinessStageValue.GROWTH,
    title: "Growth",
    description:
      "Expanding the business, increasing market share, and scaling operations."
  },
  {
    value: BusinessStageValue.ESTABLISHED,
    title: "Established",
    description:
      "A business with stable revenue streams and consistent operations."
  },
  {
    value: BusinessStageValue.EXPANSION,
    title: "Expansion",
    description:
      "Established and entering new markets and/or diversifying products or services."
  },
  {
    value: BusinessStageValue.MATURE,
    title: "Mature",
    description:
      "A well-established business with a strong market position, often facing slower growth."
  }
]

// Update the BusinessStageOption type to use the enum
type BusinessStageOption = {
  label: React.ReactNode
  value: BusinessStageValue
}

// The createLabel function remains the same
const createLabel = (stage: BusinessStage): React.ReactNode => (
  <div>
    <span className="font-semibold">{stage.title}:</span> {stage.description}
  </div>
)

// Create the options array using the enum
export const BUSINESS_STAGE_OPTIONS: BusinessStageOption[] =
  BUSINESS_STAGES.map((stage) => ({
    label: createLabel(stage),
    value: stage.value
  }))

export enum PersonalCreditScoreValue {
  Range1 = "range_1",
  Range2 = "range_2",
  Range3 = "range_3",
  Range4 = "range_4",
  Range5 = "range_5"
}

export const PERSONAL_CREDIT_SCORE_OPTIONS: Option<PersonalCreditScoreValue>[] =
  [
    { label: "Below 600", value: PersonalCreditScoreValue.Range1 },
    { label: "600-649", value: PersonalCreditScoreValue.Range2 },
    { label: "650-699", value: PersonalCreditScoreValue.Range3 },
    { label: "700-749", value: PersonalCreditScoreValue.Range4 },
    { label: "750 and above", value: PersonalCreditScoreValue.Range5 }
  ]

export { BUSINESS_STAGES }
