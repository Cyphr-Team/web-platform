import { FORMAT_DATE_MM_YYYY } from "@/constants/date.constants"
import { FinancialApplicationFormDetail } from "@/modules/loan-application/[module]-financial-projection/components/molecules/details"
import {
  FpEquityFinancingField,
  type FpEquityFinancingFormValue
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-equity-store"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { toCurrency } from "@/utils"
import { formatDate } from "@/utils/date.utils"
import _ from "lodash"

const toEquityDetail = (
  data: FpEquityFinancingFormValue["equityFinancing"] | undefined
) => {
  if (!Array.isArray(data) || _.isEmpty(data)) {
    return (
      <div className="flex flex-col gap-3">
        <FinancialApplicationFormDetail
          key="Empty equity"
          isSubChildren
          financialApplicationFormData={[]}
          subChildren={<span className="text-sm">No equity added.</span>}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {data.map((equity, index) => (
        <FinancialApplicationFormDetail
          key={`EQUITY ${index + 1}`}
          isSubChildren
          financialApplicationFormData={[
            {
              id: "key",
              title: `EQUITY ${index + 1}`,
              content: ""
            },
            {
              id: "equityInvestmentName",
              title: "Enter name of equity investment:",
              content: equity?.name
            },
            {
              id: "equityReceivedDate",
              title: "Specify when equity will be received:",
              content: formatDate(equity?.receivedDate, FORMAT_DATE_MM_YYYY)
            },
            {
              id: "equityInvestmentTotal",
              title: "Equity investment total amount:",
              content: toCurrency(equity?.amount, 0)
            }
          ]}
        />
      ))}
    </div>
  )
}

interface UseEquityFinancingDetailProps {
  fpEquityFinancingFormValue?: FpEquityFinancingFormValue
}

export const useEquityFinancingDetail = ({
  fpEquityFinancingFormValue
}: UseEquityFinancingDetailProps) => {
  const equityFinancingDetail = {
    id: LOAN_APPLICATION_STEPS.EQUITY,
    title: "Equity Financing",
    subTitle:
      "Equity investment involves raising capital by selling shares of your business to investors. In exchange, these investors gain partial ownership and a share in future profits, allowing you to grow without incurring debt, but it also means sharing control and future earnings.",
    financialApplicationFormData: [],
    subChildren: toEquityDetail(
      fpEquityFinancingFormValue?.[FpEquityFinancingField.equityFinancing]
    )
  }

  return { equityFinancingDetail }
}
