import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import {
  RHFCurrencyInput,
  RHFNumberInput,
  RHFSelectInput,
  RHFTextInput
} from "@/modules/form-template/components/molecules"
import {
  BINARY_VALUES,
  type ICurrentLoanFormValue,
  YES_NO_OPTIONS
} from "@/modules/loan-application/constants/form.ts"
import { RHFProvider } from "@/modules/form-template/providers"
import {
  type FieldArrayWithId,
  type FieldValues,
  type Noop,
  useFieldArray,
  useForm
} from "react-hook-form"
import * as z from "zod"
import { createNumberSchema } from "@/constants/validate.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { Button } from "@/components/ui/button.tsx"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { Card } from "@/components/ui/card.tsx"
import { X } from "lucide-react"
import { type RHFTextInputProps } from "@/modules/form-template/components/molecules/RHFTextInput.tsx"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider.tsx"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/utils/useAutoCompleteStepEffect.ts"
import { memo } from "react"

const enum FormFields {
  Id = "id",
  LoanApplicationId = "loanApplicationId",
  HasOutstandingLoans = "hasOutstandingLoans",
  CurrentLoans = "currentLoans"
}

const enum FormItemFields {
  Id = "id",
  LenderName = "lenderName",
  LoanType = "loanType",
  OutstandingLoanBalance = "outstandingLoanBalance",
  MonthlyPaymentAmount = "monthlyPaymentAmount",
  LoanTermRemainingInMonths = "loanTermRemainingInMonths",
  AnnualInterestRate = "annualInterestRate"
}

export const currentLoansFormSchema = z
  .object({
    [FormFields.Id]: z.string().optional(),
    [FormFields.LoanApplicationId]: z.string().nullable(),
    [FormFields.HasOutstandingLoans]: z
      .string()
      .min(1, { message: "This field is required" }),
    [FormFields.CurrentLoans]: z.array(
      z.object({
        [FormItemFields.Id]: z.string().optional(),
        [FormItemFields.LenderName]: z
          .string()
          .min(1, { message: "Lender name is required" }),
        [FormItemFields.LoanType]: z
          .string()
          .min(1, { message: "Loan type is required" }),
        [FormItemFields.OutstandingLoanBalance]: createNumberSchema({
          coerce: true,
          min: 0,
          customErrors: {
            required: "Balance must be higher than 0"
          }
        }),
        [FormItemFields.MonthlyPaymentAmount]: createNumberSchema({
          coerce: true,
          min: 0,
          customErrors: {
            required: "Payment must be higher than 0"
          }
        }),
        [FormItemFields.LoanTermRemainingInMonths]: createNumberSchema({
          coerce: true,
          min: 0,
          customErrors: {
            required: "Payment must be higher than 0"
          }
        }),
        [FormItemFields.AnnualInterestRate]: createNumberSchema({
          coerce: true,
          min: 0.01,
          max: 50,
          customErrors: {
            invalidType: "Interest rate must not be blank",
            min: "Interest rate must be higher than 0.01",
            max: "Interest rate must not be higher than 50"
          }
        })
      })
    )
  })
  .refine((context) => {
    if (context[FormFields.HasOutstandingLoans] === BINARY_VALUES.NO) {
      return true
    }

    return context[FormFields.CurrentLoans]?.length > 0
  })

export type CurrentLoanFormsV2Value = z.infer<typeof currentLoansFormSchema>

export function CurrentLoanFormV2() {
  const { finishCurrentStep, completeCurrentStep, step } =
    useLoanApplicationProgressContext()
  const { dispatchFormAction, currentLoansForm, loanRequest } =
    useLoanApplicationFormContext()
  const methods = useForm<CurrentLoanFormsV2Value>({
    resolver: zodResolver(currentLoansFormSchema),
    mode: "onBlur",
    defaultValues: getOrDefault({
      ...currentLoansForm,
      loanApplicationId:
        currentLoansForm?.loanApplicationId ?? loanRequest?.applicationId ?? ""
    })
  })

  const { watch, control, getValues, setValue, handleSubmit } = methods
  const { fields, append, remove } = useFieldArray({
    control,
    name: FormFields.CurrentLoans
  })

  const handleFetchToProvider = (data: CurrentLoanFormsV2Value) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.CURRENT_LOANS,
      state: data
    })
  }

  const handleAddLoanFormItem = () => {
    append({
      [FormItemFields.Id]: "",
      [FormItemFields.AnnualInterestRate]: 0,
      [FormItemFields.LenderName]: "",
      [FormItemFields.LoanTermRemainingInMonths]: 0,
      [FormItemFields.LoanType]: "",
      [FormItemFields.MonthlyPaymentAmount]: 0,
      [FormItemFields.OutstandingLoanBalance]: 0
    })
  }

  const onRemove = (index: number) => () => {
    remove(index)
    handleFetchToProvider(getValues())
  }

  const onSubmit = (validData: CurrentLoanFormsV2Value) => {
    handleFetchToProvider(validData)
    finishCurrentStep()
  }

  useAutoCompleteStepEffect(methods, LOAN_APPLICATION_STEPS.CURRENT_LOANS)

  return (
    <FormLayout title="Current Loans">
      <div className="text-lg font-semibold">Current Loans</div>
      <Separator />

      <RHFProvider
        className="flex flex-col gap-3xl"
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
      >
        <RHFSelectInput
          isRowDirection
          label="Does your business currently have outstanding loans?"
          name={FormFields.HasOutstandingLoans}
          options={YES_NO_OPTIONS}
          selectProps={{
            onValueChange(value: string) {
              setValue(FormFields.HasOutstandingLoans, value)
              if (value === BINARY_VALUES.YES) {
                handleAddLoanFormItem()
              }
              if (value === BINARY_VALUES.NO) {
                setValue(FormFields.CurrentLoans, [])
              }
              handleFetchToProvider(getValues())
              completeCurrentStep()
            }
          }}
          styleProps={{
            inputClassName: "max-w-40",
            labelClassName: "font-bold",
            subtitleClassName: "font-normal"
          }}
          subtitle="(ex: term loan, revolving credit, equipment financing, etc.)"
        />

        {watch(FormFields.HasOutstandingLoans) === BINARY_VALUES.YES ? (
          <>
            {fields.map((source, index) => (
              <LoanFormItemV2
                key={source.id}
                index={index}
                value={source}
                onRemove={onRemove}
              />
            ))}
            <Button
              className="w-fit self-end"
              type="button"
              variant="outline"
              onClick={handleAddLoanFormItem}
            >
              + Add loan
            </Button>
          </>
        ) : null}

        {!isReviewApplicationStep(step) ? (
          <div className="flex flex-col gap-2xl">
            <Button disabled={!methods.formState.isValid} type="submit">
              Next
            </Button>
          </div>
        ) : null}
      </RHFProvider>
    </FormLayout>
  )
}

interface LoanFormItemV2Props {
  index: number
  onRemove: (index: number) => Noop
  value: FieldArrayWithId<CurrentLoanFormsV2Value, "currentLoans">
}

const LoanFormItemV2 = memo(function LoanFormItemV2(
  props: LoanFormItemV2Props
) {
  const { onRemove, index, value } = props
  const styleProps: RHFTextInputProps<FieldValues>["styleProps"] = {
    inputClassName: "min-w-60",
    subtitleClassName: "opacity-90 font-normal"
  }

  return (
    <Card
      className="flex h-fit flex-col gap-xl overflow-auto rounded-lg p-3xl"
      id={value.id}
    >
      <div className="flex justify-between">
        <div className="font-semibold uppercase">loan #{index + 1}</div>
        <Button
          className="ml-auto mr-0 flex h-auto p-0"
          type="button"
          variant="ghost"
          onClick={onRemove(index)}
        >
          <X className="w-8" />
        </Button>
      </div>

      <RHFTextInput
        isRowDirection
        label="Lender name"
        name={`${FormFields.CurrentLoans}.${index}.${FormItemFields.LenderName}`}
        styleProps={{
          ...styleProps
        }}
        subtitle="The lender who issued the loan"
      />
      <RHFTextInput
        isRowDirection
        label="Loan type"
        name={`${FormFields.CurrentLoans}.${index}.${FormItemFields.LoanType}`}
        styleProps={{
          ...styleProps
        }}
        subtitle="i.e: a term loan, revolving credit, etc."
      />
      <RHFCurrencyInput
        isHideErrorMessage
        isRowDirection
        label="Remaining loan balance"
        name={`${FormFields.CurrentLoans}.${index}.${FormItemFields.OutstandingLoanBalance}`}
        prefixIcon={<div className="opacity-70">$</div>}
        styleProps={{
          ...styleProps
        }}
        subtitle="Current outstanding loan amount"
      />
      <RHFCurrencyInput
        isHideErrorMessage
        isRowDirection
        label="Monthly payment amount"
        name={`${FormFields.CurrentLoans}.${index}.${FormItemFields.MonthlyPaymentAmount}`}
        prefixIcon={<div className="opacity-70">$</div>}
        styleProps={{
          ...styleProps
        }}
        subtitle="Amount of payment made monthly"
      />
      <RHFNumberInput
        isRowDirection
        label="Loan term remaining (in months)"
        name={`${FormFields.CurrentLoans}.${index}.${FormItemFields.LoanTermRemainingInMonths}`}
        styleProps={{
          ...styleProps
        }}
        subtitle="Remaining duration of the loan"
        suffixIcon="months"
      />
      <RHFNumberInput
        isRowDirection
        label="Annual interest rate"
        name={`${FormFields.CurrentLoans}.${index}.${FormItemFields.AnnualInterestRate}`}
        styleProps={{
          ...styleProps
        }}
        subtitle="The interest rate charged yearly"
      />
    </Card>
  )
})

function getOrDefault(value: ICurrentLoanFormValue): CurrentLoanFormsV2Value {
  return {
    [FormFields.Id]: value?.id ?? "",
    [FormFields.LoanApplicationId]: value?.loanApplicationId ?? "",
    [FormFields.HasOutstandingLoans]: value?.hasOutstandingLoans,
    [FormFields.CurrentLoans]: value?.currentLoans ?? []
  }
}
