import { ErrorCode, getAxiosError } from "@/utils/custom-error"
import { useDashboard } from "../../providers/dashboard-provider"
import { ButtonContactForMoreUsage } from "./ButtonContactForMoreUsage"
import { DashBoardToolTip } from "./DashBoardToolTip"
import { StatsTitle } from "./StatsTitle"
import { UsageCard } from "./UsageCard"

export const CurrentUsage = () => {
  const { isLoadingUsage, usageData, usageError } = useDashboard()

  const isNotFoundSubscription = !!(
    usageError &&
    getAxiosError(usageError)?.code === ErrorCode.susbscription_not_found
  )

  const data = {
    currentApplicationUsage:
      usageData?.application?.currentApplicationUsage ?? 0,
    currentApplicationLimit:
      usageData?.application?.currentApplicationLimit ?? 0,
    applicationWarnThreshold: 70,
    applicationAlertThreshold: 90,

    currentSeatUsage: usageData?.seat?.currentSeatUsage ?? 0,
    currentSeatLimit: usageData?.seat?.currentSeatLimit ?? 0,
    seatWarnThreshold: 70,
    seatAlertThreshold: 90
  }

  return (
    <div>
      <StatsTitle>Plan</StatsTitle>

      <div className="grid gap-4 lg:grid-cols-3">
        <UsageCard
          title="Applications used"
          isLoading={isLoadingUsage}
          icon={<DashBoardToolTip content="Total applications used" />}
          currentUsage={data.currentApplicationUsage}
          limit={data.currentApplicationLimit}
          warnThreshold={data.applicationWarnThreshold}
          alertThreshold={data.applicationAlertThreshold}
          unit="Apps"
          isNotFoundSubscription={isNotFoundSubscription}
          cta={<ButtonContactForMoreUsage content="Get more apps" />}
        />

        <UsageCard
          title="Seats used"
          isLoading={isLoadingUsage}
          icon={<DashBoardToolTip content="Total seats used" />}
          currentUsage={data.currentSeatUsage}
          limit={data.currentSeatLimit}
          warnThreshold={data.seatWarnThreshold}
          alertThreshold={data.seatAlertThreshold}
          unit="Seats"
          isNotFoundSubscription={isNotFoundSubscription}
          cta={<ButtonContactForMoreUsage content="Get more seats" />}
        />
      </div>
    </div>
  )
}
