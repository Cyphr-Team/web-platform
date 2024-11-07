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
      className: "col-span-12",
      styleProps: {
        labelClassName: "leading-1",
        subtitleClassName: "text-sm font-normal",
        inputClassName: "text-sm max-w-40"
      },
      isRowDirection: true
    }
  },
  {
    name: "role",
    type: FieldType.TEXT,
    props: {
      placeholder: "Role",
      prefixIcon: <Icons.idCard />,
      className: "col-span-4",
      styleProps: {
        inputClassName: "text-sm"
      },
      isHideErrorMessage: true
    }
  },
  {
    name: "startDate",
    type: FieldType.MASK,
    props: {
      pattern: MM_YYYY_PATTERN,
      placeholder: "Start date (MM/YYYY)",
      className: "col-span-4",
      prefixIcon: <Icons.calendar />,
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
      placeholder: "Annual salary",
      className: "col-span-4",
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
      actionIcon={<Icons.team />}
      actionText="Add future employee(s)"
      blocks={FutureEmployeesBlock}
      className="flex flex-col-reverse p-4"
      defaultEmptyObject={PEOPLE_DEFAULT_VALUE[PeopleField.FutureEmployees]}
      layout="future"
      name="futureEmployees"
      step={LOAN_APPLICATION_STEPS.PEOPLE}
    />
  )
}

export default memo(FutureEmployeesForm)
