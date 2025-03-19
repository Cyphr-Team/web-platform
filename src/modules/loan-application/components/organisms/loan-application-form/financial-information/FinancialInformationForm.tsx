import { Card } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "@/components/ui/checkbox"
import { useForm } from "react-hook-form"
import {
  financialFormSchema,
  type FinancialFormValue
} from "../../../../constants/form"
import { DragDropFileInput } from "@/shared/molecules/DragFileInput"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "../../../../providers"
import { FileUploadCard } from "../../../molecules/FileUploadCard"
import { useQueryGetIncomeCategories } from "@/modules/loan-application/hooks/form-common/useQueryIncomeCategories"
import { capitalizeWords, isEnabledQuery } from "@/utils"
import { Loader2 } from "lucide-react"
import { FileUploadedCard } from "../../../molecules/FileUploadedCard"
import { RequiredSymbol } from "@/shared/atoms/RequiredSymbol"
import { cn } from "@/lib/utils"
import {
  DOCUMENT_ACTION,
  FORM_ACTION
} from "../../../../providers/LoanApplicationFormProvider"
import { useEffect, useMemo } from "react"
import { LOAN_APPLICATION_STEPS } from "../../../../models/LoanApplicationStep/type"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/utils/useAutoCompleteStepEffect.ts"
import { FormSubmitButton } from "../../../atoms/FormSubmitButton"

/**
 * @deprecated This component is deprecated and should not be used in the future.
 * Currently, it is being used for Capsight.
 */
export function FinancialInformationForm() {
  const { finishCurrentStep, step, progress } =
    useLoanApplicationProgressContext()
  const {
    financialInformationForm,
    documents,
    dispatchFormAction,
    dispatchDocumentAction
  } = useLoanApplicationFormContext()

  const defaultValues = useMemo(
    () => ({
      id: financialInformationForm?.id ?? "",
      incomeCategories: financialInformationForm?.incomeCategories ?? [],
      w2sFile: financialInformationForm?.w2sFile ?? []
    }),
    [financialInformationForm]
  )

  const form = useForm<FinancialFormValue>({
    resolver: zodResolver(financialFormSchema),
    values: defaultValues,
    mode: "onChange"
  })

  const incomeCategories = useQueryGetIncomeCategories(
    isEnabledQuery(LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION, progress)
  )

  const items = incomeCategories.data?.map((val) => ({
    id: val,
    label: capitalizeWords(val.replace(/_/g, "-"))
  }))

  const handleSelectFile = (files: FileList) => {
    const currentFiles = form.getValues("w2sFile")

    const mergedFiles =
      files && currentFiles
        ? [...currentFiles, ...Array.from(files)]
        : Array.from(files)

    form.setValue("w2sFile", mergedFiles, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  const handleRemoveFile = (index: number) => {
    const currentFiles = form.getValues("w2sFile")
    const newFiles = currentFiles.filter((_, i) => i !== index)

    form.setValue("w2sFile", newFiles, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  const removeDocument = (id: string) => {
    dispatchDocumentAction({
      action: DOCUMENT_ACTION.REMOVE_DATA,
      key: LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION,
      state: { id }
    })
  }

  const onSubmit = (data: FinancialFormValue) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION,
      state: data
    })

    finishCurrentStep()
  }

  useEffect(() => {
    if (form.formState.isValidating) {
      const data = form.getValues()

      dispatchFormAction({
        action: FORM_ACTION.SET_DATA,
        key: LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION,
        state: data
      })
    }
  }, [form.formState.isValidating, form, dispatchFormAction])

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION)

  return (
    <div
      className={cn(
        "col-span-8 mx-6 flex flex-col gap-3xl overflow-auto",
        "max-w-screen-sm md:col-span-6 md:col-start-2 md:mx-auto"
      )}
      id={LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION}
    >
      <Card
        className={cn(
          "flex h-fit flex-col gap-2xl rounded-lg p-4xl shadow-none"
        )}
      >
        <h5 className="text-lg font-semibold">Financial Information</h5>
        <Separator />
        <Form {...form}>
          <form className="flex flex-col gap-x-4xl gap-y-2xl">
            <FormItem>
              <FormLabel className="text-sm font-medium text-text-secondary">
                How do you make money? (Check all that apply)
                <RequiredSymbol />
              </FormLabel>
              {incomeCategories.isLoading ? (
                <p>
                  <Loader2 className="m-2 size-8 animate-spin text-primary transition-all ease-out" />
                </p>
              ) : (
                items?.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="incomeCategories"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-center space-x-lg space-y-0 "
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              className="size-5"
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    )
                              }}
                              {...field}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))
              )}

              <FormMessage />
            </FormItem>
            <div className="flex flex-col gap-y-sm">
              <p className="text-sm font-medium text-text-secondary">
                Connect your business accounts to report your cash flow and
                income
              </p>
              {/**
               * @deprecated This component is deprecated and should not be used in the future.
               */}
              {/*<ConnectPlaidButton />*/}
            </div>
          </form>
          <div className="flex flex-col gap-y-sm">
            <p className="text-sm font-medium text-text-secondary">
              Do you have any individual income to add? (if yes, upload W2s
              below)
            </p>
            <FormField
              control={form.control}
              name="w2sFile"
              render={() => (
                <FormItem>
                  <DragDropFileInput
                    id="w2sFile"
                    onFileSelect={handleSelectFile}
                  />
                  {form.getValues("w2sFile") &&
                    Array.from(form.getValues("w2sFile")).map(
                      (file: File, index: number) => (
                        <FileUploadCard
                          key={file.webkitRelativePath}
                          file={file}
                          handleRemoveFile={handleRemoveFile}
                          index={index}
                        />
                      )
                    )}
                  {!!documents.financialInformationForm?.length &&
                    documents.financialInformationForm.map((val) => (
                      <FileUploadedCard
                        key={val.id}
                        file={val}
                        handleRemoveFile={removeDocument}
                      />
                    ))}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {!isReviewApplicationStep(step) && (
            <FormSubmitButton
              isDisabled={!form.formState.isValid}
              onSubmit={form.handleSubmit(onSubmit)}
            />
          )}
        </Form>
      </Card>
    </div>
  )
}
