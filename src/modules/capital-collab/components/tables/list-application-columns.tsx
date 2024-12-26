import { Badge } from "@/components/ui/badge.tsx"
import { toCurrency } from "@/utils"
import { type ColumnDef } from "@tanstack/react-table"

import { FORMAT_DATE_M_D_Y } from "@/constants/date.constants.ts"
import { format } from "date-fns"
import { ButtonReviewLoanApplication } from "../../../loan-application-management/components/atoms/ButtonReviewLoanApplication.tsx"
import { startCase, toLower } from "lodash"
import { renderFilterableHeader } from "@/utils/table.utils.tsx"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import { type LoanApplication } from "@/types/loan-application.type"
import { getBadgeVariantByStatus } from "@/modules/capital-collab/services"

export const listApplicationColumns: ColumnDef<LoanApplication>[] = [
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

      return (
        <div>
          {application.requestedLoanAmount
            ? toCurrency(application.requestedLoanAmount, 0)
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
        <Badge
          className="truncate"
          variant="soft"
          variantColor={getBadgeVariantByStatus(application.status)}
        >
          {startCase(toLower(application.status))}
        </Badge>
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
