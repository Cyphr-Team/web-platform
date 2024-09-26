import { FormField, FormItem, FormMessage } from "@/components/ui/form.tsx"
import { DragDropFileInput } from "@/shared/molecules/DragFileInput.tsx"
import { FileUploadCard } from "@/modules/loan-application/components/molecules/FileUploadCard.tsx"
import { DocumentUploadedResponse } from "@/modules/loan-application/constants/type.ts"
import { FileUploadedCard } from "@/modules/loan-application/components/molecules/FileUploadedCard.tsx"
import { FieldPath, FieldValues, useFormContext } from "react-hook-form"
import { memo, useCallback } from "react"

interface RHFDragAndDropFileUploadProps<T extends FieldValues> {
  name: FieldPath<T>
  uploadedFiles?: DocumentUploadedResponse[]
  onRemoveUploadedDocument?: (id: string) => void
  id: string
  multiple?: boolean
  version?: 1 | 2
}

const RHFDragAndDropFileUpload = <T extends FieldValues>(
  props: RHFDragAndDropFileUploadProps<T>
) => {
  const {
    name,
    uploadedFiles = [],
    onRemoveUploadedDocument = (id: string) => ({ id }),
    id,
    multiple = true,
    version = 1
  } = props
  const { control, watch, getValues, setValue } = useFormContext()

  const handleSelectFile = useCallback(
    (field: string) => (files: FileList) => {
      const currentFiles = getValues(field) as File[]
      let mergedFiles: File[] = []

      if (multiple) {
        mergedFiles =
          files && currentFiles
            ? [...currentFiles, ...Array.from(files)]
            : Array.from(files)
      } else {
        mergedFiles = files && files.length ? [files[0]] : []
      }

      setValue(field, mergedFiles, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
    },
    [getValues, setValue, multiple]
  )

  const handleRemoveFile = useCallback(
    (index: number, field: string) => () => {
      const currentFiles = getValues(field) as File[]
      const newFiles = currentFiles.filter((_: File, i: number) => i !== index)
      setValue(field, newFiles, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
    },
    [getValues, setValue]
  )

  const handleDeletedDocument = useCallback(
    (id: string) => () => {
      onRemoveUploadedDocument(id)
    },
    [onRemoveUploadedDocument]
  )

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <DragDropFileInput
            id={id}
            onFileSelect={handleSelectFile(name)}
            multiple={multiple}
          />
          {Array.from((watch(name) as File[]) ?? []).map(
            (file: File, index: number) => (
              <FileUploadCard
                key={file.name + index}
                file={file}
                index={index}
                handleRemoveFile={handleRemoveFile(index, name)}
                version={version}
              />
            )
          )}
          {/* Display all files */}
          {/* If not multiple mode, only display uploaded file when there is no new file */}
          {!(
            Array.from((watch(name) as File[]) ?? []).length > 0 && !multiple
          ) &&
            uploadedFiles.map((val) => (
              <FileUploadedCard
                key={val.id}
                file={val}
                handleRemoveFile={handleDeletedDocument(val.id)}
                version={version}
              />
            ))}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default memo(RHFDragAndDropFileUpload)
