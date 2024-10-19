import { type ColumnDef } from "@tanstack/react-table"
import { type FeatureFlag } from "@/types/feature-flag.types.ts"
import { formatDate } from "@/utils/date.utils"
import { ConfirmToggleStatusFeatureFlag } from "../components/ToggleStatusFeatureFlag"
import { DialogModifyWhitelistUsers } from "@/modules/feature-flag/components/DialogModifyWhitelistUsers.tsx"
import { ConfirmToggleWhitelistFeatureFlag } from "@/modules/feature-flag/components/ToggleWhitelistFeatureFlag.tsx"
import { DeleteFeatureFlagModal } from "@/modules/feature-flag/components/DeteleFeatureFlagModal.tsx"

export const featureFlagColumns: ColumnDef<FeatureFlag>[] = [
  {
    id: "key",
    header: "Key",
    accessorKey: "key",
    size: 250
  },
  {
    id: "description",
    header: "Description",
    accessorKey: "description",
    size: 250
  },
  {
    id: "status",
    header: "Status",
    size: 100,
    cell: ({ row }) => {
      const data = row.original

      return <ConfirmToggleStatusFeatureFlag featureFlag={data} />
    }
  },
  {
    id: "rolloutType",
    header: "Whitelist",
    size: 100,
    cell: ({ row }) => {
      const data = row.original

      return <ConfirmToggleWhitelistFeatureFlag featureFlag={data} />
    }
  },
  {
    id: "createdAt",
    header: "Created At",
    size: 100,
    cell: ({ row }) => {
      const data = row.original

      return <div>{formatDate(data.createdAt)}</div>
    }
  },
  {
    id: "updatedAt",
    header: "Updated At",
    size: 100,
    cell: ({ row }) => {
      const data = row.original

      return <div>{formatDate(data.updatedAt)}</div>
    }
  },
  {
    id: "delete",
    header: "Delete",
    size: 100,
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="flex justify-center">
          <DeleteFeatureFlagModal featureFlag={data} />
        </div>
      )
    }
  },
  {
    id: "whitelist",
    header: "Whitelist Users",
    size: 100,
    cell: ({ row }) => {
      const data = row.original

      return <DialogModifyWhitelistUsers featureFlag={data} />
    }
  }
]
