import { FORMAT_DATE_MM_DD_YYYY } from "@/constants/date.constants"
import { createDateSchema, createNumberSchema } from "@/constants/validate"
import {
  type Block,
  FieldType
} from "@/modules/form-template/components/templates/FormTemplate"
import {
  BINARY_VALUES,
  YES_NO_OPTIONS
} from "@/modules/loan-application/constants/form"
import { type Option } from "@/types/common.type"
import * as z from "zod"

export const enum DebtFinancingField {
  DebtFinancingId = "debtFinancingId",
  LiabilityId = "liabilityId",
  ApplicationId = "applicationId",
  PayableDays = "payableDays",
  StartingPaidInCapital = "startingPaidInCapital",
  HasOutstandingLoans = "hasOutstandingLoans",
  DebtFinancing = "debtFinancing",
  DebtFinancingName = "name",
  DebtFinancingLenderName = "lenderName",
  DebtFinancingType = "type",
  DebtFinancingLoanDate = "loanDate",
  DebtFinancingRemainingLoanBalance = "remainingLoanBalance",
  DebtFinancingTermsRemaining = "termsRemaining",
  DebtFinancingAnnualInterestRate = "annualInterestRate"
}

const DebtFinancingFormItemSchema = z.object({
  name: z.string().min(1, "This field is required"),
  lenderName: z.string().min(1, "This field is required"),
  type: z.string().min(1, "This field is required"),
  loanDate: createDateSchema(),
  remainingLoanBalance: createNumberSchema({ min: 1 }),
  termsRemaining: createNumberSchema({ coerce: true, max: 120 }),
  annualInterestRate: createNumberSchema({ max: 100, coerce: true })
})

export const DebtFinancingFormSchema = z
  .object({
    [DebtFinancingField.DebtFinancingId]: z.string().optional(),
    [DebtFinancingField.LiabilityId]: z.string().optional(),
    [DebtFinancingField.ApplicationId]: z.string().optional(),
    [DebtFinancingField.PayableDays]: z.string().min(1, "Please select one"),
    [DebtFinancingField.StartingPaidInCapital]: createNumberSchema(),
    [DebtFinancingField.HasOutstandingLoans]: z
      .string()
      .min(1, "Please select one"),
    [DebtFinancingField.DebtFinancing]: z.array(z.any())
  })
  .superRefine((data, ctx) => {
    if (data[DebtFinancingField.HasOutstandingLoans] === BINARY_VALUES.YES) {
      const debtFinancingResult = z
        .array(DebtFinancingFormItemSchema)
        .safeParse(data[DebtFinancingField.DebtFinancing])

      if (!debtFinancingResult.success) {
        debtFinancingResult.error.issues.forEach((issue) => {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: issue.message,
            path: [DebtFinancingField.DebtFinancing, ...issue.path]
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
  [DebtFinancingField.PayableDays]: "",
  [DebtFinancingField.HasOutstandingLoans]: "",
  [DebtFinancingField.DebtFinancing]: [EMPTY_DEBT_FINANCING_ITEM]
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
    name: DebtFinancingField.PayableDays,
    type: FieldType.SELECT,
    props: {
      label: "Days to pay",
      subtitle:
        "How long do you have to pay for your past purchases? (This can be an average - 30 days is common)",
      options: PAYABLE_DAYS_OPTIONS,
      styleProps: {
        labelClassName: "flex-1",
        subtitleClassName: "text-sm font-normal mt-1.5",
        inputClassName: "w-50"
      },
      isRowDirection: true,
      className: "space-y-0 gap-4",
      isHideErrorMessage: true
    }
  }
]

export const DebtFinancingFormBlocks: Block[] = [
  {
    name: DebtFinancingField.StartingPaidInCapital,
    type: FieldType.CURRENCY,
    props: {
      className: "gap-4 space-y-0",
      label:
        "How much money have you or others invested in the company as owners or in exchange for equity?",
      isRowDirection: true,
      placeholder: "Enter amount",
      prefixIcon: "$",
      styleProps: {
        icon: "pl-3",
        labelClassName: "flex-1 leading-1",
        inputClassName: "w-50 text-sm pl-7.5"
      },
      isHideErrorMessage: true
    }
  },
  {
    name: DebtFinancingField.HasOutstandingLoans,
    type: FieldType.SELECT,
    props: {
      className: "space-y-0 gap-4",
      label: "Does your business currently have outstanding loans?",
      subtitle:
        "(ex: term loan, revolving credit, equipment financing, debt financing, etc.)",
      options: YES_NO_OPTIONS,
      isRowDirection: true,
      styleProps: {
        labelClassName: "flex-1",
        subtitleClassName: "text-sm font-normal mt-1.5",
        inputClassName: "text-sm w-50"
      },
      isHideErrorMessage: true
    }
  }
]

export const DebtFinancingArrayFormBlocks: Block[] = [
  {
    name: DebtFinancingField.DebtFinancingName,
    type: FieldType.TEXT,
    props: {
      className: "gap-4 space-y-0",
      label: "Enter name of loan:",
      placeholder: "Name of loan",
      isRowDirection: true,
      styleProps: {
        inputClassName: "w-60"
      },
      isHideErrorMessage: true
    }
  },
  {
    name: DebtFinancingField.DebtFinancingLenderName,
    type: FieldType.TEXT,
    props: {
      className: "gap-4 space-y-0",
      label: "Enter name of Lender/Financial Institution:",
      placeholder: "Name of lender",
      isRowDirection: true,
      styleProps: {
        inputClassName: "w-60"
      },
      isHideErrorMessage: true
    }
  },
  {
    name: DebtFinancingField.DebtFinancingType,
    type: FieldType.SELECT,
    props: {
      className: "gap-4 space-y-0",
      label: "Type of loan:",
      isRowDirection: true,
      placeholder: "Please select",
      options: DEBT_FINANCING_TYPE_OPTIONS,
      styleProps: {
        inputClassName: "w-60"
      },
      isHideErrorMessage: true
    }
  },
  {
    name: DebtFinancingField.DebtFinancingLoanDate,
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
        calendarClassName: "w-60"
      },
      isHideErrorMessage: true,
      isEnableFutureDate: true
    }
  },
  {
    name: DebtFinancingField.DebtFinancingRemainingLoanBalance,
    type: FieldType.CURRENCY,
    props: {
      className: "gap-4 space-y-0",
      label: "Remaining loan balance:",
      isRowDirection: true,
      placeholder: "Remaining loan balance",
      prefixIcon: "$",
      styleProps: {
        inputClassName: "w-60 text-sm pl-7.5"
      },
      isHideErrorMessage: true
    }
  },
  {
    name: DebtFinancingField.DebtFinancingTermsRemaining,
    type: FieldType.NUMBER,
    props: {
      className: "gap-4 space-y-0",
      label: "Loan term remaining (in months):",
      isRowDirection: true,
      placeholder: "Loan term remaining",
      suffixIcon: <div className="text-sm">Months</div>,
      styleProps: {
        suffixClassName: "border-l",
        inputClassName: "pr-22 text-right w-60 text-sm placeholder:text-left"
      },
      isHideErrorMessage: true
    }
  },
  {
    name: DebtFinancingField.DebtFinancingAnnualInterestRate,
    type: FieldType.NUMBER,
    props: {
      className: "flex flex-row items-center justify-between",
      label: "Annual interest rate:",
      isRowDirection: true,
      placeholder: "Annual interest rate",
      suffixIcon: "%",
      styleProps: {
        inputClassName: "w-60 pr-8 text-sm"
      },
      isHideErrorMessage: true
    }
  }
]
