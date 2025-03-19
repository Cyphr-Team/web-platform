import { type PeopleFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-people-expenses-store"
import {
  type ExpensePeople,
  type ExpensePeopleResponse
} from "@/modules/loan-application/[module]-financial-projection/types/people-form"
import { BINARY_VALUES } from "@/modules/loan-application/constants/form"
import {
  parseISOStringToMMYYYY,
  parseMMYYYYToISOString
} from "@/utils/date.utils"

export const formatExpensePeopleForm = (
  rawData: PeopleFormValue
): ExpensePeople => {
  const formattedForm = {
    ...rawData,
    financialProjectionSetupId: rawData.id,
    currentEmployees: rawData.currentEmployees.map((employee) => ({
      ...employee,
      isEnrolledInBenefits:
        rawData.currentEmployeesEnrolled === BINARY_VALUES.YES
    })),
    futureEmployees: rawData.futureEmployees.map((employee) => ({
      ...employee,
      isEnrolledInBenefits: employee.isEnrolledInBenefits === BINARY_VALUES.YES,
      startDate: parseMMYYYYToISOString(employee.startDate)
    }))
  }

  return formattedForm
}

export const reverseFormatExpensePeopleForm = (
  rawData: ExpensePeopleResponse
): PeopleFormValue => {
  const formattedForm = {
    ...rawData,
    id: rawData.financialProjectionSetupId,
    currentEmployeesEnrolled: rawData.currentEmployees[0]?.currentEmployee
      .isEnrolledInBenefits
      ? BINARY_VALUES.YES
      : BINARY_VALUES.NO,
    currentEmployees: rawData.currentEmployees.map(
      (employee) => employee?.currentEmployee
    ),
    futureEmployees: rawData.futureEmployees.map((employee) => {
      return {
        ...employee.futureEmployee,
        startDate: parseISOStringToMMYYYY(employee.futureEmployee.startDate),
        isEnrolledInBenefits: employee.futureEmployee.isEnrolledInBenefits
          ? BINARY_VALUES.YES
          : BINARY_VALUES.NO
      }
    })
  }

  return formattedForm
}
