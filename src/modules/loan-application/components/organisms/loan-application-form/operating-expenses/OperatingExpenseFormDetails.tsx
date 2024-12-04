import { Card } from "@/components/ui/card"
import {
  OPERATING_EXPENSES_FIELD_DATA,
  type OperatingExpensesInformationResponse
} from "@/modules/loan-application/constants/type"

import { Separator } from "@/components/ui/separator"
import { OperatingExpensesDisplay } from "../../../atoms/OperatingExpensesDisplay"
import { useMemo } from "react"
import { toCurrency } from "@/utils"
import { type OperatingExpensesFormValue } from "@/modules/loan-application/constants/form.ts"
import { isEnableFormV2 } from "@/utils/feature-flag.utils.ts"

interface Props {
  operatingExpensesFormData?: OperatingExpensesInformationResponse
  operatingExpensesFormDataV2?: OperatingExpensesFormValue
}

export function OperatingExpensesFormDetails({
  operatingExpensesFormData,
  operatingExpensesFormDataV2
}: Props) {
  const dataToUse = isEnableFormV2()
    ? operatingExpensesFormDataV2
    : operatingExpensesFormData

  const totalMonthlyOperatingExpenses = useMemo(() => {
    return OPERATING_EXPENSES_FIELD_DATA.reduce(
      (acc, item) =>
        acc + (dataToUse?.[item.name] ? Number(dataToUse?.[item.name]) : 0),
      0
    )
  }, [dataToUse])

  return (
    <Card className="loan-application-item flex h-fit flex-col gap-2xl overflow-auto rounded-lg p-4xl shadow-none">
      <h5 className="text-lg font-semibold">Operating Expenses (monthly) </h5>
      <Separator />
      <div className="flex flex-col gap-2xl">
        {OPERATING_EXPENSES_FIELD_DATA.map(
          (item) =>
            Number(dataToUse?.[item.name]) > 0 && (
              <OperatingExpensesDisplay
                key={item.name}
                description={item.subtitle}
                label={item.title}
                value={dataToUse?.[item.name]}
              />
            )
        )}
      </div>
      <Separator />
      <div className="flex justify-between">
        <p className="text-sm font-bold text-text-secondary">
          TOTAL MONTHLY OPERATING EXPENSE
        </p>
        <p className="text-base font-bold text-text-primary">
          {toCurrency(totalMonthlyOperatingExpenses)} / mo
        </p>
      </div>
    </Card>
  )
}
