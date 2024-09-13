import { Card } from "@/components/ui/card"
import { convertFileSizeToMB } from "@/utils"
import { Trash, X } from "lucide-react"
import fileIcon from "@/assets/file.svg"
import fileIconV2 from "@/assets/pdf-file.svg"
import { Button } from "@/components/ui/button"
import React, { ReactNode } from "react"

const fileIconMapper: { [key: number]: string } = {
  1: fileIcon,
  2: fileIconV2
}

const deleteIconMapper: { [key: number]: ReactNode } = {
  1: <Trash className="h-5 w-5" />,
  2: <X className="h-5 w-5" />
}

type Props = {
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
    <Card className="p-xl gap-2xl flex shadow-none items-center" key={index}>
      <img src={fileIconMapper[version]} className="logo w-8 h-8" alt="file" />
      <div className="flex flex-col max-w-xs">
        <p className="text-sm truncate">{file.name}</p>
        <p className="text-sm text-text-tertiary">
          {`${convertFileSizeToMB(file.size)} MB`}
        </p>
      </div>
      <Button
        type="button"
        variant="ghost"
        className="ml-auto"
        onClick={() => handleRemoveFile(index)}
      >
        {deleteIconMapper[version]}
      </Button>
    </Card>
  )
}
