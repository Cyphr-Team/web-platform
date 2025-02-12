import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { UserDetailListAction } from "./user-detail-list-action"
import { type UserDetailInfo, type UserRoles } from "@/types/user.type"
import { convertToReadableDateAgo } from "@/utils"
import { renderFilterableHeader } from "@/utils/table.utils"
import { type ColumnDef } from "@tanstack/react-table"
import {
  getBadgeVariantByRole,
  getRoleDisplayName
} from "@/modules/loanready/services"
import _ from "lodash"

export const columns: ColumnDef<UserDetailInfo>[] = [
  {
    accessorKey: "select",
    id: "select",
    header: () => null,
    cell: ({ row }) => (
      <div className="grid place-items-center">
        <Checkbox
          aria-label="Select row"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    size: 50
  },
  {
    accessorKey: "name",
    header: renderFilterableHeader({ title: "Name" }),
    cell: ({ row }) => {
      const application = row.original

      return (
        <>
          <div className="font-medium text-[#252828]">{application.name}</div>
          <div className="text-[#252828]">{application.email}</div>
        </>
      )
    }
  },
  {
    accessorKey: "role",
    header: renderFilterableHeader({ title: "Role" }),
    cell: ({ row }) => {
      const roles: UserRoles[] = row.original.roles

      return (
        <div className="flex items-center space-x-1">
          {roles.map((role) => (
            <Badge
              key={role}
              className="text-[#252828]"
              variant="solid"
              variantColor={getBadgeVariantByRole(role)}
            >
              {getRoleDisplayName(role)}
            </Badge>
          ))}
        </div>
      )
    }
  },
  {
    accessorKey: "accountType",
    header: renderFilterableHeader({ title: "Account Type" }),
    accessorFn: (row) => _.startCase(row.authProvider.toLowerCase())
  },
  {
    accessorKey: "status",
    header: renderFilterableHeader({ title: "Status" }),
    accessorFn: (row) => _.startCase(row.status.toLowerCase())
  },
  {
    accessorKey: "lastActive",
    header: renderFilterableHeader({ title: "Last Active" }),
    accessorFn: (row) => _.upperFirst(convertToReadableDateAgo(row.loggedInAt))
  },
  {
    accessorKey: "edit",
    header: () => <div className="p-2 font-semibold">Action</div>,
    size: 150,

    cell: ({ row }) => {
      return (
        <div className="flex items-center text-right">
          <UserDetailListAction userInfo={row.original} />
        </div>
      )
    }
  }
]
