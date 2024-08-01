import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

import { Column, Table } from "@tanstack/react-table"
import { Eye, EyeOff, LucideIcon } from "lucide-react"
import { ReactNode, useMemo, useState } from "react"

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

interface DataTableViewGroupProps<TData> {
  columns: Column<TData, unknown>[]
  onCtaClick: React.MouseEventHandler<HTMLButtonElement>
  label: ReactNode
  ctaText: string
  onItemClick: (column: Column<TData, unknown>) => () => void
  Icon: LucideIcon
}

const DataTableViewGroup = <TData,>({
  columns,
  onCtaClick,
  ctaText,
  label,
  onItemClick,
  Icon
}: DataTableViewGroupProps<TData>) => {
  return (
    <DropdownMenuGroup>
      <div className="flex justify-between text-xs font-medium gap-2 pl-2 items-center mt-2 mb-1">
        <div className="text-muted-foreground">{label}</div>
        <Button
          variant="ghost"
          className="h-auto w-auto py-0.5 px-2 text-blue-500 text-xs"
          onClick={onCtaClick}
        >
          {ctaText}
        </Button>
      </div>
      {columns.map((column) => {
        return (
          <DropdownMenuItem
            key={column.id}
            className={cn(
              "capitalize cursor-pointer flex justify-between gap-2 items-center",
              !column.getCanHide() && "cursor-default"
            )}
            onClick={onItemClick(column)}
          >
            <div>{column.columnDef?.meta?.columnViewName ?? ""}</div>
            <Icon
              className={cn(
                "w-4 h-4 text-gray-900",
                !column.getCanHide() && "text-gray-400",
                !column.getIsVisible() && "text-gray-500"
              )}
            />
          </DropdownMenuItem>
        )
      })}
    </DropdownMenuGroup>
  )
}

export function DataTableViewOptions<TData>({
  table
}: DataTableViewOptionsProps<TData>) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen((pre) => !pre)
  }

  const handleToggleColumn =
    <TData,>(value: boolean) =>
    (column: Column<TData>) =>
    () =>
      column.toggleVisibility(value)
  const handleToggleAllColumn = (value: boolean) => () =>
    table.toggleAllColumnsVisible(value)

  const columns = useMemo(
    () =>
      table
        .getAllColumns()
        .filter((column) => !!column.columnDef?.meta?.columnViewName),
    [table]
  )
  const shownColumns = columns.filter((column) => column.getIsVisible())
  const hiddenColumns = columns.filter((column) => !column.getIsVisible())

  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto flex rounded-full text-slate-700 font-semibold"
          onClick={handleOpen}
        >
          View
          <Eye className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-[290px]"
        align="end"
        onEscapeKeyDown={handleOpen}
        onPointerDownOutside={handleOpen}
      >
        <DropdownMenuLabel>Properties</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DataTableViewGroup<TData>
          columns={shownColumns}
          label="Shown in table"
          ctaText="Hide all"
          onCtaClick={handleToggleAllColumn(false)}
          onItemClick={handleToggleColumn(false)}
          Icon={Eye}
        />

        {!!hiddenColumns.length && (
          <DataTableViewGroup<TData>
            columns={hiddenColumns}
            label="Hidden in table"
            ctaText="Show all"
            onCtaClick={handleToggleAllColumn(true)}
            onItemClick={handleToggleColumn(true)}
            Icon={EyeOff}
          />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
