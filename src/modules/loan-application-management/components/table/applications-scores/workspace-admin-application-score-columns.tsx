import { LoanApplicationStatus } from "@/types/loan-application.type"
import { type ColumnDef } from "@tanstack/react-table"

import {
  FORMAT_DATE_M_D_Y,
  FORMAT_DATE_M_D_Y_TIME_UPPERCASE
} from "@/constants/date.constants"
import { FilterableColumnHeader } from "@/shared/molecules/table/column-filter"
import {
  type IScoreInfo,
  type IWorkspaceAdminApplicationScore
} from "@/types/application/application-assign.type"
import { renderFilterableHeader } from "@/utils/table.utils"
import { format } from "date-fns"
import { AssigningJudgeRow } from "../../../../loan-application/components/organisms/application-assigning/AssigningJudgeRow"
import { LoanStage } from "../../../constants/types/application"
import { getScorecardStatusByApplicationStage } from "../../../services/score.service"
import { ButtonReviewLoanApplication } from "../../atoms/ButtonReviewLoanApplication"
import { CustomJudgeAvatar, ToolTipJudgeAvatar } from "../../atoms/JudgeAvatar"
import { ScoreBadge } from "../../atoms/score/ScoreBadge"
import { ApplicationRoundSelectionPopover } from "../../organisms/ApplicationRoundSelectionPopover"
import { NudgeJudgesPopover } from "../../organisms/NudgeJudgesPopover"
import { WORKSPACE_ADMIN_APPLICATION_SCORE_FILTER_KEYS } from "@/modules/loan-application-management/hooks/useQuery/useQueryListPaginatedLoanApplicationScoreGroupByApplicationId"
import { sum } from "lodash"

/**
 * Columns for workspace admin list applications
 */
export const workspaceAdminApplicationColumns: ColumnDef<IWorkspaceAdminApplicationScore>[] =
  [
    {
      id: "applicationIdNumber",
      enableHiding: false,
      header: renderFilterableHeader({ title: "ID" }),
      meta: { columnViewName: "ID" },
      cell: ({ row }) => {
        const application = row.original

        return (
          <div className="text-center">#{application?.applicationIdNumber}</div>
        )
      },
      size: 80
    },
    {
      id: "businessName",
      header: renderFilterableHeader({ title: "Company Name" }),
      enableSorting: true,
      meta: { columnViewName: "Company Name" },
      cell: ({ row }) => {
        const app = row.original

        return <div className="text-center">{app?.businessName ?? "N/A"}</div>
      },
      size: 200
    },
    {
      id: "email",
      header: renderFilterableHeader({
        title: "Applicant's Email",
        disabled: true
      }),
      meta: { columnViewName: "Applicant's Email" },
      cell: ({ row }) => {
        const app = row.original

        return <div className="text-center">{app?.email ?? "N/A"}</div>
      },
      size: 200
    },
    {
      id: "roundOneJudges",
      header: renderFilterableHeader({
        title: "Round 1 Judges",
        isCanSort: false
      }),
      meta: {
        columnViewName: "Round 1 Judges",
        filterID: WORKSPACE_ADMIN_APPLICATION_SCORE_FILTER_KEYS.judgeIds
      },
      cell: ({ row }) => {
        const application = row.original
        const remainAvatar = application.roundOne.judges?.length - 8

        return (
          <div className="flex items-center justify-center">
            <AssigningJudgeRow
              currentStage={LoanStage.ROUND_1}
              disabled={
                application.status.toLowerCase() !==
                LoanApplicationStatus.ROUND_1.toLowerCase()
              }
              row={row}
            />

            <div className="flex items-center justify-center">
              {application.roundOne.judges
                ?.slice(0, remainAvatar > 0 ? 7 : 8)
                .map((judge, key) => (
                  <ToolTipJudgeAvatar
                    key={key}
                    avatar={judge?.judgeAvatar}
                    email={judge?.judgeEmail}
                    isScored={application.roundOne.scoredJudges.some(
                      (scoredJudge) => scoredJudge.judgeId === judge.judgeId
                    )}
                    name={judge?.judgeName}
                  />
                ))}

              {remainAvatar > 0 && (
                <CustomJudgeAvatar>+{remainAvatar}</CustomJudgeAvatar>
              )}
            </div>
          </div>
        )
      },
      size: 200
    },
    {
      id: "roundOneAvgScore",
      header: renderFilterableHeader({
        title: "Round 1 Avg. Score",
        disabled: true
      }),
      meta: { columnViewName: "Round 1 Avg. Score" },
      cell: ({ row }) => {
        const application = row.original

        return (
          <div className="text-center">
            {application.roundOne.numberOfScoredJudge === 0 ? (
              "---"
            ) : (
              <ScoreBadge
                isFinished={
                  application.roundOne.numberOfScoredJudge ===
                  application.roundOne.judges.length
                }
                score={calculateAvgScore(application.roundOne.scoredJudges)}
              />
            )}
          </div>
        )
      },
      size: 200
    },
    {
      id: "roundTwoJudges",
      header: renderFilterableHeader({
        title: "Round 2 Judges",
        isCanSort: false
      }),
      meta: {
        columnViewName: "Round 2 Judges",
        filterID: WORKSPACE_ADMIN_APPLICATION_SCORE_FILTER_KEYS.judgeIds
      },
      cell: ({ row }) => {
        const application = row.original
        const remainAvatar = application.roundTwo.judges?.length - 8

        return (
          <div className="flex items-center justify-center">
            <AssigningJudgeRow
              currentStage={LoanStage.ROUND_2}
              disabled={
                application.status.toLowerCase() !==
                LoanApplicationStatus.ROUND_2.toLowerCase()
              }
              row={row}
            />

            <div className="flex items-center justify-center">
              {application.roundTwo.judges.slice(0, 8).map((judge, key) => (
                <ToolTipJudgeAvatar
                  key={key}
                  avatar={judge?.judgeAvatar}
                  email={judge?.judgeEmail}
                  isScored={application.roundTwo.scoredJudges.some(
                    (scoredJudge) => scoredJudge.judgeId === judge.judgeId
                  )}
                  name={judge?.judgeName}
                />
              ))}
              {remainAvatar > 0 && (
                <CustomJudgeAvatar>+{remainAvatar}</CustomJudgeAvatar>
              )}
            </div>
          </div>
        )
      },
      size: 200
    },
    {
      id: "roundTwoAvgScore",
      header: renderFilterableHeader({
        title: "Round 2 Avg. Score",
        disabled: true
      }),
      meta: { columnViewName: "Round 2 Avg. Score" },
      cell: ({ row }) => {
        const application = row.original

        return (
          <div className="text-center">
            {application.roundTwo.numberOfScoredJudge == 0 ? (
              "---"
            ) : (
              <ScoreBadge
                isFinished={
                  application.roundTwo.numberOfScoredJudge ===
                  application.roundTwo.judges.length
                }
                score={calculateAvgScore(application.roundTwo.scoredJudges)}
              />
            )}
          </div>
        )
      },
      size: 200
    },

    {
      id: "scoredcard",
      header: renderFilterableHeader({
        title: "Scorecard Status",
        disabled: false,
        isCanSort: false
      }),
      meta: {
        columnViewName: "Scorecard Status",
        filterID: WORKSPACE_ADMIN_APPLICATION_SCORE_FILTER_KEYS.scorecards
      },
      cell: ({ row }) => {
        const application = row.original

        if (
          application.roundOne.judges == null ||
          application.roundOne.judges?.length == 0
        )
          return ""

        const scoredcardStatus =
          getScorecardStatusByApplicationStage(application)

        if (scoredcardStatus.numberOfJudge == 0) return ""

        const currentRoundAssignedJudges =
          application.roundTwo.judges?.length > 0
            ? application.roundTwo.judges
            : application.roundOne.judges
        const completedScorecardJudges =
          application.roundTwo.judges?.length > 0
            ? application.roundTwo.scoredJudges
            : application.roundOne.scoredJudges

        return (
          <div className="text-center">
            <NudgeJudgesPopover
              applicationId={application.id}
              assignedJudges={currentRoundAssignedJudges}
              completedScorecardJudges={completedScorecardJudges}
            />
          </div>
        )
      },
      size: 200
    },
    {
      id: "roundStatus",
      header: renderFilterableHeader({ title: "Round Status" }),
      meta: {
        columnViewName: "Round Status",
        filterID: WORKSPACE_ADMIN_APPLICATION_SCORE_FILTER_KEYS.statuses
      },
      cell: ({ row }) => {
        const application = row.original

        return (
          <div className="mx-auto w-[250px] cursor-pointer text-center">
            <ApplicationRoundSelectionPopover
              applicationId={application.id}
              roundStatus={application.status}
            />
          </div>
        )
      },
      size: 200
    },
    {
      id: "createdAt",
      header: renderFilterableHeader({ title: "Created On" }),
      meta: {
        columnViewName: "Created On",
        filterID: `${WORKSPACE_ADMIN_APPLICATION_SCORE_FILTER_KEYS.createdOn}-button`
      },
      size: 150,
      cell: ({ row }) => {
        const application = row.original

        return (
          <div className="text-center">
            {application.createdAt
              ? format(application.createdAt, FORMAT_DATE_M_D_Y)
              : "N/A"}
          </div>
        )
      }
    },
    {
      id: "submittedAt",
      header: renderFilterableHeader({ title: "Submitted On" }),
      meta: {
        columnViewName: "Submitted On",
        filterID: `${WORKSPACE_ADMIN_APPLICATION_SCORE_FILTER_KEYS.submittedOn}-button`
      },
      size: 150,
      cell: ({ row }) => {
        const app = row.original

        return (
          <div className="text-center">
            {app?.submittedAt
              ? format(app?.submittedAt, FORMAT_DATE_M_D_Y_TIME_UPPERCASE)
              : "N/A"}
          </div>
        )
      }
    },

    {
      id: "action",
      enableHiding: false,
      meta: { columnViewName: "Docs" },
      header: ({ column }) => (
        <FilterableColumnHeader
          disabled
          className="float-right pr-4"
          column={column}
          title="Docs"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="float-right">
            <ButtonReviewLoanApplication
              loanApplicationId={row.original.id}
              loanApplicationStatus={row.original.status}
              loanProgramType={row.original.programType}
            />
          </div>
        )
      }
    }
  ]

function calculateAvgScore(scoredJudge: IScoreInfo[]): number {
  const score =
    sum(
      scoredJudge
        .map((judge) => judge.score)
        .map((score) => sum(Object.values(score!)) / 5)
    ) / scoredJudge.length

  return Math.floor(score * 10) / 10
}
