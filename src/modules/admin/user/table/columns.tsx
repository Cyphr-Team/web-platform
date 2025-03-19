import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import { type UserDetailInfo, type UserRoles } from "@/types/user.type"
import { convertToReadableDateAgo } from "@/utils"
import { type AccessorKeyColumnDef } from "@tanstack/react-table"
import { nameByRole } from "@/modules/admin/user/constants/roles.constants.ts"
import { UserDetailListAction } from "@/modules/admin/user/table/user-detail-list-action"

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
          <div className="font-medium text-black">{application.name}</div>
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
        <div className="flex items-center text-right">
          <UserDetailListAction
            roles={row.original.roles}
            status={row.original.status}
            userId={row.original.id}
          />
        </div>
      )
    }
  }
]
