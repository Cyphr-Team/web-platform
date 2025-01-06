import { USDFormatter } from "@/modules/form-template/components/molecules/RHFCurrencyInput.tsx"

export function currencyCellFormatter(value: number) {
  if (value === 0) {
    return "-"
  }

  return value > 0
    ? USDFormatter(value).format()
    : `(${USDFormatter(value * -1).format()})`
}
