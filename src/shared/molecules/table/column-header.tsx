import { type Column } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuTrigger
} from "@radix-ui/react-dropdown-menu"
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react"

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="-ml-3 h-8 data-[state=open]:bg-accent"
            size="sm"
            variant="ghost"
          >
            <span>{title}</span>
            <span data-html2canvas-ignore>
              {column.getIsSorted() === "desc" ? (
                <ChevronDown className="ml-2 size-4" />
              ) : column.getIsSorted() === "asc" ? (
                <ChevronUp className="ml-2 size-4" />
              ) : (
                <ChevronsUpDown className="ml-2 size-4" />
              )}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ChevronUp className="mr-2 size-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ChevronDown className="mr-2 size-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
