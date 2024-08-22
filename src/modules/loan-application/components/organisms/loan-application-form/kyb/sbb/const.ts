import { EIN_PATTERN } from "@/constants"
import {
  Block,
  FieldType
} from "@/modules/form-template/components/templates/FormTemplate"
import { Option } from "@/types/common.type"
import * as z from "zod"

export const enum SbbKybFormFields {
  BUSINESS_NAME = "businessName",
  DBA = "dba", // DBA
  IS_SUBSIDIARY = "isSubsidiary",
  PARENT_COMPANY = "parentCompany", // Parent Company
  BUSINESS_STREET_ADDRESS = "businessStreetAddress",
  EIN = "ein", // EIN
  BUSINESS_WEBSITE = "businessWebsite",
  INDUSTRY_TYPE = "industryType",
  YEARS_IN_OPERATION = "yearsInOperation", // Number of years operated
  CUSTOMER_TYPE = "customerType",
  TOTAL_NUMBER_OF_EMPLOYEES = "totalNumberOfEmployees",
  NUMBER_OF_W2_EMPLOYEES = "numberOfW2Employees",
  INVOLVED_IN_WEAPONS_SALES = "involvedInWeaponsSales",
  IS_HOLDING_COMPANY = "isHoldingCompany",
  OWNED_BY_TRUST = "ownedByTrust",
  CBD_RELATED_BUSINESS = "cbdRelatedBusiness",
  MARIJUANA_RELATED_BUSINESS = "marijuanaRelatedBusiness",
  POLITICAL_ORG_CONTRIBUTOR = "politicalOrgContributor",
  // PART TWO
  EXPECTED_ANNUAL_SALES = "expectedAnnualSales",
  EXPECTED_DEPOSITED_AMOUNT = "expectedDepositedAmount",
  REGULAR_CASH_DEPOSITS_WITHDRAWALS = "regularCashDepositsWithdrawals",
  PAYMENT_METHODS = "paymentMethods",
  IS_SELF_DIRECTED_IRA_ACCOUNT = "selfDirectedIraAccount",
  MONTHLY_DEPOSIT_AMOUNT = "monthlyDepositAmount",
  WILL_RECEIVE_INTERNATIONAL_PAYMENTS = "willReceiveInternationalPayments",
  WILL_SEND_WIRE_TRANSFERS = "willSendWireTransfers",
  WILL_RECEIVE_INTERNATIONAL_WIRE_TRANSFERS = "willReceiveInternationalWireTransfers",
  WILL_SEND_ELECTRONIC_TRANSFERS = "willSendElectronicTransfers",
  WILL_RECEIVE_ELECTRONIC_TRANSFERS = "willReceiveElectronicTransfers",
  WILL_RECEIVE_WIRE_TRANSFERS = "willReceiveWireTransfers",
  IS_MONEY_SERVICE_BUSINESS = "isMoneyServiceBusiness",
  IS_OWNS_AND_OPERATES_ATMS = "isOwnsAndOperatesATMs",
  IS_INVOLVED_IN_GAMBLING = "isInvolvedInGambling",
  IS_ALLOW_THIRD_PARTY_SLOT_MACHINES = "isAllowThirdPartySlotMachines",
  IS_SENIOR_FOREIGN_POLITICAL_FIGURE = "isSeniorForeignPoliticalFigure"
}

export const sbbKybFormSchemaPartOne = z.object({
  [SbbKybFormFields.BUSINESS_NAME]: z
    .string()
    .min(1, { message: "Business name is required" }),
  [SbbKybFormFields.DBA]: z.string(),
  [SbbKybFormFields.PARENT_COMPANY]: z.string(),
  [SbbKybFormFields.BUSINESS_STREET_ADDRESS]: z.string(),
  [SbbKybFormFields.EIN]: z.string().min(10, { message: "EIN is required" }),
  [SbbKybFormFields.BUSINESS_WEBSITE]: z.string(),
  [SbbKybFormFields.INDUSTRY_TYPE]: z
    .string()
    .min(1, { message: "Industry type is required" }),
  [SbbKybFormFields.YEARS_IN_OPERATION]: z.string().min(1, {
    message: "Years in operation is required"
  }),
  [SbbKybFormFields.CUSTOMER_TYPE]: z.string().min(1, {
    message: "Customer type is required"
  }),
  [SbbKybFormFields.TOTAL_NUMBER_OF_EMPLOYEES]: z.string().min(1, {
    message: "Total number of employees is required"
  }),
  [SbbKybFormFields.NUMBER_OF_W2_EMPLOYEES]: z.string().min(1, {
    message: "Number of W2 employees is required"
  }),
  [SbbKybFormFields.INVOLVED_IN_WEAPONS_SALES]: z.boolean(),
  [SbbKybFormFields.IS_HOLDING_COMPANY]: z.boolean(),
  [SbbKybFormFields.OWNED_BY_TRUST]: z.boolean(),
  [SbbKybFormFields.CBD_RELATED_BUSINESS]: z.boolean(),
  [SbbKybFormFields.MARIJUANA_RELATED_BUSINESS]: z.boolean(),
  [SbbKybFormFields.POLITICAL_ORG_CONTRIBUTOR]: z.boolean()
})

export const sbbKybFormSchemaPartTwo = z.object({
  [SbbKybFormFields.EXPECTED_ANNUAL_SALES]: z.string().min(1, {
    message: "This field is required"
  }),
  [SbbKybFormFields.EXPECTED_DEPOSITED_AMOUNT]: z.string().min(1, {
    message: "This field is required"
  }),
  [SbbKybFormFields.REGULAR_CASH_DEPOSITS_WITHDRAWALS]: z.string().min(1, {
    message: "This field is required"
  }),
  [SbbKybFormFields.PAYMENT_METHODS]: z.array(z.string().min(1)),
  [SbbKybFormFields.IS_SELF_DIRECTED_IRA_ACCOUNT]: z.boolean(),
  [SbbKybFormFields.MONTHLY_DEPOSIT_AMOUNT]: z.string().min(1, {
    message: "This field is required"
  }),
  [SbbKybFormFields.WILL_RECEIVE_INTERNATIONAL_PAYMENTS]: z.boolean(),
  [SbbKybFormFields.WILL_SEND_WIRE_TRANSFERS]: z.boolean(),
  [SbbKybFormFields.WILL_RECEIVE_INTERNATIONAL_WIRE_TRANSFERS]: z.boolean(),
  [SbbKybFormFields.WILL_SEND_ELECTRONIC_TRANSFERS]: z.boolean(),
  [SbbKybFormFields.WILL_RECEIVE_ELECTRONIC_TRANSFERS]: z.boolean(),
  [SbbKybFormFields.IS_MONEY_SERVICE_BUSINESS]: z.boolean(),
  [SbbKybFormFields.IS_OWNS_AND_OPERATES_ATMS]: z.boolean(),
  [SbbKybFormFields.IS_INVOLVED_IN_GAMBLING]: z.boolean(),
  [SbbKybFormFields.IS_ALLOW_THIRD_PARTY_SLOT_MACHINES]: z.boolean(),
  [SbbKybFormFields.IS_SENIOR_FOREIGN_POLITICAL_FIGURE]: z.boolean()
})

export type SbbKybFormPartOneValue = z.infer<typeof sbbKybFormSchemaPartOne>

export type SbbKybFormPartTwoValue = z.infer<typeof sbbKybFormSchemaPartTwo>

const YEARS_IN_OPERATION_OPTIONS = [
  {
    label: "Less than a year",
    value: "LESS_THAN_A_YEAR"
  },
  {
    label: "1-5 years",
    value: "1_TO_5_YEARS"
  },
  {
    label: "More than 5 years",
    value: "MORE_THAN_5_YEARS"
  }
]

const CUSTOMER_TYPE_OPTIONS = [
  {
    label: "Businesses",
    value: "BUSINESSES"
  },
  {
    label: "Consumers",
    value: "CONSUMERS"
  }
]

const INDUSTRY_TYPE_OPTIONS = [
  {
    label: "Agriculture, forestry, and hunting",
    value: "AGRICULTURE"
  },
  {
    label: "Mining",
    value: "MINING"
  },
  {
    label: "Utilities",
    value: "UTILITIES"
  },
  {
    label: "Construction",
    value: "CONSTRUCTION"
  },
  {
    label: "Manufacturing",
    value: "MANUFACTURING"
  },
  {
    label: "Wholesale trade",
    value: "WHOLESALE_TRADE"
  },
  {
    label: "Retail trade",
    value: "RETAIL_TRADE"
  },
  {
    label: "Transportation and warehousing",
    value: "TRANSPORTATION"
  },
  {
    label: "Finance and insurance",
    value: "FINANCE"
  },
  {
    label: "Real estate rental and leasing",
    value: "REAL_ESTATE"
  },
  {
    label: "Professional, scientific, and technical services",
    value: "PROFESSIONAL"
  },
  {
    label: "Management of companies and enterprises",
    value: "MANAGEMENT"
  },
  {
    label:
      "Administrative and support and waste management and remediation services",
    value: "ADMINISTRATIVE"
  },
  {
    label: "Educational services",
    value: "EDUCATIONAL"
  },
  {
    label: "Health, healthcare and social assistance",
    value: "HEALTH_CARE"
  },
  {
    label: "Arts, entertainment, and recreation",
    value: "ARTS"
  },
  {
    label: "Accommodation and food services",
    value: "ACCOMMODATION"
  },
  {
    label: "Other services (except public administrations)",
    value: "OTHER"
  },
  {
    label: "Public administration",
    value: "PUBLIC_ADMINISTRATION"
  }
]

const W2_EMPLOYEES_OPTIONS = [
  {
    label: "Less than 5",
    value: "LESS_THAN_5"
  },
  {
    label: "5-10",
    value: "5_TO_10"
  },
  {
    label: "Greater than 10",
    value: "GREATER_THAN_10"
  }
]
export const YES_NO_OPTIONS: Option[] = [
  {
    label: "Yes",
    value: "YES"
  },
  {
    label: "No",
    value: "NO"
  }
]

const OPTION_SELECT_BLOCK = [
  {
    type: FieldType.SELECT,
    name: SbbKybFormFields.YEARS_IN_OPERATION,
    props: {
      label: "How many years has the business been operating?",
      placeholder: "Please select",
      className: "col-span-12 flex justify-between items-center",
      options: YEARS_IN_OPERATION_OPTIONS,
      required: true
    }
  },
  {
    type: FieldType.SELECT,
    name: SbbKybFormFields.CUSTOMER_TYPE,
    props: {
      label: "What type of customers does the business cater to?",
      placeholder: "Please select",
      className: "col-span-12 flex justify-between items-center",
      options: CUSTOMER_TYPE_OPTIONS,
      required: true
    }
  },
  {
    type: FieldType.NUMBER,
    name: SbbKybFormFields.TOTAL_NUMBER_OF_EMPLOYEES,
    props: {
      label: "How many employees does your business currently have?",
      placeholder: "i.e 15",
      className: "col-span-12 flex justify-between items-center",
      required: true
    }
  },
  {
    type: FieldType.SELECT,
    name: SbbKybFormFields.NUMBER_OF_W2_EMPLOYEES,
    props: {
      label:
        "How many W2 or 1099 employees does your business have, excluding owners?",
      placeholder: "Please select",
      className: "col-span-12 flex justify-between items-center",
      required: true,
      options: W2_EMPLOYEES_OPTIONS
    }
  }
].map((block) => ({
  ...block,
  props: {
    ...block.props,
    className: "col-span-12 flex justify-between items-center gap-4",
    required: true,
    styleProps: {
      inputClassName: "!max-w-40",
      labelClassName: "leading-normal"
    }
  }
}))

const YES_NO_QUESTIONS_BLOCK = [
  {
    type: FieldType.SELECT,
    name: SbbKybFormFields.INVOLVED_IN_WEAPONS_SALES,
    props: {
      label: "Does your business sell weapons online?"
    }
  },
  {
    type: FieldType.SELECT,
    name: SbbKybFormFields.OWNED_BY_TRUST,
    props: {
      label: "Is the business owned by a trust?"
    }
  },
  {
    type: FieldType.SELECT,
    name: SbbKybFormFields.IS_HOLDING_COMPANY,
    props: {
      label: "Is the business a holding company?"
    }
  },
  {
    type: FieldType.SELECT,
    name: SbbKybFormFields.CBD_RELATED_BUSINESS,
    props: {
      label: "Does the business sell, purchase or distribute CBD/hemp products?"
    }
  },
  {
    type: FieldType.SELECT,
    name: SbbKybFormFields.MARIJUANA_RELATED_BUSINESS,
    props: {
      label:
        "Does the business sell, purchase, or distribute marijuana products that are not legal in all 50 US States?"
    }
  },
  {
    type: FieldType.SELECT,
    name: SbbKybFormFields.POLITICAL_ORG_CONTRIBUTOR,
    props: {
      label:
        "Does the business make large contributions to political organizations?"
    }
  }
].map((block) => ({
  ...block,
  props: {
    ...block.props,
    className: "col-span-12 flex justify-between items-center",
    options: YES_NO_OPTIONS,
    required: true,
    placeholder: "Please select",
    styleProps: {
      inputClassName: "!max-w-40",
      labelClassName: "leading-normal"
    }
  }
}))

export const SBB_KYB_FORM_BLOCKS_PART_ONE: Block[] = [
  {
    type: FieldType.TEXT,
    name: SbbKybFormFields.BUSINESS_NAME,
    props: {
      label: "Business legal name",
      placeholder: "Business legal name",
      className: "col-span-7",
      required: true
    }
  },
  {
    type: FieldType.TEXT,
    name: SbbKybFormFields.DBA,
    props: {
      label: "DBA (if applicable)",
      placeholder: "DBA",
      className: "col-span-5"
    }
  },
  {
    type: FieldType.OPTION,
    name: SbbKybFormFields.IS_SUBSIDIARY,
    props: {
      label: "Is your business a subsidiary of another business?",
      className: "col-span-12",
      required: true,
      options: YES_NO_OPTIONS
    }
  },
  {
    type: FieldType.TEXT,
    name: SbbKybFormFields.BUSINESS_STREET_ADDRESS,
    props: {
      label: "Business street address",
      placeholder: "Business street address",
      className: "col-span-12",
      required: true
    }
  },
  {
    type: FieldType.MASK,
    name: SbbKybFormFields.EIN,
    props: {
      label: "Employer Identification Number (EIN)",
      placeholder: "i.e: 12-3456789",
      className: "col-span-6",
      required: true,
      pattern: EIN_PATTERN
    }
  },
  {
    type: FieldType.TEXT,
    name: SbbKybFormFields.BUSINESS_WEBSITE,
    props: {
      label: "Business website",
      placeholder: "Business website",
      className: "col-span-6"
    }
  },
  {
    type: FieldType.SELECT,
    name: SbbKybFormFields.INDUSTRY_TYPE,
    props: {
      label: "What industry does the business serve?",
      placeholder: "Please select",
      className: "col-span-12",
      options: INDUSTRY_TYPE_OPTIONS,
      required: true
    }
  },
  ...OPTION_SELECT_BLOCK,
  ...YES_NO_QUESTIONS_BLOCK
]

const EXPECTED_ANNUAL_SALES_OPTIONS = [
  {
    label: "Less than $50,000",
    value: "LESS_THAN_50K"
  },
  {
    label: "$50,000 - $100,000",
    value: "50K_TO_100K"
  },
  {
    label: "$100,000 - $500,000",
    value: "100K_TO_500K"
  },
  {
    label: "$500,000 - $1,000,000",
    value: "500K_TO_1M"
  },
  {
    label: "Over $1,000,000",
    value: "OVER_1M"
  }
]

const EXPECTED_DEPOSITED_AMOUNT_OPTIONS = [
  {
    label: "Less than half",
    value: "LESS_THAN_HALF"
  },
  {
    label: "All",
    value: "ALL"
  }
]

const PAYMENT_METHODS_OPTIONS = [
  {
    label: "Cash",
    value: "CASH"
  },
  {
    label: "Wire Transfer",
    value: "WIRE_TRANSFER"
  },
  {
    label: "Electronic Transfer (ACH)",
    value: "ELECTRONIC_TRANSFER"
  },
  {
    label: "Check",
    value: "CHECK"
  }
]

const YES_NO_QUESTIONS_BLOCK_PART_TWO = [
  {
    type: FieldType.SELECT,
    name: SbbKybFormFields.WILL_RECEIVE_INTERNATIONAL_PAYMENTS,
    props: {
      label: "Will the business receive international payments?",
      className: "col-span-12",
      required: true
    }
  },
  {
    type: FieldType.SELECT,
    name: SbbKybFormFields.WILL_RECEIVE_INTERNATIONAL_WIRE_TRANSFERS,
    props: {
      label: "Will the business receive international wire transfers?",
      className: "col-span-12",
      required: true
    }
  },
  {
    type: FieldType.SELECT,
    name: SbbKybFormFields.WILL_SEND_WIRE_TRANSFERS,
    props: {
      label: "Will the business send wire transfers?",
      className: "col-span-12",
      required: true
    }
  },
  {
    type: FieldType.SELECT,
    name: SbbKybFormFields.WILL_RECEIVE_WIRE_TRANSFERS,
    props: {
      label: "Will the business receive wire transfers?",
      className: "col-span-12",
      required: true
    }
  },
  {
    type: FieldType.SELECT,
    name: SbbKybFormFields.WILL_RECEIVE_ELECTRONIC_TRANSFERS,
    props: {
      label: "Will the business receive electronic transfers (ACH)?",
      className: "col-span-12",
      required: true
    }
  },
  {
    type: FieldType.SELECT,
    name: SbbKybFormFields.WILL_SEND_ELECTRONIC_TRANSFERS,
    props: {
      label: "Will the business send electronic transfers?",
      className: "col-span-12",
      required: true
    }
  },
  {
    type: FieldType.SELECT,
    name: SbbKybFormFields.IS_MONEY_SERVICE_BUSINESS,
    props: {
      label:
        "To your knowledge is the business a Money Service Business (MSB)? ",
      className: "col-span-12",
      description:
        "Money service businesses provide money orderand check cashing services to their customers.",
      required: true
    }
  },
  {
    type: FieldType.SELECT,
    name: SbbKybFormFields.IS_OWNS_AND_OPERATES_ATMS,
    props: {
      label:
        "Does the business own and operate automated teller machines (ATM)?",
      className: "col-span-12",
      required: true
    }
  },
  {
    type: FieldType.SELECT,
    name: SbbKybFormFields.IS_INVOLVED_IN_GAMBLING,
    props: {
      label: "Is the business involved in gambling?",
      className: "col-span-12",
      required: true
    }
  },
  {
    type: FieldType.SELECT,
    name: SbbKybFormFields.IS_ALLOW_THIRD_PARTY_SLOT_MACHINES,
    props: {
      label:
        "Does your business allow third party companies with slot machines on your business property?",
      className: "col-span-12",
      required: true
    }
  },
  {
    type: FieldType.SELECT,
    name: SbbKybFormFields.IS_SENIOR_FOREIGN_POLITICAL_FIGURE,
    props: {
      label:
        "Are you or anyone associated with the business a senior foreign political figure, an immediate family member, or a close associate of a senior foreign political figure?",
      className: "col-span-12",
      required: true
    }
  }
].map((block) => ({
  ...block,
  props: {
    ...block.props,
    options: YES_NO_OPTIONS,
    className: "col-span-12 flex justify-between items-center",
    placeholder: "Please select",
    styleProps: {
      inputClassName: "!max-w-40",
      labelClassName: "leading-normal"
    }
  }
}))

export const SBB_KYB_FORM_BLOCKS_PART_TWO: Block[] = [
  {
    type: FieldType.SELECT,
    name: SbbKybFormFields.EXPECTED_ANNUAL_SALES,
    props: {
      label: "What are the business's expected annual sales?",
      className: "col-span-12 flex justify-between items-center",
      required: true,
      options: EXPECTED_ANNUAL_SALES_OPTIONS,
      styleProps: {
        inputClassName: "!max-w-40",
        labelClassName: "leading-normal"
      }
    }
  },
  {
    type: FieldType.SELECT,
    name: SbbKybFormFields.EXPECTED_DEPOSITED_AMOUNT,
    props: {
      label:
        "What amount of those sales do you expect to be deposited into your SBB account?",
      className: "col-span-12 flex justify-between items-center gap-4",
      required: true,
      options: EXPECTED_DEPOSITED_AMOUNT_OPTIONS,
      styleProps: {
        inputClassName: "!max-w-40",
        labelClassName: "leading-normal"
      }
    }
  },
  {
    type: FieldType.OPTION,
    name: SbbKybFormFields.REGULAR_CASH_DEPOSITS_WITHDRAWALS,
    props: {
      label:
        "Do you anticipate the regular deposit or withdrawal of cash with this SBB account?",
      className: "col-span-12",
      required: true,
      options: YES_NO_OPTIONS
    }
  },
  {
    type: FieldType.MULTI_SELECT,
    name: SbbKybFormFields.PAYMENT_METHODS,
    props: {
      label: "How do you receive payments? (you may select all that apply)",
      className: "col-span-12",
      required: true,
      options: PAYMENT_METHODS_OPTIONS
    }
  },
  {
    type: FieldType.SELECT,
    name: SbbKybFormFields.IS_SELF_DIRECTED_IRA_ACCOUNT,
    props: {
      label:
        "Is the account opened with the intention of being a self-directed IRA account?",
      className: "col-span-12 flex justify-between items-center",
      required: true,
      options: YES_NO_OPTIONS,
      styleProps: {
        inputClassName: "!max-w-40",
        labelClassName: "leading-normal"
      }
    }
  },
  {
    type: FieldType.SELECT,
    name: SbbKybFormFields.MONTHLY_DEPOSIT_AMOUNT,
    props: {
      label: "How much will be deposited into your SBB account each month?",
      className: "col-span-12 flex justify-between items-center",
      required: true,
      options: EXPECTED_ANNUAL_SALES_OPTIONS,
      styleProps: {
        inputClassName: "!max-w-40",
        labelClassName: "leading-normal"
      }
    }
  },
  ...YES_NO_QUESTIONS_BLOCK_PART_TWO
]
