import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { TableBody, Table } from "@/components/ui/table"
import { type BankAccount } from "@/modules/loan-application-management/constants/types/document"
import { CustomTableRow } from "../../atoms/TableRow"

interface Props {
  data: BankAccount
}

export const BankInformation: React.FC<Props> = ({ data }) => {
  return (
    <AccordionItem value="bank-statement">
      <AccordionTrigger isStartIcon>
        <p>{data.name}</p>
      </AccordionTrigger>
      <AccordionContent>
        <Table className="text-xs">
          <TableBody className="bg-gray-100">
            <CustomTableRow
              childrenClassName={["", "font-bold"]}
              data={["Account Number", data.accountNumber]}
            />
            <CustomTableRow
              childrenClassName={["", "font-bold"]}
              className="bg-gray-50"
              data={["Type", data.accountType]}
            />
            <CustomTableRow
              childrenClassName={["", "font-bold"]}
              data={["Holder", data.accountHolder]}
            />
            <CustomTableRow
              childrenClassName={["", "font-bold"]}
              className="bg-gray-50"
              data={["Category", data.accountCategory]}
            />
            <CustomTableRow
              childrenClassName={["", "font-bold"]}
              data={["Holder Address Line 1", data.holderAddress1]}
            />
            <CustomTableRow
              childrenClassName={["", "font-bold"]}
              className="bg-gray-50"
              data={["Holder Address Line 2", data.holderAddress2]}
            />
            <CustomTableRow
              childrenClassName={["", "font-bold"]}
              data={["Holder Zip", data.holderZip]}
            />
            <CustomTableRow
              childrenClassName={["", "font-bold"]}
              className="bg-gray-50"
              data={["Holder State", data.holderState]}
            />
            <CustomTableRow
              childrenClassName={["", "font-bold"]}
              data={["Holder City", data.holderCity]}
            />
          </TableBody>
        </Table>
      </AccordionContent>
    </AccordionItem>
  )
}
