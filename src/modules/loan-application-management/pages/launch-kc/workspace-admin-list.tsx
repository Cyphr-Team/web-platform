import { DataTable } from "@/components/ui/data-table"
import { useBreadcrumb } from "@/hooks/useBreadcrumb"
import { cn } from "@/lib/utils"
import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs"
import { assignLoanApplicationColumns } from "../../components/table/loan-application-columns"
import { LoanType } from "../../../../types/loan-program.type"
import {
  LoanApplication,
  LoanApplicationStatus
} from "../../../../types/loan-application.type"

// TODO: Integrate API table
// TODO: Integrate API filters
export function WorkspaceAdminApplicationList() {
  const crumbs = useBreadcrumb()
  // TODO: Remove mock data
  const mockDataRow: LoanApplication = {
    id: "123456789",
    loanProgramId: "987654321",
    applicantId: "ABCDE12345",
    programType: LoanType.MICRO, // Assuming LoanType is an enum defined elsewhere
    programName: "Small Business Loan",
    createdAt: "2024-07-07T12:00:00Z", // Example date and time
    applicant: {
      // Assuming Applicant is another interface or type
      id: "string",
      institutionId: "string",
      name: "string",
      email: "string",
      status: "string",
      roles: [""],
      loggedInAt: "string",
      authProvider: "string",
      created_at: "string"
      // other applicant properties as needed
    },
    requestedLoanAmount: 100000,
    status: LoanApplicationStatus.APPROVED, // Assuming LoanApplicationStatus is an enum
    progress: 0.5, // Example progress (50% complete)
    businessName: "Example Inc.", // Optional field
    applicationIdNumber: 987654, // Example application ID number
    personaInquiryId: "54321" // Optional field
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
        data={[
          // TODO: Remove mock data
          mockDataRow,
          mockDataRow,
          mockDataRow,
          mockDataRow,
          mockDataRow,
          mockDataRow,
          mockDataRow,
          mockDataRow,
          mockDataRow,
          mockDataRow
        ]}
        total={0}
      />
    </div>
  )
}
