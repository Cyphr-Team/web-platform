import { capitalizeWords, snakeCaseToText } from "@/utils"
import { type ColumnDef } from "@tanstack/react-table"

import {
  FORMAT_DATE_M_D_Y,
  FORMAT_DATE_M_D_Y_TIME_UPPERCASE
} from "@/constants/date.constants"
import { FilterableColumnHeader } from "@/shared/molecules/table/column-filter"
import { type JudgeLoanApplicationResponse } from "@/types/application/application-judge.type"
import { type ILaunchKCApplicationScore } from "@/types/application/application-score.type"
import { format } from "date-fns"
import { ButtonViewDetailLoanApplication } from "../../atoms/ButtonViewDetailLoanApplication"
import { ScoredBadgeStatusWithTooltip } from "../../atoms/score/ScoredBadgeStatus"
import { StatusRoundBadge } from "../../atoms/StatusRoundBadge"
import { renderFilterableHeader } from "@/utils/table.utils"
import { JUDGE_APPLICATION_FILTER_KEYS } from "@/modules/loan-application-management/hooks/useQuery/useQueryListPaginateJudgeLoanApplication"
import { ScoreBadge } from "@/modules/loan-application-management/components/atoms/score/ScoreBadge"

/**
 * Columns for judge list applications
 */
export const judgeLoanApplicationColumns: ColumnDef<
  JudgeLoanApplicationResponse<ILaunchKCApplicationScore>
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
    id: "score",
    header: renderFilterableHeader({ title: "Scorecard Score" }),
    meta: { columnViewName: "Scorecard Score" },
    cell: ({ row }) => {
      const originalScore = row.original.score ?? {}

      // if not finish then leave it blank
      if (Object.keys(originalScore).length === 0) {
        return
      }
      const scoreList = Object.values(originalScore)
      const avgScore =
        // eslint-disable-next-line
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        scoreList.reduce((prev, cur) => prev + cur) / scoreList.length

      return (
        <div className="text-center">
          <ScoreBadge isFinished score={avgScore} />
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
        disabled
        className="float-right pr-4"
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
