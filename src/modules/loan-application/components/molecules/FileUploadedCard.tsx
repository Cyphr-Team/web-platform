import { Card } from "@/components/ui/card"
import { Trash, X } from "lucide-react"
import fileIcon from "@/assets/file.svg"
import { Button } from "@/components/ui/button"
import { DocumentUploadedResponse } from "../../constants/type"
import fileIconV2 from "@/assets/pdf-file.svg"
import React, { ReactNode } from "react"

const fileIconMapper: { [key: number]: string } = {
  1: fileIcon,
  2: fileIconV2
}

const deleteIconMapper: { [key: number]: ReactNode } = {
  1: <Trash className="h-5 w-5" />,
  2: <X className="h-5 w-5" />
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
    <Card className="p-xl gap-2xl flex shadow-none items-center" key={file.id}>
      <img src={fileIconMapper[version]} className="logo w-8 h-8" alt="file" />
      <div className="flex flex-col max-w-xs">
        <p className="text-sm truncate">{file.originFileName}</p>
      </div>
      <Button
        type="button"
        variant="ghost"
        className="ml-auto"
        onClick={() => handleRemoveFile(file.id)}
      >
        {deleteIconMapper[version]}
      </Button>
    </Card>
  )
}
