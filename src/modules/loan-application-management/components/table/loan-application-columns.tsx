import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { LoanApplicationStatus } from "@/types/loan-application.type"
import { capitalizeWords, snakeCaseToText, toCurrency } from "@/utils"
import { ColumnDef } from "@tanstack/react-table"
import { getBadgeVariantByStatus } from "../../services"

import { ClipboardCopy } from "@/components/ui/clipboard-copy"
import {
  FORMAT_DATE_M_D_Y,
  FORMAT_DATE_M_D_Y_TIME_UPPERCASE
} from "@/constants/date.constants"
import { FilterableColumnHeader } from "@/shared/molecules/table/column-filter"
import {
  Default,
  LaunchKCStageResponse,
  LoanApplicationResponse
} from "@/types/application/application-assign.type"
import { IJudgeLoanApplicationResponse } from "@/types/application/application-judge.type"
import { ILaunchKCApplicationScore } from "@/types/application/application-score.type"
import { format } from "date-fns"
import { AssigningJudgeRow } from "../../../loan-application/components/organisms/application-assigning/AssigningJudgeRow"
import { ButtonReviewLoanApplication } from "../atoms/ButtonReviewLoanApplication"
import { ButtonViewDetailLoanApplication } from "../atoms/ButtonViewDetailLoanApplication"
import { CustomJudgeAvatar, ToolTipJudgeAvatar } from "../atoms/JudgeAvatar"
import { ScoreBadge } from "../atoms/ScoreBadge"
import { ScoredBadgeStatusWithTooltip } from "../atoms/ScoredBadgeStatus"
import { StatusRoundBadge } from "../atoms/StatusRoundBadge"
import { ApplicationRoundSelectionPopover } from "../organisms/ApplicationRoundSelectionPopover"
import { NudgeJudgesPopover } from "../organisms/NudgeJudgesPopover"
import { renderFilterableHeader } from "@/utils/table.utils"
import { LoanStage } from "@/modules/loan-application-management/constants/types/application.ts"
import { LoanApplicationStage } from "@/types/application/application-stage.type.ts"

export const loanApplicationColumns: ColumnDef<
  LoanApplicationResponse<Default>
>[] = [
  {
    id: "select",
    header: "ID",
    cell: ({ row }) => {
      const application = row.original

      return (
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger className="font-medium cursor-default">
              {application.applicationIdNumber}
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="inline-block"
              asChild={true}
            >
              <ClipboardCopy
                content={application.applicationIdNumber.toString()}
                value={application.applicationIdNumber}
                variant={"blue"}
              />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    },
    enableSorting: false,
    enableHiding: false,
    size: 80
  },
  {
    id: "applicant",
    accessorKey: "businessName",
    header: "Business name",
    cell: ({ row }) => {
      const application = row.original

      return (
        <div className="min-w-0">
          <p className="truncate">{application.businessName ?? "N/A"}</p>
        </div>
      )
    },
    size: 250
  },
  {
    accessorKey: "programName",
    header: "Loan program",
    size: 200,
    cell: ({ row }) => {
      const application = row.original

      return (
        <div className="min-w-0">
          <p className="truncate capitalize">{application.programName}</p>
        </div>
      )
    }
  },
  {
    accessorKey: "loanAmount",
    header: () => <p className="text-right">Amount requested</p>,
    size: 100,
    cell: ({ row }) => {
      const application = row.original
      const amount = toCurrency(application.requestedLoanAmount, 0)

      return <div className="text-right">{amount}</div>
    }
  },
  {
    accessorKey: "createdAt",
    header: () => <p>Created on</p>,
    size: 150,
    cell: ({ row }) => {
      const application = row.original

      return (
        <div>
          {application.createdAt
            ? format(application.createdAt, FORMAT_DATE_M_D_Y)
            : "N/A"}
        </div>
      )
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 150,
    cell: ({ row }) => {
      const application = row.original

      return (
        <div>
          <Badge
            isDot
            variant="soft"
            variantColor={getBadgeVariantByStatus(application.status)}
            className="capitalize"
          >
            {snakeCaseToText(application.status)}
          </Badge>
        </div>
      )
    }
  },
  {
    id: "action",
    cell: ({ row }) => {
      return (
        <ButtonReviewLoanApplication
          loanApplicationStatus={row.original.status}
          loanApplicationId={row.original.id}
          loanProgramType={row.original.programType}
        />
      )
    }
  }
]

/**
 * Columns for workspace admin list applications
 */

export const workspaceAdminApplicationColumns: ColumnDef<
  LoanApplicationResponse<LaunchKCStageResponse>
>[] = [
  {
    id: "applicationIdNumber",
    header: renderFilterableHeader("ID"),
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
    header: renderFilterableHeader("Company Name"),
    cell: ({ row }) => {
      const app = row.original
      return <div className="text-center">{app?.businessName ?? "N/A"}</div>
    },
    size: 200
  },
  {
    id: "roundOneJudges",
    header: renderFilterableHeader("Round 1 Judges", true),
    cell: ({ row }) => {
      const application = row.original
      const stageInfo = application.loanMeta?.stages?.find(
        (stage) => stage.stage === LoanApplicationStage.ROUND_1.toLowerCase()
      )
      const remainAvatar = stageInfo ? stageInfo.scoreInfo.length - 8 : 0

      return (
        <div className="flex items-center justify-center">
          <AssigningJudgeRow
            row={row}
            currentStage={LoanStage.ROUND_1}
            disabled={
              application.status.toLowerCase() !==
              LoanApplicationStatus.ROUND_1.toLowerCase()
            }
          />

          <div className="flex items-center justify-center">
            {stageInfo?.scoreInfo
              .slice(0, 8)
              .map((scoreInfo, key) => (
                <ToolTipJudgeAvatar
                  key={key}
                  avatar={scoreInfo?.judgeAvatar}
                  name={scoreInfo?.judgeName}
                  email={scoreInfo?.judgeEmail}
                  isScored={scoreInfo?.score !== null}
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
    header: renderFilterableHeader("Round 1 Avg. Score", true),
    cell: ({ row }) => {
      const application = row.original
      const stageInfo = application.loanMeta?.stages?.find(
        (stage) => stage.stage === LoanApplicationStage.ROUND_1.toLowerCase()
      )

      if (!stageInfo || stageInfo.scoreInfo.length === 0) {
        return <div className="text-center">---</div>
      }

      const totalScores = stageInfo.scoreInfo.reduce(
        (totals, scoreInfo) => {
          if (scoreInfo.score) {
            totals.productOrService += scoreInfo.score.productOrService
            totals.marketOpportunity += scoreInfo.score.marketOpportunity
            totals.businessModel += scoreInfo.score.businessModel
            totals.execution += scoreInfo.score.execution
            totals.launchKCFit += scoreInfo.score.launchKcfit
            totals.count += 1
          }
          return totals
        },
        {
          productOrService: 0,
          marketOpportunity: 0,
          businessModel: 0,
          execution: 0,
          launchKCFit: 0,
          count: 0
        }
      )
      const avgScore = totalScores.count
        ? (totalScores.productOrService +
            totalScores.marketOpportunity +
            totalScores.businessModel +
            totalScores.execution +
            totalScores.launchKCFit) /
          (5 * totalScores.count)
        : 0

      return (
        <div className="text-center">
          <ScoreBadge score={avgScore} isFinished={true} />
        </div>
      )
    },
    size: 200
  },
  {
    id: "roundTwoJudges",
    header: renderFilterableHeader("Round 2 Judges", true),
    cell: ({ row }) => {
      const application = row.original
      const stageInfo = application.loanMeta?.stages?.find(
        (stage) => stage.stage === LoanApplicationStage.ROUND_2.toLowerCase()
      )
      const remainAvatar = stageInfo ? stageInfo.scoreInfo.length - 8 : 0

      return (
        <div className="flex items-center justify-center">
          <AssigningJudgeRow
            row={row}
            currentStage={LoanStage.ROUND_2}
            disabled={
              application.status.toLowerCase() !==
              LoanApplicationStatus.ROUND_2.toLowerCase()
            }
          />

          <div className="flex items-center justify-center">
            {stageInfo?.scoreInfo
              .slice(0, 8)
              .map((scoreInfo, key) => (
                <ToolTipJudgeAvatar
                  key={key}
                  avatar={scoreInfo?.judgeAvatar}
                  name={scoreInfo?.judgeName}
                  email={scoreInfo?.judgeEmail}
                  isScored={scoreInfo?.score !== null}
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
    header: renderFilterableHeader("Round 2 Avg. Score", true),
    cell: ({ row }) => {
      const application = row.original
      const stageInfo = application.loanMeta?.stages?.find(
        (stage) => stage.stage === LoanApplicationStage.ROUND_2.toLowerCase()
      )

      if (!stageInfo || stageInfo.scoreInfo.length === 0) {
        return <div className="text-center">---</div>
      }

      const totalScores = stageInfo.scoreInfo.reduce(
        (totals, scoreInfo) => {
          if (scoreInfo.score) {
            totals.productOrService += scoreInfo.score.productOrService
            totals.marketOpportunity += scoreInfo.score.marketOpportunity
            totals.businessModel += scoreInfo.score.businessModel
            totals.execution += scoreInfo.score.execution
            totals.launchKCFit += scoreInfo.score.launchKcfit
            totals.count += 1
          }
          return totals
        },
        {
          productOrService: 0,
          marketOpportunity: 0,
          businessModel: 0,
          execution: 0,
          launchKCFit: 0,
          count: 0
        }
      )

      const avgScore = totalScores.count
        ? (totalScores.productOrService +
            totalScores.marketOpportunity +
            totalScores.businessModel +
            totalScores.execution +
            totalScores.launchKCFit) /
          (5 * totalScores.count)
        : 0

      return (
        <div className="text-center">
          <ScoreBadge score={avgScore} isFinished={true} />
        </div>
      )
    },
    size: 200
  },
  {
    id: "scorecardStatus",
    header: renderFilterableHeader("Scorecard Status", true),
    cell: ({ row }) => {
      const application = row.original

      const stageOne = application.loanMeta?.stages?.find(
        (stage) => stage.stage === LoanApplicationStage.ROUND_1.toLowerCase()
      )
      const stageTwo = application.loanMeta?.stages?.find(
        (stage) => stage.stage === LoanApplicationStage.ROUND_2.toLowerCase()
      )

      const currentRoundAssignedJudges = stageTwo
        ? stageTwo.scoreInfo
        : stageOne?.scoreInfo
      const completedScorecardJudges = stageTwo
        ? stageTwo.scoreInfo?.filter((scoreInfo) => scoreInfo.score !== null)
        : stageOne?.scoreInfo?.filter(
            (scoreInfo) => scoreInfo.score !== null
          ) ?? []

      if (!currentRoundAssignedJudges) {
        return ""
      }

      return (
        <div className="text-center">
          <NudgeJudgesPopover
            assignedJudges={currentRoundAssignedJudges}
            completedScorecardJudges={completedScorecardJudges}
            applicationId={application.id}
          />
        </div>
      )
    },
    size: 200
  },
  {
    id: "roundStatus",
    header: renderFilterableHeader("Round Status", true),
    cell: ({ row }) => {
      const application = row.original

      return (
        <div className="text-center cursor-pointer w-[250px]">
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
    header: renderFilterableHeader("Created On"),
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
    header: renderFilterableHeader("Submitted On"),
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
    header: ({ column }) => (
      <FilterableColumnHeader
        className="float-right pr-4"
        disabled
        column={column}
        title="Docs"
      />
    ),
    cell: ({ row }) => {
      return (
        <ButtonReviewLoanApplication
          loanApplicationStatus={row.original.status}
          loanApplicationId={row.original.id}
          loanProgramType={row.original.programType}
        />
      )
    }
  }
]

/**
 * Columns for judge list applications
 */
export const judgeLoanApplicationColumns: ColumnDef<
  IJudgeLoanApplicationResponse<ILaunchKCApplicationScore>
>[] = [
  {
    id: "applicationIdNumber",
    header: ({ column }) => (
      <FilterableColumnHeader column={column} title="ID" />
    ),
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
    header: ({ column }) => (
      <FilterableColumnHeader column={column} title="Company Name" />
    ),
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
    header: ({ column }) => (
      <FilterableColumnHeader column={column} title="Round" />
    ),
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
    header: ({ column }) => (
      <FilterableColumnHeader column={column} title="Scorecard Status" />
    ),
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
    header: ({ column }) => (
      <FilterableColumnHeader column={column} title="Created On" />
    ),
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
    header: ({ column }) => (
      <FilterableColumnHeader column={column} title="Submitted On" />
    ),
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
