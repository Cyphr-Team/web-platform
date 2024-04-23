import { ColumnDef } from "@tanstack/react-table"
import { FeatureFlag } from "../../../types/feature-flag.types"
import { formatDate } from "@/utils/date.utils"
import { ConfirmToggleStatusFeatureFlag } from "../components/ToggleStatusFeatureFlag"

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
  }
]
