import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import { UserDetailInfo, UserRoles } from "@/types/user.type"
import { convertToReadableDateAgo } from "@/utils"
import { AccessorKeyColumnDef } from "@tanstack/react-table"
import { ModifyUserPermissionAction } from "@/modules/admin/user/table/modify-user-permission-action.tsx"
import { nameByRole } from "@/modules/admin/user/constants/roles.constants.ts"

export const columns: AccessorKeyColumnDef<
  UserDetailInfo & { institutionName?: string }
>[] = [
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
      const displayedRoles = roles.map(nameByRole)

      return (
        <div className="flex items-center">
          {displayedRoles.map((role) => (
            <Badge key={role}>{role}</Badge>
          ))}
        </div>
      )
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    )
  },
  {
    accessorKey: "institution",
    header: () => <p>Institution</p>,
    size: 150,
    cell: ({ row }) => {
      return <div>{row.original.institutionName}</div>
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
  },
  {
    accessorKey: "edit",
    header: () => <p className="p-2">Action</p>,
    size: 150,
    cell: ({ row }) => {
      return (
        <div className="flex items-center text-center">
          <ModifyUserPermissionAction
            userId={row.original.id}
            status={row.original.status}
            roles={row.original.roles}
          />
        </div>
      )
    }
  }
]
