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

export { renderHeader }
