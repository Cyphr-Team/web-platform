import { TableBody, Table } from "@/components/ui/table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { type EmployerInformationType } from "@/modules/loan-application-management/constants/types/document"
import { CustomTableRow } from "../../../atoms/TableRow"

interface Props {
  data: EmployerInformationType
}

export const EmployerInformation: React.FC<Props> = ({ data }) => {
  return (
    <Accordion collapsible className="w-full border-t" type="single">
      <AccordionItem value="employer-information">
        <AccordionTrigger isStartIcon>
          <p>Employer Information</p>
        </AccordionTrigger>
        <AccordionContent>
          <Table className="text-xs">
            <TableBody className="bg-gray-100">
              <CustomTableRow
                childrenClassName={["", "font-bold"]}
                className="bg-gray-50"
                data={["Name", data.name]}
              />
              <CustomTableRow
                childrenClassName={["", "font-bold"]}
                data={["Address Line 1", data.addressLine1]}
              />
              <CustomTableRow
                childrenClassName={["", "font-bold"]}
                className="bg-gray-50"
                data={["Address Line 2", data.addressLine2]}
              />
              <CustomTableRow
                childrenClassName={["", "font-bold"]}
                data={["City", data.city]}
              />
              <CustomTableRow
                childrenClassName={["", "font-bold"]}
                className="bg-gray-50"
                data={["State", data.state]}
              />
              <CustomTableRow
                childrenClassName={["", "font-bold"]}
                data={["Zip", data.zip]}
              />
            </TableBody>
          </Table>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
