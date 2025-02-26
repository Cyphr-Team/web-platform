import React, { useState } from "react"
import { UploadCloud } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface DragDropFileInputProps {
  /**
   * Allow multiple files to be uploaded
   * @default true
   */
  multiple?: boolean
  /**
   * Callback function to handle file selection
   * @param files list of files selected
   * @param field field name of the input element
   * @returns
   */
  onFileSelect: (files: FileList, field?: string) => void
  /**
   * If the input element is part of a form, specify the field name
   */
  field?: string
  /**
   * Unique identifier for the input element, get from useFormContext() or useId()
   */
  id: string
  /**
   * Additional class name to render the card
   */
  className?: string
  supportedFileTypesNote?: string
  iconClassName?: string
}

export function DragDropFileInput(props: DragDropFileInputProps) {
  const {
    onFileSelect,
    field,
    id,
    multiple = true,
    className,
    supportedFileTypesNote = "(only PDF files are supported at this time)",
    iconClassName
  } = props
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (event: React.DragEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true)
    } else if (event.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setDragActive(false)
    if (event.dataTransfer.files?.[0]) {
      onFileSelect(event.dataTransfer.files, field)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onFileSelect(event.target.files, field)
    }

    /**
     * To handle upload the same file multiple times
     */
    event.target.value = ""
  }

  return (
    <form
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        accept="application/pdf" // Temporarily remove image/png, image/jpeg
        id={id}
        multiple={multiple}
        style={{ display: "none" }}
        type="file"
        onChange={handleFileSelect}
      />
      <label htmlFor={id}>
        <Card
          className={cn(
            "justify-content flex cursor-pointer flex-col items-center gap-lg p-xl shadow-none data-[drag='true']:border-primary",
            className
          )}
          data-drag={dragActive}
        >
          <div className={cn("rounded-md border p-md", iconClassName)}>
            <UploadCloud className="size-5" />
          </div>
          <div className="text-center text-sm text-text-tertiary">
            <span className="font-semibold text-text-primary">
              Click to upload
            </span>
            <span> or drag and drop</span>
            <p className="text-xs">{supportedFileTypesNote}</p>
            {/* Temporarily remove image/png, image/jpeg */}
          </div>
        </Card>
      </label>
    </form>
  )
}
