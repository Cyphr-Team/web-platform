import { TableBody, Table } from "@/components/ui/table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { type PayStubType } from "@/modules/loan-application-management/constants/types/document"
import { CustomTableRow } from "../../../atoms/TableRow"

interface Props {
  data: PayStubType
}

export const PayStubInformation: React.FC<Props> = ({ data }) => {
  return (
    <Accordion collapsible className="w-full border-t" type="single">
      <AccordionItem value="employer-information">
        <AccordionTrigger isStartIcon>
          <p>Paystub</p>
        </AccordionTrigger>
        <AccordionContent>
          <Table className="text-xs">
            <TableBody className="bg-gray-100">
              <CustomTableRow
                childrenClassName={["", "font-bold"]}
                className="bg-gray-50"
                data={[
                  "Pay Period",
                  `${data.payPeriodStartDate} - ${data.payPeriodEndDate}`
                ]}
              />
              <CustomTableRow
                childrenClassName={["", "font-bold"]}
                data={["Net Pay", data.netPay]}
              />
              <CustomTableRow
                childrenClassName={["", "font-bold"]}
                className="bg-gray-50"
                data={["Pay Date", data.payDate]}
              />
              <CustomTableRow
                childrenClassName={["", "font-bold"]}
                data={["Provider", data.provider]}
              />
              <CustomTableRow
                childrenClassName={["", "font-bold"]}
                className="bg-gray-50"
                data={["Frequency", data.frequency]}
              />
            </TableBody>
          </Table>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
