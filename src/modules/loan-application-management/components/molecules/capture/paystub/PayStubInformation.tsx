import { TableBody, Table } from "@/components/ui/table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { PayStubType } from "@/modules/loan-application-management/constants/types/document"
import { CustomTableRow } from "../../../atoms/TableRow"

type Props = {
  data: PayStubType
}
export const PayStubInformation: React.FC<Props> = ({ data }) => {
  return (
    <Accordion type="single" collapsible className="w-full border-t">
      <AccordionItem value="employer-information">
        <AccordionTrigger isStartIcon>
          <p>Paystub</p>
        </AccordionTrigger>
        <AccordionContent>
          <Table className="text-xs">
            <TableBody className="bg-gray-100">
              <CustomTableRow
                data={[
                  "Pay Period",
                  `${data.payPeriodStartDate} - ${data.payPeriodEndDate}`
                ]}
                childrenClassName={["", "font-bold"]}
                className="bg-gray-50"
              />
              <CustomTableRow
                data={["Net Pay", data.netPay]}
                childrenClassName={["", "font-bold"]}
              />
              <CustomTableRow
                data={["Pay Date", data.payDate]}
                childrenClassName={["", "font-bold"]}
                className="bg-gray-50"
              />
              <CustomTableRow
                data={["Provider", data.provider]}
                childrenClassName={["", "font-bold"]}
              />
              <CustomTableRow
                data={["Frequency", data.frequency]}
                childrenClassName={["", "font-bold"]}
                className="bg-gray-50"
              />
            </TableBody>
          </Table>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
