import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import { UserDetailInfo, UserRoles } from "@/types/user.type"
import { convertToReadableDateAgo } from "@/utils"
import { ColumnDef } from "@tanstack/react-table"
import React from "react"
import { EditUserRolesAction } from "@/modules/admin/user/table/edit-user-roles-action.tsx"
import { mapRoleToDisplay } from "@/utils/check-roles.ts"

export const columns: ColumnDef<UserDetailInfo>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const application = row.original
      return (
        <>
          <div className="text-black font-medium">{application.name}</div>
          <div className=" text-gray-400">{application.email}</div>
        </>
      )
    }
  },
  {
    accessorKey: "authProvider",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Social" />
    )
  },
  {
    accessorKey: "roles",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Roles" />
    },
    cell: ({ row }) => {
      const roles: UserRoles[] = row.getValue("roles")
      const displayedRoles = roles.map(mapRoleToDisplay)

      return (
        <div className="flex items-center">
          {displayedRoles.map((role) => (
            <React.Fragment key={role}>
              <Badge
                key={role}
                className="flex items-center capitalize pr-3 text-primary"
              >
                {role}
              </Badge>
            </React.Fragment>
          ))}
          <EditUserRolesAction userId={row.original.id} />
        </div>
      )
    }
  },
  {
    accessorKey: "lastActive",
    header: () => <p>Last Active</p>,
    size: 150,
    cell: ({ row }) => {
      const application = row.original

      return <div>{convertToReadableDateAgo(application.loggedInAt)}</div>
    }
  }
]
