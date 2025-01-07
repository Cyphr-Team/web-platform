import React, { useState } from "react"
import { UploadCloud } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface DragDropFileInputProps {
  multiple?: boolean
  onFileSelect: (files: FileList, field?: string) => void
  field?: string
  id: string
  className?: string
}

export function DragDropFileInput(props: DragDropFileInputProps) {
  const { onFileSelect, field, id, multiple = true, className } = props
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
          <div className="rounded-md border p-md">
            <UploadCloud className="size-5" />
          </div>
          <div className="text-center text-sm text-text-tertiary">
            <span className="font-semibold text-text-primary">
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
