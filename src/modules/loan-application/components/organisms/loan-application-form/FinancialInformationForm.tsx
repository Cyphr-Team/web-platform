import { Card } from "@/components/ui/card"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "@/components/ui/checkbox"
import { useForm } from "react-hook-form"
import {
  FinancialFormValue,
  financialFormSchema
} from "../../../constants/form"
import { Button } from "@/components/ui/button"
import { DragDropFileInput } from "@/shared/molecules/DragFileInput"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "../../../providers"
import { ConnectPlaidButton } from "../../molecules/ConnectPlaidButton"
import { FileUploadCard } from "../../molecules/FileUploadCard"
import { useQueryGetIncomeCategories } from "../../../hooks/useQuery/useQueryIncomeCategories"
import { capitalizeWords } from "@/utils"
import { ArrowRight, Loader2 } from "lucide-react"
import { FileUploadedCard } from "../../molecules/FileUploadedCard"
import { RequiredSymbol } from "@/shared/atoms/RequiredSymbol"
import { cn } from "@/lib/utils"
import {
  DOCUMENT_ACTION,
  FORM_ACTION
} from "../../../providers/LoanApplicationFormProvider"
import { useEffect } from "react"
import { LOAN_APPLICATION_STEPS } from "../../../models/LoanApplicationStep/type"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect"

export const FinancialInformationForm = () => {
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()
  const {
    financialInformationForm,
    documents,
    dispatchFormAction,
    dispatchDocumentAction
  } = useLoanApplicationFormContext()
  const form = useForm<FinancialFormValue>({
    resolver: zodResolver(financialFormSchema),
    defaultValues: {
      id: financialInformationForm?.id ?? "",
      incomeCategories: financialInformationForm?.incomeCategories ?? [],
      w2sFile: financialInformationForm?.w2sFile ?? []
    },
    mode: "onChange"
  })

  const incomeCategories = useQueryGetIncomeCategories()
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
        "flex flex-col gap-3xl overflow-auto col-span-8 mx-6",
        "md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-sm"
      )}
      id={LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION}
    >
      <Card className={cn("flex flex-col gap-2xl p-4xl rounded-lg h-fit")}>
        <h5 className="text-lg font-semibold">Financial Information</h5>
        <Separator />
        <Form {...form}>
          <form className="flex flex-col gap-y-2xl gap-x-4xl">
            <FormItem>
              <FormLabel className="text-sm text-text-secondary font-medium">
                How do you make money? (Check all that apply)
                <RequiredSymbol />
              </FormLabel>
              {incomeCategories.isLoading ? (
                <p>
                  <Loader2 className="m-2 h-8 w-8 transition-all ease-out animate-spin text-primary" />
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
                              className="w-5 h-5"
                              checked={field.value?.includes(item.id)}
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
              <p className="text-sm text-text-secondary font-medium">
                Connect your business accounts to report your cash flow and
                income
              </p>
              <ConnectPlaidButton />
            </div>
          </form>
          <div className="flex flex-col gap-y-sm">
            <p className="text-sm text-text-secondary font-medium">
              Do you have any individual income to add? (if yes, upload W2s
              below)
            </p>
            <FormField
              control={form.control}
              name="w2sFile"
              render={() => (
                <FormItem>
                  <DragDropFileInput onFileSelect={handleSelectFile} />
                  {form.getValues("w2sFile") &&
                    Array.from(form.getValues("w2sFile")).map(
                      (file: File, index: number) => (
                        <FileUploadCard
                          key={index}
                          file={file}
                          index={index}
                          handleRemoveFile={handleRemoveFile}
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
            <Button
              disabled={!form.formState.isValid}
              onClick={form.handleSubmit(onSubmit)}
            >
              Next <ArrowRight className="ml-1 w-4" />
            </Button>
          )}
        </Form>
      </Card>
    </div>
  )
}
