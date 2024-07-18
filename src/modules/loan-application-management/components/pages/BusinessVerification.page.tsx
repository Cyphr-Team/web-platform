import { Bankruptcy } from "@/modules/loan-application/components/organisms/Middesk/Bankruptcy"
import { BusinessDetail } from "@/modules/loan-application/components/organisms/Middesk/BusinessDetail"
import { BusinessName } from "@/modules/loan-application/components/organisms/Middesk/BusinessName"
import { Insights } from "@/modules/loan-application/components/organisms/Middesk/Insights"
import { OfficeAddress } from "@/modules/loan-application/components/organisms/Middesk/OfficeAddress"
import { People } from "@/modules/loan-application/components/organisms/Middesk/People"
import { Secretary } from "@/modules/loan-application/components/organisms/Middesk/Secretary"
import { TinMatch } from "@/modules/loan-application/components/organisms/Middesk/TinMatch"
import { WatchList } from "@/modules/loan-application/components/organisms/Middesk/WatchList"
import { checkIsJudge, checkIsWorkspaceAdmin } from "@/utils/check-roles"
import { isLaunchKC } from "@/utils/domain.utils"
import { ScoreCard } from "../organisms/ScoreCard"
import {
  isEnableJudgeSubmitScore,
  isEnableKYBV2
} from "@/utils/feature-flag.utils"
import { ScoreCardListDetail } from "../organisms/ScoreCardListDetail"
import { AdverseMedia } from "@/modules/loan-application/components/organisms/Middesk/AdverseMedia"

export const Component = () => {
  const isJudge = checkIsJudge()
  const isWorkspaceAdmin = checkIsWorkspaceAdmin()
  return (
    <div className="lg:flex gap-3xl w-full">
      <Insights />

      <div className="space-y-6">
        <BusinessDetail isDownloadAble={false} />
        <BusinessName />
        <OfficeAddress />
        <Secretary />
        <TinMatch />
        <People />
        <WatchList />
        {isEnableKYBV2() && <AdverseMedia />}
        <Bankruptcy />
      </div>

      {isLaunchKC() && isJudge && isEnableJudgeSubmitScore() && <ScoreCard />}
      {isLaunchKC() && isWorkspaceAdmin && isEnableJudgeSubmitScore() && (
        <ScoreCardListDetail />
      )}
    </div>
  )
}
