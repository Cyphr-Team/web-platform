import fileIcon from "@/assets/file.svg"
import { Card } from "@/components/ui/card"
import { type DocumentUploadedResponse } from "@/modules/loan-application/constants/type"
import { DownloadDocumentButton } from "../../atoms/DownloadDocumentButton"
import { useBRLoanApplicationDetailsContext } from "@/modules/loan-application/providers"
interface Props {
  file: DocumentUploadedResponse
  index: string
}
const FileCard: React.FC<Props> = ({ file, index }) => (
  <Card key={index} className="p-xl gap-2xl flex">
    <div className="flex">
      <DownloadDocumentButton
        documentId={file.id}
        fileName={file.originFileName}
      />
      <img alt="file" className="logo w-8 h-8" src={fileIcon} />
    </div>
    <p className="text-sm">{file.originFileName}</p>
  </Card>
)

export function DocumentationDetails() {
  const { kycDocuments, financialDocuments } =
    useBRLoanApplicationDetailsContext()

  return (
    <div className="grid grid-cols-4">
      <div className="col-span-1">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-semibold">Documentation</h3>
        </div>
      </div>
      <div className="col-span-3 gap-2xl flex flex-col max-w-screen-sm">
        {!!kycDocuments?.length && (
          <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto">
            <h5 className="text-lg font-semibold">Government ID</h5>
            <div className="flex flex-col gap-y-2xl">
              {kycDocuments?.map((val) => (
                <FileCard key={val.id} file={val} index={val.id} />
              ))}
            </div>
          </Card>
        )}
        {!!financialDocuments?.length && (
          <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto">
            <h5 className="text-lg font-semibold">Financial Documents</h5>
            <div className="flex flex-col gap-y-2xl">
              {financialDocuments?.length ? (
                financialDocuments?.map((val) => (
                  <FileCard key={val.id} file={val} index={val.id} />
                ))
              ) : (
                <span className="text-sm text-muted-foreground">
                  No results
                </span>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
