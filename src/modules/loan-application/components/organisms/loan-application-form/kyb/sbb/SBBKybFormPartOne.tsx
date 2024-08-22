import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight } from "lucide-react"
import { useForm } from "react-hook-form"
import {
  SBB_KYB_FORM_BLOCKS_PART_ONE,
  SbbKybFormFields,
  SbbKybFormPartOneValue,
  sbbKybFormSchemaPartOne,
  YES_NO_OPTIONS
} from "./const"
import { ComponentMapper } from "@/modules/form-template/components/templates/FormTemplate"
import {
  RHFOptionInput,
  RHFTextInput
} from "@/modules/form-template/components/molecules"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider"
import { useMemo } from "react"

import { get } from "lodash"

export const SBBKybFormPartOne = () => {
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()

  const { sbbBusinessInformationPartOne, dispatchFormAction } =
    useLoanApplicationFormContext()

  const defaultValues = useMemo(
    () =>
      Object.keys(sbbKybFormSchemaPartOne.shape).reduce(
        (acc, key) => ({
          ...acc,
          [key]: get(sbbBusinessInformationPartOne, key, "")
        }),
        {}
      ),
    [sbbBusinessInformationPartOne]
  )

  const onSubmit = (data: SbbKybFormPartOneValue) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.SBB_BUSINESS_INFORMATION_PART_ONE,
      state: {
        ...data
      }
    })
    finishCurrentStep()
  }

  const form = useForm<SbbKybFormPartOneValue>({
    resolver: zodResolver(sbbKybFormSchemaPartOne),
    defaultValues,
    mode: "onBlur"
  })

  return (
    <Card
      className={cn(
        "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6 shadow-none",
        "md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-sm"
      )}
      id={LOAN_APPLICATION_STEPS.SBB_BUSINESS_INFORMATION_PART_ONE}
    >
      <h5 className="text-lg font-semibold">Business Information</h5>
      <Separator />
      <Form {...form}>
        <form className="grid grid-cols-12 gap-y-2xl gap-x-4xl">
          {SBB_KYB_FORM_BLOCKS_PART_ONE.map(({ type, props, name }) => {
            if (name !== SbbKybFormFields.IS_SUBSIDIARY) {
              const Component = ComponentMapper[type]
              return (
                <Component
                  key={name}
                  className="col-span-12"
                  name={name}
                  {...props}
                />
              )
            } else {
              return (
                <div className="flex flex-col col-span-12">
                  <RHFOptionInput
                    label="Is your business of subsidiary of another business?"
                    key={SbbKybFormFields.IS_SUBSIDIARY}
                    className="col-span-12"
                    name={SbbKybFormFields.IS_SUBSIDIARY}
                    options={YES_NO_OPTIONS}
                    {...props}
                  />
                  {
                    <RHFTextInput
                      label="If yes, what is the name of the owning company?"
                      key={SbbKybFormFields.PARENT_COMPANY}
                      className="col-span-12 flex items-end gap-1"
                      styleProps={{
                        inputClassName:
                          "!max-w-40 border-l-0 border-r-0 border-t-0", // to-do remove ring focus
                        labelClassName: "leading-normal"
                      }}
                      name={SbbKybFormFields.PARENT_COMPANY}
                    />
                  }
                </div>
              )
            }
          })}
        </form>
      </Form>

      {!isReviewApplicationStep(step) && (
        <Button
          disabled={!form.formState.isValid}
          onClick={form.handleSubmit(onSubmit)}
        >
          Next <ArrowRight className="ml-1 w-4" />
        </Button>
      )}
    </Card>
  )
}
