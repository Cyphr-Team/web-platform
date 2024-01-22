import { Card } from "@/components/ui/card"
import { convertFileSizeToMB } from "@/utils"
import { File, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
type Props = {
  file: File
  index: number
  handleRemoveFile: (index: number) => void
}

export const FileUploadCard: React.FC<Props> = ({
  file,
  index,
  handleRemoveFile
}) => {
  return (
    <Card className="p-xl gap-2xl flex" key={index}>
      <File className="h-10 w-8" />
      <div className="flex flex-col">
        <p className="text-sm">{file.name}</p>
        <p className="text-sm text-text-tertiary">
          {`${convertFileSizeToMB(file.size)} MB`}
        </p>
      </div>
      <Button
        type="button"
        variant="secondary"
        className="ml-auto"
        onClick={() => handleRemoveFile(index)}
      >
        <Trash className="h-5 w-5" />
      </Button>
    </Card>
  )
}
