import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import { UserDetailInfo } from "@/types/user.type"
import { convertToReadableDateAgo, snakeCaseToText } from "@/utils"
import { ColumnDef } from "@tanstack/react-table"

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
      const roles: string[] = row.getValue("roles")

      return roles.map((role) => (
        <Badge key={role} className="capitalize">
          {snakeCaseToText(role)}
        </Badge>
      ))
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
