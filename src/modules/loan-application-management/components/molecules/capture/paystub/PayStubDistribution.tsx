import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { PayStubDistributionType } from "@/modules/loan-application-management/constants/types/document"
import { CustomTableRow } from "../../../atoms/TableRow"

type Props = {
  data: PayStubDistributionType[]
}

export const PayStubDistribution: React.FC<Props> = ({ data }) => {
  return (
    <div className="overflow-x-auto lg:w-96 mb-4">
      <Table className="text-xs">
        <TableHeader className="border-t border-gray-300">
          <TableRow>
            <TableHead
              key="distribution"
              className="text-black p-2 relative h-10 border-r border-gray-300 whitespace-nowrap"
            >
              <p className="text-xs">Pay Distribution</p>
            </TableHead>
            <TableHead
              key="amount"
              className="text-black p-2 relative h-10 whitespace-nowrap"
            >
              <p className="text-xs">Amount</p>
            </TableHead>
            <TableHead
              key="account"
              className="text-black p-2 relative h-10 whitespace-nowrap"
            >
              <p className="text-xs">Account</p>
            </TableHead>{" "}
            <TableHead
              key="type"
              className="text-black p-2 relative h-10 whitespace-nowrap"
            >
              <p className="text-xs">Type</p>
            </TableHead>{" "}
            <TableHead
              key="description"
              className="text-black p-2 relative h-10"
            >
              <p className="text-xs">Description</p>
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
              data={[
                cell.bankName ?? "-",
                cell.amount ?? "-",
                cell.accountNumber ?? "-",
                cell.bankAccountType ?? "-",
                cell.description ?? "-"
              ]}
              childrenClassName={[
                "border-r border-gray-300 pl-2",
                "pl-2",
                "pl-2",
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
