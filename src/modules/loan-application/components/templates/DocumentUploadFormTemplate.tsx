import { Card } from "@/components/ui/card.tsx"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form.tsx"
import { useForm } from "react-hook-form"

import { DragDropFileInput } from "@/shared/molecules/DragFileInput.tsx"
import { cn } from "@/lib/utils.ts"
import { useCallback, useEffect } from "react"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect.ts"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider.tsx"
import { FileUploadCard } from "@/modules/loan-application/components/molecules/FileUploadCard.tsx"
import { FileUploadedCard } from "@/modules/loan-application/components/molecules/FileUploadedCard.tsx"
import { infer as zodInfer, ZodObject, ZodTypeAny } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "@/components/ui/checkbox.tsx"
import { CheckedState } from "@radix-ui/react-checkbox"
import { get, remove, set } from "lodash"
import { DocumentUploadedResponse } from "@/modules/loan-application/constants/type.ts"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { toastError } from "@/utils"
import { useDeleteSbbDocument } from "@/modules/loan-application/hooks/useMutation/useDeleteSbbDocument.ts"
import { FormSubmitButton } from "@/modules/loan-application/components/atoms/FormSubmitButton"

/**
 * This implementation is only work on the schema like this
 * {
 *   name: File[]
 *   check: boolean | undefined
 * }
 * WITH THE EXACTLY ORDER. The file type first, the boolean type after
 * Because SBB Documents form is have the same schema, so I just handle these
 * case for simple.
 * TODO: make this template work with all type of schema like multiple file upload in singe form.
 * */
interface Props {
  title: string
  description: string
  hasCheckbox?: boolean
  checkboxLabel?: string
  schema: ZodObject<
    Record<string, ZodTypeAny>,
    "strip",
    ZodTypeAny,
    Record<string, string | File[] | DocumentUploadedResponse[] | boolean>,
    Record<string, string | File[] | DocumentUploadedResponse[] | boolean>
  >
  specificStep: LOAN_APPLICATION_STEPS
}

export const DocumentUploadFormTemplate = ({
  title,
  description,
  hasCheckbox = false,
  checkboxLabel,
  schema,
  specificStep
}: Props) => {
  // Define a new local type based on the schema
  type FormType = zodInfer<typeof schema>

  const { mutateAsync: deleteDocument } = useDeleteSbbDocument()

  const { finishCurrentStep, step } = useLoanApplicationProgressContext()
  const formState = useLoanApplicationFormContext()
  const { dispatchFormAction } = formState

  const [fileField, uploadedFileField, formIdField, checkboxField] =
    Object.keys(schema.shape)
  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    mode: "onChange",
    // TODO: move this to outside
    defaultValues: async () => {
      const data: FormType = {
        [fileField]: get(formState[specificStep], fileField, []),
        [formIdField]: get(formState[specificStep], formIdField, ""),
        [uploadedFileField]: get(formState[specificStep], uploadedFileField, [])
      }
      // if the checkboxField contain in form
      if (checkboxField !== undefined) {
        const hasDocuments = get(formState[specificStep], checkboxField, false)
        // set the checkbox field, if form has document, then checkbox is false
        // otherwise, set default is true.
        set(data, checkboxField, hasDocuments)
      }
      return data
    }
  })

  const filesValue = form.watch(fileField) as File[]
  const uploadedFiles = form.watch(
    uploadedFileField
  ) as DocumentUploadedResponse[]
  const checkboxValue =
    checkboxField !== undefined && (form.watch(checkboxField) as boolean)

  const handleSelectFile = useCallback(
    (field: keyof FormType) => (files: FileList) => {
      const currentFiles = form.getValues(field) as File[]
      const mergedFiles =
        files && currentFiles
          ? [...currentFiles, ...Array.from(files)]
          : Array.from(files)

      form.setValue(field, mergedFiles, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
    },
    [form]
  )

  const handleRemoveFile = useCallback(
    (index: number, field: keyof FormType) => () => {
      const currentFiles = form.getValues(field) as File[]
      const newFiles = currentFiles.filter((_: File, i: number) => i !== index)
      form.setValue(field, newFiles, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
    },
    [form]
  )

  const removeDocument = useCallback(
    (id: string) => {
      deleteDocument(
        { id },
        {
          onSuccess: () => {
            const newFiles = remove(
              uploadedFiles,
              (document) => document.id !== id
            )
            form.setValue(uploadedFileField, newFiles, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true
            })
          },
          onError: (error) => {
            toastError({
              title: error.name,
              description: error.message
            })
          }
        }
      )
    },
    [deleteDocument, form, uploadedFileField, uploadedFiles]
  )

  const onSubmit = (data: FormType) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: specificStep,
      state: data
    })

    finishCurrentStep()
  }

  useEffect(() => {
    if (form.formState.isValidating) {
      const data = form.getValues()
      /**
       *
       * */
      const updatedData = {
        // get the value from formValues, use string indexes because `checkboxField` can be different through form
        [checkboxField]: data[checkboxField],
        [formIdField]: data[formIdField],
        // get the value from checkbox, if checkbox is true, the filesField is empty, otherwise get the filesField
        [fileField]: data[checkboxField] ? [] : data[fileField],
        // same logic as above
        [uploadedFileField]: data[checkboxField] ? [] : data[uploadedFileField]
      }

      // if user tick not to upload document
      if (data[checkboxField]) {
        form.setValue(fileField, [])
        // delete all files on server
        uploadedFiles.forEach((file) => removeDocument(file.id))
        form.setValue(uploadedFileField, [])
      }

      dispatchFormAction({
        action: FORM_ACTION.SET_DATA,
        key: specificStep,
        state: updatedData
      })
    }
  }, [
    form.formState.isValidating,
    form,
    dispatchFormAction,
    specificStep,
    fileField,
    checkboxField,
    uploadedFileField,
    uploadedFiles,
    removeDocument,
    formIdField
  ])

  /**
   * Scenario 1: Has checkbox
   * - True if: FILES is not empty and CHECKBOX is false OR FILES is empty and CHECKBOX is true
   * Scenario 2: Does not have checkbox
   * - True if: FILES is not empty
   * */
  const isValid =
    uploadedFiles?.length > 0 ||
    (checkboxValue // check if this form has checkbox or not
      ? filesValue === undefined || filesValue?.length === 0 // case FILES is empty and CHECKBOX is true
      : filesValue !== undefined && filesValue?.length !== 0) // case FILES is not empty

  useAutoCompleteStepEffect(form, specificStep, isValid)

  return (
    <div
      className={cn(
        "flex flex-col gap-3xl overflow-auto col-span-8 mx-6",
        "md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-sm md:w-full"
      )}
    >
      <div className="flex flex-col gap-3xl overflow-auto">
        <Form {...form}>
          <Card className="flex flex-col gap-y-2xl p-4xl shadow-none">
            <div>
              <h4 className="text-lg font-semibold text-text-primary">
                {title}
              </h4>
              <p className="text-sm font-normal text-text-primary">
                {description}
              </p>
            </div>
            <FormField
              control={form.control}
              name={fileField}
              render={() => (
                <FormItem>
                  <DragDropFileInput
                    id={fileField}
                    onFileSelect={handleSelectFile(fileField)}
                  />
                  {Array.from((form.watch(fileField) as File[]) ?? []).map(
                    (file: File, index: number) => (
                      <FileUploadCard
                        key={file.name}
                        file={file}
                        index={index}
                        handleRemoveFile={handleRemoveFile(index, fileField)}
                      />
                    )
                  )}
                  {/* Display all files */}
                  {Array.from(
                    (form.watch(
                      uploadedFileField
                    ) as DocumentUploadedResponse[]) ?? []
                  ).map((val) => (
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

            {/* If the flag is on, and we can get the checkbox field name from schema */}
            {hasCheckbox && checkboxField && (
              <FormField
                control={form.control}
                name={checkboxField}
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <div className="flex gap-2 mt-1 items-center">
                        <Checkbox
                          checked={field.value as CheckedState}
                          onCheckedChange={field.onChange}
                          className="h-5 w-5"
                        />
                        <p className="text-xs text-text-primary">
                          {checkboxLabel}
                        </p>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            {!isReviewApplicationStep(step) && (
              <FormSubmitButton
                onSubmit={form.handleSubmit(onSubmit)}
                isDisabled={!isValid}
              />
            )}
          </Card>
        </Form>
      </div>
    </div>
  )
}
