import { FORMAT_DATE_MM_DD_YYYY } from "@/constants/date.constants"
import { MiddeskTableContent } from "@/modules/loan-application-management/components/table/middesk-table-content"
import { MiddeskTableContentReport } from "@/modules/loan-application-management/constants/types/middesk.type"
import { format } from "date-fns"
import { MiddeskBadge } from "../../molecules/MiddeskBadge"
import { MiddeskCard } from "../../molecules/MiddeskCard"
import { KYC_STATUS } from "@/modules/loan-application-management/constants/types/kyc"

export const BusinessName = () => {
  const data: MiddeskTableContentReport[] = [
    {
      name: "Larry’s Latte LLC",
      submitted: true,
      sources: [{ metadata: { state: "WA", status: KYC_STATUS.VERIFIED } }],
      notes: ""
    }
  ]

  const badge = <MiddeskBadge status={KYC_STATUS.VERIFIED} />
  const headerTitle = <>Business Name {badge}</>
  const headerRight = (
    <div className="text-text-tertiary">
      Last updated on {format(new Date(), FORMAT_DATE_MM_DD_YYYY)}
    </div>
  )

  const content = <MiddeskTableContent nameTitle="Business Name" data={data} />

  return (
    <MiddeskCard
      headerTitle={headerTitle}
      headerRight={headerRight}
      content={content}
    />
  )
}
