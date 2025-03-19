import { ACCEPTED_IMAGE_FORMAT } from "@/constants"
import { type IPreviewFile, useUploadFile } from "@/hooks/useUploadFile"
import { Card } from "@/components/ui/card"
import { LoadingStates } from "@/hooks/useLoadingFile"
import { Loader2, UploadCloud } from "lucide-react"

export function UploadImageZone({
  accept = ACCEPTED_IMAGE_FORMAT,
  name,
  handleUploadPhoto,
  subdomain
}: {
  accept?: string
  name: string
  handleUploadPhoto: (file: IPreviewFile) => void
  subdomain: string
}) {
  const { onChangeFile, file, loadingState } = useUploadFile({
    handleUploadPhoto,
    subdomain
  })

  return (
    <div>
      <input
        accept={accept}
        id={name}
        multiple={false}
        style={{ display: "none" }}
        type="file"
        onChange={onChangeFile}
      />
      <label htmlFor={name}>
        <Card className="justify-content flex cursor-pointer flex-col items-center gap-lg p-xl data-[drag='true']:border-primary">
          <div className="rounded-md border p-md">
            {loadingState === LoadingStates.END && file?.url ? (
              <img alt="Upload logo" src={file?.url} />
            ) : loadingState !== LoadingStates.END ? (
              <Loader2 className="size-4 animate-spin transition-all ease-out" />
            ) : (
              <UploadCloud className="size-5" />
            )}
          </div>
          <div className="text-center text-sm text-text-tertiary">
            <span className="font-semibold text-primary">Click to upload</span>
            <span> or drag and drop</span>
            <p className="text-xs">JPG, PNG, JPEG</p>
          </div>
        </Card>
      </label>
    </div>
  )
}
