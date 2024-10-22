import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/ui/data-table"
import { cn } from "@/lib/utils"
import {
  type ApplicationCriteriaResponse,
  criteriaNameMapping
} from "@/modules/loan-application/constants/type.ts"
import { capitalizeFirstOnly, snakeCaseToText } from "@/utils"
import { renderHeader } from "@/utils/table.utils"
import { type ColumnDef } from "@tanstack/react-table"
import { get } from "lodash"
import { useMemo } from "react"
import { type LoanReadiness } from "../../constants/types/loan-readiness.type"
import {
  CRITERIA_NOT_READY_STATUS,
  customSortRatingLevel,
  getCriteriaScoreRangeClassName
} from "../../services/loan-readiness.service"
import { useLoanReadinessStore } from "./store/useLoanReadinessStore"
import { EXPORT_CLASS } from "@/modules/loan-application/services/pdf-v2.service"

interface ApplicationCriteriaProps {
  criteria: LoanReadiness["criteria"]
  isLoading: boolean
  handleRefetch?: VoidFunction
}

export function FinancialApplicationCriteria({
  criteria,
  isLoading
}: ApplicationCriteriaProps) {
  const sorting = useLoanReadinessStore.use.sorting()
  const { setSorting } = useLoanReadinessStore.use.action()

  const criteriaData: ApplicationCriteriaResponse[] = useMemo(() => {
    if (!criteria) {
      return []
    }

    return Object.entries(criteriaNameMapping)
      .map(([key, value]) => {
        const criterion = get(criteria, key)

        return {
          criteriaName: value,
          ratingLevel:
            criterion?.ratingLevel?.toLowerCase() ?? CRITERIA_NOT_READY_STATUS,
          description: criterion?.description ?? "Not available"
        }
      })
      .sort((_, criteriaRight) =>
        criteriaRight.ratingLevel != CRITERIA_NOT_READY_STATUS ? 0 : -1
      )
    // There will be some criteria which is not ready to show
    // Those criteria should be sorted at the end of the list
  }, [criteria])

  return (
    <div>
      <div
        data-html2canvas-ignore
        className="flex justify-between items-center flex-wrap gap-1"
      >
        <h2 className="font-semibold text-2xl flex items-center">
          Action Plan
        </h2>
      </div>

      <div className="overflow-auto">
        <DataTable
          columns={columns}
          data={criteriaData}
          isLoading={isLoading}
          setSorting={setSorting}
          sorting={sorting}
          tableHeaderClassName="bg-white"
          tableWrapperClassName="bg-white rounded-xl"
          total={criteriaData.length}
        />
      </div>
    </div>
  )
}

const columns: ColumnDef<ApplicationCriteriaResponse>[] = [
  {
    id: "criteriaName",
    header: renderHeader("Criteria", "text-black whitespace-nowrap"),
    cell: ({ row }) => {
      return (
        <div className="whitespace-nowrap">
          {capitalizeFirstOnly(snakeCaseToText(row.original.criteriaName))}
        </div>
      )
    }
  },
  {
    id: "ratingLevel",
    accessorKey: "ratingLevel",
    sortingFn: customSortRatingLevel,
    header: renderHeader("Score Range", "text-black whitespace-nowrap ml-9"),
    cell: ({ row }) => {
      const criteria = row.original
      const criteriaBadgeClassName = getCriteriaScoreRangeClassName(
        criteria.ratingLevel
      )

      return (
        <div className="text-center pl-2">
          <Badge
            className={cn(
              criteriaBadgeClassName,
              "bg-opacity-100 capitalize whitespace-nowrap font-normal py-1.5 px-3 min-w-20 justify-center border",
              EXPORT_CLASS.NO_BACKGROUND_COLOR
            )}
          >
            {snakeCaseToText(criteria.ratingLevel)}
          </Badge>
        </div>
      )
    }
  },
  {
    id: "description",
    header: renderHeader("Action Plan", "text-black whitespace-nowrap"),
    cell: ({ row }) => {
      return <div className="min-w-0 leading-6">{row.original.description}</div>
    }
  }
]
