import { Card } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { cn } from "@/lib/utils"
import {
  PreQualificationFormValue,
  preQualificationSchema
} from "@/modules/loan-application/constants/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { ButtonLoading } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { useSubmitPreQualificationForm } from "@/modules/loan-application/hooks/useForm/useSubmitPreQualificationForm"
import { useCallback, useState } from "react"
import { useParams } from "react-router-dom"
import { SelectInput } from "@/shared/organisms/form/SelectInput"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider.tsx"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"

const questions = [
  {
    field: preQualificationSchema.keyof().Enum.isCompanyBasedInUs,
    label: "Is the Company based in the United States?"
  },
  {
    field: preQualificationSchema.keyof().Enum.foundingTeamEligibleToWorkInUs,
    label:
      "Are all members of the founding team eligible to work in the United States?"
  },
  {
    field: preQualificationSchema.keyof().Enum.isForProfitTechCompany,
    label:
      "Is your Company a for profit entity that provides a technology-based product, service, or solution?"
  },
  {
    field: preQualificationSchema.keyof().Enum.hasMvpWithRevenueUnderOneMillion,
    label: "Do you have a minimum viable product with revenue under 1 million?"
  }
]
const options = [
  {
    value: "yes",
    label:
      "Yes, the company and 51% of the founding team are located in Kansas City, Missouri."
  },
  {
    value: "no_but_will_change",
    label:
      "No, but I am willing to relocate the company and 51% of the founding team to Kansas City, Missouri and establish an operating presence."
  },
  {
    value: "no",
    label:
      "No, I am not willing to relocate the company and 51% of the founding team to Kansas City, Missouri"
  }
]

export const PreQualificationForm = () => {
  const { finishCurrentStep, buildSpecificStep } =
    useLoanApplicationProgressContext()
  const { loanProgramId } = useParams()

  const [isQualified, setIsQualified] = useState(true)

  const { dispatchFormAction, preQualification, loanRequest } =
    useLoanApplicationFormContext()

  const { mutate, isPending } = useSubmitPreQualificationForm()

  const form = useForm<PreQualificationFormValue>({
    resolver: zodResolver(preQualificationSchema),
    mode: "onChange",
    defaultValues: {
      isCompanyBasedInUs: preQualification?.isCompanyBasedInUs,
      foundingTeamEligibleToWorkInUs:
        preQualification?.foundingTeamEligibleToWorkInUs,
      isForProfitTechCompany: preQualification?.isForProfitTechCompany,
      hasMvpWithRevenueUnderOneMillion:
        preQualification?.hasMvpWithRevenueUnderOneMillion,
      willingToOperateInKansasCityMo:
        preQualification?.willingToOperateInKansasCityMo
    }
  })

  // TODO: hide these complex logic like onSuccess into hooks
  const onConfirmed = useCallback(() => {
    mutate(
      {
        ...form.getValues(),
        loanProgramId: loanProgramId!
      },
      {
        onSuccess: (response) => {
          if (response.data.isQualified) {
            dispatchFormAction({
              action: FORM_ACTION.SET_DATA,
              key: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
              state: {
                id: "",
                applicationId: response.data.applicationId,
                loanAmount: 0,
                loanTermInMonth: 1,
                proposeUseOfLoan: "other"
              }
            })
            dispatchFormAction({
              action: FORM_ACTION.SET_DATA,
              key: LOAN_APPLICATION_STEPS.PRE_QUALIFICATION,
              state: {
                isCompanyBasedInUs: form.getValues("isCompanyBasedInUs"),
                foundingTeamEligibleToWorkInUs: form.getValues(
                  "foundingTeamEligibleToWorkInUs"
                ),
                isForProfitTechCompany: form.getValues(
                  "isForProfitTechCompany"
                ),
                hasMvpWithRevenueUnderOneMillion: form.getValues(
                  "hasMvpWithRevenueUnderOneMillion"
                ),
                willingToOperateInKansasCityMo: form.getValues(
                  "willingToOperateInKansasCityMo"
                )
              }
            })
            buildSpecificStep()
            finishCurrentStep()
          } else {
            setIsQualified(false)
          }
        }
      }
    )
  }, [
    buildSpecificStep,
    dispatchFormAction,
    finishCurrentStep,
    form,
    loanProgramId,
    mutate
  ])

  return (
    <Card
      className={cn(
        "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6",
        "md:col-span-6 md:col-start-2 md:mx-0"
      )}
    >
      <h5 className="text-lg font-semibold">Pre-Qualification</h5>
      <Separator />
      {isQualified ? (
        // TODO: move this out to a variable
        <Form {...form}>
          <form className="flex flex-col gap-y-2xl gap-x-4xl">
            {questions.map((question) => (
              <Controller
                key={question.field}
                control={form.control}
                name={question.field}
                render={({ field }) => (
                  <FormItem className="flex justify-between gap-2 items-center">
                    <FormLabel className="text-sm text-text-secondary font-medium">
                      {question.label}
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onBlur()
                          field.onChange(value === "true")
                        }}
                        value={field.value?.toString()}
                        disabled={!!loanRequest?.applicationId?.length}
                      >
                        <SelectTrigger className="text-sm max-w-40 col-span-6 xl:col-span-2 xl:max-w-40 xl:col-end-7 xl:ml-auto">
                          <SelectValue placeholder="Please select" />
                        </SelectTrigger>
                        <SelectContent className="text-sm">
                          <SelectItem value="true">
                            <span>Yes</span>
                          </SelectItem>
                          <SelectItem value="false">
                            <span>No</span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <SelectInput
              inputClassName="!max-w-full"
              key="willingToOperateInKansasCityMo"
              label="Are you located in, or willing to establish an operating presence within the Kansas City, Missouri county lines for at least one year?"
              control={form.control}
              name="willingToOperateInKansasCityMo"
              options={options}
              disabled={!!loanRequest?.applicationId?.length}
            />
            {!loanRequest?.applicationId?.length && (
              <CustomAlertDialog
                onConfirmed={onConfirmed}
                actionClassName="bg-black hover:bg-black/80"
                title="Are you sure?"
                cancelText="Go back"
                confirmText="Yes, submit"
                description="Once you hit submit, you will not be able to make any changes or modify your answers."
              >
                <ButtonLoading
                  disabled={!form.formState.isValid}
                  variant="outline"
                  isLoading={isPending}
                  className=" text-white bg-primary hover:bg-primary/80 hover:text-white"
                >
                  Submit <ArrowRight className="ml-1 w-4" />
                </ButtonLoading>
              </CustomAlertDialog>
            )}
          </form>
        </Form>
      ) : (
        <p>
          Unfortunately, you do not qualify for the LaunchKC program at this
          time. Please consider applying again next year.
        </p>
      )}
    </Card>
  )
}
