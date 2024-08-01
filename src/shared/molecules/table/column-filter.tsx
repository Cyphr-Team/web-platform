import { Column } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { SortOrder } from "@/types/common.type"
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ListFilter,
  LucideIcon
} from "lucide-react"
import { FocusEvent, ReactNode } from "react"

export interface IFilterableColumn<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
  disabled?: boolean
  isCanSort?: boolean
}

type ButtonBaseProps<TData, TValue> = Pick<
  IFilterableColumn<TData, TValue>,
  "column"
> & {
  label: ReactNode
  Icon: LucideIcon
}

interface ButtonSortProps<TData, TValue>
  extends ButtonBaseProps<TData, TValue> {
  sortOrder: SortOrder
}

interface ButtonFilterProps<TData, TValue>
  extends ButtonBaseProps<TData, TValue> {}

const ButtonSort = <TData, TValue>({
  column,
  label,
  Icon,
  sortOrder
}: ButtonSortProps<TData, TValue>) => {
  const handleSort = () => {
    column.toggleSorting(sortOrder === SortOrder.DESC)
  }

  return (
    <DropdownMenuItem
      key={column.id}
      className={cn("cursor-pointer flex gap-2 items-center")}
      onClick={handleSort}
    >
      <Icon className="w-4 h-5" /> {label}
    </DropdownMenuItem>
  )
}

const ButtonFilter = <TData, TValue>({
  column,
  label,
  Icon
}: ButtonFilterProps<TData, TValue>) => {
  if (!column.columnDef?.meta?.filterID) return null

  const handleOpenFilter = () => {
    try {
      if (!column.columnDef?.meta?.filterID)
        throw new Error("Filter ID is undefined")

      document.getElementById(column.columnDef?.meta?.filterID)?.click()
    } catch (e) {
      console.error("Can't open filter.", e)
    }
  }

  return (
    <DropdownMenuItem
      key={column.id}
      className={cn("cursor-pointer flex gap-2 items-center")}
      onClick={handleOpenFilter}
    >
      <Icon className="w-4 h-5" /> {label}
    </DropdownMenuItem>
  )
}

export function FilterableColumnHeader<TData, TValue>({
  title,
  className,
  disabled,
  column,
  isCanSort = true
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

  const preventAutoFocus = (e: Event | FocusEvent<HTMLDivElement, Element>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center space-x-2 w-full h-full",
        className
      )}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="flex text-black w-full rounded-0 font-semibold"
          >
            <span>{title}</span> <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="min-w-[200px]"
          align="center"
          onCloseAutoFocus={preventAutoFocus}
          onFocus={preventAutoFocus}
        >
          <DropdownMenuLabel>Filters</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            {isCanSort && (
              <>
                <ButtonSort
                  label="Sort ascending"
                  Icon={ArrowUp}
                  column={column}
                  sortOrder={SortOrder.ASC}
                />

                <ButtonSort
                  label="Sort descending"
                  Icon={ArrowDown}
                  column={column}
                  sortOrder={SortOrder.DESC}
                />
              </>
            )}

            <ButtonFilter column={column} label="Filter" Icon={ListFilter} />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
