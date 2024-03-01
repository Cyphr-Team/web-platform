import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { KYC_STATUS } from "@/modules/loan-application-management/constants/types/kyc"
import {
  MIDDESK_ACTIVE_STATUS,
  MIDDESK_FOUND_STATUS,
  MIDDESK_HIT_STATUS
} from "@/modules/loan-application-management/constants/types/middesk.type"
import InsightItem from "../../molecules/InsightItem"

export const Insights = () => {
  return (
    <Card className="h-fit lg:sticky top-0 z-10 mb-4 flex-shrink-0">
      <CardHeader className="mb-sm !pb-0 px-0 md:px-0">
        <CardTitle className="font-bold text-base flex justify-between items-center px-4">
          <div>Insights</div>
          <div>6/7</div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="w-full lg:w-[300px] !p-4 !pt-0">
        <InsightItem title="Business name" status={KYC_STATUS.VERIFIED} />
        <InsightItem title="Office address" status={KYC_STATUS.VERIFIED} />
        <InsightItem
          title="SOS filings"
          status={MIDDESK_ACTIVE_STATUS.ACTIVE}
        />
        <InsightItem title="TIN match" status={KYC_STATUS.VERIFIED} />
        <InsightItem title="People" status={KYC_STATUS.VERIFIED} />
        <InsightItem title="Watchlists" status={MIDDESK_HIT_STATUS.HITS} />
        <InsightItem
          title="Bankruptcies"
          status={MIDDESK_FOUND_STATUS.NONE_FOUND}
          noBorder
        />
      </CardContent>
    </Card>
  )
}
