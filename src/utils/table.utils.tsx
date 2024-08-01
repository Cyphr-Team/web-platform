import {
  FilterableColumnHeader,
  IFilterableColumn
} from "@/shared/molecules/table/column-filter"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import { Column } from "@tanstack/react-table"

const renderHeader =
  <T,>(title: string, className?: string) =>
  ({ column }: { column: Column<T> }) => (
    <DataTableColumnHeader
      column={column}
      title={title}
      className={className}
    />
  )

const renderFilterableHeader =
  <TData, TValue>({
    title,
    disabled,
    className,
    isCanSort
  }: Omit<IFilterableColumn<TData, TValue>, "column">) =>
  ({ column }: { column: Column<TData> }) => (
    <FilterableColumnHeader
      isCanSort={isCanSort}
      column={column}
      title={title}
      disabled={disabled}
      className={className}
    />
  )

export { renderFilterableHeader, renderHeader }
