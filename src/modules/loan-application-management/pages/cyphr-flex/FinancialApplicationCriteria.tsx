import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/ui/data-table"
import { cn } from "@/lib/utils"
import {
  ApplicationCriteriaResponse,
  criteriaNameMapping
} from "@/modules/loan-application/constants/type.ts"
import { capitalizeFirstOnly, snakeCaseToText } from "@/utils"
import { renderHeader } from "@/utils/table.utils"
import { ColumnDef } from "@tanstack/react-table"
import { get } from "lodash"
import { FC, useMemo } from "react"
import { LoanReadiness } from "../../constants/types/loan-readiness.type"
import {
  CRITERIA_NOT_READY_STATUS,
  customSortRatingLevel,
  getCriteriaScoreRangeClassName
} from "../../services/loan-readiness.service"
import { useLoanReadinessStore } from "./store/useLoanReadinessStore"

interface ApplicationCriteriaProps {
  criteria: LoanReadiness["criteria"]
  isLoading: boolean
  handleRefetch?: VoidFunction
}
export const FinancialApplicationCriteria: FC<ApplicationCriteriaProps> = ({
  criteria,
  isLoading
}) => {
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
      <div className="flex justify-between items-center flex-wrap gap-1">
        <h2 className="font-semibold text-2xl flex items-center">
          Action Plan
        </h2>
      </div>

      <div className="overflow-auto">
        <DataTable
          tableHeaderClassName="bg-white"
          tableWrapperClassName="bg-white"
          columns={columns}
          data={criteriaData}
          isLoading={isLoading}
          total={criteriaData.length}
          sorting={sorting}
          setSorting={setSorting}
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
              "bg-opacity-100 capitalize whitespace-nowrap font-normal py-1.5 px-3 min-w-20 justify-center"
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
      return <div className="min-w-0">{row.original.description}</div>
    }
  }
]
