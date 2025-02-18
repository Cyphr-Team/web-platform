import * as z from "zod"
import { createDateSchema } from "@/constants/validate"

export const enum AssetsField {
  APPLICATION_ID = "applicationId",
  RECEIVABLE_DAYS = "receivableDays",
  LONG_TERM_ASSETS = "longTermAssets",
  LONG_TERM_ASSETS_NAME = "name",
  LONG_TERM_ASSETS_PURCHASE_DATE = "purchaseDate",
  LONG_TERM_ASSETS_COST = "cost",
  LONG_TERM_ASSETS_USEFUL_LIFE = "usefulLife"
}

export type AssetsFormValue = z.infer<typeof assetsFormSchema>

export const assetsFormSchema = z.object({
  [AssetsField.APPLICATION_ID]: z.string().optional(),
  [AssetsField.RECEIVABLE_DAYS]: z.string().min(1, "This field is required"),
  [AssetsField.LONG_TERM_ASSETS]: z.array(
    z.object({
      name: z.string().min(1, "This field is required"),
      purchaseDate: createDateSchema(),
      cost: z.coerce.number().min(1, "This field is required"),
      usefulLife: z.string().min(1, "This field is required")
    })
  )
})

export const EMPTY_ASSET_ITEM = {
  name: "",
  purchaseDate: "",
  cost: "",
  usefulLife: ""
}

export const FP_ASSETS_DEFAULT_VALUE = {
  [AssetsField.RECEIVABLE_DAYS]: "",
  [AssetsField.LONG_TERM_ASSETS]: []
}

export const RECEIVABLE_DAYS_OPTIONS = [
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

export const USEFUL_LIFE_OPTIONS = [
  {
    label: "3 years",
    value: "3"
  },
  {
    label: "5 years",
    value: "5"
  },
  {
    label: "7 years",
    value: "7"
  },
  {
    label: "10 years",
    value: "10"
  },
  {
    label: "15 years",
    value: "15"
  },
  {
    label: "20 years",
    value: "20"
  },
  {
    label: "27.5 years",
    value: "27.5"
  },
  {
    label: "39 years",
    value: "39"
  },
  {
    label: "Forever (do not depreciate)",
    value: "-1"
  }
]
