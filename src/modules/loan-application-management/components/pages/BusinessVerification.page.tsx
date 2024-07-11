import { Bankruptcy } from "@/modules/loan-application/components/organisms/Middesk/Bankruptcy"
import { BusinessDetail } from "@/modules/loan-application/components/organisms/Middesk/BusinessDetail"
import { BusinessName } from "@/modules/loan-application/components/organisms/Middesk/BusinessName"
import { Insights } from "@/modules/loan-application/components/organisms/Middesk/Insights"
import { OfficeAddress } from "@/modules/loan-application/components/organisms/Middesk/OfficeAddress"
import { People } from "@/modules/loan-application/components/organisms/Middesk/People"
import { Secretary } from "@/modules/loan-application/components/organisms/Middesk/Secretary"
import { TinMatch } from "@/modules/loan-application/components/organisms/Middesk/TinMatch"
import { WatchList } from "@/modules/loan-application/components/organisms/Middesk/WatchList"
import { checkIsJudge } from "@/utils/check-roles"
import { isLaunchKC } from "@/utils/domain.utils"
import { ScoreCard } from "../organisms/ScoreCard"
import { isEnableJudgeSubmitScore } from "@/utils/feature-flag.utils"

export const Component = () => {
  const isJudge = checkIsJudge()

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
        <Bankruptcy />
      </div>

      {isLaunchKC() && isJudge && isEnableJudgeSubmitScore() && <ScoreCard />}
    </div>
  )
}
