import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/ui/data-table"
import { APP_PATH } from "@/constants"
import { getBadgeVariantByStatus } from "@/modules/loan-application-management/services"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import {
  LoanApplicationStatus,
  type UserMicroLoanApplication
} from "@/types/loan-application.type"
import {
  convertToReadableDate,
  convertToReadableDateAgo,
  snakeCaseToText
} from "@/utils"
import { type AccessorKeyColumnDef } from "@tanstack/react-table"
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
              <p className="mt-0.5 truncate text-sm text-muted-foreground ">
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
            className="w-full text-right"
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
              <p className="truncate text-right capitalize">
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
            className="w-full text-right"
            column={column}
            title="Activity"
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
            className="text-right"
            column={column}
            title="Status"
          />
        ),
        size: 190,
        cell: ({ row }) => {
          const application = row.original

          return (
            <div className="text-right font-medium">
              <Badge
                isDot
                className="capitalize"
                variant="soft"
                variantColor={getBadgeVariantByStatus(application.status)}
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
        header: () => <p />,
        size: 150,
        cell: ({ row }) => {
          return (
            <div
              className="flex cursor-pointer items-center justify-end gap-2 font-medium"
              onClick={() => handleClickDetail()}
            >
              {editableStatuses.includes(row.original.status) ? (
                <p>Continue</p>
              ) : (
                <p>Review</p>
              )}
              <ChevronRightIcon className="size-4" />
            </div>
          )
        }
      }
    ]

  const handleClickDetail = () => {
    navigate(APP_PATH.CONFERENCE_DEMO.applicant.index)
  }

  return (
    <div className={cn("container mx-auto p-2xl", "md:p-4xl")}>
      <h1 className="text-3xl font-semibold">Your Applications</h1>
      <p className="mt-1 text-text-tertiary">
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
