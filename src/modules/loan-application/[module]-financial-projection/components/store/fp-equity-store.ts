import { createDateSchema, createNumberSchema } from "@/constants/validate"
import { NUMBER } from "@/modules/form-template/components/utils"
import * as z from "zod"

export const enum FpEquityFinancingField {
  applicationId = "applicationId",
  equityFinancing = "equityFinancing",
  equityFinancingName = `equityFinancing.${NUMBER}.name`,
  equityFinancingReceivedDate = `equityFinancing.${NUMBER}.receivedDate`,
  equityFinancingAmount = `equityFinancing.${NUMBER}.amount`
}

export const fpEquityFinancingFormSchema = z.object({
  [FpEquityFinancingField.applicationId]: z.string().optional(),
  [FpEquityFinancingField.equityFinancing]: z.array(
    z.object({
      name: z.string().min(1),
      receivedDate: createDateSchema(),
      amount: createNumberSchema({ min: 1 })
    })
  )
})

export const EMPTY_EQUITY_FINANCING_ITEM = {
  name: "",
  receivedDate: "",
  amount: 0
}

export const FP_EQUITY_FINANCING_DEFAULT_VALUE = {
  [FpEquityFinancingField.equityFinancing]: []
}

export type FpEquityFinancingFormValue = z.infer<
  typeof fpEquityFinancingFormSchema
>
