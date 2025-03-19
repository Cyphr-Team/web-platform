import { INSIGHT_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"
import { MOCK_KYB_DETAIL } from "@/modules/conference-demo/admin/constants/data"
import { MiddeskBadge } from "@/modules/loan-application/components/molecules/middesk/MiddeskBadge"
import { MiddeskCard } from "@/modules/loan-application/components/molecules/middesk/MiddeskCard"
import { DateHeader } from "@/modules/conference-demo/admin/components/atoms/DateHeader"
import { NotFoundAlert } from "@/modules/loan-application/components/molecules/NotFoundAlert"

export function Bankruptcy() {
  const bankruptcy = MOCK_KYB_DETAIL.businessBankruptcies
  const status = MOCK_KYB_DETAIL.insights.bankruptcies?.status

  const badge = <MiddeskBadge label={bankruptcy?.subLabel} status={status} />
  const headerTitle = <>Bankruptcies {badge}</>

  const content = (
    <>
      {/* <BankruptcyFound /> */}
      <div className="mt-4">
        <NotFoundAlert label="No bankruptcies found" status={status} />
      </div>
    </>
  )

  return (
    <MiddeskCard
      content={content}
      headerRight={<DateHeader updatedAt={MOCK_KYB_DETAIL.updatedAt} />}
      headerTitle={headerTitle}
      id={INSIGHT_TOC.bankruptcies}
    />
  )
}
