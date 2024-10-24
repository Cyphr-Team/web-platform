import { Icons } from "@/components/ui/icons"
import { MM_YYYY_PATTERN } from "@/constants"
import { FieldType } from "@/modules/form-template/components/templates/FormTemplate.tsx"
import {
  PEOPLE_DEFAULT_VALUE,
  PeopleField
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-people-expenses-store"
import PeopleArrayFormTemplate from "@/modules/loan-application/[module]-financial-projection/components/templates/PeopleArrayFormTemplate"
import { YES_NO_OPTIONS } from "@/modules/loan-application/constants/form"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { memo } from "react"

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
      className:
        "w-full lg:grid lg:grid-cols-3 gap-1 space-y-0 col-start-0 col-span-3 mt-2"
    }
  },
  {
    name: "role",
    type: FieldType.TEXT,
    props: {
      className: "row-start-2",
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
      className: "row-start-2",
      placeholder: "Start date (MM/YYYY)",
      prefixIcon: <Icons.calendar />,
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
      className: "row-start-2",
      placeholder: "Annual salary",
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

function FutureEmployeesForm() {
  return (
    <PeopleArrayFormTemplate
      canBeEmpty
      actionIcon={<Icons.team />}
      actionText="Add future employee(s)"
      blockClassName="grid grid-cols-3 gap-x-4 gap-y-3 w-full"
      blocks={FutureEmployeesBlock}
      className="flex flex-col-reverse items-center"
      defaultEmptyObject={PEOPLE_DEFAULT_VALUE[PeopleField.FUTURE_EMPLOYEES]}
      name="futureEmployees"
      step={LOAN_APPLICATION_STEPS.PEOPLE}
    />
  )
}

export default memo(FutureEmployeesForm)
