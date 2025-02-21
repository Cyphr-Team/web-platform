import { createDateSchema, createNumberSchema } from "@/constants/validate"
import { NUMBER } from "@/modules/form-template/components/utils"
import * as z from "zod"

export const enum FpOperatingExpensesField {
  applicationId = "applicationId",
  operatingExpenses = "operatingExpenses",
  operatingExpensesName = `operatingExpenses.${NUMBER}.name`,
  operatingExpensesDescription = `operatingExpenses.${NUMBER}.description`,
  operatingExpensesStartDate = `operatingExpenses.${NUMBER}.startDate`,
  operatingExpensesMonthlyCost = `operatingExpenses.${NUMBER}.monthlyCost`
}

export const fpOperatingExpensesFormSchema = z.object({
  [FpOperatingExpensesField.applicationId]: z.string().optional(),
  [FpOperatingExpensesField.operatingExpenses]: z.array(
    z.object({
      name: z.string().min(1),
      description: z.string(),
      startDate: createDateSchema(),
      monthlyCost: createNumberSchema({ min: 1 })
    })
  )
})

export const FP_OPERATING_EXPENSES_DEFAULT_VALUE = {
  [FpOperatingExpensesField.operatingExpenses]: [
    {
      name: "Rent",
      description: "The cost of leasing office space or facilities",
      startDate: "",
      monthlyCost: 0
    },
    {
      name: "Sales and marketing expenses",
      description: "Costs related to promoting and selling products/services",
      startDate: "",
      monthlyCost: 0
    },
    {
      name: "Dues and Subscriptions",
      description:
        "Recurring fees (i.e.software licenses, membership dues, etc.)",
      startDate: "",
      monthlyCost: 0
    },
    {
      name: "Accounting and legal fees",
      description: "Cost related to accounting, legal, or tax services",
      startDate: "",
      monthlyCost: 0
    }
  ]
}

export type FpOperatingExpensesFormValue = z.infer<
  typeof fpOperatingExpensesFormSchema
>
