import { type ColumnDef } from "@tanstack/react-table"
import { type ConnectedApp } from "@/modules/settings/types"
import { format } from "date-fns"
import { FORMAT_DATE_M_D_Y } from "@/constants/date.constants.ts"
import mappedStatusLabel from "@/modules/settings/constants/mapped-status-label.ts"
import { DisconnectAppAction } from "@/modules/settings/components/organisms"

const connectedAppColumns: ColumnDef<ConnectedApp>[] = [
  {
    header: "Application",
    accessorKey: "businessName"
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
    accessorKey: "connectedAt",
    accessorFn: (row) => format(row.connectedAt, FORMAT_DATE_M_D_Y)
  },
  {
    header: "Status",
    accessorKey: "status",
    accessorFn: (row) => mappedStatusLabel[row.status] ?? "---"
  },
  {
    accessorKey: "action",
    header: () => <div className="px-4">Action</div>,
    cell: ({ row }) =>
      DisconnectAppAction({
        applicationId: row.original.applicationId
      })
  }
]

export default connectedAppColumns
