import { type Column } from "@tanstack/react-table"

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
import { ArrowDown, ArrowUp, ListFilter, type LucideIcon } from "lucide-react"
import { type FocusEvent, type ReactNode } from "react"

export interface IFilterableColumn<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
  btnClassName?: string
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

type ButtonFilterProps<TData, TValue> = ButtonBaseProps<TData, TValue>

function ButtonSort<TData, TValue>({
  column,
  label,
  Icon,
  sortOrder
}: ButtonSortProps<TData, TValue>) {
  const handleSort = () => {
    column.toggleSorting(sortOrder === SortOrder.DESC)
  }

  return (
    <DropdownMenuItem
      key={column.id}
      className={cn("flex cursor-pointer items-center gap-2")}
      onClick={handleSort}
    >
      <Icon className="h-5 w-4" /> {label}
    </DropdownMenuItem>
  )
}

function ButtonFilter<TData, TValue>({
  column,
  label,
  Icon
}: ButtonFilterProps<TData, TValue>) {
  if (!column.columnDef?.meta?.filterID) return null

  const handleOpenFilter = () => {
    try {
      if (!column.columnDef?.meta?.filterID)
        // throw new Error("Filter ID is undefined")
        return

      document.getElementById(column.columnDef?.meta?.filterID)?.click()
    } catch (e) {
      // console.error("Can't open filter.", e)
    }
  }

  return (
    <DropdownMenuItem
      key={column.id}
      className={cn("flex cursor-pointer items-center gap-2")}
      onClick={handleOpenFilter}
    >
      <Icon className="h-5 w-4" /> {label}
    </DropdownMenuItem>
  )
}

export function FilterableColumnHeader<TData, TValue>({
  title,
  className,
  btnClassName,
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

  const preventAutoFocus = (e: Event | FocusEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div
      className={cn(
        "flex size-full items-center justify-center space-x-2",
        className
      )}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className={cn(
              "rounded-0 flex w-full justify-start pl-0 font-semibold text-black",
              btnClassName
            )}
            size="sm"
            variant="ghost"
          >
            <span>{title}</span> <ListFilter className="ml-2 size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="center"
          className="min-w-[200px]"
          onCloseAutoFocus={preventAutoFocus}
          onFocus={preventAutoFocus}
        >
          <DropdownMenuLabel>Filters</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            {isCanSort ? (
              <>
                <ButtonSort
                  Icon={ArrowUp}
                  column={column}
                  label="Sort ascending"
                  sortOrder={SortOrder.ASC}
                />

                <ButtonSort
                  Icon={ArrowDown}
                  column={column}
                  label="Sort descending"
                  sortOrder={SortOrder.DESC}
                />
              </>
            ) : null}

            <ButtonFilter Icon={ListFilter} column={column} label="Filter" />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
