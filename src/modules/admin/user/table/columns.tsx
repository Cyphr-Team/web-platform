import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import { UserDetailInfo } from "@/types/user.type"
import { snakeCaseToText } from "@/utils"
import { formatDate } from "@/utils/date.utils"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<UserDetailInfo>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    )
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
    accessorKey: "createdAt",
    header: () => <p>Created on</p>,
    size: 150,
    cell: ({ row }) => {
      const application = row.original

      return (
        <div>
          {application.createdAt ? formatDate(application.createdAt) : "N/A"}
        </div>
      )
    }
  }
]
