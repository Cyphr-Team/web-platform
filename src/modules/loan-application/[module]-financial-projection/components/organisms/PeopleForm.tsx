import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { RHFProvider } from "@/modules/form-template/providers"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/utils/useAutoCompleteStepEffect.ts"
import {
  type Block,
  FieldType,
  renderBlockComponents
} from "@/modules/form-template/components/templates/FormTemplate.tsx"
import { PeopleTotalInfo } from "@/modules/loan-application/[module]-financial-projection/components/molecules/PeopleTotalInfo"
import CurrentEmployeesForm from "@/modules/loan-application/[module]-financial-projection/components/molecules/CurrentEmployeesForm"
import FutureEmployeesForm from "@/modules/loan-application/[module]-financial-projection/components/molecules/FutureEmployeesForm"
import {
  PeopleField,
  peopleFormSchema,
  type PeopleFormValue
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-people-expenses-store"
import { YES_NO_OPTIONS } from "@/modules/loan-application/constants/form"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { valueOrZero } from "@/utils"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout"

export const PeopleFormBlocks: Block[] = [
  {
    name: PeopleField.CurrentEmployeesEnrolled,
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

export function PeopleForm() {
  const { people, dispatchFormAction } = useLoanApplicationFormContext()

  const form = useForm<PeopleFormValue>({
    resolver: zodResolver(peopleFormSchema),
    mode: "onBlur",
    defaultValues: {
      ...people,
      id: people?.id ?? ""
    }
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
    <FormLayout title="People">
      <h5 className="text-lg font-semibold">People</h5>
      <Separator />

      <RHFProvider methods={form} onSubmit={form.handleSubmit(onSubmit)}>
        <FormLayout hideTopNavigation>
          <div>
            <h5 className="text-lg font-semibold">Current Employees</h5>
            <h5 className="financial-projection mt-2 text-sm font-normal text-muted-foreground">
              Add your current employees to their respective departments,
              including department name, employee count, total annual salaries,
              and whether benefits are offered.
            </h5>
          </div>

          <Separator />

          {renderBlockComponents(PeopleFormBlocks)}
          <CurrentEmployeesForm />
        </FormLayout>
        <FormLayout hideTopNavigation cardClassName="mt-5">
          <div>
            <h5 className="text-lg font-semibold">Future Employees</h5>
            <h5 className="financial-projection mt-2 text-sm font-normal text-muted-foreground">
              Add your future headcount to the relevant department. Provide the
              department name, employee count, total annual salaries, and
              whether benefits are offered.
            </h5>
          </div>

          <Separator />
          <FutureEmployeesForm />
        </FormLayout>
        <FormLayout
          hideTopNavigation
          cardClassName="bg-financial-projection-card mt-5 py-5"
        >
          <h5 className="text-lg font-semibold text-black">Totals</h5>
          <Separator />
          <div className="flex flex-col lg:flex-row">
            <PeopleTotalInfo
              title="Total current employees"
              value={valueOrZero(
                watch(PeopleField.CurrentEmployees)?.reduce(
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
                watch(PeopleField.CurrentEmployees)?.reduce(
                  (acc, { annualSalary }) => acc + annualSalary,
                  0
                )
              )}
            />
            <PeopleTotalInfo
              title="Total future employees"
              value={watch(PeopleField.FutureEmployees)?.length ?? 0}
            />
            <PeopleTotalInfo
              isCurrency
              title="Total future employee salaries"
              value={valueOrZero(
                watch(PeopleField.FutureEmployees)?.reduce(
                  (acc, { annualSalary }) => acc + annualSalary,
                  0
                )
              )}
            />
          </div>
        </FormLayout>

        {!isReviewApplicationStep(step) && (
          <div className="mt-4 flex flex-col gap-2xl md:mt-8">
            <Button disabled={!form.formState.isValid}>Next</Button>
          </div>
        )}
      </RHFProvider>
    </FormLayout>
  )
}
