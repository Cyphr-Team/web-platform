import { ErrorCode, getAxiosError } from "@/utils/custom-error"
import { useDashboard } from "../../providers/dashboard-provider"
import { ButtonContactForMoreUsage } from "./ButtonContactForMoreUsage"
import { DashBoardToolTip } from "./DashBoardToolTip"
import { StatsTitle } from "./StatsTitle"
import { UsageCard } from "./UsageCard"

export function CurrentUsage() {
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
          alertThreshold={data.applicationAlertThreshold}
          cta={<ButtonContactForMoreUsage content="Get more apps" />}
          currentUsage={data.currentApplicationUsage}
          icon={<DashBoardToolTip content="Total applications used" />}
          isLoading={isLoadingUsage}
          isNotFoundSubscription={isNotFoundSubscription}
          limit={data.currentApplicationLimit}
          title="Applications used"
          unit="Apps"
          warnThreshold={data.applicationWarnThreshold}
        />

        <UsageCard
          alertThreshold={data.seatAlertThreshold}
          cta={<ButtonContactForMoreUsage content="Get more seats" />}
          currentUsage={data.currentSeatUsage}
          icon={<DashBoardToolTip content="Total seats used" />}
          isLoading={isLoadingUsage}
          isNotFoundSubscription={isNotFoundSubscription}
          limit={data.currentSeatLimit}
          title="Seats used"
          unit="Seats"
          warnThreshold={data.seatWarnThreshold}
        />
      </div>
    </div>
  )
}
