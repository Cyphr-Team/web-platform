import { Separator } from "@/components/ui/separator"
import {
  FpOperatingExpensesField,
  type FpOperatingExpensesFormValue
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-operating-expenses-store"
import { sanitizeNumber } from "@/utils"
import { formatDate } from "@/utils/date.utils.ts"
import { USDFormatter } from "@/modules/form-template/components/molecules/RHFCurrencyInput.tsx"
import { sum } from "lodash"

interface FinancialOperatingExpensesFormDetailProps {
  fpOperatingExpensesFormValue?: FpOperatingExpensesFormValue
}

export function FinancialOperatingExpensesFormDetail({
  fpOperatingExpensesFormValue = {
    [FpOperatingExpensesField.operatingExpenses]: []
  }
}: FinancialOperatingExpensesFormDetailProps) {
  const total = sum(
    fpOperatingExpensesFormValue?.operatingExpenses?.map((operationExpense) =>
      sanitizeNumber(operationExpense.monthlyCost)
    )
  )

  return (
    <div className="flex flex-col gap-2xl p-4 md:px-8 md:pb-8">
      <div className="grid w-full grid-cols-6 items-center gap-5 text-xs font-medium">
        <p className="col-start-1 col-end-3 row-start-1">
          Operating expense name
        </p>
        <p className="col-start-4 col-end-5 row-start-1">Cost start date</p>
        <p className="col-start-5 col-end-7 row-start-1 text-right">
          Monthly cost
        </p>
      </div>
      <div>
        <div className="mb-5 flex flex-col gap-6">
          {fpOperatingExpensesFormValue?.operatingExpenses?.map((founder) => (
            <OperatingExpenses key={founder.name} value={founder} />
          ))}
        </div>

        <Separator className="my-5" />

        <div className="flex justify-between text-sm font-semibold">
          <p>TOTAL MONTHLY OPERATING EXPENSE</p>
          <p>${USDFormatter(total).format()} / mo</p>
        </div>
      </div>
    </div>
  )
}

interface OperatingExpensesProps {
  value: FpOperatingExpensesFormValue["operatingExpenses"][number]
}

function OperatingExpenses(props: OperatingExpensesProps) {
  const { value } = props

  return (
    <div className="flex gap-3">
      <div className="grid w-full grid-cols-6 items-center gap-5 text-sm">
        <div className="col-start-1 col-end-3 row-start-1 flex flex-col gap-1">
          <div className="space-y-2 text-sm font-medium">
            <div className="break-words">{value.name}</div>
          </div>
          <div className="mt-auto space-y-2 text-xs text-text-secondary">
            <div className="break-words">{value.description}</div>
          </div>
        </div>
        <div className="col-start-4 col-end-5 row-start-1 mt-0 space-y-2 text-sm">
          <div className="break-words">
            {formatDate(value.startDate, "MM/YYYY")}
          </div>
        </div>
        <div className="col-start-5 col-end-7 row-start-1 mt-0 space-y-2 text-right text-sm">
          <div className="break-words">
            $ <span>{USDFormatter(value.monthlyCost).format()} /mo</span>
          </div>
        </div>
      </div>
    </div>
  )
}
