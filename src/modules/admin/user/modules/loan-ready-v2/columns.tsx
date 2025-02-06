import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { nameByRole } from "@/modules/admin/user/constants/roles.constants.ts"
import { UserDetailListAction } from "./user-detail-list-action"
import { type UserDetailInfo, type UserRoles } from "@/types/user.type"
import { convertToReadableDateAgo } from "@/utils"
import { renderFilterableHeader } from "@/utils/table.utils"
import { type ColumnDef } from "@tanstack/react-table"
import _ from "lodash"

export const columns: ColumnDef<
  UserDetailInfo & { institutionName?: string }
>[] = [
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
          <div className="font-medium text-black">{application.name}</div>
          <div className="text-gray-400">{application.email}</div>
        </>
      )
    }
  },
  {
    accessorKey: "role",
    header: renderFilterableHeader({ title: "Role" }),
    cell: ({ row }) => {
      const roles: UserRoles[] = row.original.roles
      const displayedRoles = roles.map(nameByRole)

      return (
        <div className="flex items-center space-x-1">
          {displayedRoles.map((role) => (
            <Badge
              key={role}
              className={`${
                role.toLowerCase() === "workspace admin"
                  ? "bg-[#C0D8D8]"
                  : "bg-[#EEFFC0]"
              } py-1 px-3`}
            >
              {role}
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
    header: () => <p className="p-2">Action</p>,
    size: 150,

    cell: ({ row }) => {
      return (
        <div className="flex items-center text-right">
          <UserDetailListAction roles={row.original.roles} />
        </div>
      )
    }
  }
]
