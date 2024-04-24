import fileIcon from "@/assets/file.svg"
import { Card } from "@/components/ui/card"
import { DocumentUploadedResponse } from "@/modules/loan-application/constants/type"
import { DownloadDocumentButton } from "../../atoms/DownloadDocumentButton"
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

export const DocumentationDetails = () => {
  const { kycDocuments, financialDocuments } =
    useBRLoanApplicationDetailsContext()
  return (
    <div className="grid grid-cols-4 ">
      <div className="col-span-1">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-semibold">Documentation</h3>
        </div>
      </div>
      <div className="col-span-3 gap-2xl flex flex-col">
        {!!kycDocuments?.length && (
          <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto">
            <h5 className="text-lg font-semibold">Government ID</h5>
            <div className="flex flex-col gap-y-2xl">
              {kycDocuments?.map((val) => (
                <FileCard file={val} index={val.id} key={val.id} />
              ))}
            </div>
          </Card>
        )}
        <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto">
          <h5 className="text-lg font-semibold">Financial Documents</h5>
          <div className="flex flex-col gap-y-2xl">
            {financialDocuments?.map((val) => (
              <FileCard file={val} index={val.id} key={val.id} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
