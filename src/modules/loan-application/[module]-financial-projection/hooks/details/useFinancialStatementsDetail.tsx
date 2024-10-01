import fileIcon from "@/assets/file.svg"
import { DownloadDocumentButton } from "@/modules/loan-application/components/atoms/DownloadDocumentButton"
import { BINARY_VALUES } from "@/modules/loan-application/constants/form"
import { DocumentUploadedResponse } from "@/modules/loan-application/constants/type"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { useBRLoanApplicationDetailsContext } from "@/modules/loan-application/providers"
import { capitalizeWords } from "@/utils"

export const useFinancialStatementsDetail = () => {
  const { financialStatementData } = useBRLoanApplicationDetailsContext()

  const financialStatementsDetail = {
    id: LOAN_APPLICATION_STEPS.FINANCIAL_STATEMENTS,
    title: "Financial Statements",
    financialApplicationFormData: [
      {
        id: "financialStatementsAvailable",
        title: "Financial statements are available:",
        content: capitalizeWords(
          financialStatementData?.hasDocument
            ? BINARY_VALUES.YES
            : BINARY_VALUES.NO
        )
      }
    ],
    subChildren:
      financialStatementData?.documents &&
      financialStatementData?.documents?.length > 0 ? (
        <div className="flex flex-col gap-y-2xl">
          {financialStatementData?.documents?.map((val) => (
            <FileCard file={val} key={val.id} />
          ))}
        </div>
      ) : undefined
  }

  return { financialStatementsDetail }
}

type Props = {
  file: DocumentUploadedResponse
}
const FileCard: React.FC<Props> = ({ file }) => (
  <div className="flex justify-between gap-2">
    <div className="flex justify-center items-center gap-2">
      <img src={fileIcon} className="logo w-8 h-8" alt="file" />
      <p className="text-sm">{file.originFileName}</p>
    </div>
    <DownloadDocumentButton
      documentId={file.id}
      fileName={file.originFileName}
    />
  </div>
)
