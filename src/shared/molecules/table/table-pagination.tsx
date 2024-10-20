import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { type Table } from "@tanstack/react-table"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from "lucide-react"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  isSelectable?: boolean
}

export function DataTablePagination<TData>({
  table,
  isSelectable
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2 flex-wrap">
      {isSelectable ? (
        <div className="flex-1 text-sm text-muted-foreground mr-2">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      ) : null}
      <div className="flex items-center gap-6 lg:gap-8 flex-wrap">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 25, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center gap-1 text-sm font-medium">
          Go to page:
          <Input
            max={table.getPageCount()}
            min={1}
            type="number"
            value={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0

              table.setPageIndex(
                Math.min(Math.max(page, 0), table.getPageCount() - 1)
              )
            }}
          />
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            className="h-8 w-8 p-0 flex"
            disabled={!table.getCanPreviousPage()}
            variant="outline"
            onClick={() => table.setPageIndex(0)}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            className="h-8 w-8 p-0"
            disabled={!table.getCanPreviousPage()}
            variant="outline"
            onClick={() => table.previousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            className="h-8 w-8 p-0"
            disabled={!table.getCanNextPage()}
            variant="outline"
            onClick={() => table.nextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            className="h-8 w-8 p-0 flex"
            disabled={!table.getCanNextPage()}
            variant="outline"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
