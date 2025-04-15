import { FormField, FormItem, FormMessage } from "@/components/ui/form.tsx"
import { DragDropFileInput } from "@/shared/molecules/DragFileInput.tsx"
import { FileUploadCard } from "@/modules/loan-application/components/molecules/FileUploadCard.tsx"
import { type DocumentUploadedResponse } from "@/modules/loan-application/constants/type.ts"
import { FileUploadedCard } from "@/modules/loan-application/components/molecules/FileUploadedCard.tsx"
import {
  type FieldPath,
  type FieldValues,
  useFormContext
} from "react-hook-form"
import { memo, useCallback } from "react"

interface RHFDragAndDropFileUploadProps<T extends FieldValues> {
  name: FieldPath<T>
  uploadedFiles?: DocumentUploadedResponse[]
  onRemoveUploadedDocument?: (id: string) => void
  id: string
  multiple?: boolean
  version?: 1 | 2 | 3
  className?: string
  supportFileTypesNote?: string
  iconClassName?: string
  accept?: string
}

function RHFDragAndDropFileUpload<T extends FieldValues>(
  props: RHFDragAndDropFileUploadProps<T>
) {
  const {
    name,
    uploadedFiles = [],
    onRemoveUploadedDocument = (id: string) => ({ id }),
    id,
    multiple = true,
    version = 1,
    className,
    supportFileTypesNote,
    iconClassName,
    accept
  } = props
  const { control, watch, getValues, setValue } = useFormContext()

  const handleSelectFile = useCallback(
    (field: string) => (files: FileList) => {
      if (!files || files.length === 0) return

      if (multiple) {
        const currentFiles = getValues(field) as File[]
        const mergedFiles = currentFiles
          ? [...currentFiles, ...Array.from(files)]
          : Array.from(files)

        setValue(field, mergedFiles, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true
        })
      } else {
        setValue(field, files[0], {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true
        })
      }
    },
    [getValues, setValue, multiple]
  )

  const handleRemoveFile = useCallback(
    (index: number, field: string) => () => {
      if (multiple) {
        const currentFiles = getValues(field) as File[]
        const newFiles = currentFiles.filter(
          (_: File, i: number) => i !== index
        )

        setValue(field, newFiles, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true
        })
      } else {
        setValue(field, undefined, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true
        })
      }
    },
    [getValues, setValue, multiple]
  )

  const handleDeletedDocument = useCallback(
    (id: string) => () => {
      onRemoveUploadedDocument(id)
    },
    [onRemoveUploadedDocument]
  )

  const getFilesToDisplay = () => {
    const value = watch(name)

    if (multiple) {
      return Array.from(value ?? [])
    } else {
      return value ? [value] : []
    }
  }

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <DragDropFileInput
            accept={accept}
            className={className}
            iconClassName={iconClassName}
            id={id}
            multiple={multiple}
            supportedFileTypesNote={supportFileTypesNote}
            onFileSelect={handleSelectFile(name)}
          />
          {getFilesToDisplay().map((file: File, index: number) => {
            if (typeof file === "string") return null

            return (
              <FileUploadCard
                key={
                  typeof file.name === "string" ? file.name : `file-${index}`
                }
                file={file}
                handleRemoveFile={handleRemoveFile(index, name)}
                index={index}
                version={version}
              />
            )
          })}
          {/* Display all files */}
          {/* If not multiple mode, only display uploaded file when there is no new file */}
          {!getFilesToDisplay().length || multiple
            ? uploadedFiles.map((val) => (
                <FileUploadedCard
                  key={val.id}
                  file={val}
                  handleRemoveFile={handleDeletedDocument(val.id)}
                  version={version}
                />
              ))
            : null}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default memo(RHFDragAndDropFileUpload)
