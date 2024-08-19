import React, { useState } from "react"
import { UploadCloud } from "lucide-react"
import { Card } from "@/components/ui/card"

interface DragDropFileInputProps {
  multiple?: boolean
  onFileSelect: (files: FileList, field?: string) => void
  field?: string
  id: string
}

export const DragDropFileInput: React.FC<DragDropFileInputProps> = ({
  onFileSelect,
  field,
  id,
  multiple = true
}) => {
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
  }

  return (
    <form
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id={id}
        multiple={multiple}
        onChange={handleFileSelect}
        style={{ display: "none" }}
        accept="application/pdf" // Temporarily remove image/png, image/jpeg
      />
      <label htmlFor={id}>
        <Card
          data-drag={dragActive}
          className="p-xl gap-lg flex flex-col items-center justify-content data-[drag='true']:border-primary cursor-pointer shadow-none"
        >
          <div className="border p-md rounded-md">
            <UploadCloud className="h-5 w-5" />
          </div>
          <div className="text-text-tertiary text-sm text-center">
            <span className="text-primary font-semibold">Click to upload</span>
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
