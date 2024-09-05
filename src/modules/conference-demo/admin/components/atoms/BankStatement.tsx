import { Accordion } from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

import { cn } from "@/lib/utils"
import { BankInformation } from "@/modules/conference-demo/admin/components/atoms/BankInformation"
import { BankStatementType } from "@/modules/conference-demo/admin/constants/type"

type Props = {
  data: BankStatementType
}

export const BankStatement: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-col lg:w-96 gap-3 overflow-y-auto">
      <Accordion type="single" collapsible className="w-full mb-12">
        {data.bankAccount?.map((cell, index) => (
          <BankInformation key={index} data={cell} />
        ))}
      </Accordion>
      <div className="h-full">
        <Table className="text-xs">
          <TableHeader className="border-t border-gray-300">
            <TableRow>
              <TableHead
                key="transaction"
                className="text-black p-2 relative h-10 border-r border-gray-300"
              >
                <p className="text-xs">Transactions</p>
              </TableHead>
              <TableHead key="amount" className="text-black p-2 relative h-10">
                <p className="text-xs">Amount</p>
              </TableHead>
              <TableHead key="date" className="text-black p-2 relative h-10">
                <p className="text-xs">Date</p>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-scroll">
            {data.transactions?.map((cell, index) => (
              <TableRow
                key={index}
                className={cn("even:bg-gray-50", "odd:bg-gray-100")}
              >
                <TableCell
                  className="p-2 h-fit border-r border-gray-300
"
                >
                  {cell.description}
                </TableCell>
                <TableCell
                  className="p-2 h-fit data-[positive=true]:text-success-500 data-[positive=false]:text-error-500"
                  data-positive={Number(cell.amount) > 0}
                >
                  {cell.amount}
                </TableCell>
                <TableCell className="p-2 h-fit">
                  {cell.transactionDate}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>{" "}
      </div>
    </div>
  )
}
