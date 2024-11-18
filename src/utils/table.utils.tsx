import {
  FilterableColumnHeader,
  type IFilterableColumn
} from "@/shared/molecules/table/column-filter"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import { type Column } from "@tanstack/react-table"

const renderHeader = <T,>(title: string, className?: string) =>
  // eslint-disable-next-line react/display-name
  function ({ column }: { column: Column<T> }) {
    return (
      <DataTableColumnHeader
        className={className}
        column={column}
        title={title}
      />
    )
  }

const renderFilterableHeader = <TData, TValue>({
  title,
  disabled,
  className,
  isCanSort
}: Omit<IFilterableColumn<TData, TValue>, "column">) =>
  // eslint-disable-next-line react/display-name
  function ({ column }: { column: Column<TData> }) {
    return (
      <FilterableColumnHeader
        className={className}
        column={column}
        disabled={disabled}
        isCanSort={isCanSort}
        title={title}
      />
    )
  }

export { renderFilterableHeader, renderHeader }
