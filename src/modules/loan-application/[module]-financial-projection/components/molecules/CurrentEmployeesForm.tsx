import { memo } from "react"
import PeopleArrayFormTemplate from "@/modules/loan-application/[module]-financial-projection/components/templates/PeopleArrayFormTemplate.tsx"
import { FieldType } from "@/modules/form-template/components/templates/FormTemplate.tsx"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { UserRoundPlus } from "lucide-react"
import { Icons } from "@/components/ui/icons"
import {
  PEOPLE_DEFAULT_VALUE,
  PeopleField
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-people-expenses-store"

const CurrentEmployeesBlock = [
  {
    name: "departmentName",
    type: FieldType.TEXT,
    props: {
      className: "space-y-0 col-span-3",
      placeholder: "Department/ role",
      prefixIcon: <Icons.idCard />,
      styleProps: {
        inputClassName: "text-sm"
      },
      isHideErrorMessage: true
    }
  },
  {
    name: "numberOfEmployees",
    type: FieldType.NUMBER,
    props: {
      className: "space-y-0 col-span-3",
      placeholder: "Number of employees",
      prefixIcon: <Icons.team />,
      styleProps: {
        inputClassName: "text-sm no-arrows"
      },
      isHideErrorMessage: true
    }
  },
  {
    name: "annualSalary",
    type: FieldType.CURRENCY,
    props: {
      direction: "column",
      className: "space-y-0 col-span-4",
      placeholder: "Annual salaries",
      prefixIcon: (
        <div className="flex justify-between gap-1.5 text-text-placeholder">
          <Icons.money />$
        </div>
      ),
      styleProps: {
        inputClassName: "text-sm pl-12"
      },
      isHideErrorMessage: true
    }
  }
]

function CurrentEmployeesForm() {
  return (
    <PeopleArrayFormTemplate
      actionIcon={<UserRoundPlus size={18} />}
      actionText="Add employee(s)"
      blocks={CurrentEmployeesBlock}
      className="flex justify-between gap-x-2 p-4"
      defaultEmptyObject={PEOPLE_DEFAULT_VALUE[PeopleField.CurrentEmployees]}
      layout="current"
      name="currentEmployees"
      step={LOAN_APPLICATION_STEPS.PEOPLE}
    />
  )
}

export default memo(CurrentEmployeesForm)
