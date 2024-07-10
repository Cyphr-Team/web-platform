import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { LoanMeta } from "@/types/loan-application.type"
import { LoanApplication } from "@/types/loan-application.type"
import { capitalizeWords, snakeCaseToText, toCurrency } from "@/utils"
import { ColumnDef } from "@tanstack/react-table"
import { getBadgeVariantByStatus } from "../../services"

import { ClipboardCopy } from "@/components/ui/clipboard-copy"
import {
  FORMAT_DATE_M_D_Y,
  FORMAT_DATE_M_D_Y_TIME_UPPERCASE
} from "@/constants/date.constants"
import { FilterableColumnHeader } from "@/shared/molecules/table/column-filter"
import { IJudgeLoanApplicationResponse } from "@/types/application/application-judge.type"
import { ILaunchKCApplicationScore } from "@/types/application/application-score.type"
import { format } from "date-fns"
import { ButtonReviewLoanApplication } from "../atoms/ButtonReviewLoanApplication"
import { ButtonViewDetailLoanApplication } from "../atoms/ButtonViewDetailLoanApplication"
import { ScoredBadgeStatus } from "../atoms/ScoredBadgeStatus"
import { StatusRoundBadge } from "../atoms/StatusRoundBadge"
import { ApplicationRoundSelectionPopover } from "../organisms/ApplicationRoundSelectionPopover"

export const loanApplicationColumns: ColumnDef<LoanApplication<LoanMeta>>[] = [
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

export const assignLoanApplicationColumns: ColumnDef<
  LoanApplication<LoanMeta>
>[] = [
  {
    id: "select",
    header: ({ column }) => (
      <FilterableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => {
      const application = row.original
      return <span> #{application.applicationIdNumber}</span>
    },
    size: 80
  },
  {
    id: "companyName",
    header: ({ column }) => (
      <FilterableColumnHeader column={column} title="Company Name" />
    ),
    cell: () => {
      return "TODO"
    },
    size: 200
  },
  {
    id: "roundOneJudges",
    header: ({ column }) => (
      <FilterableColumnHeader column={column} title="Round 1 Judges" />
    ),
    cell: () => {
      return "TODO"
    },
    size: 200
  },
  {
    id: "roundOneAvgScore",
    header: ({ column }) => (
      <FilterableColumnHeader column={column} title="Round 1 Avg. Score" />
    ),
    cell: () => {
      return "TODO"
    },
    size: 200
  },
  {
    id: "roundTwoJudges",
    header: ({ column }) => (
      <FilterableColumnHeader column={column} title="Round 2 Judges" />
    ),
    cell: () => {
      return "TODO"
    },
    size: 200
  },
  {
    id: "roundTwoAvgScore",
    header: ({ column }) => (
      <FilterableColumnHeader column={column} title="Round 2 Avg. Score" />
    ),
    cell: () => {
      return "TODO"
    },
    size: 200
  },
  {
    id: "scoredcard",
    header: ({ column }) => (
      <FilterableColumnHeader column={column} title="Scorecard Status" />
    ),
    cell: () => {
      return "TODO"
    },
    size: 200
  },
  {
    id: "roundStatus",
    header: ({ column }) => (
      <FilterableColumnHeader column={column} title="Round Status" />
    ),
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
    header: ({ column }) => (
      <FilterableColumnHeader column={column} title="Created On" />
    ),
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
    id: "submittedAt",
    header: ({ column }) => (
      <FilterableColumnHeader column={column} title="Submitted On" />
    ),
    size: 150,
    cell: () => {
      return "TODO"
    }
  },
  {
    id: "action",
    header: ({ column }) => (
      <FilterableColumnHeader disabled column={column} title="Docs" />
    ),
    cell: () => {
      return "TODO"
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
    id: "select",
    header: ({ column }) => (
      <FilterableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => {
      const app = row.original
      return <span> #{app?.application?.applicationIdNumber}</span>
    },
    size: 80
  },
  {
    id: "companyName",
    header: ({ column }) => (
      <FilterableColumnHeader column={column} title="Company Name" />
    ),
    cell: ({ row }) => {
      const app = row.original
      return <span>{app?.application?.businessName ?? "N/A"}</span>
    },
    size: 200
  },
  {
    id: "round",
    header: ({ column }) => (
      <FilterableColumnHeader column={column} title="Round" />
    ),
    cell: ({ row }) => {
      const app = row.original

      return (
        <StatusRoundBadge round={app?.applicationCaptureStage}>
          {capitalizeWords(snakeCaseToText(app?.applicationCaptureStage))}
        </StatusRoundBadge>
      )
    },
    size: 200
  },
  {
    id: "scoredcard",
    header: ({ column }) => (
      <FilterableColumnHeader column={column} title="Scorecard Status" />
    ),
    cell: ({ row }) => {
      const app = row.original

      return (
        <ScoredBadgeStatus
          loanApplicationId={app?.application?.id}
          loanProgramType={app?.application?.programType}
          scoredAt={app?.scoredAt}
        />
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
        <div>
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
        <div>
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
      <FilterableColumnHeader disabled column={column} title="Docs" />
    ),
    cell: ({ row }) => {
      const app = row.original

      return (
        <ButtonViewDetailLoanApplication
          loanApplicationId={app?.application.id}
          loanProgramType={app?.application?.programType}
        />
      )
    }
  }
]
