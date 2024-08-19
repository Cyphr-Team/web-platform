import { Card } from "@/components/ui/card"
import { Trash } from "lucide-react"
import fileIcon from "@/assets/file.svg"
import { Button } from "@/components/ui/button"
import { DocumentUploadedResponse } from "../../constants/type"
type Props = {
  file: DocumentUploadedResponse
  handleRemoveFile: (id: string) => void
}

export const FileUploadedCard: React.FC<Props> = ({
  file,
  handleRemoveFile
}) => {
  return (
    <Card className="p-xl gap-2xl flex shadow-none" key={file.id}>
      <img src={fileIcon} className="logo w-8 h-8" alt="file" />
      <div className="flex flex-col max-w-xs">
        <p className="text-sm truncate">{file.originFileName}</p>
      </div>
      <Button
        type="button"
        variant="secondary"
        className="ml-auto"
        onClick={() => handleRemoveFile(file.id)}
      >
        <Trash className="h-5 w-5" />
      </Button>
    </Card>
  )
}
