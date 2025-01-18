import { toCurrency } from "@/utils"
import { type ColumnDef } from "@tanstack/react-table"

import { FORMAT_DATE_M_D_Y } from "@/constants/date.constants.ts"
import { format } from "date-fns"
import { renderFilterableHeader } from "@/utils/table.utils.tsx"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header.tsx"
import { type LoanApplication } from "@/types/loan-application.type.ts"
import { ButtonReviewLoanApplication } from "@/modules/loan-application-management/components/atoms/ButtonReviewLoanApplication.tsx"
import { ApplicationStatusSelectionPopover } from "@/modules/loan-application/capital-collab/components/molecules/ApplicationStatusSelectionPopover.tsx"
import { type LoanProgram } from "@/types/loan-program.type"

export const listApplicationColumns = (
  loanProgram?: LoanProgram
): ColumnDef<LoanApplication>[] => [
  {
    id: "applicationIdNumber",
    header: renderFilterableHeader({ title: "ID" }),
    size: 80,
    cell: ({ row }) => {
      const application = row.original

      return (
        <div className="font-medium">#{application?.applicationIdNumber}</div>
      )
    }
  },
  {
    id: "businessName",
    header: renderFilterableHeader({ title: "Company Name" }),
    size: 200,
    cell: ({ row }) => {
      const application = row.original

      return <div>{application?.businessName ?? "-"}</div>
    }
  },
  {
    id: "email",
    accessorKey: "email",
    header: renderFilterableHeader({
      title: "Email",
      btnClassName: "justify-start pl-0"
    }),
    size: 180,
    cell: ({ row }) => {
      const application = row.original

      return <div>{application?.applicant.email ?? "-"}</div>
    }
  },
  {
    id: "requestedLoanAmount",
    accessorKey: "requestedLoanAmount",
    header: renderFilterableHeader({ title: "Amount Requested" }),
    cell: ({ row }) => {
      const application = row.original
      const isAtMaxLoanAmount =
        loanProgram?.maxLoanAmount &&
        application.requestedLoanAmount === loanProgram?.maxLoanAmount

      return (
        <div>
          {application.requestedLoanAmount
            ? toCurrency(application.requestedLoanAmount, 0) +
              (isAtMaxLoanAmount ? "+" : "")
            : "-"}
        </div>
      )
    }
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: renderFilterableHeader({ title: "Created On" }),
    cell: ({ row }) => {
      const application = row.original

      return (
        <div className="truncate">
          {application.createdAt
            ? format(application.createdAt, FORMAT_DATE_M_D_Y)
            : "-"}
        </div>
      )
    }
  },
  {
    id: "submittedAt",
    accessorKey: "submittedAt",
    header: renderFilterableHeader({ title: "Submitted On" }),
    cell: ({ row }) => {
      const application = row.original

      return (
        <div className="truncate">
          {application.submittedAt
            ? format(application.submittedAt, FORMAT_DATE_M_D_Y)
            : "-"}
        </div>
      )
    }
  },
  {
    id: "status",
    accessorKey: "status",
    header: renderFilterableHeader({ title: "Status" }),
    cell: ({ row }) => {
      const application = row.original

      return (
        <ApplicationStatusSelectionPopover
          applicationId={application.id}
          status={application.status}
        />
      )
    }
  },
  {
    id: "action",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="pl-2 font-semibold"
        column={column}
        title="Action"
      />
    ),
    cell: ({ row }) => {
      return (
        <ButtonReviewLoanApplication
          loanApplicationId={row.original.id}
          loanApplicationStatus={row.original.status}
          loanProgramType={row.original.programType}
        />
      )
    }
  }
]
