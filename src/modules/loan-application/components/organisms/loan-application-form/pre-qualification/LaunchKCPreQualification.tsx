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
import {
  type PreQualificationFormValue,
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
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout.tsx"

export function PreQualificationForm() {
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
    <FormLayout title="Pre-Qualification">
      <h5 className="text-lg font-semibold">Pre-Qualification</h5>
      <Separator />
      {isQualified ? (
        // TODO: move this out to a variable
        <Form {...form}>
          <form className="flex flex-col gap-x-4xl gap-y-2xl">
            {questions.map((question) => (
              <Controller
                key={question.field}
                control={form.control}
                name={question.field}
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between gap-2">
                    <FormLabel className="text-sm font-medium text-text-secondary">
                      {question.label}
                    </FormLabel>
                    <FormControl>
                      <Select
                        disabled={!!preQualification?.applicationId?.length}
                        value={field.value?.toString()}
                        onValueChange={(value) => {
                          field.onBlur()
                          field.onChange(value === "true")
                        }}
                      >
                        <SelectTrigger className="col-span-6 max-w-40 text-sm xl:col-span-2 xl:col-end-7 xl:ml-auto xl:max-w-40">
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
              key="willingToOperateInKansasCityMo"
              control={form.control}
              disabled={!!preQualification?.applicationId?.length}
              inputClassName="!max-w-full"
              label="Are you located in, or willing to establish an operating presence within the Kansas City, Missouri county lines for at least one year?"
              name="willingToOperateInKansasCityMo"
              options={options}
            />
            {!preQualification?.applicationId?.length && (
              <CustomAlertDialog
                actionClassName="bg-black hover:bg-black/80"
                cancelText="Go back"
                confirmText="Yes, submit"
                description="Once you hit submit, you will not be able to make any changes or modify your answers."
                title="Are you sure?"
                onConfirmed={onConfirmed}
              >
                <ButtonLoading
                  className=" bg-primary text-white hover:bg-primary/80 hover:text-white"
                  disabled={!form.formState.isValid}
                  isLoading={isPending || isCreatingLoanApplication}
                  variant="outline"
                >
                  Submit
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
    </FormLayout>
  )
}
