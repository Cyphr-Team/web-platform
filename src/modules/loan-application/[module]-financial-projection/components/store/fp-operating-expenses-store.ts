import { createNumberSchema } from "@/constants/validate"
import { NUMBER } from "@/modules/form-template/components/utils"
import * as z from "zod"

export const enum FpOPeratingExpensesField {
  optionalOperationExpenses = "optionalOperationExpenses",
  optionalOperationExpensesName = `optionalOperationExpenses.${NUMBER}.name`,
  optionalOperationExpensesDescription = `optionalOperationExpenses.${NUMBER}.description`,
  optionalOperationExpensesCostStartDate = `optionalOperationExpenses.${NUMBER}.costStartDate`,
  optionalOperationExpensesMonthlyCost = `optionalOperationExpenses.${NUMBER}.monthlyCost`
}

export const fpOperatingExpensesFormSchema = z.object({
  [FpOPeratingExpensesField.optionalOperationExpenses]: z
    .array(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        costStartDate: z.string().min(1),
        monthlyCost: createNumberSchema({ min: 1 })
      })
    )
    .min(1, "Please add at least one operating expenses.")
})

export const FP_OPERATING_EXPENSES_DEFAULT_VALUE = {
  [FpOPeratingExpensesField.optionalOperationExpenses]: [
    {
      name: "Rent",
      description: "Sales and marketing expenses",
      costStartDate: "",
      monthlyCost: 0
    },
    {
      name: "Sales and marketing expenses",
      description: "Costs related to promoting and selling products/services",
      costStartDate: "",
      monthlyCost: 0
    },
    {
      name: "Dues and Subscriptions",
      description:
        "Recurring fees (i.e.software licenses, membership dues, etc.)",
      costStartDate: "",
      monthlyCost: 0
    },
    {
      name: "Accounting and legal fees",
      description: "Cost related to accounting, legal, or tax services",
      costStartDate: "",
      monthlyCost: 0
    }
  ]
}

export type FpOperatingExpensesFormValue = z.infer<
  typeof fpOperatingExpensesFormSchema
>
