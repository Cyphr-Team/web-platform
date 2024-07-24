import {
  documentUploadsFormSchema,
  DocumentUploadsFormValue
} from "../../../constants/form"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { ArrowRight } from "lucide-react"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  DOCUMENT_ACTION,
  FORM_ACTION
} from "@/modules/loan-application/providers/LoanApplicationFormProvider.tsx"
import { useEffect } from "react"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect.ts"
import { cn } from "@/lib/utils.ts"
import { Card } from "@/components/ui/card.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import {
  Form,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form.tsx"
import { DragDropFileInput } from "@/shared/molecules/DragFileInput.tsx"
import { FileUploadCard } from "@/modules/loan-application/components/molecules/FileUploadCard.tsx"
import { FileUploadedCard } from "@/modules/loan-application/components/molecules/FileUploadedCard.tsx"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { Button } from "@/components/ui/button.tsx"

export const DocumentUploadsForm = () => {
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()
  const { documents, dispatchFormAction, dispatchDocumentAction } =
    useLoanApplicationFormContext()
  const form = useForm<DocumentUploadsFormValue>({
    resolver: zodResolver(documentUploadsFormSchema),
    mode: "onChange"
  })

  const handleSelectFile = (
    files: FileList,
    field: keyof DocumentUploadsFormValue
  ) => {
    const currentFiles = form.getValues(field)

    const mergedFiles =
      files && currentFiles
        ? [...currentFiles, ...Array.from(files)]
        : Array.from(files)

    form.setValue(field, mergedFiles, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  const handleRemoveFile = (
    index: number,
    field: keyof DocumentUploadsFormValue
  ) => {
    const currentFiles = form.getValues(field)
    const newFiles = currentFiles.filter((_, i) => i !== index)
    form.setValue(field, newFiles, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  const removeDocument = (id: string) => {
    dispatchDocumentAction({
      action: DOCUMENT_ACTION.REMOVE_DATA,
      key: LOAN_APPLICATION_STEPS.DOCUMENT_UPLOADS,
      state: { id }
    })
  }

  const onSubmit = (data: DocumentUploadsFormValue) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.DOCUMENT_UPLOADS,
      state: data
    })

    finishCurrentStep()
  }

  useEffect(() => {
    if (form.formState.isValidating) {
      const data = form.getValues()
      dispatchFormAction({
        action: FORM_ACTION.SET_DATA,
        key: LOAN_APPLICATION_STEPS.DOCUMENT_UPLOADS,
        state: data
      })
    }
  }, [form.formState.isValidating, form, dispatchFormAction])

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.DOCUMENT_UPLOADS)

  return (
    <div
      className={cn(
        "flex flex-col gap-3xl overflow-auto col-span-8 mx-6",
        "md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-sm md:w-full"
      )}
    >
      <div className="flex flex-col gap-3xl overflow-auto">
        <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit">
          <h5 className="text-lg font-semibold">Document Uploads</h5>
          <Separator />
          <Form {...form}>
            <Card className="flex flex-col gap-y-2xl p-4xl">
              <h4 className="text-lg font-semibold">Executive Summary</h4>
              <p className="text-sm text-text-secondary font-medium">
                Upload a copy of your latest Executive Summary
              </p>
              <FormField
                control={form.control}
                name="executiveSummary"
                render={() => (
                  <FormItem>
                    <DragDropFileInput
                      onFileSelect={(files) =>
                        handleSelectFile(files, "executiveSummary")
                      }
                    />
                    {form.getValues("executiveSummary") &&
                      Array.from(form.getValues("executiveSummary")).map(
                        (file: File, index: number) => (
                          <FileUploadCard
                            key={index}
                            file={file}
                            index={index}
                            handleRemoveFile={() =>
                              handleRemoveFile(index, "executiveSummary")
                            }
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
            </Card>
            <Card className="flex flex-col gap-y-2xl p-4xl">
              <h4 className="text-lg font-semibold">Pitch Deck</h4>
              <p className="text-sm text-text-secondary font-medium">
                Upload a copy of your most recent Pitch Deck
              </p>
              <FormField
                control={form.control}
                name="pitchDeck"
                render={() => (
                  <FormItem>
                    <DragDropFileInput
                      onFileSelect={(files) =>
                        handleSelectFile(files, "pitchDeck")
                      }
                    />
                    {form.getValues("pitchDeck") &&
                      Array.from(form.getValues("pitchDeck")).map(
                        (file: File, index: number) => (
                          <FileUploadCard
                            key={index}
                            file={file}
                            index={index}
                            handleRemoveFile={() =>
                              handleRemoveFile(index, "pitchDeck")
                            }
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
            </Card>

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
    </div>
  )
}
