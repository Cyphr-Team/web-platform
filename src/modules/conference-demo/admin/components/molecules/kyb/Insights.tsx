import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { INSIGHT_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"
import { TaskFieldStatus } from "@/modules/loan-application-management/constants/types/business.type"
import { isLoanReady, isSbb } from "@/utils/domain.utils"
import { isEnableKYBV2 } from "@/utils/feature-flag.utils"
import { useMemo } from "react"
import InsightItem from "@/modules/loan-application/components/molecules/InsightItem"
import { MOCK_KYB_DETAIL } from "@/modules/conference-demo/admin/constants/data"

export function Insights() {
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
          href={INSIGHT_TOC.businessName}
          label={insights?.businessName?.subLabel}
          status={insights?.businessName?.status}
          title="Business name"
          toolTipContent={insights?.businessName?.message}
        />
        <InsightItem
          href={INSIGHT_TOC.officeAddress}
          label={insights?.officeAddress?.subLabel}
          status={insights?.officeAddress?.status}
          title="Office address"
          toolTipContent={insights?.officeAddress?.message}
        />
        <InsightItem
          href={INSIGHT_TOC.sosFillings}
          label={insights?.sosFillings?.subLabel}
          status={insights?.sosFillings?.status}
          title="SOS filings"
          toolTipContent={insights?.sosFillings?.message}
        />
        <InsightItem
          href={INSIGHT_TOC.tinMatch}
          label={insights?.tin?.subLabel}
          status={insights?.tin?.status}
          title="TIN match"
          toolTipContent={insights?.tin?.message}
        />
        <InsightItem
          href={INSIGHT_TOC.people}
          label={insights?.people?.subLabel}
          status={insights?.people?.status}
          title="People"
          toolTipContent={insights?.people?.message}
        />
        <InsightItem
          href={INSIGHT_TOC.watchLists}
          label={insights?.watchlists?.subLabel}
          status={insights?.watchlists?.status}
          title="Watchlists"
          toolTipContent={insights?.watchlists?.message}
        />
        <InsightItem
          noBorder
          href={INSIGHT_TOC.bankruptcies}
          label={insights?.bankruptcies?.subLabel}
          status={insights?.bankruptcies?.status}
          title="Bankruptcies"
          toolTipContent={insights?.bankruptcies?.message}
        />
      </CardContent>
    </Card>
  )
}
