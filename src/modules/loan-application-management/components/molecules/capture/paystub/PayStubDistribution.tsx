import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { type PayStubDistributionType } from "@/modules/loan-application-management/constants/types/document"
import { CustomTableRow } from "../../../atoms/TableRow"

interface Props {
  data: PayStubDistributionType[]
}

export const PayStubDistribution: React.FC<Props> = ({ data }) => {
  return (
    <div className="mb-4 overflow-x-auto lg:w-96">
      <Table className="text-xs">
        <TableHeader className="border-t border-gray-300">
          <TableRow>
            <TableHead
              key="distribution"
              className="relative h-10 whitespace-nowrap border-r border-gray-300 p-2 text-black"
            >
              <p className="text-xs">Pay Distribution</p>
            </TableHead>
            <TableHead
              key="amount"
              className="relative h-10 whitespace-nowrap p-2 text-black"
            >
              <p className="text-xs">Amount</p>
            </TableHead>
            <TableHead
              key="account"
              className="relative h-10 whitespace-nowrap p-2 text-black"
            >
              <p className="text-xs">Account</p>
            </TableHead>{" "}
            <TableHead
              key="type"
              className="relative h-10 whitespace-nowrap p-2 text-black"
            >
              <p className="text-xs">Type</p>
            </TableHead>{" "}
            <TableHead
              key="description"
              className="relative h-10 p-2 text-black"
            >
              <p className="text-xs">Description</p>
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
                "pl-2",
                "pl-2",
                "pl-2"
              ]}
              className={cn(
                "even:bg-gray-50",
                "odd:bg-gray-100",
                "whitespace-nowrap"
              )}
              data={[
                cell.bankName ?? "-",
                cell.amount ?? "-",
                cell.accountNumber ?? "-",
                cell.bankAccountType ?? "-",
                cell.description ?? "-"
              ]}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
