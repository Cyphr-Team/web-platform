import { capitalizeWords, snakeCaseToText } from "@/utils"
import { ColumnDef } from "@tanstack/react-table"

import {
  FORMAT_DATE_M_D_Y,
  FORMAT_DATE_M_D_Y_TIME_UPPERCASE
} from "@/constants/date.constants"
import { FilterableColumnHeader } from "@/shared/molecules/table/column-filter"
import { IJudgeLoanApplicationResponse } from "@/types/application/application-judge.type"
import { ILaunchKCApplicationScore } from "@/types/application/application-score.type"
import { format } from "date-fns"
import { ButtonViewDetailLoanApplication } from "../../atoms/ButtonViewDetailLoanApplication"
import { ScoredBadgeStatusWithTooltip } from "../../atoms/ScoredBadgeStatus"
import { StatusRoundBadge } from "../../atoms/StatusRoundBadge"
import { renderFilterableHeader } from "@/utils/table.utils"

/**
 * Columns for judge list applications
 */
export const judgeLoanApplicationColumns: ColumnDef<
  IJudgeLoanApplicationResponse<ILaunchKCApplicationScore>
>[] = [
  {
    id: "applicationIdNumber",
    header: renderFilterableHeader("ID"),
    meta: { columnViewName: "ID" },
    cell: ({ row }) => {
      const app = row.original
      return (
        <div className="text-center">
          #{app?.application?.applicationIdNumber}
        </div>
      )
    },
    size: 80
  },
  {
    id: "businessName",
    header: renderFilterableHeader("Company Name"),
    meta: { columnViewName: "Company Name" },
    cell: ({ row }) => {
      const app = row.original
      return (
        <div className="text-center">
          {app?.application?.businessName ?? "N/A"}
        </div>
      )
    },
    size: 200
  },
  {
    id: "applicationCaptureStage",
    header: renderFilterableHeader("Round"),
    meta: { columnViewName: "Round" },
    cell: ({ row }) => {
      const app = row.original

      return (
        <div className="text-center">
          <StatusRoundBadge round={app?.applicationCaptureStage}>
            {capitalizeWords(snakeCaseToText(app?.applicationCaptureStage))}
          </StatusRoundBadge>
        </div>
      )
    },
    size: 150
  },
  {
    id: "scoredAt",
    header: renderFilterableHeader("Scorecard Status"),
    meta: { columnViewName: "Scorecard Status" },
    cell: ({ row }) => {
      const app = row.original

      return (
        <div className="text-center">
          <ScoredBadgeStatusWithTooltip
            loanApplicationId={app?.application?.id}
            loanProgramType={app?.application?.programType}
            scoredAt={app?.scoredAt}
          />
        </div>
      )
    },
    size: 200
  },
  {
    id: "createdAt",
    header: renderFilterableHeader("Created On"),
    meta: { columnViewName: "Created On" },
    size: 150,
    cell: ({ row }) => {
      const app = row.original

      return (
        <div className="text-center">
          {app?.application?.createdAt
            ? format(app?.application?.createdAt, FORMAT_DATE_M_D_Y)
            : "N/A"}
        </div>
      )
    }
  },
  {
    id: "submittedAt",
    header: renderFilterableHeader("Submitted On"),
    meta: { columnViewName: "Submitted On" },
    size: 150,
    cell: ({ row }) => {
      const app = row.original

      return (
        <div className="text-center">
          {app?.application?.submittedAt
            ? format(
                app?.application?.submittedAt,
                FORMAT_DATE_M_D_Y_TIME_UPPERCASE
              )
            : "N/A"}
        </div>
      )
    }
  },
  {
    id: "action",
    meta: { columnViewName: "Docs" },
    enableHiding: false,
    header: ({ column }) => (
      <FilterableColumnHeader
        className="float-right pr-4"
        disabled
        column={column}
        title="Docs"
      />
    ),
    cell: ({ row }) => {
      const app = row.original

      return (
        <div className="float-right">
          <ButtonViewDetailLoanApplication
            loanApplicationId={app?.application.id}
            loanProgramType={app?.application?.programType}
          />
        </div>
      )
    }
  }
]
