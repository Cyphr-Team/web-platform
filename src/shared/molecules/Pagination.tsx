import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronUp } from "lucide-react"

interface PaginationProps {
  total: number
  page: number
  onPageChange: (page: number) => void
  onNextPage: () => void
  onPreviousPage: () => void
}

export function Pagination(props: PaginationProps) {
  const { total, page, onNextPage, onPreviousPage, onPageChange } = props

  return (
    <div className="flex gap-6">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <p>Page</p>
        <Input
          className="input-number-remove-arrow size-10 p-0 text-center focus-visible:ring-0"
          max={total}
          min={1}
          type="number"
          value={page}
          onChange={(e) => onPageChange(Number(e.target.value))}
        />
        of
        <p>{total}</p>
      </div>
      <div className="flex gap-1">
        <Button
          className="size-10 bg-gray-100 p-0"
          disabled={page === 1}
          variant="secondary"
          onClick={onPreviousPage}
        >
          <ChevronUp className="size-6" />
        </Button>
        <Button
          className="size-10 bg-gray-100 p-0"
          disabled={page === total}
          variant="secondary"
          onClick={onNextPage}
        >
          <ChevronDown className="size-6 text-gray-500" />
        </Button>
      </div>
    </div>
  )
}
