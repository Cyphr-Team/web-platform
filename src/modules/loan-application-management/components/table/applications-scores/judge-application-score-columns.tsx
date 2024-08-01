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
import { JUDGE_APPLICATION_FILTER_KEYS } from "@/modules/loan-application-management/hooks/useQuery/useQueryListPaginateJudgeLoanApplication"

/**
 * Columns for judge list applications
 */
export const judgeLoanApplicationColumns: ColumnDef<
  IJudgeLoanApplicationResponse<ILaunchKCApplicationScore>
>[] = [
  {
    id: "applicationIdNumber",
    enableHiding: false,
    header: renderFilterableHeader({ title: "ID" }),
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
    header: renderFilterableHeader({ title: "Company Name" }),
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
    header: renderFilterableHeader({ title: "Round" }),
    meta: {
      columnViewName: "Round",
      filterID: JUDGE_APPLICATION_FILTER_KEYS.applicationCaptureStages
    },
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
    header: renderFilterableHeader({ title: "Scorecard Status" }),
    meta: {
      columnViewName: "Scorecard Status",
      filterID: JUDGE_APPLICATION_FILTER_KEYS.isScoreds
    },
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
    header: renderFilterableHeader({ title: "Created On" }),
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
    header: renderFilterableHeader({ title: "Submitted On" }),
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
