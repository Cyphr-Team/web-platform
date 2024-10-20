import fileIcon from "@/assets/file.svg"
import { cn } from "@/lib/utils"
import { type FinancialStatementFormResponse } from "@/modules/loan-application/[module]-financial-projection/types/financial-statement-form"
import { DownloadDocumentBtn } from "@/modules/loan-application/components/atoms/DownloadDocumentBtn"
import { BINARY_VALUES } from "@/modules/loan-application/constants/form"
import { type DocumentUploadedResponse } from "@/modules/loan-application/constants/type"
import { useQueryDownloadFinancialDocument } from "@/modules/loan-application/hooks/useQueryDownloadFinancialDocument"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { EXPORT_CLASS } from "@/modules/loan-application/services/pdf-v2.service"
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
        <div
          className={cn(
            "flex flex-col gap-y-2xl p-4 md:p-8 md:pt-4",
            EXPORT_CLASS.FINANCIAL
          )}
        >
          {financialStatementFormResponse?.documents?.map((val) => (
            <FileCard
              key={val.id}
              file={val}
              setupId={
                financialStatementFormResponse.financialProjectionSetupId
              }
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
      <img alt="file" className="logo w-8 h-8" src={fileIcon} />
      <p className="text-sm">{file.originFileName}</p>
    </div>

    <DownloadDocumentBtn
      documentId={file.id}
      fileName={file.originFileName}
      setupId={setupId}
      useDownloadFile={useQueryDownloadFinancialDocument}
    />
  </div>
)
