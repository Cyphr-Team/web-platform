import { DataTable } from "@/components/ui/data-table"
import { useBreadcrumb } from "@/hooks/useBreadcrumb"
import { cn } from "@/lib/utils"
import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs"
import { assignLoanApplicationColumns } from "../../components/table/loan-application-columns"
import { LoanType } from "@/types/loan-program.type.ts"
import {
  LoanApplication,
  LoanApplicationStatus
} from "@/types/loan-application.type.ts"

// TODO: Integrate API table
// TODO: Integrate API filters
export function WorkspaceAdminApplicationList() {
  const crumbs = useBreadcrumb()
  const fakeLoanApplication: LoanApplication = {
    id: "abc123",
    loanProgramId: "lp456",
    applicantId: "app789",
    programType: LoanType.LENDERS_FORUM,
    programName: "Small Business Loan",
    createdAt: "2023-06-15T12:00:00Z",
    applicant: {
      id: "string",
      institutionId: "string",
      name: "string",
      email: "string",
      status: "string",
      roles: ["1"],
      loggedInAt: "string",
      authProvider: "string",
      created_at: "string"
    },
    requestedLoanAmount: 50000,
    status: LoanApplicationStatus.ROUND_2,
    progress: 50,
    businessName: "Doe Enterprises",
    applicationIdNumber: 1001,
    personaInquiryId: "inq12345",
    meta: {
      additionalInfo: "Some extra details about the loan application"
    }
  }

  return (
    <div
      className={cn("container mx-auto px-2xl py-2xl", "md:px-4xl md:py-4xl")}
    >
      <div className="flex flex-wrap justify-between gap-4">
        <div className="flex flex-col gap-1">
          <Breadcrumbs breads={crumbs} className="px-0" />
          <h1 className="text-2xl font-semibold">Loan Applications</h1>
        </div>
      </div>

      <DataTable
        tableContainerClassName="flex flex-col flex-1 overflow-hidden max-h-[700px]"
        columns={assignLoanApplicationColumns}
        data={[fakeLoanApplication]}
        total={1}
      />
    </div>
  )
}
