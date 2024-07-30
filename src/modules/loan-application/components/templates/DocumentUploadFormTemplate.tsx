import { Card } from "@/components/ui/card.tsx"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form.tsx"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button.tsx"
import { DragDropFileInput } from "@/shared/molecules/DragFileInput.tsx"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils.ts"
import { useCallback, useEffect } from "react"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect.ts"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import {
  DOCUMENT_ACTION,
  DOCUMENT_KEY,
  FORM_ACTION,
  LoanDocumentsState
} from "@/modules/loan-application/providers/LoanApplicationFormProvider.tsx"
import { FileUploadCard } from "@/modules/loan-application/components/molecules/FileUploadCard.tsx"
import { FileUploadedCard } from "@/modules/loan-application/components/molecules/FileUploadedCard.tsx"
import {
  infer as zodInfer,
  ZodBoolean,
  ZodEffects,
  ZodObject,
  ZodOptional,
  ZodType,
  ZodTypeAny,
  ZodTypeDef
} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "@/components/ui/checkbox.tsx"
import { CheckedState } from "@radix-ui/react-checkbox"
import { get, set } from "lodash"

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
    Record<
      string,
      | ZodEffects<ZodType<File[], ZodTypeDef, File[]>, File[], File[]>
      | ZodOptional<ZodBoolean>
    >,
    "strip",
    ZodTypeAny,
    Record<string, File[] | boolean>,
    Record<string, File[] | boolean>
  >
  specificStep: DOCUMENT_KEY
  loanDocumentState: keyof LoanDocumentsState
}

export const DocumentUploadFormTemplate = ({
  title,
  description,
  hasCheckbox = false,
  checkboxLabel,
  schema,
  specificStep,
  loanDocumentState
}: Props) => {
  // Define a new local type based on the schema
  type FormType = zodInfer<typeof schema>

  const { finishCurrentStep, step } = useLoanApplicationProgressContext()

  const { documents, dispatchFormAction, dispatchDocumentAction } =
    useLoanApplicationFormContext()
  const formState = useLoanApplicationFormContext()

  const [fileField, checkboxField] = Object.keys(schema.shape)
  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    mode: "onChange",
    // TODO: move this to outside
    defaultValues: async () => {
      const data: FormType = {
        [fileField]: get(formState[specificStep], fileField, [])
      }

      if (checkboxField !== undefined) {
        set(
          data,
          checkboxField,
          get(formState[specificStep], checkboxField, false)
        )
      }

      return data
    }
  })

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
      dispatchDocumentAction({
        action: DOCUMENT_ACTION.REMOVE_DATA,
        key: specificStep,
        state: { id }
      })
    },
    [dispatchDocumentAction, specificStep]
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
      dispatchFormAction({
        action: FORM_ACTION.SET_DATA,
        key: specificStep,
        state: data
      })
    }
  }, [form.formState.isValidating, form, dispatchFormAction, specificStep])

  /**
   * Scenario 1: Has checkbox
   * - True if: FILES is not empty and CHECKBOX is false OR FILES is empty and CHECKBOX is true
   * Scenario 2: Does not have checkbox
   * - True if: FILES is not empty
   * */
  const filesValue = form.watch(fileField) as File[]
  const checkboxValue =
    checkboxField !== undefined && (form.watch(checkboxField) as boolean)
  const isValid = checkboxValue // check if this form has checkbox or not
    ? filesValue === undefined || filesValue?.length === 0 // case FILES is empty and CHECKBOX is true
    : filesValue !== undefined && filesValue.length !== 0 // case FILES is not empty

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
          <Card className="flex flex-col gap-y-2xl p-4xl">
            <h4 className="text-lg font-semibold">{title}</h4>
            <p className="text-sm text-text-secondary font-medium">
              {description}
            </p>
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
                  {(documents[loanDocumentState] ?? []).map((val) => (
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
                      <div className="flex gap-2 mt-1">
                        <Checkbox
                          checked={field.value as CheckedState}
                          onCheckedChange={field.onChange}
                        />
                        <p className="text-sm text-text-secondary font-normal">
                          {checkboxLabel}
                        </p>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            {!isReviewApplicationStep(step) && (
              <Button disabled={!isValid} onClick={form.handleSubmit(onSubmit)}>
                Next <ArrowRight className="ml-1 w-4" />
              </Button>
            )}
          </Card>
        </Form>
      </div>
    </div>
  )
}
