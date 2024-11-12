import { LoanReadiness } from "@/modules/conference-demo/admin/components/organisms/LoanReadiness"

function ApplicantLoanReadinessPage() {
  return (
    <div className="p-8">
      <h1 className="mb-8 text-[1.75rem] font-semibold">
        Welcome back, Larry!
      </h1>
      <LoanReadiness />
    </div>
  )
}

export default ApplicantLoanReadinessPage
