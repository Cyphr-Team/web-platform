import React, { useState } from "react"
import { UploadCloud } from "lucide-react"
import { Card } from "@/components/ui/card"

interface DragDropFileInputProps {
  multiple?: boolean
  onFileSelect: (files: FileList, field?: string) => void
  field?: string
  id: string
}

export function DragDropFileInput(props: DragDropFileInputProps) {
  const { onFileSelect, field, id, multiple = true } = props
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
          className="p-xl gap-lg flex flex-col items-center justify-content data-[drag='true']:border-primary cursor-pointer shadow-none"
          data-drag={dragActive}
        >
          <div className="border p-md rounded-md">
            <UploadCloud className="h-5 w-5" />
          </div>
          <div className="text-text-tertiary text-sm text-center">
            <span className="text-text-primary font-semibold">
              Click to upload
            </span>
            <span> or drag and drop</span>
            <p className="text-xs">
              (only PDF files are supported at this time)
            </p>
            {/* Temporarily remove image/png, image/jpeg */}
          </div>
        </Card>
      </label>
    </form>
  )
}
