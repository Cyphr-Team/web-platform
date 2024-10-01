import { FinancialApplicationFormDetail } from "@/modules/loan-application/[module]-financial-projection/components/molecules/details"
import { ExpensePeopleResponse } from "@/modules/loan-application/[module]-financial-projection/types/people-form"
import { BINARY_VALUES } from "@/modules/loan-application/constants/form"
import { useGetFinancialProjectForms } from "@/modules/loan-application/hooks/useGetFinancialProjectForms"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { capitalizeWords, toCurrency } from "@/utils"

const toCurrentEmployeesDetail = (
  data: ExpensePeopleResponse["currentEmployees"] | undefined
) => {
  return Array.isArray(data) && data?.length > 0 ? (
    <div className="flex flex-col gap-3">
      {data
        ?.map((employee) => [
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

export const useCurrentEmployeesDetail = () => {
  const { expensePeopleFormQuery } = useGetFinancialProjectForms()

  const currentEmployeesDetail = {
    id: LOAN_APPLICATION_STEPS.PEOPLE,
    subId: "currentEmployees",
    title: "Current Employees",
    financialApplicationFormData: [
      {
        id: "employeesCurrentlyEnrolledInBenefits",
        title: "Employees currently enrolled in benefits:",
        content: capitalizeWords(
          expensePeopleFormQuery?.data?.currentEmployees &&
            expensePeopleFormQuery?.data?.currentEmployees?.length > 0
            ? BINARY_VALUES.YES
            : BINARY_VALUES.NO
        )
      }
    ],
    subChildren: toCurrentEmployeesDetail(
      expensePeopleFormQuery.data?.currentEmployees
    )
  }

  return { currentEmployeesDetail }
}
