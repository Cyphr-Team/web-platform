import { FORMAT_DATE_MM_YYYY } from "@/constants/date.constants"
import { FinancialApplicationFormDetail } from "@/modules/loan-application/[module]-financial-projection/components/molecules/details"
import { type FpEquityFinancingFormResponse } from "@/modules/loan-application/[module]-financial-projection/types/equity-form"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { toCurrency } from "@/utils"
import { formatDate } from "@/utils/date.utils"
import _ from "lodash"

const toEquityDetail = (data: FpEquityFinancingFormResponse | undefined) => {
  if (!Array.isArray(data?.forms) || _.isEmpty(data?.forms)) {
    return undefined
  }

  return (
    <div className="flex flex-col gap-3">
      {data.forms.map((equity, index) => (
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
  fpEquityFinancingFormResponse?: FpEquityFinancingFormResponse
}

export const useEquityFinancingDetail = ({
  fpEquityFinancingFormResponse
}: UseEquityFinancingDetailProps) => {
  const equityFinancingDetail = {
    id: LOAN_APPLICATION_STEPS.EQUITY,
    title: "Equity Financing",
    subTitle:
      "Equity investment involves raising capital by selling shares of your business to investors. In exchange, these investors gain partial ownership and a share in future profits, allowing you to grow without incurring debt, but it also means sharing control and future earnings.",
    financialApplicationFormData: [],
    subChildren: toEquityDetail(fpEquityFinancingFormResponse)
  }

  return { equityFinancingDetail }
}
