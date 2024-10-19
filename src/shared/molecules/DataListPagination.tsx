import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from "lucide-react"

interface DataListPaginationProps {
  pageSizeList?: number[]
  pageSize: number
  setPageSize: (pageSize: number) => void
  pageCount: number
  pageIndex: number
  setPageIndex: (pageIndex: number) => void
  canPreviousPage: boolean
  previousPage: () => void
  canNextPage: boolean
  nextPage: () => void
}

export function DataListPagination({
  pageSizeList = [10, 25, 30, 40, 50],
  pageSize,
  setPageSize,
  pageCount,
  pageIndex,
  setPageIndex,
  canPreviousPage,
  previousPage,
  canNextPage,
  nextPage
}: DataListPaginationProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => {
              setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeList.map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {pageIndex + 1} of {pageCount}
        </div>
        <div className="flex items-center gap-1 text-sm font-medium">
          Go to page:
          <Input
            max={pageCount}
            min={1}
            type="number"
            value={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0

              setPageIndex(page)
            }}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button
            className="hidden h-8 w-8 p-0 lg:flex"
            disabled={!canPreviousPage}
            variant="outline"
            onClick={() => setPageIndex(0)}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            className="h-8 w-8 p-0"
            disabled={!canPreviousPage}
            variant="outline"
            onClick={() => previousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            className="h-8 w-8 p-0"
            disabled={!canNextPage}
            variant="outline"
            onClick={() => nextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            className="hidden h-8 w-8 p-0 lg:flex"
            disabled={!canNextPage}
            variant="outline"
            onClick={() => setPageIndex(pageCount - 1)}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
