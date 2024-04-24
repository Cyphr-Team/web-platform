import { REQUEST_LIMIT_PARAM } from "@/constants"
import { PaginationState } from "@tanstack/react-table"
import { useQueryListPaginateInvitation } from "@/modules/admin/user/hooks/useQuery/useQueryListPaginateInvitation.ts"
import { useState } from "react"

export const DataFlex = () => {
  const [pagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: REQUEST_LIMIT_PARAM
  })

  const { data } = useQueryListPaginateInvitation({
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize
  })

  const calculateDaysUntilExpiration = (
    expirationDays: number,
    sentAt: string
  ) => {
    try {
      const millisecondsPerDay = 1000 * 60 * 60 * 24
      const sentDate = new Date(sentAt)
      const currentDate = new Date()
      return (
        expirationDays -
        Math.ceil(
          (currentDate.getTime() - sentDate.getTime()) / millisecondsPerDay
        )
      )
    } catch (e) {
      return null
    }
  }

  return (
    <div className="sticky top-0">
      <h1 className="text-l font-medium mb-4">
        There are {data?.total ?? 0} active invitations
      </h1>
      {data?.data.map((invitation) => {
        const daysUntilExpiration = calculateDaysUntilExpiration(
          invitation.expirationDays,
          invitation.sentAt
        )
        return (
          <div
            key={invitation.id}
            className="border border-gray-200 p-4 mb-1 rounded-none flex items-center justify-between"
          >
            <div className="flex items-center">
              <h2 className="text-gray-600">
                {invitation.senderName} ({invitation.senderEmail}) invited{" "}
                <span className="font-semibold">
                  {invitation.recipientEmail}
                </span>
              </h2>
            </div>
            <div className="text-right">
              <p className="text-gray-600">
                Expires in{" "}
                <span className="font-semibold">
                  {daysUntilExpiration} days
                </span>{" "}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
