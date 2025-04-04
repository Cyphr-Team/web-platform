import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FieldType } from "@/modules/form-template/components/templates/FormTemplate"
import { RHFProvider } from "@/modules/form-template/providers"
import {
  EMPTY_EQUITY_FINANCING_ITEM,
  FP_EQUITY_FINANCING_DEFAULT_VALUE,
  FpEquityFinancingField,
  fpEquityFinancingFormSchema,
  type FpEquityFinancingFormValue
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-equity-store"
import EquityArrayFormTemplate from "@/modules/loan-application/[module]-financial-projection/components/templates/EquityArrayFormTemplate"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/utils/useAutoCompleteStepEffect.ts"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout"

const enum FieldName {
  NAME = "name",
  RECEIVED_DATE = "receivedDate",
  AMOUNT = "amount"
}

const blocks = [
  {
    name: FieldName.NAME,
    type: FieldType.TEXT,
    props: {
      label: "Enter name of equity investment:",
      placeholder: "Name of equity investment",
      isRowDirection: true,
      className: "flex-col w-full lg:flex-row lg:items-center justify-between",
      styleProps: {
        inputClassName: "min-w-72 w-full"
      },
      isHideErrorMessage: true
    }
  },
  {
    name: FieldName.RECEIVED_DATE,
    type: FieldType.MASK,
    props: {
      label: "Specify when equity investment will be received:",
      pattern: "00/0000",
      placeholder: "MM/YYYY",
      className: "flex-col w-full lg:flex-row lg:items-center justify-between",
      isRowDirection: true,
      styleProps: {
        inputClassName: "min-w-72"
      },
      isHideErrorMessage: true
    }
  },
  {
    name: FieldName.AMOUNT,
    type: FieldType.CURRENCY,
    props: {
      className: "flex-col w-full lg:flex-row lg:items-center justify-between",
      label: "Equity investment total amount:",
      isRowDirection: true,
      placeholder: "Equity investment total",
      prefixIcon: "$",
      styleProps: {
        inputClassName: "min-w-72 text-sm pl-7.5"
      },
      isHideErrorMessage: true,
      isAllowDisplayZero: true
    }
  }
]

export function EquityForm() {
  const { equity, dispatchFormAction } = useLoanApplicationFormContext()

  const form = useForm<FpEquityFinancingFormValue>({
    resolver: zodResolver(fpEquityFinancingFormSchema),
    mode: "onBlur",
    defaultValues: equity ?? FP_EQUITY_FINANCING_DEFAULT_VALUE
  })

  const { finishCurrentStep, step } = useLoanApplicationProgressContext()

  const onSubmit = form.handleSubmit((data) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.EQUITY,
      state: data
    })
    finishCurrentStep()
  })

  const onAutoSave = () => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.EQUITY,
      state: form.getValues()
    })
  }

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.EQUITY)

  return (
    <FormLayout title="Equity Financing">
      <div className="flex flex-col gap-4">
        <h5 className="text-lg font-semibold">Equity Financing</h5>
        <p className="financial-projection text-sm text-muted-foreground">
          Equity investment involves raising capital by selling shares of your
          business to investors. In exchange, these investors gain partial
          ownership and a share in future profits, allowing you to grow without
          incurring debt, but it also means sharing control and future earnings.
        </p>
      </div>

      <Separator />
      <RHFProvider methods={form} onSubmit={onSubmit}>
        <div className="mb-5 flex flex-col gap-6">
          <EquityArrayFormTemplate
            allowEmpty
            addIcon={<Plus />}
            blocks={blocks}
            dataName="Equity Financing"
            defaultEmptyObject={EMPTY_EQUITY_FINANCING_ITEM}
            fieldName={FpEquityFinancingField.equityFinancing}
            onBlur={onAutoSave}
          />
        </div>

        {!isReviewApplicationStep(step) && (
          <div className="mt-4 flex flex-col gap-2xl">
            <Button disabled={!form.formState.isValid}>Next</Button>
          </div>
        )}
      </RHFProvider>
    </FormLayout>
  )
}
