import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { LoanApplication } from "@/types/loan-application.type"
import { snakeCaseToText, toCurrency } from "@/utils"
import { ColumnDef } from "@tanstack/react-table"
import { getBadgeVariantByStatus } from "../../services"

import { FORMAT_DATE_M_D_Y } from "@/constants/date.constants"
import { format } from "date-fns"
import { ButtonReviewLoanApplication } from "../atoms/ButtonReviewLoanApplication"
import { ClipboardCopy } from "@/components/ui/clipboard-copy"

export const loanApplicationColumns: ColumnDef<LoanApplication>[] = [
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
        />
      )
    }
  }
]
