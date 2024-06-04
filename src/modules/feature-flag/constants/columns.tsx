import { ColumnDef } from "@tanstack/react-table"
import { FeatureFlag } from "../../../types/feature-flag.types"
import { formatDate } from "@/utils/date.utils"
import { ConfirmToggleStatusFeatureFlag } from "../components/ToggleStatusFeatureFlag"
import { DeleteFeatureFlagModal } from "../components/DeteleFeatureFlagModal"
import { WhitelistedUser } from "@/types/user.type"

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
  },
  {
    id: "actions",
    header: "Actions",
    size: 100,
    cell: ({ row }) => {
      const data = row.original
      return (
        <div className="flex justify-center">
          <DeleteFeatureFlagModal featureFlag={data} />
        </div>
      )
    }
  }
]

export const whitelistedUsersColumns: ColumnDef<WhitelistedUser>[] = [
  {
    id: "key",
    header: "ID",
    accessorKey: "id",
    size: 250
  },
  {
    id: "name",
    header: "Name",
    accessorKey: "name",
    size: 250
  },
  {
    id: "email",
    header: "Email",
    accessorKey: "email",
    size: 250
  },
  {
    id: "institution",
    header: "Institution",
    accessorKey: "institution",
    size: 250
  }
]
