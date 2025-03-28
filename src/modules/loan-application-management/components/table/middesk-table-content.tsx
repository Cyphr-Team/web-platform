import { Dot } from "@/components/ui/dot"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { SourceToolTip } from "@/modules/loan-application/components/molecules/SourceToolTip"
import { type ColumnDef } from "@tanstack/react-table"
import { type MiddeskTableContentReport } from "../../constants/types/middesk.type"
import { MiddeskTableHeader } from "./middesk-table-header"

interface MiddeskTableContentProps<TData> {
  data: TData[]
  nameTitle: string
  isLoading?: boolean
}

export function MiddeskTableContent<TData extends MiddeskTableContentReport>({
  nameTitle,
  data,
  isLoading
}: MiddeskTableContentProps<TData>) {
  const columns: ColumnDef<TData>[] = [
    {
      accessorKey: "name",
      header: () => <MiddeskTableHeader title={nameTitle} />,
      cell: ({ row }) => {
        const data = row.original

        return (
          <div className="flex min-w-0 items-center">
            <Dot className="mt-1 shrink-0 self-start" variantColor="green" />
            <p className="max-w-full overflow-visible truncate whitespace-normal break-words text-base">
              {data?.name ?? "-"}
            </p>
          </div>
        )
      }
    },
    {
      accessorKey: "submitted",
      header: () => <MiddeskTableHeader title="Submitted" />,
      cell: ({ row }) => {
        const data = row.original
        const submitted = data?.submitted
          ? "Yes"
          : data?.submitted !== undefined
            ? "No"
            : "-"

        return (
          <div className="min-w-0">
            <p className="truncate text-base">{submitted}</p>
          </div>
        )
      }
    },
    {
      accessorKey: "sources",
      header: () => <MiddeskTableHeader title="Source" />,
      cell: ({ row }) => {
        const data = row.original
        const source = data.sources?.[0]

        return (
          <div>
            {source?.state ? (
              <SourceToolTip
                data={data.sources ?? []}
                sourceContent={
                  <div className="flex items-center">
                    {source.state} <Dot className="mx-1 w-2" /> SOS
                  </div>
                }
              />
            ) : (
              "None"
            )}
          </div>
        )
      }
    },
    {
      accessorKey: "notes",
      header: () => <MiddeskTableHeader title="Notes" />,
      cell: ({ row }) => {
        const data = row.original

        return <div>{data.renderNote ? data.renderNote : data.notes}</div>
      }
    }
  ]

  return (
    <div className="overflow-x-auto">
      <MiddeskTable columns={columns} data={data} isLoading={isLoading} />
    </div>
  )
}
