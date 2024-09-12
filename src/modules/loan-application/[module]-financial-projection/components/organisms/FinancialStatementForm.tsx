import { cn } from "@/lib/utils.ts"
import { Card } from "@/components/ui/card.tsx"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { Button } from "@/components/ui/button.tsx"
import { ArrowRight } from "lucide-react"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { object, string } from "zod"
import {
  YES_NO_OPTIONS,
  ZodFileTypeFactory
} from "@/modules/loan-application/constants/form.ts"
import { useForm } from "react-hook-form"
import { DocumentUploadedResponse } from "@/modules/loan-application/constants/type.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider.tsx"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect.ts"
import { RHFProvider } from "@/modules/form-template/providers"
import {
  RHFDragAndDropFileUpload,
  RHFSelectInput
} from "@/modules/form-template/components/molecules"
import { Separator } from "@/components/ui/separator.tsx"

export interface FinancialStatementFormValues {
  id?: string
  files: File[]
  hasDocument?: string
  uploadedFiles?: DocumentUploadedResponse[]
}

const financialStatementFormSchema = object({
  id: string().optional(),
  hasDocument: string().optional(),
  files: ZodFileTypeFactory(),
  uploadedFiles: ZodFileTypeFactory().optional()
})

export const FinancialStatementForm = () => {
  const { step } = useLoanApplicationProgressContext()
  const { finishCurrentStep } = useLoanApplicationProgressContext()
  const { financialStatements, dispatchFormAction } =
    useLoanApplicationFormContext()

  const form = useForm({
    resolver: zodResolver(financialStatementFormSchema),
    defaultValues: {
      id: financialStatements?.id ?? "",
      files: financialStatements?.files ?? [],
      uploadedFiles: financialStatements?.uploadedFiles ?? [],
      hasDocument: financialStatements?.hasDocument
    }
  })

  const {
    handleSubmit,
    watch,
    formState: { isValid }
  } = form

  const onSubmit = (data: FinancialStatementFormValues) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.FINANCIAL_STATEMENTS,
      state: data
    })
    finishCurrentStep()
  }

  useAutoCompleteStepEffect(
    form,
    LOAN_APPLICATION_STEPS.FINANCIAL_STATEMENTS,
    watch("hasDocument") === "yes" ? watch("files").length > 0 : true
  )

  return (
    <div
      className={cn(
        "flex flex-col gap-3xl overflow-auto col-span-8 mx-6",
        "md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-sm md:w-full"
      )}
    >
      <RHFProvider
        key={LOAN_APPLICATION_STEPS.FINANCIAL_STATEMENTS}
        methods={form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-3xl overflow-auto">
          <Card className="flex flex-col gap-y-2xl p-4xl shadow-none">
            <div className="flex flex-col gap-y-4">
              <h4 className="text-lg font-semibold text-text-primary">
                Financial Statements
              </h4>
              <p className="text-sm font-normal text-text-primary">
                Financial statements are essential for evaluating the overall
                health of your business. They provide a detailed view of your
                business’s profitability, stability, and cash flow and are
                usually created in your accounting software.
              </p>
            </div>

            <Separator />

            <RHFSelectInput
              name="hasDocument"
              options={YES_NO_OPTIONS}
              label="Do you currently have financial statements?"
              subtitle="Income statement (profit and loss), balance sheet, and/or cash flow statement"
              isRowDirection
              styleProps={{
                inputClassName: "text-sm max-w-40",
                labelClassName: "text-text-primary",
                subtitleClassName: "text-xs font-normal"
              }}
            />

            {watch("hasDocument") === "yes" ? (
              <RHFDragAndDropFileUpload
                id={LOAN_APPLICATION_STEPS.FINANCIAL_STATEMENTS}
                name="files"
                uploadedFiles={watch("uploadedFiles")}
              />
            ) : null}

            {!isReviewApplicationStep(step) && (
              <Button disabled={!isValid}>
                Next <ArrowRight className="ml-1 w-4" />
              </Button>
            )}
          </Card>
        </div>
      </RHFProvider>
    </div>
  )
}
