import { Accordion } from "@/components/ui/accordion"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table"
import { type BankStatementType } from "@/modules/loan-application-management/constants/types/document"

import { BankInformation } from "./BankInformation"
import { cn } from "@/lib/utils"

interface Props {
  data: BankStatementType
}

export const BankStatement: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-col gap-3 overflow-y-auto lg:w-96">
      <Accordion collapsible className="mb-12 w-full" type="single">
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
                className="relative h-10 border-r border-gray-300 p-2 text-black"
              >
                <p className="text-xs">Transactions</p>
              </TableHead>
              <TableHead key="amount" className="relative h-10 p-2 text-black">
                <p className="text-xs">Amount</p>
              </TableHead>
              <TableHead key="date" className="relative h-10 p-2 text-black">
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
                  className="h-fit border-r border-gray-300 p-2
"
                >
                  {cell.description}
                </TableCell>
                <TableCell
                  className="h-fit p-2 data-[positive=false]:text-error-500 data-[positive=true]:text-success-500"
                  data-positive={Number(cell.amount) > 0}
                >
                  {cell.amount}
                </TableCell>
                <TableCell className="h-fit p-2">
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
