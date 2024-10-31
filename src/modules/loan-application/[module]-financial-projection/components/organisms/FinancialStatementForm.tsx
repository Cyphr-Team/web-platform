import { Button } from "@/components/ui/button.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import {
  RHFDragAndDropFileUpload,
  RHFSelectInput
} from "@/modules/form-template/components/molecules"
import { RHFProvider } from "@/modules/form-template/providers"
import {
  FinancialStatementFormField,
  financialStatementFormSchema,
  type FinancialStatementFormValue
} from "@/modules/loan-application/[module]-financial-projection/components/store/financial-statement-store"
import {
  BINARY_VALUES,
  YES_NO_OPTIONS
} from "@/modules/loan-application/constants/form.ts"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect.ts"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider.tsx"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout"

interface FinancialStatementFormProps {
  wrapperClassName?: string
}

export function FinancialStatementForm({
  wrapperClassName
}: FinancialStatementFormProps) {
  const { step } = useLoanApplicationProgressContext()
  const { finishCurrentStep } = useLoanApplicationProgressContext()
  const { financialStatements, dispatchFormAction } =
    useLoanApplicationFormContext()

  const form = useForm({
    resolver: zodResolver(financialStatementFormSchema),
    defaultValues: {
      applicationId: financialStatements?.applicationId ?? "",
      files: financialStatements?.files ?? [],
      uploadedFiles: financialStatements?.uploadedFiles ?? [],
      hasDocument: financialStatements?.hasDocument,
      deletedFiles: financialStatements?.deletedFiles ?? []
    },
    mode: "onBlur",
    reValidateMode: "onBlur"
  })

  const { handleSubmit, watch } = form

  const onSubmit = (data: FinancialStatementFormValue) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.FINANCIAL_STATEMENTS,
      state: data
    })
    finishCurrentStep()
  }
  const isValid =
    form.formState.isValid &&
    (watch(FinancialStatementFormField.hasDocument) === BINARY_VALUES.YES
      ? watch(FinancialStatementFormField.uploadedFiles).length > 0 ||
        watch(FinancialStatementFormField.files).length > 0
      : true)

  const onRemoveUploadedDocument = (id: string) => {
    const currentUploadedFiles = watch(
      FinancialStatementFormField.uploadedFiles
    ).filter((file) => file.id !== id)

    form.setValue(
      FinancialStatementFormField.uploadedFiles,
      currentUploadedFiles,
      {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      }
    )
    const currentDeletedIds = [
      id,
      ...watch(FinancialStatementFormField.deletedFiles)
    ]

    form.setValue(FinancialStatementFormField.deletedFiles, currentDeletedIds, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  useAutoCompleteStepEffect(
    form,
    LOAN_APPLICATION_STEPS.FINANCIAL_STATEMENTS,
    isValid
  )

  return (
    <FormLayout cardClassName={wrapperClassName} title="Financial Statements">
      <RHFProvider
        key={LOAN_APPLICATION_STEPS.FINANCIAL_STATEMENTS}
        methods={form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-3xl">
          <div className="flex flex-col gap-y-4">
            <h4 className="text-lg font-semibold text-text-primary">
              Financial Statements
            </h4>
            <p className="text-sm font-normal financial-projection text-muted-foreground">
              Financial statements are essential for evaluating the overall
              health of your business. They provide a detailed view of your
              business’s profitability, stability, and cash flow and are usually
              created in your accounting software.
            </p>
          </div>

          <Separator />

          <RHFSelectInput
            isRowDirection
            label="Do you currently have financial statements?"
            name={FinancialStatementFormField.hasDocument}
            options={YES_NO_OPTIONS}
            styleProps={{
              inputClassName: "text-sm max-w-40",
              labelClassName: "text-text-primary",
              subtitleClassName: "text-xs font-normal"
            }}
            subtitle="Income statement (profit and loss), balance sheet, and/or cash flow statement."
          />

          {watch(FinancialStatementFormField.hasDocument) ===
          BINARY_VALUES.YES ? (
            <RHFDragAndDropFileUpload
              id={LOAN_APPLICATION_STEPS.FINANCIAL_STATEMENTS}
              name={FinancialStatementFormField.files}
              uploadedFiles={watch(FinancialStatementFormField.uploadedFiles)}
              version={2}
              onRemoveUploadedDocument={onRemoveUploadedDocument}
            />
          ) : null}

          {!isReviewApplicationStep(step) && (
            <Button disabled={!isValid}>Next</Button>
          )}
        </div>
      </RHFProvider>
    </FormLayout>
  )
}
