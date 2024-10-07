import { FinancialApplicationFormDetail } from "@/modules/loan-application/[module]-financial-projection/components/molecules/details"
import { FinancialApplicationFormDetailData } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import { ExpensePeopleResponse } from "@/modules/loan-application/[module]-financial-projection/types/people-form"
import { BINARY_VALUES } from "@/modules/loan-application/constants/form"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { capitalizeWords, toCurrency } from "@/utils"
import _ from "lodash"

interface UseCurrentEmployeesDetailProps {
  expensePeopleResponse?: ExpensePeopleResponse
}
export const useCurrentEmployeesDetail = ({
  expensePeopleResponse
}: UseCurrentEmployeesDetailProps) => {
  const currentEmployeesDetail = {
    id: LOAN_APPLICATION_STEPS.PEOPLE,
    subId: "currentEmployees",
    title: "Current Employees",
    financialApplicationFormData: [
      {
        id: "employeesCurrentlyEnrolledInBenefits",
        title: "Employees currently enrolled in benefits:",
        content: capitalizeWords(
          (expensePeopleResponse?.currentEmployees?.length ?? 0) > 0
            ? BINARY_VALUES.YES
            : BINARY_VALUES.NO
        )
      }
    ],
    subChildren: toCurrentEmployeesDetail(
      expensePeopleResponse?.currentEmployees
    )
  }

  return { currentEmployeesDetail }
}

const toCurrentEmployeesDetail = (
  data: ExpensePeopleResponse["currentEmployees"] | undefined
) => {
  if (!Array.isArray(data) || _.isEmpty(data)) {
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
  employee: ExpensePeopleResponse["currentEmployees"][number] | undefined
): FinancialApplicationFormDetailData[] => [
  {
    id: "productDepartment",
    title: "Department name:",
    content: employee?.currentEmployee?.departmentName
  },
  {
    id: "productDepartmentEmployees",
    title: "Number of employees:",
    content: employee?.currentEmployee?.numberOfEmployees
  },
  {
    id: "productDepartmentSalaries",
    title: "Annual department salaries:",
    content: toCurrency(employee?.currentEmployee?.annualSalary ?? 0, 0)
  }
]
