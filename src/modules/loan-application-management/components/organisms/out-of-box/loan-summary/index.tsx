import { isLaunchKC } from "@/utils/domain.utils"
import { LaunchKCApplicationOverview } from "./LaunchKCApplicationOverview"
import { BaseApplicationOverview } from "./ApplicationOverview"

export const ApplicationOverview = () =>
  isLaunchKC() ? <LaunchKCApplicationOverview /> : <BaseApplicationOverview />
