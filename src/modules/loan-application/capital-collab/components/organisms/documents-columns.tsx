import { ButtonLoading } from "@/components/ui/button"
import { FORMAT_DATE_M_D_Y } from "@/constants/date.constants"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import { type CCLoanDocument } from "@/types/loan-document.type"
import { type ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { ChevronRight } from "lucide-react"
import { renderFilterableHeader } from "@/utils/table.utils"
import { Checkbox } from "@/components/ui/checkbox"

const getFileNameFromOriginPath = (originPath: string) => {
  if (!originPath) return ""
  const path = originPath.split("/")

  return path[path.length - 1]
}

export const columns: ColumnDef<CCLoanDocument>[] = [
  {
    id: "select",
    header: () => null,
    cell: ({ row }) => (
      <div className="grid place-items-center">
        <Checkbox
          aria-label="Select row"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    size: 50
  },
  {
    id: "fileName",
    accessorKey: "fileName",
    header: renderFilterableHeader({ title: "File Name" }),
    enableSorting: true,
    cell: ({ row }) => {
      const document = row.original

      return (
        <div className="flex min-w-0 items-center gap-3">
          <div className="min-w-0">
            <p className="truncate">
              {getFileNameFromOriginPath(document.originFileName)}
            </p>
            {document.size !== undefined ? (
              <p className="mt-0.5 truncate text-sm text-muted-foreground ">
                {document.size} KB
              </p>
            ) : null}
          </div>
        </div>
      )
    },
    size: 600
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: renderFilterableHeader({ title: "Uploaded On" }),
    enableSorting: true,
    cell: ({ row }) => {
      const document = row.original

      return <p>{format(new Date(document.createdAt), FORMAT_DATE_M_D_Y)}</p>
    }
  },
  {
    id: "action",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center"
        column={column}
        title="Action"
      />
    ),
    cell: () => (
      <div className="inline-grid place-items-center w-full">
        <ButtonLoading
          className="flex h-8 items-center gap-0.5 px-2 pr-1"
          variant="ghost"
          // TODO: Add onClick to review PDF
        >
          Review
          <ChevronRight className="w-4" />
        </ButtonLoading>
      </div>
    )
  }
]
