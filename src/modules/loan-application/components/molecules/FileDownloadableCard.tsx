import { Card } from "@/components/ui/card"
import fileIcon from "@/assets/file.svg"
import { Button } from "@/components/ui/button"
import { DocumentUploadedResponse } from "../../constants/type"
import { FC } from "react"

type Props = {
  file: DocumentUploadedResponse
}

export const FileDownloadableCard: FC<Props> = ({ file }) => {
  return (
    <Card className="p-xl gap-2xl flex shadow-none items-center" key={file.id}>
      <img src={fileIcon} className="logo w-8 h-8" alt="file" />
      <div className="text-sm flex items-center h-full">
        {file.originFileName}
      </div>
      {/*TODO: handle download file*/}
      <Button type="button" className="ml-auto cursor-pointer">
        Download now
      </Button>
    </Card>
  )
}
