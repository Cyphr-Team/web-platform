import { createDateSchema, createNumberSchema } from "@/constants/validate"
import {
  DebtFinancingField,
  EMPTY_DEBT_FINANCING_ITEM
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-debt-financing"
import { BINARY_VALUES } from "@/modules/loan-application/constants/form"
import {
  adaptFormV2Metadata,
  safeCastingToFloatType
} from "@/modules/loan-application/services/formv2.services"
import { type FormV2Data } from "@/modules/loan-application/types/form.v2"
import * as z from "zod"
import { get } from "lodash"

const DebtFinancingFormItemSchema = z
  .object({
    name: z.string().min(1, "This field is required"),
    lenderName: z.string().min(1, "This field is required"),
    type: z.string().min(1, "This field is required"),
    loanDate: createDateSchema(),
    remainingLoanBalance: createNumberSchema({ min: 1 }),
    termsRemaining: createNumberSchema({
      min: 1,
      coerce: true,
      max: 120
    }).optional(),
    annualInterestRate: createNumberSchema({
      min: 1,
      max: 100,
      coerce: true
    }).optional()
  })
  .refine((obj) => obj.annualInterestRate !== undefined)
  .refine((obj) => obj.termsRemaining !== undefined)

export const capitalCollabDebtFinancingFormSchema = z
  .object({
    id: z.string().optional(),
    [DebtFinancingField.DebtFinancingId]: z.string().optional(),
    [DebtFinancingField.LiabilityId]: z.string().optional(),
    [DebtFinancingField.ApplicationId]: z.string().optional(),
    [DebtFinancingField.PayableDays]: z.string().optional(),
    [DebtFinancingField.StartingPaidInCapital]: createNumberSchema().optional(),
    [DebtFinancingField.HasOutstandingLoans]: z.string().optional(),
    [DebtFinancingField.DebtFinancing]: z.array(z.any())
  })
  .superRefine((data, ctx) => {
    if (data[DebtFinancingField.HasOutstandingLoans] === BINARY_VALUES.YES) {
      const debtFinancingResult = z
        .array(DebtFinancingFormItemSchema)
        .min(1, "Debt Financing must have at least 1 item")
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

export type CapitalCollabDebtFinancingFormValue = Omit<
  z.infer<typeof capitalCollabDebtFinancingFormSchema>,
  "debtFinancing"
> & { debtFinancing: DebtFinancingFormItemValue[] }

export const DEBT_FINANCING_DEFAULT_VALUE = {
  [DebtFinancingField.PayableDays]: "",
  [DebtFinancingField.StartingPaidInCapital]: 0,
  [DebtFinancingField.HasOutstandingLoans]: "",
  [DebtFinancingField.DebtFinancing]: [EMPTY_DEBT_FINANCING_ITEM]
}

export function serializeDebtFinancingFormV2(
  debtFinancingData?: CapitalCollabDebtFinancingFormValue
): Record<string, unknown> {
  return {
    debtFinancing:
      get(debtFinancingData, "debtFinancing[0].name") === "" ||
      get(debtFinancingData, "hasOutstandingLoans") === BINARY_VALUES.NO
        ? []
        : debtFinancingData?.debtFinancing?.map((item) => ({
            name: item.name,
            lenderName: item.lenderName,
            type: item.type,
            loanDate: item.loanDate,
            remainingLoanBalance: item.remainingLoanBalance,
            termsRemaining: safeCastingToFloatType(item.termsRemaining),
            annualInterestRate: safeCastingToFloatType(item.annualInterestRate)
          })),
    payableDays: debtFinancingData?.payableDays,
    startingPaidInCapital: debtFinancingData?.startingPaidInCapital,
    hasOutstandingLoans: debtFinancingData?.hasOutstandingLoans
  }
}

export function deserializeDebtFinancingFormV2(
  response?: FormV2Data
): CapitalCollabDebtFinancingFormValue {
  return adaptFormV2Metadata<CapitalCollabDebtFinancingFormValue>({
    schema: capitalCollabDebtFinancingFormSchema,
    metadata: get(response, "metadata", {}),
    additionalFields: {
      id: get(response, "id", ""),
      [DebtFinancingField.ApplicationId]: response?.applicationId
    }
  })
}
