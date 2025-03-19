import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { type W2DocumentType } from "@/modules/loan-application-management/constants/types/document"

interface Props {
  data: W2DocumentType
}

export const W2Document: React.FC<Props> = ({ data }) => {
  return (
    <Table className="text-xs">
      <TableHeader className="border-t border-gray-300">
        <TableRow>
          <TableHead
            key="transaction"
            className="relative h-10 border-r border-gray-300 p-2 text-black"
          >
            <p className="text-xs">Field Name</p>
          </TableHead>
          <TableHead key="amount" className="relative h-10 p-2 text-black">
            <p className="text-xs">Field Value</p>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="overflow-scroll">
        {data?.data?.map((cell, index) => (
          <TableRow
            key={index}
            className={cn(
              "even:bg-gray-50",
              "odd:bg-gray-100",
              "whitespace-nowrap"
            )}
          >
            <TableCell className="h-fit border-r border-gray-300 p-2">
              {cell.fieldName}
            </TableCell>
            <TableCell className="h-fit p-2 font-bold">
              {cell.fieldValue || "-"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
