import { INSIGHT_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"
import { MOCK_KYB_DETAIL } from "@/modules/conference-demo/admin/constants/data"
import { MiddeskBadge } from "@/modules/loan-application/components/molecules/middesk/MiddeskBadge"
import { MiddeskCard } from "@/modules/loan-application/components/molecules/middesk/MiddeskCard"
import { DateHeader } from "@/modules/conference-demo/admin/components/atoms/DateHeader"
import { NotFoundAlert } from "@/modules/loan-application/components/molecules/NotFoundAlert"

export const Bankruptcy = () => {
  const bankruptcy = MOCK_KYB_DETAIL.businessBankruptcies
  const status = MOCK_KYB_DETAIL.insights.bankruptcies?.status

  const badge = <MiddeskBadge status={status} label={bankruptcy?.subLabel} />
  const headerTitle = <>Bankruptcies {badge}</>

  const content = (
    <>
      {/* <BankruptcyFound /> */}
      <div className="mt-4">
        <NotFoundAlert status={status} label="No bankruptcies found" />
      </div>
    </>
  )

  return (
    <MiddeskCard
      id={INSIGHT_TOC.bankruptcies}
      headerTitle={headerTitle}
      headerRight={<DateHeader updatedAt={MOCK_KYB_DETAIL.updatedAt} />}
      content={content}
    />
  )
}
