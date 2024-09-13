import { createDateSchema, createNumberSchema } from "@/constants/validate"
import { NUMBER } from "@/modules/form-template/components/utils"
import * as z from "zod"

export const enum DirectCostsField {
  applicationId = "applicationId",
  directCosts = "directCosts",
  directCostsName = `directCosts.${NUMBER}.directCostName`,
  directCostsDescription = `directCosts.${NUMBER}.directCostDescription`,
  directCostsOverallRevenue = `directCosts.${NUMBER}.overallRevenue`,
  directCostsStartDate = `directCosts.${NUMBER}.startDate`
}

export const directCostsFormSchema = z.object({
  [DirectCostsField.applicationId]: z.string().optional(),
  [DirectCostsField.directCosts]: z
    .array(
      z.object({
        directCostName: z.string().min(1),
        directCostDescription: z.string().min(1),
        startDate: createDateSchema(),
        overallRevenue: createNumberSchema({ min: 1, max: 100 })
      })
    )
    .min(1, "Please add at least one operating expenses.")
})

export type DirectCostsFormValue = z.infer<typeof directCostsFormSchema>

export const DIRECT_COSTS_DEFAULT_VALUE: DirectCostsFormValue = {
  [DirectCostsField.directCosts]: [
    {
      directCostName: "",
      directCostDescription: "",
      startDate: "",
      overallRevenue: 0
    }
  ]
}
