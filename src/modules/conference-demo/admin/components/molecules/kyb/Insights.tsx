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
      : 10

  return (
    <Card className="top-0 z-10 mb-4 h-fit shrink-0 lg:sticky">
      <CardHeader className="px-0 !pb-0 md:px-0">
        <CardTitle className="flex items-center justify-between px-4 text-base font-bold">
          <div>Insights</div>
          <div>
            {numberOfSuccess}/{insightsTotal}
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="w-full !p-4 !pt-0 lg:w-[300px]">
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
          href={INSIGHT_TOC.industryClassification}
          label={insights?.industry?.subLabel}
          status={insights?.industry?.status}
          title="Industry Classification"
          toolTipContent={insights?.industry?.message}
        />
        <InsightItem
          href={INSIGHT_TOC.bankruptcies}
          label={insights?.bankruptcies?.subLabel}
          status={insights?.bankruptcies?.status}
          title="Bankruptcies"
          toolTipContent={insights?.bankruptcies?.message}
        />
        <InsightItem
          href={INSIGHT_TOC.website}
          label={insights?.website?.subLabel}
          status={insights?.website?.status}
          title="Website"
          toolTipContent={insights?.website?.message}
        />
        <InsightItem
          noBorder
          href={INSIGHT_TOC.adverseMedia}
          label={insights?.adverseMedia?.subLabel}
          status={insights?.adverseMedia?.status}
          title="Adverse Media"
          toolTipContent={insights?.adverseMedia?.message}
        />
      </CardContent>
    </Card>
  )
}
