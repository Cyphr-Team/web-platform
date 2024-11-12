import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { type PayStubDeductionType } from "@/modules/loan-application-management/constants/types/document"
import { CustomTableRow } from "../../../atoms/TableRow"

interface Props {
  data: PayStubDeductionType[]
}

export const PayStubDeduction: React.FC<Props> = ({ data }) => {
  return (
    <div className="mb-4 overflow-x-auto lg:w-96">
      <Table className="text-xs">
        <TableHeader className="border-t border-gray-300">
          <TableRow>
            <TableHead
              key="deduction"
              className="relative h-10 border-r border-gray-300 p-2 text-black"
            >
              <p className="text-xs">Deduction</p>
            </TableHead>
            <TableHead
              key="current-pay"
              className="relative h-10 p-2 text-black"
            >
              <p className="text-xs">Current Pay</p>
            </TableHead>
            <TableHead key="ytd-pay" className="relative h-10 p-2 text-black">
              <p className="text-xs">YTD Pay</p>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-scroll">
          {data?.map((cell, index) => (
            <CustomTableRow
              key={index}
              childrenClassName={[
                "border-r border-gray-300 pl-2",
                "pl-2",
                "pl-2"
              ]}
              className={cn(
                "even:bg-gray-50",
                "odd:bg-gray-100",
                "whitespace-nowrap"
              )}
              data={[cell.description, cell.currentPay, cell.ytdPay]}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
