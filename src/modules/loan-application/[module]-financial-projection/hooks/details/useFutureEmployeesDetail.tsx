import { FORMAT_DATE_MM_YYYY } from "@/constants/date.constants"
import { FinancialApplicationFormDetail } from "@/modules/loan-application/[module]-financial-projection/components/molecules/details"
import { ExpensePeopleResponse } from "@/modules/loan-application/[module]-financial-projection/types/people-form"
import { BINARY_VALUES } from "@/modules/loan-application/constants/form"
import { useGetFinancialProjectForms } from "@/modules/loan-application/hooks/useGetFinancialProjectForms"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { capitalizeWords, toCurrency } from "@/utils"
import { formatDate } from "@/utils/date.utils"

const toFutureEmployeeDetail = (
  data: ExpensePeopleResponse["futureEmployees"] | undefined
) => {
  return Array.isArray(data) && data?.length > 0 ? (
    <div className="flex flex-col gap-3">
      {data
        ?.map((employee) => [
          {
            id: "futureRole",
            title: "Future role:",
            content: employee.futureEmployee.role
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
        ])
        .map((detailData, key) => (
          <FinancialApplicationFormDetail
            key={key}
            isSubChildren
            financialApplicationFormData={detailData}
          />
        ))}
    </div>
  ) : undefined
}

export const useFutureEmployeesDetail = () => {
  const { expensePeopleFormQuery } = useGetFinancialProjectForms()

  const futureEmployeesDetail = {
    id: LOAN_APPLICATION_STEPS.PEOPLE,
    subId: "futureEmployee",
    title: "Future Employees",
    financialApplicationFormData: [
      {
        id: "employeeEligibleForBenefits",
        title: "Employee eligible for benefits:",
        content: capitalizeWords(
          expensePeopleFormQuery?.data?.futureEmployees &&
            expensePeopleFormQuery?.data?.futureEmployees?.length > 0
            ? BINARY_VALUES.YES
            : BINARY_VALUES.NO
        )
      }
    ],
    subChildren: toFutureEmployeeDetail(
      expensePeopleFormQuery.data?.futureEmployees
    )
  }

  return { futureEmployeesDetail }
}
