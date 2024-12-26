export const enum CapitalCollabKYBFieldName {
  BUSINESS_LEGAL_NAME = "businessLegalName",
  DBA = "dba",
  ADDRESS_LINE1 = "addressLine1",
  CITY = "city",
  STATE = "state",
  POSTAL_CODE = "postalCode",
  EIN = "businessTin",
  BUSINESS_INCEPTION_DATE = "businessInceptionDate",
  BUSINESS_MORE_THAN_ONE_BANK_ACCOUNT = "businessMoreThanOneBankAccount",
  BUSINESS_WEBSITE = "businessWebsite",
  BUSINESS_STAGE = "businessStage",
  INDUSTRY_TYPE = "industryType",
  BUSINESS_DESCRIPTION = "businessDescription",
  PROPERTY_LEASE_OR_OWN = "propertyLeaseOrOwn",
  PROPERTY_PAYMENT = "propertyPayment",
  LANDLORD_NAME = "landlordName",
  LANDLORD_PHONE = "landlordPhone",
  BALANCE_DAILY_OR_WEEKLY = "balanceDailyOrWeekly",
  BALANCE_TOTAL = "balanceTotal",
  CREDIT_CARD_THREE_MONTHS = "creditCardThreeMonths",
  CREDIT_CARD_AVERAGE_VOLUME = "creditCardAverageVolume",
  CREDIT_CARD_PROCESSOR = "creditCardProcessor"
}

export const enum CapitalCollabKYCFieldName {
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
interface BusinessStage {
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
interface BusinessStageOption {
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

// PROPERTY OPTIONS
enum PropertyValue {
  LEASE = "lease",
  OWN = "own"
}

const PROPERTY_OPTIONS = [
  {
    value: PropertyValue.LEASE,
    label: "Lease"
  },
  {
    value: PropertyValue.OWN,
    label: "Own"
  }
]

export { BUSINESS_STAGES, PROPERTY_OPTIONS }
