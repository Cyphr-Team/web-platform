import { memo } from "react"
import CustomArrayFormTemplate from "@/modules/loan-application/[module]-financial-projection/components/templates/CustomArrayFormTemplate.tsx"
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
      className: "text-sm space-y-0 m-1 w-full lg:w-auto grow",
      placeholder: "Department name",
      prefixIcon: <Icons.idCard />,
      styleProps: {
        inputClassName: "text-sm col-span-3 w-full"
      }
    }
  },
  {
    name: "numberOfEmployees",
    type: FieldType.NUMBER,
    props: {
      className: "text-sm space-y-0 m-1 w-full lg:w-auto grow",
      placeholder: "Number of employees",
      prefixIcon: <Icons.team />,
      styleProps: {
        inputClassName: "text-sm"
      }
    }
  },
  {
    name: "annualSalary",
    type: FieldType.CURRENCY,
    props: {
      direction: "column",
      className: "text-sm space-y-0 m-1 w-full lg:w-auto grow",
      placeholder: "Annual department salaries",
      prefixIcon: (
        <div className="flex justify-between w-9 text-[#667085]">
          <Icons.money /> $
        </div>
      ),
      styleProps: {
        inputClassName: "text-sm pl-12"
      }
    }
  }
]

const CurrentEmployeesForm = () => {
  return (
    <CustomArrayFormTemplate
      className="flex flex-col-reverse lg:flex-row items-center"
      blockClassName="justify-between flex-col lg:flex-row lg:items-center w-full"
      name="currentEmployees"
      actionText="Add employee department"
      actionIcon={<UserRoundPlus size={18} />}
      step={LOAN_APPLICATION_STEPS.PEOPLE}
      defaultEmptyObject={PEOPLE_DEFAULT_VALUE[PeopleField.CURRENT_EMPLOYEES]}
      blocks={CurrentEmployeesBlock}
    />
  )
}

export default memo(CurrentEmployeesForm)
