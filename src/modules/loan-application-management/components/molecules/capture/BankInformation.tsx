import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { TableBody } from "@/components/ui/table"
import { BankAccount } from "@/modules/loan-application-management/constants/types/document"
import { Table } from "@/components/ui/table"
import { CustomTableRow } from "../../atoms/TableRow"

type Props = {
  data: BankAccount
}
export const BankInformation: React.FC<Props> = ({ data }) => {
  return (
    <AccordionItem value="bank-statement">
      <AccordionTrigger>
        <p>{data.name}</p>
      </AccordionTrigger>
      <AccordionContent>
        <Table className="text-xs">
          <TableBody className="bg-gray-100">
            <CustomTableRow
              data={["Account Number", data.accountNumber]}
              childrenClassName={["", "font-bold"]}
            />
            <CustomTableRow
              data={["Type", data.accountType]}
              childrenClassName={["", "font-bold"]}
              className="bg-gray-50"
            />
            <CustomTableRow
              data={["Holder", data.accountHolder]}
              childrenClassName={["", "font-bold"]}
            />
            <CustomTableRow
              data={["Category", data.accountCategory]}
              childrenClassName={["", "font-bold"]}
              className="bg-gray-50"
            />
            <CustomTableRow
              data={["Holder Address Line 1", data.holderAddress1]}
              childrenClassName={["", "font-bold"]}
            />
            <CustomTableRow
              data={["Holder Address Line 2", data.holderAddress2]}
              childrenClassName={["", "font-bold"]}
              className="bg-gray-50"
            />
            <CustomTableRow
              data={["Holder Zip", data.holderZip]}
              childrenClassName={["", "font-bold"]}
            />
            <CustomTableRow
              data={["Holder State", data.holderState]}
              childrenClassName={["", "font-bold"]}
              className="bg-gray-50"
            />
            <CustomTableRow
              data={["Holder City", data.holderCity]}
              childrenClassName={["", "font-bold"]}
            />
          </TableBody>
        </Table>
      </AccordionContent>
    </AccordionItem>
  )
}
