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
import { useCallback, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { SelectInput } from "@/shared/organisms/form/SelectInput"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider.tsx"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { useCreateLoanApplicationMutation } from "@/modules/loan-application/hooks/useMutation/useCreateLoanApplicationMutation"
import { LoanType } from "@/types/loan-program.type"
import { options, questions } from "./constants"

export const PreQualificationForm = () => {
  const { finishCurrentStep, buildSpecificStep } =
    useLoanApplicationProgressContext()
  const { loanProgramId } = useParams()

  const [isQualified, setIsQualified] = useState(true)

  const { dispatchFormAction, preQualification } =
    useLoanApplicationFormContext()

  const {
    mutateAsync: createLoanApplication,
    isPending: isCreatingLoanApplication
  } = useCreateLoanApplicationMutation(LoanType.MICRO)
  const { mutate, isPending } = useSubmitPreQualificationForm()

  const defaultValues = useMemo(() => {
    return {
      applicationId: preQualification?.applicationId ?? "",
      isCompanyBasedInUs: preQualification?.isCompanyBasedInUs,
      foundingTeamEligibleToWorkInUs:
        preQualification?.foundingTeamEligibleToWorkInUs,
      isForProfitTechCompany: preQualification?.isForProfitTechCompany,
      hasMvpWithRevenueUnderOneMillion:
        preQualification?.hasMvpWithRevenueUnderOneMillion,
      willingToOperateInKansasCityMo:
        preQualification?.willingToOperateInKansasCityMo
    }
  }, [preQualification])

  const form = useForm<PreQualificationFormValue>({
    resolver: zodResolver(preQualificationSchema),
    mode: "onChange",
    values: defaultValues
  })

  // TODO: hide these complex logic like onSuccess into hooks
  const onConfirmed = useCallback(() => {
    mutate(
      {
        ...form.getValues(),
        loanProgramId: loanProgramId!
      },
      {
        onSuccess: async (response) => {
          if (response.data.isQualified) {
            // Create loan application after pass pre-qualification
            const res = await createLoanApplication({
              loanProgramId,
              loanAmount: 0,
              loanTermInMonth: 1,
              proposeUseOfLoan: "other",
              applicationId: response.data.applicationId
            })

            if (res.data) {
              dispatchFormAction({
                action: FORM_ACTION.UPDATE_DATA,
                key: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
                state: {
                  ...res.data,
                  applicationId: res.data.id
                }
              })
            }

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
    createLoanApplication,
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
                        disabled={!!preQualification?.applicationId?.length}
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
              disabled={!!preQualification?.applicationId?.length}
            />
            {!preQualification?.applicationId?.length && (
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
                  isLoading={isPending || isCreatingLoanApplication}
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
