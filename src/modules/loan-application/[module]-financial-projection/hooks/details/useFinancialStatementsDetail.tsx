import fileIcon from "@/assets/file.svg"
import { cn } from "@/lib/utils"
import { type FinancialStatementFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/financial-statement-store"
import { DownloadDocumentBtn } from "@/modules/loan-application/components/atoms/DownloadDocumentBtn"
import { BINARY_VALUES } from "@/modules/loan-application/constants/form"
import { type DocumentUploadedResponse } from "@/modules/loan-application/constants/type"
import { useQueryDownloadFinancialDocument } from "@/modules/loan-application/hooks/form-document/useQueryDownloadFinancialDocument.ts"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { EXPORT_CLASS } from "@/modules/loan-application/services/pdf-v2.service"
import { capitalizeWords } from "@/utils"

interface UseEquityFinancingDetailProps {
  financialStatementFormValue?: FinancialStatementFormValue
}

export const useFinancialStatementsDetail = ({
  financialStatementFormValue
}: UseEquityFinancingDetailProps) => {
  const isFilesExist =
    (financialStatementFormValue?.uploadedFiles?.length ?? 0) > 0 ||
    (financialStatementFormValue?.files?.length ?? 0) > 0

  const financialStatementsDetail = {
    id: LOAN_APPLICATION_STEPS.FINANCIAL_STATEMENTS,
    title: "Financial Statements",
    financialApplicationFormData: [
      {
        id: "financialStatementsAvailable",
        title: "Financial statements are available:",
        content: capitalizeWords(
          financialStatementFormValue?.hasDocument
            ? BINARY_VALUES.YES
            : BINARY_VALUES.NO
        )
      }
    ],
    subChildren: isFilesExist ? (
      <div
        className={cn(
          "flex flex-col gap-y-2xl p-4 md:p-8 md:pt-4",
          EXPORT_CLASS.FINANCIAL
        )}
      >
        {financialStatementFormValue?.uploadedFiles?.map((val) => (
          <UploadedFileCard
            key={val.id}
            file={val}
            setupId={financialStatementFormValue.applicationId}
          />
        ))}

        {financialStatementFormValue?.files?.map((val, index) => (
          <FileUploadCard key={val.name + index.toString()} file={val} />
        ))}
      </div>
    ) : undefined
  }

  return { financialStatementsDetail }
}

interface UploadedFileCardProps {
  file: DocumentUploadedResponse
  setupId?: string
}

function UploadedFileCard({ file, setupId }: UploadedFileCardProps) {
  return (
    <div className="flex justify-between gap-2">
      <div className="flex items-center justify-center gap-2">
        <img alt="file" className="logo size-8" src={fileIcon} />
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
}

interface FileUploadCardProps {
  file: File
}

function FileUploadCard({ file }: FileUploadCardProps) {
  return (
    <div className="flex justify-between gap-2">
      <div className="flex items-center justify-center gap-2">
        <img alt="file" className="logo size-8" src={fileIcon} />
        <p className="text-sm">{file.name}</p>
      </div>
    </div>
  )
}
