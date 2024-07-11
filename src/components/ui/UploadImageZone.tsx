import { ACCEPTED_IMAGE_FORMAT } from "@/constants"
import { IPreviewFile, useUploadFile } from "@/hooks/useUploadFile.ts"
import { Card } from "@/components/ui/card"
import { LoadingStates } from "@/hooks/useLoadingFile.ts"
import { Loader2, UploadCloud } from "lucide-react"

export const UploadImageZone = ({
  accept = ACCEPTED_IMAGE_FORMAT,
  name,
  handleUploadPhoto,
  subdomain
}: {
  accept?: string
  name: string
  handleUploadPhoto: (file: IPreviewFile) => void
  subdomain: string
}) => {
  const { onChangeFile, file, loadingState } = useUploadFile({
    handleUploadPhoto,
    subdomain
  })

  return (
    <div>
      <input
        type="file"
        id={name}
        multiple={false}
        onChange={onChangeFile}
        style={{ display: "none" }}
        accept={accept}
      />
      <label htmlFor={name}>
        <Card className="p-xl gap-lg flex flex-col items-center justify-content data-[drag='true']:border-primary cursor-pointer">
          <div className="border p-md rounded-md">
            {loadingState === LoadingStates.END && file?.url ? (
              <img src={file?.url} alt="Upload logo" />
            ) : loadingState !== LoadingStates.END ? (
              <Loader2 className="h-4 animate-spin w-4 transition-all ease-out" />
            ) : (
              <UploadCloud className="h-5 w-5" />
            )}
          </div>
          <div className="text-text-tertiary text-sm text-center">
            <span className="text-primary font-semibold">Click to upload</span>
            <span> or drag and drop</span>
            <p className="text-xs">JPG, PNG, JPEG</p>
          </div>
        </Card>
      </label>
    </div>
  )
}
