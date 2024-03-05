import { Card } from "@/components/ui/card"
import { convertFileSizeToMB } from "@/utils"
import { Trash } from "lucide-react"
import fileIcon from "@/assets/file.svg"
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
      <img src={fileIcon} className="logo w-8 h-8" alt="file" />
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
