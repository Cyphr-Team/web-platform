import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import {
  IAssigneeApplication,
  LoanApplication,
  LoanMeta
} from "@/types/loan-application.type"
import { snakeCaseToText, toCurrency } from "@/utils"
import { ColumnDef } from "@tanstack/react-table"
import { getBadgeVariantByStatus } from "../../services"

import { ClipboardCopy } from "@/components/ui/clipboard-copy"
import { FORMAT_DATE_M_D_Y } from "@/constants/date.constants"
import { FilterableColumnHeader } from "@/shared/molecules/table/column-filter"
import { format } from "date-fns"
import { ButtonReviewLoanApplication } from "../atoms/ButtonReviewLoanApplication"
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

export const assigneeLoanApplicationColumns: ColumnDef<IAssigneeApplication>[] =
  [
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
      id: "round",
      header: ({ column }) => (
        <FilterableColumnHeader column={column} title="Round" />
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
