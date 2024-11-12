import { AdverseMedia } from "@/modules/loan-application/components/organisms/Middesk/AdverseMedia"
import { Bankruptcy } from "@/modules/loan-application/components/organisms/Middesk/Bankruptcy"
import { BusinessDetail } from "@/modules/loan-application/components/organisms/Middesk/BusinessDetail"
import { BusinessName } from "@/modules/loan-application/components/organisms/Middesk/BusinessName"
import { IndustryClassification } from "@/modules/loan-application/components/organisms/Middesk/IndustryClassification"
import { Insights } from "@/modules/loan-application/components/organisms/Middesk/Insights"
import { OfficeAddress } from "@/modules/loan-application/components/organisms/Middesk/OfficeAddress"
import { People } from "@/modules/loan-application/components/organisms/Middesk/People"
import { Secretary } from "@/modules/loan-application/components/organisms/Middesk/Secretary"
import { TinMatch } from "@/modules/loan-application/components/organisms/Middesk/TinMatch"
import { WatchList } from "@/modules/loan-application/components/organisms/Middesk/WatchList"
import { Website } from "@/modules/loan-application/components/organisms/Middesk/Website"
import { isLoanReady, isSbb } from "@/utils/domain.utils"
import { isEnableKYBV2 } from "@/utils/feature-flag.utils"

export function Component() {
  return (
    <div className="w-full gap-3xl lg:flex">
      <Insights />

      <div className="space-y-6">
        <BusinessDetail isDownloadAble={false} />
        <BusinessName />
        <OfficeAddress />
        <Secretary />
        <TinMatch />
        <People />
        <WatchList />
        {isEnableKYBV2() && (isSbb() || isLoanReady()) && (
          <IndustryClassification />
        )}
        <Bankruptcy />
        {isEnableKYBV2() && (isSbb() || isLoanReady()) && <Website />}
        {isEnableKYBV2() && (isSbb() || isLoanReady()) && <AdverseMedia />}
      </div>
    </div>
  )
}
