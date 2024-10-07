import fileIcon from "@/assets/file.svg"
import { FinancialStatementFormResponse } from "@/modules/loan-application/[module]-financial-projection/types/financial-statement-form"
import { DownloadDocumentBtn } from "@/modules/loan-application/components/atoms/DownloadDocumentBtn"
import { BINARY_VALUES } from "@/modules/loan-application/constants/form"
import { DocumentUploadedResponse } from "@/modules/loan-application/constants/type"
import { useQueryDownloadFinancialDocument } from "@/modules/loan-application/hooks/useQueryDownloadFinancialDocument"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { capitalizeWords } from "@/utils"

interface UseEquityFinancingDetailProps {
  financialStatementFormResponse?: FinancialStatementFormResponse
}
export const useFinancialStatementsDetail = ({
  financialStatementFormResponse
}: UseEquityFinancingDetailProps) => {
  const financialStatementsDetail = {
    id: LOAN_APPLICATION_STEPS.FINANCIAL_STATEMENTS,
    title: "Financial Statements",
    financialApplicationFormData: [
      {
        id: "financialStatementsAvailable",
        title: "Financial statements are available:",
        content: capitalizeWords(
          financialStatementFormResponse?.hasDocument
            ? BINARY_VALUES.YES
            : BINARY_VALUES.NO
        )
      }
    ],
    subChildren:
      (financialStatementFormResponse?.documents?.length ?? 0) > 0 ? (
        <div className="flex flex-col gap-y-2xl">
          {financialStatementFormResponse?.documents?.map((val) => (
            <FileCard
              setupId={
                financialStatementFormResponse.financialProjectionSetupId
              }
              file={val}
              key={val.id}
            />
          ))}
        </div>
      ) : undefined
  }

  return { financialStatementsDetail }
}

interface Props {
  file: DocumentUploadedResponse
  setupId?: string
}
const FileCard: React.FC<Props> = ({ file, setupId }) => (
  <div className="flex justify-between gap-2">
    <div className="flex justify-center items-center gap-2">
      <img src={fileIcon} className="logo w-8 h-8" alt="file" />
      <p className="text-sm">{file.originFileName}</p>
    </div>

    <DownloadDocumentBtn
      useDownloadFile={useQueryDownloadFinancialDocument}
      setupId={setupId}
      documentId={file.id}
      fileName={file.originFileName}
    />
  </div>
)
