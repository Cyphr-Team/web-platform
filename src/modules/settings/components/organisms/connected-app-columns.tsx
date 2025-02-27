import { type ColumnDef } from "@tanstack/react-table"
import { type ConnectedApp } from "@/modules/settings/types"
import { Button } from "@/components/ui/button"
import { MoreHorizontalIcon } from "lucide-react"
import { format } from "date-fns"
import { FORMAT_DATE_M_D_Y } from "@/constants/date.constants.ts"
import mappedStatusLabel from "@/modules/settings/constants/mapped-status-label.ts"

const connectedAppColumns: ColumnDef<ConnectedApp>[] = [
  {
    header: "Application",
    accessorKey: "application",
    accessorFn: () => "---"
  },
  {
    header: "App",
    accessorKey: "app",
    cell: () => {
      return (
        <div className="flex flex-row gap-4 items-center">
          <img alt="plaid icon" className="size-10" src="/plaid-icon.png" />
          <p className="text-[#344054] font-semibold">Plaid</p>
        </div>
      )
    }
  },
  {
    header: "Connected On",
    accessorKey: "connectedOn",
    accessorFn: (row) => format(row.connectedAt, FORMAT_DATE_M_D_Y)
  },
  {
    header: "Status",
    accessorKey: "status",
    accessorFn: (row) => mappedStatusLabel[row.status] ?? "---"
  },
  {
    header: "Action",
    accessorKey: "action",
    cell: () => {
      return (
        <Button variant="ghost">
          <MoreHorizontalIcon size={16} />
        </Button>
      )
    }
  }
]

export default connectedAppColumns
