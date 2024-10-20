import * as z from "zod"
import {
  type Block,
  FieldType
} from "@/modules/form-template/components/templates/FormTemplate.tsx"

export const enum ForecastingSetupField {
  ID = "id",
  FIRST_YEAR_OF_FORECAST = "firstYearOfForecast",
  LENGTH_OF_FORECAST = "lengthOfForecast"
}

export type ForecastingSetupFormValue = {
  [key in ForecastingSetupField]: string
}

/**
 * TODO: these type are kinda weir because my RHFSelect is not working well with number type, because of the wrong implementation of Select Radix UI
 * I added comments so I can fix it later
 * */
export const forecastingSetupFormSchema = z.object({
  [ForecastingSetupField.ID]: z.string().optional(),
  [ForecastingSetupField.FIRST_YEAR_OF_FORECAST]: z
    .string()
    .min(1, "This field is required"),
  [ForecastingSetupField.LENGTH_OF_FORECAST]: z
    .string()
    .min(1, "This field is required")
})

export const ForecastingSetupFormBlocks: Block[] = [
  {
    name: ForecastingSetupField.FIRST_YEAR_OF_FORECAST,
    type: FieldType.SELECT,
    props: {
      label: "What year should your forecast start?",
      options: generateForecastOption()
    }
  },
  {
    name: ForecastingSetupField.LENGTH_OF_FORECAST,
    type: FieldType.SELECT,
    props: {
      label: "What length of forecast would you like to generate?",
      options: [
        {
          label: "3 years",
          value: "3"
        },
        {
          label: "5 years",
          value: "5"
        }
      ]
    }
  }
]

function generateForecastOption(options?: { length?: number }): {
  value: string
  label: string
}[] {
  const { length = 4 } = options ?? {}

  return Array.from(new Array<number>(length))
    .fill(new Date().getFullYear())
    .map((item, index) => ({
      label: `${item + index}`,
      value: `${item + index}`
    }))
}
