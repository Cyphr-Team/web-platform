import { FORMAT_DATE_MM_DD_YYYY } from "@/constants/date.constants"
import { createDateSchema, createNumberSchema } from "@/constants/validate"
import {
  Block,
  FieldType
} from "@/modules/form-template/components/templates/FormTemplate"
import {
  BINARY_VALUES,
  YES_NO_OPTIONS
} from "@/modules/loan-application/constants/form"
import { Option } from "@/types/common.type"
import * as z from "zod"

export const enum DebtFinancingField {
  DEBT_FINANCING_ID = "debtFinancingId",
  LIABILITY_ID = "liabilityId",
  APPLICATION_ID = "applicationId",
  PAYABLE_DAYS = "payableDays",
  STARTING_PAID_IN_CAPITAL = "startingPaidInCapital",
  HAS_OUTSTANDING_LOANS = "hasOutstandingLoans",
  DEBT_FINANCING = "debtFinancing",
  DEBT_FINANCING_NAME = "name",
  DEBT_FINANCING_LENDER_NAME = "lenderName",
  DEBT_FINANCING_TYPE = "type",
  DEBT_FINANCING_LOAN_DATE = "loanDate",
  DEBT_FINANCING_REMAINING_LOAN_BALANCE = "remainingLoanBalance",
  DEBT_FINANCING_TERMS_REMAINING = "termsRemaining",
  DEBT_FINANCING_ANNUAL_INTEREST_RATE = "annualInterestRate"
}

const DebtFinancingFormItemSchema = z.object({
  name: z.string().min(1, "This field is required"),
  lenderName: z.string().min(1, "This field is required"),
  type: z.string().min(1, "This field is required"),
  loanDate: createDateSchema(),
  remainingLoanBalance: createNumberSchema({ min: 1 }),
  termsRemaining: createNumberSchema({ coerce: true, max: 120 }),
  annualInterestRate: createNumberSchema({ max: 100 })
})

export const DebtFinancingFormSchema = z
  .object({
    [DebtFinancingField.DEBT_FINANCING_ID]: z.string().optional(),
    [DebtFinancingField.LIABILITY_ID]: z.string().optional(),
    [DebtFinancingField.APPLICATION_ID]: z.string().optional(),
    [DebtFinancingField.PAYABLE_DAYS]: z.string().min(1, "Please select one"),
    [DebtFinancingField.STARTING_PAID_IN_CAPITAL]: createNumberSchema(),
    [DebtFinancingField.HAS_OUTSTANDING_LOANS]: z
      .string()
      .min(1, "Please select one"),
    [DebtFinancingField.DEBT_FINANCING]: z.array(z.any())
  })
  .superRefine((data, ctx) => {
    if (data[DebtFinancingField.HAS_OUTSTANDING_LOANS] === BINARY_VALUES.YES) {
      const debtFinancingResult = z
        .array(DebtFinancingFormItemSchema)
        .safeParse(data[DebtFinancingField.DEBT_FINANCING])

      if (!debtFinancingResult.success) {
        debtFinancingResult.error.issues.forEach((issue) => {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: issue.message,
            path: [DebtFinancingField.DEBT_FINANCING, ...issue.path]
          })
        })
      }
    }
  })

export type DebtFinancingFormItemValue = z.infer<
  typeof DebtFinancingFormItemSchema
>

export type DebtFinancingFormValue = Omit<
  z.infer<typeof DebtFinancingFormSchema>,
  "debtFinancing"
> & { debtFinancing: DebtFinancingFormItemValue[] }

export const EMPTY_DEBT_FINANCING_ITEM: DebtFinancingFormItemValue = {
  type: "",
  name: "",
  lenderName: "",
  loanDate: "",
  remainingLoanBalance: 0,
  termsRemaining: 0,
  annualInterestRate: 0
}

export const DEBT_FINANCING_DEFAULT_VALUE = {
  [DebtFinancingField.PAYABLE_DAYS]: "",
  [DebtFinancingField.HAS_OUTSTANDING_LOANS]: "",
  [DebtFinancingField.DEBT_FINANCING]: [EMPTY_DEBT_FINANCING_ITEM]
}

export const PAYABLE_DAYS_OPTIONS = [
  {
    label: "Upon receipt",
    value: "-1"
  },
  {
    label: "Net 15 days",
    value: "15"
  },
  {
    label: "Net 30 days",
    value: "30"
  },
  {
    label: "Net 60 days",
    value: "60"
  },
  {
    label: "Net 90 days",
    value: "90"
  }
]

export const DEBT_FINANCING_TYPE_OPTIONS: Option[] = [
  {
    label: "Term loans",
    value: "term_loan"
  },
  {
    label: "SBA loan",
    value: "sba_loan"
  },
  {
    label: "Equipment financing",
    value: "equipment_financing"
  },
  {
    label: "Commercial real estate loan",
    value: "real_estate"
  },
  {
    label: "Other loan type",
    value: "other_loan_type"
  }
]

export const LiabilityFormBlocks: Block[] = [
  {
    name: DebtFinancingField.PAYABLE_DAYS,
    type: FieldType.SELECT,
    props: {
      label: "Days to pay",
      subtitle:
        "How long do you have to pay for your past purchases? (This can be an average - 30 days is common)",
      options: PAYABLE_DAYS_OPTIONS,
      styleProps: {
        labelClassName: "flex-1",
        subtitleClassName: "text-sm font-normal mt-1.5",
        inputClassName: "w-48"
      },
      isRowDirection: true,
      className: "space-y-0 gap-2",
      isHideErrorMessage: true
    }
  }
]

export const DebtFinancingFormBlocks: Block[] = [
  {
    name: DebtFinancingField.STARTING_PAID_IN_CAPITAL,
    type: FieldType.CURRENCY,
    props: {
      className: "gap-2 space-y-0",
      label:
        "How much money have you or others invested in the company as owners or in exchange for equity?",
      isRowDirection: true,
      placeholder: "Enter amount",
      prefixIcon: "$",
      styleProps: {
        labelClassName: "flex-1 leading-1",
        inputClassName: "w-40 text-sm"
      },
      isHideErrorMessage: true
    }
  },
  {
    name: DebtFinancingField.HAS_OUTSTANDING_LOANS,
    type: FieldType.SELECT,
    props: {
      className: "space-y-0 gap-2",
      label: "Does your business currently have outstanding loans?",
      subtitle:
        "(ex: term loan, revolving credit, equipment financing, debt financing, etc.)",
      options: YES_NO_OPTIONS,
      isRowDirection: true,
      styleProps: {
        labelClassName: "flex-1",
        subtitleClassName: "text-sm font-normal mt-1.5",
        inputClassName: "text-sm w-40"
      },
      isHideErrorMessage: true
    }
  }
]

export const DebtFinancingArrayFormBlocks: Block[] = [
  {
    name: DebtFinancingField.DEBT_FINANCING_NAME,
    type: FieldType.TEXT,
    props: {
      className: "gap-2 space-y-0",
      label: "Enter name of loan:",
      placeholder: "Name of loan",
      isRowDirection: true,
      styleProps: {
        inputClassName: "min-w-60"
      },
      isHideErrorMessage: true
    }
  },
  {
    name: DebtFinancingField.DEBT_FINANCING_LENDER_NAME,
    type: FieldType.TEXT,
    props: {
      className: "gap-2 space-y-0",
      label: "Enter name of Lender/Financial Institution:",
      placeholder: "Name of lender",
      isRowDirection: true,
      styleProps: {
        inputClassName: "min-w-60"
      },
      isHideErrorMessage: true
    }
  },
  {
    name: DebtFinancingField.DEBT_FINANCING_TYPE,
    type: FieldType.SELECT,
    props: {
      className: "gap-2 space-y-0",
      label: "Type of loan:",
      isRowDirection: true,
      placeholder: "Please select",
      options: DEBT_FINANCING_TYPE_OPTIONS,
      styleProps: {
        inputClassName: "max-w-60"
      },
      isHideErrorMessage: true
    }
  },
  {
    name: DebtFinancingField.DEBT_FINANCING_LOAN_DATE,
    type: FieldType.DATE,
    props: {
      className: "flex items-center space-y-0",
      label: "Date of loan:",
      placeholder: "MM/DD/YYYY",
      subtitle: "",
      isRowDirection: true,
      dateFormat: FORMAT_DATE_MM_DD_YYYY,
      styleProps: {
        labelClassName: "flex-1",
        calendarClassName: "max-w-60"
      },
      isHideErrorMessage: true
    }
  },
  {
    name: DebtFinancingField.DEBT_FINANCING_REMAINING_LOAN_BALANCE,
    type: FieldType.CURRENCY,
    props: {
      className: "gap-2 space-y-0",
      label: "Remaining loan balance:",
      isRowDirection: true,
      placeholder: "Remaining loan balance",
      prefixIcon: "$",
      styleProps: {
        inputClassName: "min-w-60 text-sm pl-6"
      },
      isHideErrorMessage: true
    }
  },
  {
    name: DebtFinancingField.DEBT_FINANCING_TERMS_REMAINING,
    type: FieldType.CURRENCY,
    props: {
      className: "gap-2 space-y-0",
      label: "Loan term remaining (in months):",
      isRowDirection: true,
      placeholder: "Loan term remaining",
      suffixIcon: "Months",
      styleProps: {
        suffixClassName: "border",
        inputClassName: "min-w-60 !pr-20 text-right max-w-60 text-sm"
      },
      isHideErrorMessage: true
    }
  },
  {
    name: DebtFinancingField.DEBT_FINANCING_ANNUAL_INTEREST_RATE,
    type: FieldType.CURRENCY,
    props: {
      className: "flex flex-row items-center justify-between",
      label: "Annual interest rate:",
      isRowDirection: true,
      placeholder: "Annual interest rate",
      suffixIcon: "%",
      styleProps: {
        inputClassName: "min-w-60 pr-11 text-sm"
      },
      isHideErrorMessage: true
    }
  }
]
