import { FORMAT_DATE_MM_YYYY } from "@/constants/date.constants"
import { FinancialApplicationFormDetail } from "@/modules/loan-application/[module]-financial-projection/components/molecules/details"
import {
  type FinancialApplicationDetailData,
  type FinancialApplicationFormDetailData
} from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import { type ExpensePeopleResponse } from "@/modules/loan-application/[module]-financial-projection/types/people-form"
import { BINARY_VALUES } from "@/modules/loan-application/constants/form"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { capitalizeWords, toCurrency } from "@/utils"
import { formatDate } from "@/utils/date.utils"
import { isEmpty } from "lodash"

interface UseFutureEmployeesDetailProps {
  expensePeopleResponse?: ExpensePeopleResponse
}

export const useFutureEmployeesDetail = ({
  expensePeopleResponse
}: UseFutureEmployeesDetailProps) => {
  const futureEmployeesDetail: FinancialApplicationDetailData = {
    id: LOAN_APPLICATION_STEPS.PEOPLE,
    subId: "futureEmployee",
    title: "Future Employees",
    financialApplicationFormData: [],
    subChildren: toFutureEmployeeDetail(expensePeopleResponse?.futureEmployees)
  }

  return { futureEmployeesDetail }
}

export const toFutureEmployeeDetail = (
  data: ExpensePeopleResponse["futureEmployees"] | undefined
) => {
  if (!Array.isArray(data) || isEmpty(data)) {
    return undefined
  }

  return (
    <div className="flex flex-col gap-3">
      {data.map(createEmployeeDetailItems).map((detailItem, itemIndex) => (
        <FinancialApplicationFormDetail
          key={itemIndex}
          isSubChildren
          financialApplicationFormData={detailItem}
        />
      ))}
    </div>
  )
}

const createEmployeeDetailItems = (
  employee: ExpensePeopleResponse["futureEmployees"][number] | undefined
): FinancialApplicationFormDetailData[] => [
  {
    id: "employeeEligibleForBenefits",
    title: "Employee eligible for benefits:",
    content: capitalizeWords(
      employee?.futureEmployee?.isEnrolledInBenefits
        ? BINARY_VALUES.YES
        : BINARY_VALUES.NO
    )
  },
  {
    id: "futureRole",
    title: "Future role:",
    content: employee?.futureEmployee?.role
  },
  {
    id: "startDate",
    title: "Start date:",
    content: formatDate(
      employee?.futureEmployee?.startDate,
      FORMAT_DATE_MM_YYYY
    )
  },
  {
    id: "annualSalary",
    title: "Annual salary:",
    content: toCurrency(employee?.futureEmployee?.annualSalary ?? 0, 0)
  }
]
