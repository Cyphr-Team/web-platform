import {
  documentUploadsFormSchema,
  type DocumentUploadsFormValue
} from "../../../constants/form"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { ArrowRight } from "lucide-react"
import {
  useBRLoanApplicationDetailsContext,
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider.tsx"
import { useEffect, useMemo } from "react"
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
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { Button } from "@/components/ui/button.tsx"
import { FileUploadedCard } from "../../molecules/FileUploadedCard"

export function LaunchKCBusinessDocumentsForm() {
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()
  const { dispatchFormAction, documentUploadForm } =
    useLoanApplicationFormContext()
  const { businessDocumentsFormData } = useBRLoanApplicationDetailsContext()

  const defaultValues = useMemo(() => {
    return {
      id: documentUploadForm?.id ?? "",
      executiveSummary: documentUploadForm?.executiveSummary ?? [],
      pitchDeck: documentUploadForm?.pitchDeck ?? [],
      uploadedExecutiveSummary: businessDocumentsFormData?.executiveSummary
        ? [businessDocumentsFormData?.executiveSummary]
        : [],
      uploadedPitchDesk: businessDocumentsFormData?.pitchDeck
        ? [businessDocumentsFormData?.pitchDeck]
        : []
    }
  }, [documentUploadForm, businessDocumentsFormData])

  const form = useForm<DocumentUploadsFormValue>({
    resolver: zodResolver(documentUploadsFormSchema),
    mode: "onChange",
    defaultValues
  })

  const isFormValid =
    (form.getValues("executiveSummary").length > 0 ||
      !!form.getValues("uploadedExecutiveSummary")?.length) &&
    (form.getValues("pitchDeck").length > 0 ||
      !!form.getValues("uploadedPitchDesk")?.length)

  const handleSelectFile = (
    files: FileList,
    field: "executiveSummary" | "pitchDeck"
  ) => {
    // Replace the current file with the new file because we only allow one file
    form.setValue(field, Array.from(files), {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })

    // Remove the uploaded file if there is any
    if (field === "executiveSummary") {
      form.setValue("uploadedExecutiveSummary", null, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
    }
    if (field === "pitchDeck") {
      form.setValue("uploadedPitchDesk", null, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
    }
  }

  const handleRemoveFile = (
    index: number,
    field: "executiveSummary" | "pitchDeck"
  ) => {
    const currentFiles = form.getValues(field)

    const newFiles = currentFiles?.filter((_, i) => i !== index) ?? []

    form.setValue(field, newFiles, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  const removeDocument = (key: keyof DocumentUploadsFormValue) => () => {
    form.setValue(key, null, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  const onSubmit = (data: DocumentUploadsFormValue) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.LAUNCH_KC_BUSINESS_DOCUMENTS,
      state: data
    })

    finishCurrentStep()
  }

  useEffect(() => {
    if (form.formState.isValidating) {
      const data = form.getValues()

      dispatchFormAction({
        action: FORM_ACTION.SET_DATA,
        key: LOAN_APPLICATION_STEPS.LAUNCH_KC_BUSINESS_DOCUMENTS,
        state: data
      })
    }
  }, [form.formState.isValidating, form, dispatchFormAction])

  useAutoCompleteStepEffect(
    form,
    LOAN_APPLICATION_STEPS.LAUNCH_KC_BUSINESS_DOCUMENTS,
    isFormValid
  )

  const uploadedExecutiveSummary = form.getValues(
    "uploadedExecutiveSummary"
  )?.[0]
  const uploadedPitchDesk = form.getValues("uploadedPitchDesk")?.[0]

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
                      id="executiveSummary"
                      onFileSelect={(files) =>
                        handleSelectFile(files, "executiveSummary")
                      }
                    />
                    {!!form.getValues("executiveSummary").length &&
                      Array.from(form.getValues("executiveSummary")).map(
                        (file: File, index: number) => (
                          <FileUploadCard
                            key={index}
                            file={file}
                            handleRemoveFile={() =>
                              handleRemoveFile(index, "executiveSummary")
                            }
                            index={index}
                          />
                        )
                      )}
                    {!form.getValues("executiveSummary").length &&
                      !!uploadedExecutiveSummary && (
                        <FileUploadedCard
                          key={uploadedExecutiveSummary.id}
                          file={uploadedExecutiveSummary}
                          handleRemoveFile={removeDocument(
                            "uploadedExecutiveSummary"
                          )}
                        />
                      )}
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
                      id="pitchDeck"
                      multiple={false}
                      onFileSelect={(files) =>
                        handleSelectFile(files, "pitchDeck")
                      }
                    />
                    {!!form.getValues("pitchDeck").length &&
                      Array.from(form.getValues("pitchDeck")).map(
                        (file: File, index: number) => (
                          <FileUploadCard
                            key={index}
                            file={file}
                            handleRemoveFile={() =>
                              handleRemoveFile(index, "pitchDeck")
                            }
                            index={index}
                          />
                        )
                      )}
                    {!form.getValues("pitchDeck").length &&
                      !!uploadedPitchDesk && (
                        <FileUploadedCard
                          key={uploadedPitchDesk.id}
                          file={uploadedPitchDesk}
                          handleRemoveFile={removeDocument("uploadedPitchDesk")}
                        />
                      )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Card>

            {!isReviewApplicationStep(step) && (
              <Button
                disabled={!isFormValid}
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
