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
    <Card key={file.id} className="flex items-center gap-2xl p-xl shadow-none">
      <img alt="file" className="logo size-8" src={fileIcon} />
      <div className="flex h-full items-center text-sm">
        {file.originFileName}
      </div>
      {/*TODO: handle download file*/}
      <Button className="ml-auto cursor-pointer" type="button">
        Download now
      </Button>
    </Card>
  )
}
