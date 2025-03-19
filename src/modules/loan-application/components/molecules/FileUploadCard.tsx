import { Card } from "@/components/ui/card"
import { convertFileSizeToMB } from "@/utils"
import { Trash, X } from "lucide-react"
import fileIcon from "@/assets/file.svg"
import fileIconV2 from "@/assets/pdf-file.svg"
import { Button } from "@/components/ui/button"
import React, { type ReactNode } from "react"

const fileIconMapper: Record<number, string> = {
  1: fileIcon,
  2: fileIconV2
}

const deleteIconMapper: Record<number, ReactNode> = {
  1: <Trash className="size-5" />,
  2: <X className="size-5" />
}

interface Props {
  file: File
  index: number
  handleRemoveFile: (index: number) => void
  version?: number
}

export const FileUploadCard: React.FC<Props> = ({
  file,
  index,
  handleRemoveFile,
  version = 1
}) => {
  return (
    <Card key={index} className="flex items-center gap-2xl p-xl shadow-none">
      <img alt="file" className="logo size-8" src={fileIconMapper[version]} />
      <div className="flex max-w-xs flex-col">
        <p className="truncate text-sm">{file.name}</p>
        <p className="text-sm text-text-tertiary">
          {`${convertFileSizeToMB(file.size)} MB`}
        </p>
      </div>
      <Button
        className="ml-auto"
        type="button"
        variant="ghost"
        onClick={() => handleRemoveFile(index)}
      >
        {deleteIconMapper[version]}
      </Button>
    </Card>
  )
}
