import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { RHFProvider } from "@/modules/form-template/providers"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect"
import {
  Block,
  FieldType,
  renderBlockComponents
} from "@/modules/form-template/components/templates/FormTemplate.tsx"
import { PeopleTotalInfo } from "@/modules/loan-application/[module]-financial-projection/components/molecules/PeopleTotalInfo"
import CurrentEmployeesForm from "@/modules/loan-application/[module]-financial-projection/components/molecules/CurrentEmployeesForm"
import FutureEmployeesForm from "@/modules/loan-application/[module]-financial-projection/components/molecules/FutureEmployeesForm"
import {
  PeopleField,
  peopleFormSchema,
  PeopleFormValue
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-people-expenses-store"
import { YES_NO_OPTIONS } from "@/modules/loan-application/constants/form"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { valueOrZero } from "@/utils"

export const PeopleFormBlocks: Block[] = [
  {
    name: PeopleField.CURRENT_EMPLOYEES_ENROLLED,
    type: FieldType.SELECT,
    props: {
      label: "Are your employees currently enrolled in company benefits?",
      subtitle: "Benefits can include medical, dental, vision, 401(k), etc. ",
      options: YES_NO_OPTIONS,
      styleProps: {
        labelClassName: "lg:w-[80vw] lg:mr-5 leading-1",
        subtitleClassName: "text-sm font-normal",
        inputClassName: "lg:w-[25vw]"
      },
      className: "lg:flex"
    }
  }
]

export const PeopleForm = () => {
  const { people, dispatchFormAction } = useLoanApplicationFormContext()

  const form = useForm<PeopleFormValue>({
    resolver: zodResolver(peopleFormSchema),
    mode: "onBlur",
    defaultValues: { ...people, id: people?.id ?? "" }
  })

  const { watch } = form

  const { finishCurrentStep, step } = useLoanApplicationProgressContext()

  const onSubmit = (data: PeopleFormValue) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.PEOPLE,
      state: data
    })
    finishCurrentStep()
  }

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.PEOPLE)

  return (
    <Card
      className={cn(
        "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6 shadow-none text-sm",
        "md:col-span-6 md:col-start-2 md:mx-0"
      )}
    >
      <h5 className="text-lg font-semibold">People</h5>
      <Separator />

      <RHFProvider methods={form} onSubmit={form.handleSubmit(onSubmit)}>
        <Card
          className={cn(
            "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6 shadow-none text-sm",
            "md:col-span-6 md:col-start-2 md:mx-0"
          )}
        >
          <div>
            <h5 className="text-lg font-semibold">Current Employees</h5>
            <h5 className="text-sm font-normal mt-2 financial-projection text-muted-foreground">
              Add your current employees to their respective departments,
              including department name, employee count, total annual salaries,
              and whether benefits are offered.
            </h5>
          </div>

          <Separator />

          {renderBlockComponents(PeopleFormBlocks)}
          <CurrentEmployeesForm />
        </Card>
        <Card
          className={cn(
            "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6 shadow-none text-sm",
            "md:col-span-6 md:col-start-2 md:mx-0 mt-5"
          )}
        >
          <div>
            <h5 className="text-lg font-semibold">Future Employees</h5>
            <h5 className="text-sm font-normal mt-2 financial-projection text-muted-foreground">
              Add your future headcount to the relevant department. Provide the
              department name, employee count, total annual salaries, and
              whether benefits are offered.
            </h5>
          </div>

          <Separator />
          <FutureEmployeesForm />
        </Card>
        <Card
          className={cn(
            "bg-financial-projection-card flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6 shadow-none text-sm",
            "md:col-span-6 md:col-start-2 md:mx-0 mt-5"
          )}
        >
          <h5 className="text-lg font-semibold text-black">Totals</h5>
          <Separator />
          <div className="flex flex-col lg:flex-row">
            <PeopleTotalInfo
              title={"Total current employees"}
              value={valueOrZero(
                watch(PeopleField.CURRENT_EMPLOYEES)?.reduce(
                  (acc, { numberOfEmployees }) =>
                    acc + Number(numberOfEmployees ?? 0),
                  0
                )
              )}
            />
            <PeopleTotalInfo
              isCurrency
              title="Total current employee salaries"
              value={valueOrZero(
                watch(PeopleField.CURRENT_EMPLOYEES)?.reduce(
                  (acc, { annualSalary }) => acc + annualSalary,
                  0
                )
              )}
            />
            <PeopleTotalInfo
              title="Total future employees"
              value={watch(PeopleField.FUTURE_EMPLOYEES)?.length ?? 0}
            />
            <PeopleTotalInfo
              title={"Total future employee salaries"}
              value={valueOrZero(
                watch(PeopleField.FUTURE_EMPLOYEES)?.reduce(
                  (acc, { annualSalary }) => acc + annualSalary,
                  0
                )
              )}
              isCurrency
            />
          </div>
        </Card>

        {!isReviewApplicationStep(step) && (
          <div className="flex flex-col gap-2xl mt-4">
            <Button disabled={!form.formState.isValid}>Next</Button>
          </div>
        )}
      </RHFProvider>
    </Card>
  )
}
