import { FORMAT_DATE_MM_YYYY } from "@/constants/date.constants"
import { FinancialApplicationFormDetail } from "@/modules/loan-application/[module]-financial-projection/components/molecules/details"
import { type PeopleFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-people-expenses-store"
import {
  type FinancialApplicationDetailData,
  type FinancialApplicationFormDetailData
} from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import { BINARY_VALUES } from "@/modules/loan-application/constants/form"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { capitalizeWords, toCurrency } from "@/utils"
import { formatDate } from "@/utils/date.utils"
import { isEmpty } from "lodash"

interface UseFutureEmployeesDetailProps {
  expensePeopleFormValue?: PeopleFormValue
}

export const useFutureEmployeesDetail = ({
  expensePeopleFormValue
}: UseFutureEmployeesDetailProps) => {
  const futureEmployeesDetail: FinancialApplicationDetailData = {
    id: LOAN_APPLICATION_STEPS.PEOPLE,
    subId: "futureEmployee",
    title: "Future Employees",
    financialApplicationFormData: [],
    subChildren: toFutureEmployeeDetail(expensePeopleFormValue?.futureEmployees)
  }

  return { futureEmployeesDetail }
}

export const toFutureEmployeeDetail = (
  data: PeopleFormValue["futureEmployees"] | undefined
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
  employee: PeopleFormValue["futureEmployees"][number] | undefined
): FinancialApplicationFormDetailData[] => [
  {
    id: "employeeEligibleForBenefits",
    title: "Employee eligible for benefits:",
    content: capitalizeWords(
      employee?.isEnrolledInBenefits ? BINARY_VALUES.YES : BINARY_VALUES.NO
    )
  },
  {
    id: "futureRole",
    title: "Future role:",
    content: employee?.role
  },
  {
    id: "startDate",
    title: "Start date:",
    content: formatDate(employee?.startDate, FORMAT_DATE_MM_YYYY)
  },
  {
    id: "annualSalary",
    title: "Annual salary:",
    content: toCurrency(employee?.annualSalary, 0)
  }
]
