import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { cn } from "@/lib/utils"
import {
  type ApplicationCriteriaResponse,
  criteriaNameMapping
} from "@/modules/loan-application/constants/type.ts"
import { capitalizeFirstOnly, snakeCaseToText } from "@/utils"
import { isEnableDummyLoanReadiness } from "@/utils/feature-flag.utils"
import { renderHeader } from "@/utils/table.utils"
import { type ColumnDef } from "@tanstack/react-table"
import { get } from "lodash"
import { type FC, useMemo } from "react"
import { type LoanReadiness } from "../../constants/types/loan-readiness.type"
import {
  CRITERIA_NOT_READY_STATUS,
  customSortRatingLevel,
  getCriteriaScoreRangeClassName
} from "../../services/loan-readiness.service"
import { DummyButton } from "./DummyButton"
import { useLoanReadinessStore } from "./store/useLoanReadinessStore"

interface ApplicationCriteriaProps {
  criteria: LoanReadiness["criteria"]
  isLoading: boolean
  handleRefetch?: VoidFunction
}

export const ApplicationCriteria: FC<ApplicationCriteriaProps> = ({
  criteria,
  isLoading,
  handleRefetch
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
    <Card>
      <CardHeader className="px-8 md:py-4 border-b">
        <div className="flex justify-between items-center flex-wrap gap-1">
          <CardTitle className="font-semibold text-lg flex items-center gap-3">
            Action Plan
          </CardTitle>

          {isEnableDummyLoanReadiness() && handleRefetch ? (
            <DummyButton handleRefetch={handleRefetch} />
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="px-5 overflow-auto">
        <DataTable
          columns={columns}
          data={criteriaData}
          isLoading={isLoading}
          setSorting={setSorting}
          sorting={sorting}
          total={criteriaData.length}
        />
      </CardContent>
    </Card>
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
