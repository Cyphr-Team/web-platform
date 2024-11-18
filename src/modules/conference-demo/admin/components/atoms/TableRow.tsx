import { TableCell, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface TableRowProps {
  data: string[]
  className?: string
  childrenClassName?: string[]
}

export const CustomTableRow: React.FC<TableRowProps> = ({
  data,
  className,
  childrenClassName
}) => {
  return (
    <TableRow className={className}>
      {data.map((cell, index) => (
        <TableCell
          key={index}
          className={cn(
            "h-fit py-2",
            !!childrenClassName && childrenClassName[index]
          )}
        >
          {cell}
        </TableCell>
      ))}
    </TableRow>
  )
}
