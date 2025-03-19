import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form.tsx"
import { useForm } from "react-hook-form"
import { DragDropFileInput } from "@/shared/molecules/DragFileInput.tsx"
import { useCallback } from "react"
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
import { get } from "lodash"
import { type DocumentUploadedResponse } from "@/modules/loan-application/constants/type.ts"
import { type LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { FormSubmitButton } from "@/modules/loan-application/components/atoms/FormSubmitButton"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout.tsx"
import { toastError } from "@/utils"

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

export function DocumentUploadFormV2Template({
  title,
  description,
  hasCheckbox = false,
  checkboxLabel,
  schema,
  specificStep,
  isMultiple = false
}: DocumentUploadFormTemplateProps) {
  // Local type based on the schema
  type FormType = zodInfer<typeof schema>
  // Get fieldNames based on Schema
  const [
    filesField,
    uploadedFileField,
    deleteFilesField,
    formIdField,
    isOptionalField
  ] = Object.keys(schema.shape)

  // Provider logic
  const { dispatchFormAction, [specificStep]: formProviderData } =
    useLoanApplicationFormContext()
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()

  // Form logic
  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      [filesField]: get(formProviderData, filesField, []),
      [formIdField]: get(formProviderData, formIdField, ""),
      [uploadedFileField]: get(formProviderData, uploadedFileField, []),
      [deleteFilesField]: get(formProviderData, deleteFilesField, []),
      [isOptionalField]: get(formProviderData, isOptionalField, false)
    }
  })

  function getFormValue<T>(fieldName: string): T {
    return form.watch(fieldName) as T
  }

  const setFormValue = useCallback(
    async function (fieldName: string, fieldValue: BaseFormValue) {
      form.setValue(fieldName, fieldValue, {
        shouldDirty: true,
        shouldTouch: true
      })

      await form.trigger()
    },
    [form]
  )

  const filesValue = getFormValue<File[]>(filesField)
  const deleteFiles = getFormValue<DocumentUploadedResponse[]>(deleteFilesField)
  const uploadedFiles =
    getFormValue<DocumentUploadedResponse[]>(uploadedFileField)
  const checkboxValue = isOptionalField
    ? getFormValue<boolean>(isOptionalField)
    : false

  const displayedFiles = uploadedFiles?.filter(
    (document) =>
      !deleteFiles?.find?.((deleteFile) => deleteFile.id === document.id)
  )

  const removeDocument = useCallback(
    (id: string) => {
      const isIncludeRemove = deleteFiles.find((document) => document.id === id)

      if (isIncludeRemove) return

      const fileToRemove = uploadedFiles.find((document) => document.id === id)

      if (!fileToRemove) {
        return toastError({
          title: "Internal error",
          description: "File not found"
        })
      }

      setFormValue(deleteFilesField, [...deleteFiles, fileToRemove])
    },
    [deleteFilesField, deleteFiles, setFormValue, uploadedFiles]
  )

  const handleSelectFile = useCallback(
    (files: FileList) => {
      if (isOptionalField) {
        setFormValue(isOptionalField, false)
      }

      if (!isMultiple) {
        uploadedFiles?.forEach((file) => removeDocument(file.id))
      }

      setFormValue(
        filesField,
        isMultiple ? [...filesValue, files[0]] : [files[0]]
      )
    },
    [
      isOptionalField,
      isMultiple,
      setFormValue,
      filesField,
      filesValue,
      uploadedFiles,
      removeDocument
    ]
  )

  const handleRemoveToBeUploadedFile = useCallback(
    (index: number) => () => {
      const newFilesValue = [...filesValue]

      newFilesValue.splice(index, 1)

      setFormValue(filesField, newFilesValue)
    },
    [filesField, filesValue, setFormValue]
  )

  const handleCheckOptional = useCallback(
    (check: CheckedState) => {
      setFormValue(deleteFilesField, uploadedFiles)
      setFormValue(filesField, [])
      setFormValue(isOptionalField, check)
    },
    [deleteFilesField, filesField, isOptionalField, setFormValue, uploadedFiles]
  )

  const onSubmit = form.handleSubmit((data: FormType) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: specificStep,
      state: data
    })
    finishCurrentStep()
  })

  const isValid = checkboxValue
    ? true
    : filesValue?.length > 0 || displayedFiles?.length > 0

  useAutoCompleteStepEffect(form, specificStep, isValid)

  const toBeUploadedFilesView = Array.isArray(filesValue)
    ? filesValue.map((file, index) => (
        <FileUploadCard
          key={file.name}
          file={file}
          handleRemoveFile={handleRemoveToBeUploadedFile(index)}
          index={index}
          version={2}
        />
      ))
    : null

  const uploadedFilesView = Array.isArray(displayedFiles)
    ? displayedFiles.map((val) => (
        <FileUploadedCard
          key={val.id}
          file={val}
          handleRemoveFile={removeDocument}
          version={2}
        />
      ))
    : null

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
            name={filesField}
            render={() => (
              <FormItem>
                <DragDropFileInput
                  id={filesField}
                  onFileSelect={handleSelectFile}
                />

                {toBeUploadedFilesView}
                {uploadedFilesView}
                <FormMessage />
              </FormItem>
            )}
          />

          {hasCheckbox && isOptionalField ? (
            <FormField
              control={form.control}
              name={isOptionalField}
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <div className="mt-1 flex items-center gap-2">
                      <Checkbox
                        checked={field.value as CheckedState}
                        className="size-5"
                        onCheckedChange={handleCheckOptional}
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
            <FormSubmitButton isDisabled={!isValid} onSubmit={onSubmit} />
          )}
        </Form>
      </div>
    </FormLayout>
  )
}
