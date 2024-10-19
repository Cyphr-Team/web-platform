import { Card } from "@/components/ui/card"
import fileIcon from "@/assets/file.svg"
import { Button } from "@/components/ui/button"
import { type DocumentUploadedResponse } from "../../constants/type"
import { type FC } from "react"

interface Props {
  file: DocumentUploadedResponse
}

export const FileDownloadableCard: FC<Props> = ({ file }) => {
  return (
    <Card key={file.id} className="p-xl gap-2xl flex shadow-none items-center">
      <img alt="file" className="logo w-8 h-8" src={fileIcon} />
      <div className="text-sm flex items-center h-full">
        {file.originFileName}
      </div>
      {/*TODO: handle download file*/}
      <Button className="ml-auto cursor-pointer" type="button">
        Download now
      </Button>
    </Card>
  )
}
