import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type Row
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isFilterView?: boolean
  handleClickDetail?: (row: Row<TData>) => void
  tableClassName?: string
  cellClassName?: string
  headerCellClassName?: string
  isLoading?: boolean
  noResultText?: string
}

export function MiddeskTable<TData, TValue>({
  columns,
  data,
  handleClickDetail,
  tableClassName,
  cellClassName,
  headerCellClassName,
  isLoading,
  noResultText = "No results."
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className="overflow-x-auto">
      <Table className={tableClassName}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={cn("text-xs", headerCellClassName)}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length
            ? table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={cn(!!handleClickDetail && "cursor-pointer")}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => handleClickDetail && handleClickDetail(row)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "text-clip whitespace-normal break-words text-base",
                        cellClassName
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : !isLoading && (
                <TableRow>
                  <TableCell
                    className="h-24 text-center text-base text-gray-500"
                    colSpan={columns.length}
                  >
                    {noResultText}
                  </TableCell>
                </TableRow>
              )}
        </TableBody>
      </Table>

      {isLoading ? (
        <div className="mt-4 flex w-full flex-col items-center justify-center">
          <Loader2
            className={cn(
              "m-2 size-8 animate-spin text-primary transition-all ease-out"
            )}
          />
          Loading...
        </div>
      ) : null}
    </div>
  )
}
