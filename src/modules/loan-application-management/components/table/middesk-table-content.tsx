import { Dot } from "@/components/ui/dot"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { SourceToolTip } from "@/modules/loan-application/components/molecules/SourceToolTip"
import { ColumnDef } from "@tanstack/react-table"
import { MiddeskTableContentReport } from "../../constants/types/middesk.type"
import { MiddeskTableHeader } from "./middesk-table-header"

type MiddeskTableContentProps<TData> = {
  data: TData[]
  nameTitle: string
}

export const MiddeskTableContent = <TData extends MiddeskTableContentReport>({
  nameTitle,
  data
}: MiddeskTableContentProps<TData>) => {
  const columns: ColumnDef<TData>[] = [
    {
      accessorKey: "name",
      header: () => <MiddeskTableHeader title={nameTitle} />,
      cell: ({ row }) => {
        const data = row.original

        return (
          <div className="min-w-0 flex items-center">
            <Dot
              className="flex-shrink-0 self-start mt-1"
              variantColor="green"
            />
            <p>{data?.name ?? "-"}</p>
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
            <p className="truncate">{submitted}</p>
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
            <SourceToolTip
              data={data.sources ?? []}
              sourceContent={
                <div className="flex items-center">
                  {source?.metadata?.state} <Dot className="mx-1 w-2" /> SOS
                </div>
              }
            />
          </div>
        )
      }
    },
    {
      accessorKey: "notes",
      header: () => <MiddeskTableHeader title="Notes" />,
      cell: () => {
        return <div></div>
      }
    }
  ]

  return (
    <MiddeskTable
      tableClassName={"table-fixed"}
      columns={columns}
      data={data}
    />
  )
}
