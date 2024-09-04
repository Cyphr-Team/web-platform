import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { INSIGHT_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"
import { TaskFieldStatus } from "@/modules/loan-application-management/constants/types/business.type"
import { isLoanReady, isSbb } from "@/utils/domain.utils"
import { isEnableKYBV2 } from "@/utils/feature-flag.utils"
import { useMemo } from "react"
import InsightItem from "@/modules/loan-application/components/molecules/InsightItem"
import { MOCK_KYB_DETAIL } from "@/modules/conference-demo/admin/constants/data"

export const Insights = () => {
  const insights = MOCK_KYB_DETAIL.insights

  const numberOfSuccess = useMemo(
    () =>
      insights
        ? Object.entries(insights).reduce(
            (pre, [, data]) =>
              pre +
              (data.status?.toUpperCase() === TaskFieldStatus.SUCCESS ? 1 : 0),
            0
          )
        : 0,
    [insights]
  )

  const insightsTotal =
    isEnableKYBV2() && (isSbb() || isLoanReady())
      ? insights
        ? Object.entries(insights).length
        : 10
      : 7

  return (
    <Card className="h-fit lg:sticky top-0 z-10 mb-4 flex-shrink-0">
      <CardHeader className="!pb-0 px-0 md:px-0">
        <CardTitle className="font-bold text-base flex justify-between items-center px-4">
          <div>Insights</div>
          <div>
            {numberOfSuccess}/{insightsTotal}
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="w-full lg:w-[300px] !p-4 !pt-0">
        <InsightItem
          title="Business name"
          status={insights?.businessName?.status}
          label={insights?.businessName?.subLabel}
          toolTipContent={insights?.businessName?.message}
          href={INSIGHT_TOC.businessName}
        />
        <InsightItem
          title="Office address"
          status={insights?.officeAddress?.status}
          label={insights?.officeAddress?.subLabel}
          toolTipContent={insights?.officeAddress?.message}
          href={INSIGHT_TOC.officeAddress}
        />
        <InsightItem
          title="SOS filings"
          status={insights?.sosFillings?.status}
          label={insights?.sosFillings?.subLabel}
          toolTipContent={insights?.sosFillings?.message}
          href={INSIGHT_TOC.sosFillings}
        />
        <InsightItem
          title="TIN match"
          status={insights?.tin?.status}
          label={insights?.tin?.subLabel}
          toolTipContent={insights?.tin?.message}
          href={INSIGHT_TOC.tinMatch}
        />
        <InsightItem
          title="People"
          status={insights?.people?.status}
          label={insights?.people?.subLabel}
          toolTipContent={insights?.people?.message}
          href={INSIGHT_TOC.people}
        />
        <InsightItem
          title="Watchlists"
          status={insights?.watchlists?.status}
          label={insights?.watchlists?.subLabel}
          toolTipContent={insights?.watchlists?.message}
          href={INSIGHT_TOC.watchLists}
        />
        <InsightItem
          title="Bankruptcies"
          status={insights?.bankruptcies?.status}
          label={insights?.bankruptcies?.subLabel}
          toolTipContent={insights?.bankruptcies?.message}
          href={INSIGHT_TOC.bankruptcies}
          noBorder
        />
      </CardContent>
    </Card>
  )
}
