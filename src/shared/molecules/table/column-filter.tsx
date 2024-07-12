import { Column } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuTrigger
} from "@radix-ui/react-dropdown-menu"

interface IFilterableColumn<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
  disabled?: boolean
}

export function FilterableColumnHeader<TData, TValue>({
  title,
  className,
  disabled
}: IFilterableColumn<TData, TValue>) {
  if (disabled)
    return (
      <div className={cn("flex items-center space-x-2 text-black", className)}>
        {title}
      </div>
    )

  return (
    <div
      className={cn("flex items-center justify-center space-x-2", className)}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 data-[state=open]:bg-accent cursor-default text-black"
          >
            <span>{title}</span>
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </div>
  )
}
