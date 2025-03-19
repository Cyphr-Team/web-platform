import {
  DirectCostsField,
  type DirectCostsFormValue
} from "@/modules/loan-application/[module]-financial-projection/components/store/direct-costs-store"
import { formatDate } from "@/utils/date.utils.ts"

interface DirectCostsFormDetailProps {
  directCostsFormValue?: DirectCostsFormValue
}

export function DirectCostsFormDetail({
  directCostsFormValue = { [DirectCostsField.directCosts]: [] }
}: DirectCostsFormDetailProps) {
  return (
    <div className="flex flex-col gap-2xl p-4 md:px-8 md:pb-8">
      <div className="grid w-full grid-cols-6 items-center gap-5 text-xs font-medium">
        <p className="col-start-1 col-end-3 row-start-1">Direct cost name</p>
        <p className="col-start-4 col-end-5 row-start-1">Cost start date</p>
        <p className="col-start-5 col-end-7 row-start-1 text-right">
          Estimated % of overall revenue
        </p>
      </div>
      <div>
        <div className="mb-5 flex flex-col gap-6">
          {directCostsFormValue?.directCosts?.map((founder) => (
            <DirectCosts key={founder.directCostName} value={founder} />
          ))}
        </div>
      </div>
    </div>
  )
}

interface DirectCostsProps {
  value: DirectCostsFormValue["directCosts"][number]
}

function DirectCosts(props: DirectCostsProps) {
  const { value } = props

  return (
    <div className="flex gap-3">
      <div className="grid w-full grid-cols-6 items-center gap-5">
        <div className="col-start-1 col-end-3 row-start-1 flex flex-col gap-1">
          <div className="space-y-2 text-sm font-medium">
            <div className="break-words">{value.directCostName}</div>
          </div>
          <div className="mt-auto space-y-2 text-xs text-text-secondary">
            <div className="break-words">{value.directCostDescription}</div>
          </div>
        </div>
        <div className="col-start-4 col-end-5 row-start-1 mt-0 space-y-2 text-sm">
          <div className="break-words">
            {formatDate(value.startDate, "MM/YYYY")}
          </div>
        </div>
        <div className="col-start-5 col-end-7 row-start-1 mt-0 space-y-2 text-right text-sm">
          <div className="break-words">
            {value.overallRevenue}
            <span>%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
