import { useDashboard } from "../providers/dashboard-provider"
import { DashboardCard } from "./DashboardCard"

export const TotalApplicationActivity = () => {
  const { isLoading, statsData } = useDashboard()

  const data = {
    totalApplicationsDraft: statsData?.totalApplicationDraft,
    totalApplicationsSubmitted: statsData?.totalApplicationSubmitted,
    totalApplicationsInReview: statsData?.totalApplicationInReview,
    totalApplicationsUnderwritten: statsData?.totalApplicationUnderwritten
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">
        Total Application Activity
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          isLoading={isLoading}
          title="Total Applications in Draft"
          value={data.totalApplicationsDraft}
          className="bg-gray-300 bg-opacity-10"
        />
        <DashboardCard
          isLoading={isLoading}
          title="Total Applications Submitted"
          value={data.totalApplicationsSubmitted}
          className="text-blue-700 bg-blue-500 border-blue-300 bg-opacity-10"
        />
        <DashboardCard
          isLoading={isLoading}
          title="Total Applications in Progress"
          value={data.totalApplicationsInReview}
          className="text-yellow-700 bg-yellow-500 border-yellow-300 bg-opacity-10"
        />
        <DashboardCard
          isLoading={isLoading}
          title="Total Applications Finished"
          value={data.totalApplicationsUnderwritten}
          className="text-green-700 bg-green-500 border-success-200 bg-opacity-10"
        />
      </div>
    </div>
  )
}
