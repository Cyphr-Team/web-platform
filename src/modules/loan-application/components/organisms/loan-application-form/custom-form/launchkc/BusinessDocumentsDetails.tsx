import fileIcon from "@/assets/file.svg"
import { Card } from "@/components/ui/card"
import { DownloadDocumentButton } from "@/modules/loan-application/components/atoms/DownloadDocumentButton"
import { type DocumentUploadedResponse } from "@/modules/loan-application/constants/type"

import { useBRLoanApplicationDetailsContext } from "@/modules/loan-application/providers"
interface Props {
  file: DocumentUploadedResponse
  index: string
}
const FileCard: React.FC<Props> = ({ file, index }) => (
  <Card key={index} className="flex gap-2xl p-xl">
    <div className="flex">
      <DownloadDocumentButton
        documentId={file.id}
        fileName={file.originFileName}
      />
      <img alt="file" className="logo size-8" src={fileIcon} />
    </div>
    <p className="text-sm">{file.originFileName}</p>
  </Card>
)

export function LaunchKCBusinessDocumentsDetails() {
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
      <div className="col-span-3 flex max-w-screen-sm flex-col gap-2xl">
        {!!executiveSummary && (
          <Card className="flex h-fit flex-col gap-2xl overflow-auto rounded-lg p-4xl">
            <h5 className="text-lg font-semibold">Executive Summary</h5>
            <div className="flex flex-col gap-y-2xl">
              <FileCard
                key={executiveSummary.id}
                file={executiveSummary}
                index={executiveSummary.id}
              />
            </div>
          </Card>
        )}
        {!!pitchDeck && (
          <Card className="flex h-fit flex-col gap-2xl overflow-auto rounded-lg p-4xl">
            <h5 className="text-lg font-semibold">Pitch Deck</h5>
            <div className="flex flex-col gap-y-2xl">
              <FileCard
                key={pitchDeck.id}
                file={pitchDeck}
                index={pitchDeck.id}
              />
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
