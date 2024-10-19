import { REQUEST_LIMIT_PARAM } from "@/constants"
import {
  getCoreRowModel,
  type PaginationState,
  useReactTable
} from "@tanstack/react-table"
import { useQueryListPaginateInvitation } from "@/modules/admin/user/hooks/useQuery/useQueryListPaginateInvitation.ts"
import { useState } from "react"
import { RevokeInvitationAction } from "@/modules/admin/user/table/revoke-invitation-action.tsx"
import { calculateDaysUntilExpiration } from "@/utils/date.utils.ts"
import { DataTablePagination } from "@/shared/molecules/table/table-pagination"
import { type Invitation } from "@/types/invitation.type"

export function InvitationTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: REQUEST_LIMIT_PARAM
  })

  const { data } = useQueryListPaginateInvitation({
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize
  })

  const invitations: Invitation[] = data?.data ?? []

  const table = useReactTable({
    columns: [],
    data: invitations,
    rowCount: data?.total ?? 0,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true
  })

  return (
    <div className="sticky top-0">
      <h1 className="text-l font-medium mb-4">
        {data?.total !== undefined && (
          <span>
            There {data.total < 2 ? "is" : "are"} {data.total} active invitation
            {data.total > 1 && "s"}
          </span>
        )}
      </h1>

      {data?.data.map((invitation) => {
        const daysUntilExpiration = calculateDaysUntilExpiration(
          invitation.expirationDays,
          invitation.sentAt
        )

        return (
          <div
            key={invitation.id}
            className="border border-gray-100 px-3 py-1.5 mb-2 flex items-center justify-between shadow-md rounded-md text-sm"
            id={invitation.recipientEmail}
          >
            <div className="flex items-center">
              <h2 className="text-gray-600">
                {invitation.senderName} ({invitation.senderEmail}) invited{" "}
                <span className="font-semibold">
                  {invitation.recipientEmail}
                </span>
              </h2>
            </div>
            <div className="text-right flex items-center justify-between">
              <p className="text-gray-600">
                {daysUntilExpiration < 1 ? (
                  <span className="font-semibold">Expired</span>
                ) : (
                  <>
                    Expires in{" "}
                    <span className="font-semibold">
                      {daysUntilExpiration === 1
                        ? "1 day"
                        : `${daysUntilExpiration} days`}
                    </span>{" "}
                  </>
                )}
              </p>
              <div className="min-w-0">
                <RevokeInvitationAction invitation={invitation} />
              </div>
            </div>
          </div>
        )
      })}
      <div className="flex items-center justify-end space-x-2 py-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  )
}
