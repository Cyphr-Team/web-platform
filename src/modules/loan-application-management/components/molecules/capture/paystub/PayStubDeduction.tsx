import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { PayStubDeductionType } from "@/modules/loan-application-management/constants/types/document"
import { CustomTableRow } from "../../../atoms/TableRow"

type Props = {
  data: PayStubDeductionType[]
}

export const PayStubDeduction: React.FC<Props> = ({ data }) => {
  return (
    <div className="overflow-x-auto lg:w-96 mb-4">
      <Table className="text-xs">
        <TableHeader className="border-t border-gray-300">
          <TableRow>
            <TableHead
              key="deduction"
              className="text-black p-2 relative h-10 border-r border-gray-300"
            >
              <p className="text-xs">Deduction</p>
            </TableHead>
            <TableHead
              key="current-pay"
              className="text-black p-2 relative h-10"
            >
              <p className="text-xs">Current Pay</p>
            </TableHead>
            <TableHead key="ytd-pay" className="text-black p-2 relative h-10">
              <p className="text-xs">YTD Pay</p>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-scroll">
          {data?.map((cell, index) => (
            <CustomTableRow
              key={index}
              className={cn(
                "even:bg-gray-50",
                "odd:bg-gray-100",
                "whitespace-nowrap"
              )}
              data={[cell.description, cell.currentPay, cell.ytdPay]}
              childrenClassName={[
                "border-r border-gray-300 pl-2",
                "pl-2",
                "pl-2"
              ]}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
