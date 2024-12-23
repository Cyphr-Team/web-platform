import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { INSIGHT_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"
import { TaskFieldStatus } from "@/modules/loan-application-management/constants/types/business.type"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { isCapitalCollab, isLoanReady, isSbb } from "@/utils/domain.utils"
import { isEnableKYBV2 } from "@/utils/feature-flag.utils"
import { useMemo } from "react"
import InsightItem from "../../molecules/InsightItem"

export function Insights() {
  const { loanKybDetail, isLoading } = useLoanApplicationDetailContext()

  const isEnableHRE =
    isEnableKYBV2() && (isSbb() || isLoanReady() || isCapitalCollab())

  const insights = loanKybDetail?.insights

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

  const insightsTotal = isEnableHRE
    ? insights
      ? Object.entries(insights).length
      : 10
    : 7

  return (
    <Card className="top-0 z-10 mb-4 h-fit shrink-0 lg:sticky">
      <CardHeader className="px-0 !pb-0 md:px-0">
        <CardTitle className="flex items-center justify-between px-4 text-base font-bold">
          <div>Insights</div>
          {isLoading ? (
            <Skeleton className="h-4 w-16" />
          ) : (
            <div>
              {numberOfSuccess}/{insightsTotal}
            </div>
          )}
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="w-full !p-4 !pt-0 lg:w-[300px]">
        <InsightItem
          href={INSIGHT_TOC.businessName}
          isLoading={isLoading}
          label={insights?.businessName?.subLabel}
          status={insights?.businessName?.status}
          title="Business name"
          toolTipContent={insights?.businessName?.message}
        />
        <InsightItem
          href={INSIGHT_TOC.officeAddress}
          isLoading={isLoading}
          label={insights?.officeAddress?.subLabel}
          status={insights?.officeAddress?.status}
          title="Office address"
          toolTipContent={insights?.officeAddress?.message}
        />
        <InsightItem
          href={INSIGHT_TOC.sosFillings}
          isLoading={isLoading}
          label={insights?.sosFillings?.subLabel}
          status={insights?.sosFillings?.status}
          title="SOS filings"
          toolTipContent={insights?.sosFillings?.message}
        />
        <InsightItem
          href={INSIGHT_TOC.tinMatch}
          isLoading={isLoading}
          label={insights?.tin?.subLabel}
          status={insights?.tin?.status}
          title="TIN match"
          toolTipContent={insights?.tin?.message}
        />
        <InsightItem
          href={INSIGHT_TOC.people}
          isLoading={isLoading}
          label={insights?.people?.subLabel}
          status={insights?.people?.status}
          title="People"
          toolTipContent={insights?.people?.message}
        />
        <InsightItem
          href={INSIGHT_TOC.watchLists}
          isLoading={isLoading}
          label={insights?.watchlists?.subLabel}
          status={insights?.watchlists?.status}
          title="Watchlists"
          toolTipContent={insights?.watchlists?.message}
        />
        {isEnableHRE ? (
          <InsightItem
            href={INSIGHT_TOC.industryClassification}
            isLoading={isLoading}
            label={insights?.industry?.subLabel}
            status={insights?.industry?.status}
            title="Industry Classification"
            toolTipContent={insights?.industry?.message}
          />
        ) : null}
        <InsightItem
          href={INSIGHT_TOC.bankruptcies}
          isLoading={isLoading}
          label={insights?.bankruptcies?.subLabel}
          status={insights?.bankruptcies?.status}
          title="Bankruptcies"
          toolTipContent={insights?.bankruptcies?.message}
          {...(!isEnableKYBV2() &&
            !(isSbb() || isLoanReady()) && { noBorder: true })}
        />
        {isEnableHRE ? (
          <InsightItem
            href={INSIGHT_TOC.website}
            isLoading={isLoading}
            label={insights?.website?.subLabel}
            status={insights?.website?.status}
            title="Website"
            toolTipContent={insights?.website?.message}
          />
        ) : null}
        {isEnableHRE ? (
          <InsightItem
            noBorder
            href={INSIGHT_TOC.adverseMedia}
            isLoading={isLoading}
            label={insights?.adverseMedia?.subLabel}
            status={insights?.adverseMedia?.status}
            title="Adverse Media"
            toolTipContent={insights?.adverseMedia?.message}
          />
        ) : null}
      </CardContent>
    </Card>
  )
}
