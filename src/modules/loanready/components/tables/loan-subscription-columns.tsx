import { Badge } from "@/components/ui/badge.tsx"
import { toCurrency } from "@/utils"
import { type ColumnDef } from "@tanstack/react-table"
import { getBadgeVariantByStatus } from "../../../loan-application-management/services"

import { FORMAT_DATE_M_D_Y } from "@/constants/date.constants.ts"
import { format } from "date-fns"
import { ButtonReviewLoanApplication } from "../../../loan-application-management/components/atoms/ButtonReviewLoanApplication.tsx"
import { startCase, toLower } from "lodash"
import { renderFilterableHeader } from "@/utils/table.utils.tsx"
import {
  getBadgeVariantByScore,
  getLabelByPlan
} from "@/modules/loanready/services"
import { type AssessmentResponse } from "@/modules/loanready/types/assessment.ts"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"

export const loanSubscriptionColumns: ColumnDef<AssessmentResponse>[] = [
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
      const app = row.original

      return <div>{app?.businessName ?? "-"}</div>
    }
  },
  {
    id: "plan",
    accessorKey: "plan",
    header: renderFilterableHeader({ title: "Program" }),
    cell: ({ row }) => {
      const application = row.original

      return <div>{getLabelByPlan(application.plan)}</div>
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

      return <div>{application?.email ?? "-"}</div>
    }
  },
  {
    id: "scoreLevel",
    accessorKey: "scoreLevel",
    header: renderFilterableHeader({ title: "Loan Readiness Score" }),
    cell: ({ row }) => {
      const application = row.original

      return (
        <div className="min-w-0">
          {application.scoreLevel ? (
            <Badge
              className="w-24 font-normal text-black"
              variant="solid"
              variantColor={getBadgeVariantByScore(application.scoreLevel)}
            >
              {startCase(toLower(application.scoreLevel))}
            </Badge>
          ) : (
            "-"
          )}
        </div>
      )
    }
  },
  {
    id: "requestedAmount",
    accessorKey: "requestedAmount",
    header: renderFilterableHeader({ title: "Amount Requested" }),
    cell: ({ row }) => {
      const application = row.original
      const amount = toCurrency(application.requestedLoanAmount, 0)

      return <div>{amount}</div>
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
          isDot
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
