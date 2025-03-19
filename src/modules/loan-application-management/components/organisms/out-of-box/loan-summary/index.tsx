import { isLaunchKC } from "@/utils/domain.utils"
import { LaunchKCApplicationOverview } from "./LaunchKCApplicationOverview"
import { BaseApplicationOverview } from "./ApplicationOverview"

export function ApplicationOverview() {
  return isLaunchKC() ? (
    <LaunchKCApplicationOverview />
  ) : (
    <BaseApplicationOverview />
  )
}
