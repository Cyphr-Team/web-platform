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
  [FpOperatingExpensesField.operatingExpenses]: []
}

export type FpOperatingExpensesFormValue = z.infer<
  typeof fpOperatingExpensesFormSchema
>
