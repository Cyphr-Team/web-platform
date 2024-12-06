import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form.tsx"
import { useForm } from "react-hook-form"

import { DragDropFileInput } from "@/shared/molecules/DragFileInput.tsx"
import { useCallback, useEffect } from "react"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/utils/useAutoCompleteStepEffect.ts"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider.tsx"
import { FileUploadCard } from "@/modules/loan-application/components/molecules/FileUploadCard.tsx"
import { FileUploadedCard } from "@/modules/loan-application/components/molecules/FileUploadedCard.tsx"
import { type infer as zodInfer, type ZodObject, type ZodTypeAny } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "@/components/ui/checkbox.tsx"
import { type CheckedState } from "@radix-ui/react-checkbox"
import { get, remove, set } from "lodash"
import { type DocumentUploadedResponse } from "@/modules/loan-application/constants/type.ts"
import { type LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { toastError } from "@/utils"
import { useDeleteSbbDocument } from "@/modules/loan-application/hooks/form-document/useDeleteSbbDocument.ts"
import { FormSubmitButton } from "@/modules/loan-application/components/atoms/FormSubmitButton"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout.tsx"

type BaseFormValue = string | File[] | DocumentUploadedResponse[] | boolean

type BaseUploadFormSchema = ZodObject<
  Record<string, ZodTypeAny>,
  "strip",
  ZodTypeAny,
  Record<string, BaseFormValue>,
  Record<string, BaseFormValue>
>

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
interface DocumentUploadFormTemplateProps {
  title: string
  description: string
  hasCheckbox?: boolean
  checkboxLabel?: string
  schema: BaseUploadFormSchema
  specificStep: LOAN_APPLICATION_STEPS
  isMultiple?: false
}

export function DocumentUploadFormTemplate({
  title,
  description,
  hasCheckbox = false,
  checkboxLabel,
  schema,
  specificStep
}: DocumentUploadFormTemplateProps) {
  // Define a new local type based on the schema
  type FormType = zodInfer<typeof schema>

  const { mutateAsync: deleteDocument } = useDeleteSbbDocument()

  const { finishCurrentStep, step } = useLoanApplicationProgressContext()
  const formState = useLoanApplicationFormContext()
  const { dispatchFormAction } = formState

  const [
    fileField,
    uploadedFileField,
    deleteFilesField,
    formIdField,
    checkboxField
  ] = Object.keys(schema.shape)
  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    mode: "onChange",
    // TODO: move this to outside
    defaultValues: async () => {
      const data: FormType = {
        [fileField]: get(formState[specificStep], fileField, []),
        [formIdField]: get(formState[specificStep], formIdField, ""),
        [uploadedFileField]: get(
          formState[specificStep],
          uploadedFileField,
          []
        ),
        [deleteFilesField]: get(formState[specificStep], deleteFilesField, [])
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
  const formIdValue = form.watch(formIdField) as string

  const removeDocument = useCallback(
    (id: string) =>
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
      ),
    [deleteDocument, form, uploadedFileField, uploadedFiles]
  )

  const handleSelectFile = useCallback(
    (field: keyof FormType) => (files: FileList) => {
      // delete uploadedFiles
      uploadedFiles?.map((file) => removeDocument(file.id))

      form.setValue(uploadedFileField, [])
      form.setValue(field, [files[0]])
      if (checkboxField) {
        form.setValue(checkboxField, false)
      }

      dispatchFormAction({
        action: FORM_ACTION.SET_DATA,
        key: specificStep,
        state: form.getValues()
      })
    },
    [
      checkboxField,
      dispatchFormAction,
      form,
      removeDocument,
      specificStep,
      uploadedFileField,
      uploadedFiles
    ]
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
      const updatedData = {
        // get the value from formValues, use string indexes because `checkboxField` can be different through form
        [checkboxField]: checkboxValue,
        [formIdField]: formIdValue,
        [fileField]: checkboxValue ? [] : filesValue,
        [uploadedFileField]: checkboxValue ? [] : uploadedFileField
      }

      if (checkboxField) {
        const oldLength = get(formState[specificStep], fileField, [])?.length

        if (oldLength === filesValue?.length) {
          form.setValue(fileField, [])
        }
      }

      // if user tick not to upload document
      if (checkboxValue && uploadedFiles?.length > 0) {
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
    formIdField,
    filesValue,
    checkboxValue,
    formIdValue,
    formState
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
    <FormLayout title={title}>
      <div className="flex flex-col gap-3xl overflow-auto">
        <Form {...form}>
          <div>
            <h4 className="text-lg font-semibold text-text-primary">{title}</h4>
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
                {filesValue?.length > 0 ? (
                  <FileUploadCard
                    key={filesValue[0].name}
                    file={filesValue[0]}
                    handleRemoveFile={handleRemoveFile(0, fileField)}
                    index={0}
                    version={2}
                  />
                ) : null}
                {/* Display all files */}
                {Array.from(uploadedFiles ?? []).map((val) => (
                  <FileUploadedCard
                    key={val.id}
                    file={val}
                    handleRemoveFile={removeDocument}
                    version={2}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* If the flag is on, and we can get the checkbox field name from schema */}
          {hasCheckbox && checkboxField ? (
            <FormField
              control={form.control}
              name={checkboxField}
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <div className="mt-1 flex items-center gap-2">
                      <Checkbox
                        checked={field.value as CheckedState}
                        className="size-5"
                        onCheckedChange={field.onChange}
                      />
                      <p className="text-xs text-text-primary">
                        {checkboxLabel}
                      </p>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          ) : null}

          {!isReviewApplicationStep(step) && (
            <FormSubmitButton
              isDisabled={!isValid}
              onSubmit={form.handleSubmit(onSubmit)}
            />
          )}
        </Form>
      </div>
    </FormLayout>
  )
}
