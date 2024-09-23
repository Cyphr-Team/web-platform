import { memo } from "react"
import { FieldType } from "@/modules/form-template/components/templates/FormTemplate.tsx"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import PeopleArrayFormTemplate from "@/modules/loan-application/[module]-financial-projection/components/templates/PeopleArrayFormTemplate"
import { Icons } from "@/components/ui/icons"
import { Calendar } from "lucide-react"
import { YES_NO_OPTIONS } from "@/modules/loan-application/constants/form"
import { MM_YYYY_PATTERN } from "@/constants"
import {
  PEOPLE_DEFAULT_VALUE,
  PeopleField
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-people-expenses-store"

const FutureEmployeesBlock = [
  {
    name: "isEnrolledInBenefits",
    type: FieldType.SELECT,
    props: {
      label: "Will this future employee be eligible to enroll in benefits?",
      subtitle: "Benefits can include medical, dental, vision, 401(k), etc. ",
      options: YES_NO_OPTIONS,
      styleProps: {
        labelClassName: "lg:col-span-2 lg:mr-5 leading-1",
        subtitleClassName: "text-sm font-normal",
        inputClassName: "text-sm lg:w-[13vw] ml-auto mr-0"
      },
      className: "w-full lg:grid lg:grid-cols-3 gap-1"
    }
  },
  {
    name: "role",
    type: FieldType.TEXT,
    props: {
      className: "text-sm space-y-0 m-1 w-full xl:w-auto grow",
      placeholder: "Role",
      prefixIcon: <Icons.idCard />,
      styleProps: {
        inputClassName: "text-sm"
      },
      //TODO: Add error message later
      isHideErrorMessage: true
    }
  },
  {
    name: "startDate",
    type: FieldType.MASK,
    props: {
      pattern: MM_YYYY_PATTERN,
      className: "text-sm space-y-0 m-1 w-full xl:w-auto grow",
      placeholder: "Start date (MM/YYYY)",
      prefixIcon: <Calendar size={20} className="ml-1" />,
      subtitle: "",
      styleProps: {
        calendarClassName: "text-sm"
      },
      isHideErrorMessage: true
    }
  },
  {
    name: "annualSalary",
    type: FieldType.CURRENCY,
    props: {
      direction: "column",
      className: "text-sm space-y-0 m-1 w-full xl:w-auto grow",
      placeholder: "Annual salary",
      prefixIcon: (
        <div className="flex justify-between w-9 text-[#667085]">
          <Icons.money /> $
        </div>
      ),
      styleProps: {
        inputClassName: "text-sm pl-12"
      },
      isHideErrorMessage: true
    }
  }
]

const FutureEmployeesForm = () => {
  return (
    <PeopleArrayFormTemplate
      className="flex flex-col-reverse items-center"
      blockClassName="justify-between flex-col lg:flex-row lg:items-center flex-wrap gap-1 w-full"
      name="futureEmployees"
      actionIcon={<Icons.team />}
      actionText="Add future employee(s)"
      step={LOAN_APPLICATION_STEPS.PEOPLE}
      defaultEmptyObject={PEOPLE_DEFAULT_VALUE[PeopleField.FUTURE_EMPLOYEES]}
      canBeEmpty
      blocks={FutureEmployeesBlock}
    />
  )
}

export default memo(FutureEmployeesForm)
