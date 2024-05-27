import { Card } from "@/components/ui/card"
import { TextInputDisplay } from "../../atoms/TextInputDisplay"
import { OperatingExpensesInformationResponse } from "@/modules/loan-application/constants/type"
import { toCurrency } from "@/utils"

interface OperatingExpensesFormDetails {
  operatingExpensesFormData?: OperatingExpensesInformationResponse
}

export const OperatingExpensesFormDetails: React.FC<
  OperatingExpensesFormDetails
> = ({ operatingExpensesFormData }) => {
  return (
    <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto loan-application-item">
      <h5 className="text-lg font-semibold">Operating Expenses</h5>
      <div className="grid grid-cols-6 gap-y-2xl gap-x-4xl">
        <TextInputDisplay
          className="col-span-3"
          label="Cost of Goods Sold"
          value={toCurrency(operatingExpensesFormData?.costOfGoodsSold)}
        />
        <TextInputDisplay
          className="col-span-3"
          label="Rent"
          value={toCurrency(operatingExpensesFormData?.rent)}
        />
        <TextInputDisplay
          className="col-span-3"
          label="Salaries and Wages"
          value={toCurrency(operatingExpensesFormData?.salariesAndWages)}
        />
        <TextInputDisplay
          className="col-span-3"
          label="Payroll Taxes"
          value={toCurrency(operatingExpensesFormData?.payrollTaxes)}
        />
        <TextInputDisplay
          className="col-span-3"
          label="Sales and Marketing Expenses"
          value={toCurrency(
            operatingExpensesFormData?.salesAndMarketingExpenses
          )}
        />
        <TextInputDisplay
          className="col-span-3"
          label="Accounting Fees"
          value={toCurrency(operatingExpensesFormData?.accountingFees)}
        />
        <TextInputDisplay
          className="col-span-3"
          label="Legal Fees"
          value={toCurrency(operatingExpensesFormData?.legalFees)}
        />
        <TextInputDisplay
          className="col-span-3"
          label="Office Supplies"
          value={toCurrency(operatingExpensesFormData?.officeSupplies)}
        />
        <TextInputDisplay
          className="col-span-3"
          label="Maintenance and Repairs"
          value={toCurrency(operatingExpensesFormData?.maintenanceAndRepairs)}
        />
        <TextInputDisplay
          className="col-span-3"
          label="Utilities"
          value={toCurrency(operatingExpensesFormData?.utilities)}
        />
        <TextInputDisplay
          className="col-span-3"
          label="Insurance"
          value={toCurrency(operatingExpensesFormData?.insurance)}
        />
        <TextInputDisplay
          className="col-span-3"
          label="Dues and Subscriptions"
          value={toCurrency(operatingExpensesFormData?.duesAndSubscriptions)}
        />
        <TextInputDisplay
          className="col-span-3"
          label="Travel and Entertainment"
          value={toCurrency(operatingExpensesFormData?.travelAndEntertainment)}
        />
        <TextInputDisplay
          className="col-span-3"
          label="Depreciation"
          value={toCurrency(operatingExpensesFormData?.depreciation)}
        />
        <TextInputDisplay
          className="col-span-3"
          label="Bank Charges"
          value={toCurrency(operatingExpensesFormData?.bankCharges)}
        />
        <TextInputDisplay
          className="col-span-3"
          label="Other Operating Expenses"
          value={toCurrency(operatingExpensesFormData?.otherOperatingExpenses)}
        />
      </div>
    </Card>
  )
}
