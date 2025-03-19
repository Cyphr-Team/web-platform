interface CurrentEmployee {
  isEnrolledInBenefits: boolean
  annualSalary: number
  departmentName: string
  numberOfEmployees: number
}
interface FutureEmployee {
  isEnrolledInBenefits: boolean
  annualSalary: number
  role: string
  startDate: string
}

export interface ExpensePeople {
  id: string | null
  financialProjectionSetupId: string | null
  currentEmployeesEnrolled: string
  currentEmployees?: CurrentEmployee[]
  futureEmployees?: FutureEmployee[]
}

export interface ExpensePeopleResponse {
  financialProjectionSetupId: string | null
  currentEmployees: {
    financialProjectionSetupId: string
    currentEmployee: CurrentEmployee
  }[]
  futureEmployees: {
    financialProjectionSetupId: string
    futureEmployee: FutureEmployee
  }[]
}
