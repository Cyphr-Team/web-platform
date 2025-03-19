import { type ColumnDef } from "@tanstack/react-table"
import { type FeatureFlag } from "@/types/feature-flag.types.ts"
import { formatDate } from "@/utils/date.utils"
import { ConfirmToggleStatusFeatureFlag } from "../components/ToggleStatusFeatureFlag"
import { DialogModifyWhitelistUsers } from "@/modules/feature-flag/components/DialogModifyWhitelistUsers.tsx"
import { ConfirmToggleWhitelistFeatureFlag } from "@/modules/feature-flag/components/ToggleWhitelistFeatureFlag.tsx"
import { DeleteFeatureFlagModal } from "@/modules/feature-flag/components/DeteleFeatureFlagModal.tsx"
import { renderFilterableHeader } from "@/utils/table.utils"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"

export const featureFlagColumns: ColumnDef<FeatureFlag>[] = [
  {
    id: "key",
    header: renderFilterableHeader({
      title: "Key",
      btnClassName: "justify-start pl-0"
    }),
    accessorKey: "key",
    size: 250
  },
  {
    id: "description",
    header: renderFilterableHeader({
      title: "Description",
      btnClassName: "justify-start pl-0"
    }),
    accessorKey: "description",
    size: 250
  },
  {
    id: "status",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="font-semibold"
        column={column}
        title="Status"
      />
    ),
    size: 100,
    cell: ({ row }) => {
      const data = row.original

      return <ConfirmToggleStatusFeatureFlag featureFlag={data} />
    }
  },
  {
    id: "rolloutType",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="font-semibold"
        column={column}
        title="Whitelist"
      />
    ),
    size: 100,
    cell: ({ row }) => {
      const data = row.original

      return <ConfirmToggleWhitelistFeatureFlag featureFlag={data} />
    }
  },
  {
    id: "createdAt",
    header: renderFilterableHeader({
      title: "Created At",
      btnClassName: "justify-start pl-0"
    }),
    size: 100,
    cell: ({ row }) => {
      const data = row.original

      return <div>{formatDate(data.createdAt)}</div>
    }
  },
  {
    id: "updatedAt",
    header: renderFilterableHeader({
      title: "Updated At",
      btnClassName: "justify-start pl-0"
    }),
    size: 100,
    cell: ({ row }) => {
      const data = row.original

      return <div>{formatDate(data.updatedAt)}</div>
    }
  },
  {
    id: "delete",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="font-semibold"
        column={column}
        title="Delete"
      />
    ),
    size: 100,
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="flex">
          <DeleteFeatureFlagModal featureFlag={data} />
        </div>
      )
    }
  },
  {
    id: "whitelist",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="font-semibold"
        column={column}
        title="Whitelist Users"
      />
    ),
    size: 100,
    cell: ({ row }) => {
      const data = row.original

      return <DialogModifyWhitelistUsers featureFlag={data} />
    }
  }
]
