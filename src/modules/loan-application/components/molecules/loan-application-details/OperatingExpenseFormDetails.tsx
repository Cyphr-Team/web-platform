import { Card } from "@/components/ui/card"
import {
  OPERATING_EXPENSES_FIELD_DATA,
  OperatingExpensesInformationResponse
} from "@/modules/loan-application/constants/type"

import { Separator } from "@/components/ui/separator"
import { OperatingExpensesDisplay } from "../../atoms/OperatingExpensesDisplay"
import { useMemo } from "react"
import { toCurrency } from "@/utils"

interface OperatingExpensesFormDetails {
  operatingExpensesFormData?: OperatingExpensesInformationResponse
}

export const OperatingExpensesFormDetails: React.FC<
  OperatingExpensesFormDetails
> = ({ operatingExpensesFormData }) => {
  const totalMonthlyOperatingExpenses = useMemo(() => {
    return OPERATING_EXPENSES_FIELD_DATA.reduce(
      (acc, item) =>
        acc +
        (operatingExpensesFormData?.[item.name]
          ? Number(operatingExpensesFormData?.[item.name])
          : 0),
      0
    )
  }, [operatingExpensesFormData])

  return (
    <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto loan-application-item shadow-none">
      <h5 className="text-lg font-semibold">Operating Expenses (monthly) </h5>
      <Separator />
      <div className="flex flex-col gap-2xl">
        {OPERATING_EXPENSES_FIELD_DATA.map(
          (item) =>
            Number(operatingExpensesFormData?.[item.name]) > 0 && (
              <OperatingExpensesDisplay
                key={item.name}
                label={item.title}
                description={item.subtitle}
                value={operatingExpensesFormData?.[item.name]}
              />
            )
        )}
      </div>
      <Separator />
      <div className="flex justify-between">
        <p className="text-sm font-bold text-text-secondary">
          TOTAL MONTHLY OPERATING EXPENSE
        </p>
        <p className="font-bold text-base text-text-primary">
          {toCurrency(totalMonthlyOperatingExpenses)} / mo
        </p>
      </div>
    </Card>
  )
}
