import { Card } from "@/components/ui/card"
import { Trash, X } from "lucide-react"
import fileIcon from "@/assets/file.svg"
import { Button } from "@/components/ui/button"
import { type DocumentUploadedResponse } from "../../constants/type"
import fileIconV2 from "@/assets/pdf-file.svg"
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
  file: DocumentUploadedResponse
  handleRemoveFile: (id: string) => void
  version?: 1 | 2
}

export const FileUploadedCard: React.FC<Props> = ({
  file,
  handleRemoveFile,
  version = 1
}) => {
  return (
    <Card key={file.id} className="flex items-center gap-2xl p-xl shadow-none">
      <img alt="file" className="logo size-8" src={fileIconMapper[version]} />
      <div className="flex max-w-xs flex-col">
        <p className="truncate text-sm">{file.originFileName}</p>
      </div>
      <Button
        className="ml-auto"
        type="button"
        variant="ghost"
        onClick={() => handleRemoveFile(file.id)}
      >
        {deleteIconMapper[version]}
      </Button>
    </Card>
  )
}
