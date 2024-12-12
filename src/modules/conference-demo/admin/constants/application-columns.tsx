import { Badge } from "@/components/ui/badge.tsx"
import { toCurrency } from "@/utils"
import { type ColumnDef } from "@tanstack/react-table"
import { getBadgeVariantByStatus } from "../../../loan-application-management/services"

import { FORMAT_DATE_M_D_Y } from "@/constants/date.constants.ts"
import { format } from "date-fns"
import { startCase, toLower } from "lodash"
import { renderFilterableHeader } from "@/utils/table.utils.tsx"
import {
  getBadgeVariantByScore,
  getLabelByPlan
} from "@/modules/loanready/services"
import { type AssessmentResponse } from "@/modules/loanready/types/assessment.ts"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import { ChevronRight } from "lucide-react"
import { ButtonLoading } from "@/components/ui/button.tsx"
import { type useNavigate } from "react-router-dom"
import { APP_PATH } from "@/constants"

export const applicationColumns = (
  navigate: ReturnType<typeof useNavigate>
): ColumnDef<AssessmentResponse>[] => [
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
    header: renderFilterableHeader({ title: "LoanReady Score" }),
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
      const application = row.original

      return (
        <ButtonLoading
          className="flex h-8 items-center gap-0.5 px-2 pr-1"
          variant="ghost"
          onClick={() => {
            navigate(APP_PATH.CONFERENCE_DEMO.admin.business, {
              state: { businessName: application.businessName }
            })
          }}
        >
          Review
          <ChevronRight className="w-4" />
        </ButtonLoading>
      )
    }
  }
]
