import { APPLICANT_APPLICATION_SUMMARY_TOP_HEADER_MENU } from "@/modules/loan-application/capital-collab/constants"
import { ApplicantApplicationDetailHeader } from "@/shared/molecules/ApplicantApplicationDetailsHeader"

export function CapitalCollabApplicantApplicationDetailHeader({
  children
}: React.PropsWithChildren) {
  return (
    <div className="flex size-full flex-col md:pt-4">
      <div className="mt-xl flex flex-col space-y-3xl border-b">
        <ApplicantApplicationDetailHeader
          headerMenu={APPLICANT_APPLICATION_SUMMARY_TOP_HEADER_MENU}
        />
      </div>

      <div className="flex-1 overflow-auto bg-gray-50 p-4xl">{children}</div>
    </div>
  )
}
