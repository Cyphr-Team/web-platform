import fileIcon from "@/assets/file.svg"
import { Card } from "@/components/ui/card"
import { DownloadDocumentButton } from "@/modules/loan-application/components/atoms/DownloadDocumentButton"
import { DocumentUploadedResponse } from "@/modules/loan-application/constants/type"

import { useBRLoanApplicationDetailsContext } from "@/modules/loan-application/providers"
type Props = {
  file: DocumentUploadedResponse
  index: string
}
const FileCard: React.FC<Props> = ({ file, index }) => (
  <Card className="p-xl gap-2xl flex" key={index}>
    <div className="flex">
      <DownloadDocumentButton
        documentId={file.id}
        fileName={file.originFileName}
      />
      <img src={fileIcon} className="logo w-8 h-8" alt="file" />
    </div>
    <p className="text-sm">{file.originFileName}</p>
  </Card>
)

export const LaunchKCBusinessDocumentsDetails = () => {
  const { businessDocumentsFormData } = useBRLoanApplicationDetailsContext()

  const executiveSummary = businessDocumentsFormData?.executiveSummary
  const pitchDeck = businessDocumentsFormData?.pitchDeck
  return (
    <div className="grid grid-cols-4">
      <div className="col-span-1">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-semibold">Documentation</h3>
        </div>
      </div>
      <div className="col-span-3 gap-2xl flex flex-col max-w-screen-sm">
        {!!executiveSummary && (
          <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto">
            <h5 className="text-lg font-semibold">Executive Summary</h5>
            <div className="flex flex-col gap-y-2xl">
              <FileCard
                file={executiveSummary}
                index={executiveSummary.id}
                key={executiveSummary.id}
              />
            </div>
          </Card>
        )}
        {!!pitchDeck && (
          <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto">
            <h5 className="text-lg font-semibold">Pitch Deck</h5>
            <div className="flex flex-col gap-y-2xl">
              <FileCard
                file={pitchDeck}
                index={pitchDeck.id}
                key={pitchDeck.id}
              />
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
