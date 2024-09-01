import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/ui/data-table"
import { APP_PATH } from "@/constants"
import { getBadgeVariantByStatus } from "@/modules/loan-application-management/services"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import {
  LoanApplicationStatus,
  UserMicroLoanApplication
} from "@/types/loan-application.type"
import {
  convertToReadableDate,
  convertToReadableDateAgo,
  snakeCaseToText
} from "@/utils"
import { AccessorKeyColumnDef } from "@tanstack/react-table"
import { ChevronRightIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { MOCK_APPLICATIONS } from "../../constants/data"

export function LoanApplications() {
  const navigate = useNavigate()

  const editableStatuses = [
    LoanApplicationStatus.DRAFT.toLowerCase(),
    LoanApplicationStatus.PENDING_SUBMISSION.toLowerCase()
  ]

  const loanApplicationColumns: AccessorKeyColumnDef<UserMicroLoanApplication>[] =
    [
      {
        id: "applicant",
        accessorKey: "loanProgram",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Loan Program" />
        ),
        cell: ({ row }) => {
          const application = row.original
          return (
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground mt-0.5 truncate ">
                {application.loanProgram.name}
              </p>
            </div>
          )
        },
        size: 300
      },
      {
        id: "applicationDate",
        accessorKey: "createdAt",
        header: ({ column }) => (
          <DataTableColumnHeader
            className="text-right w-full"
            column={column}
            title="Started On"
          />
        ),
        enableSorting: false,
        size: 150,
        cell: ({ row }) => {
          const application = row.original

          return (
            <div className="min-w-0">
              <p className="truncate capitalize text-right">
                {convertToReadableDate(application.createdAt)}
              </p>
            </div>
          )
        }
      },
      {
        id: "updatedAt",
        accessorKey: "updatedAt",
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="Activity"
            className="text-right w-full"
          />
        ),
        size: 150,
        enableSorting: false,
        cell: ({ row }) => {
          const application = row.original

          return (
            <div className="min-w-0">
              <p className="truncate text-right">
                {convertToReadableDateAgo(application.updatedAt)}
              </p>
            </div>
          )
        }
      },
      {
        id: "status",
        accessorKey: "status",
        enableSorting: false,
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="Status"
            className="text-right"
          />
        ),
        size: 190,
        cell: ({ row }) => {
          const application = row.original

          return (
            <div className="font-medium text-right">
              <Badge
                isDot
                variant="soft"
                variantColor={getBadgeVariantByStatus(application.status)}
                className="capitalize"
              >
                {snakeCaseToText(application.status ?? "Draft").toLowerCase()}
              </Badge>
            </div>
          )
        }
      },
      {
        id: "action",
        accessorKey: "detail",
        header: () => <p></p>,
        size: 150,
        cell: ({ row }) => {
          return (
            <div
              className="font-medium flex gap-2 items-center cursor-pointer justify-end"
              onClick={() => handleClickDetail()}
            >
              {editableStatuses.includes(row.original.status) ? (
                <p>Continue</p>
              ) : (
                <p>Review</p>
              )}
              <ChevronRightIcon className="h-4 w-4" />
            </div>
          )
        }
      }
    ]

  const handleClickDetail = () => {
    navigate(APP_PATH.CONFERENCE_DEMO.applicant.index)
  }

  return (
    <div
      className={cn("container mx-auto px-2xl py-2xl", "md:px-4xl md:py-4xl")}
    >
      <h1 className="text-3xl font-semibold">Your Applications</h1>
      <p className="text-text-tertiary mt-1">
        Keep track of your applications and their statuses
      </p>
      <DataTable
        columns={loanApplicationColumns}
        data={MOCK_APPLICATIONS.map((item) => ({
          ...item,
          updatedAt: new Date().toISOString()
        }))}
        total={MOCK_APPLICATIONS.length}
      />
    </div>
  )
}
