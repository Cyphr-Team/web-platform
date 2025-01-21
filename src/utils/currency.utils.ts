import { USDFormatter } from "@/modules/form-template/components/molecules/RHFCurrencyInput.tsx"
import type currency from "currency.js"

export function currencyCellFormatter(
  value: number,
  customFormatter?: (
    value: number | string,
    options?: currency.Options
  ) => currency
) {
  if (value === 0) {
    return "-"
  }

  const formatter = customFormatter ?? USDFormatter

  return value > 0
    ? formatter(value).format()
    : `(${formatter(value * -1).format()})`
}
