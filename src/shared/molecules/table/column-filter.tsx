import { Column } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { SortOrder } from "@/types/common.type"
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react"

export interface IFilterableColumn<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
  disabled?: boolean
}

export function FilterableColumnHeader<TData, TValue>({
  title,
  className,
  disabled,
  column
}: IFilterableColumn<TData, TValue>) {
  if (disabled)
    return (
      <div
        className={cn(
          "flex items-center justify-center space-x-2 text-black",
          className
        )}
      >
        <div className="whitespace-nowrap text-sm font-medium">{title}</div>
      </div>
    )

  const toggleSorting = () => column.toggleSorting()

  const sortIcon = () => {
    switch (column.getIsSorted()) {
      case SortOrder.ASC.toLowerCase():
        return <ChevronUp className="ml-2 h-4 w-4" />
      case SortOrder.DESC.toLowerCase():
        return <ChevronDown className="ml-2 h-4 w-4" />
      default:
        return <ChevronsUpDown className="ml-2 h-4 w-4" />
    }
  }

  return (
    <div
      className={cn("flex items-center justify-center space-x-2", className)}
    >
      <Button
        variant="ghost"
        size="sm"
        className="h-8 data-[state=open]:bg-accent text-black"
        onClick={toggleSorting}
      >
        <span>{title}</span>
        {sortIcon()}
      </Button>
    </div>
  )
}
