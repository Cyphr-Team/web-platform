import { File, User } from "lucide-react"
import { useDashboard } from "../providers/dashboard-provider"
import { DashboardCard } from "./DashboardCard"

export const CurrentUsage = () => {
  const { isLoadingUsage, usageData } = useDashboard()

  const data = {
    usageOfApplications: `${
      usageData?.application?.currentApplicationUsage ?? 0
    } / ${usageData?.application?.currentApplicationLimit ?? 0}`,

    usageOfSeats: `${usageData?.seat?.currentSeatUsage ?? 0} / ${
      usageData?.seat?.currentSeatLimit ?? 0
    }`
  }

  return (
    <div>
      <h1 className="text-xl font-medium mb-2">Usage</h1>
      <div className="grid gap-4 lg:grid-cols-3">
        <DashboardCard
          title="Usage of Applications"
          isLoading={isLoadingUsage}
          value={data.usageOfApplications}
          icon={<File />}
        />
        <DashboardCard
          title="Usage of Seats"
          isLoading={isLoadingUsage}
          value={data.usageOfSeats}
          icon={<User />}
        />
      </div>
    </div>
  )
}
