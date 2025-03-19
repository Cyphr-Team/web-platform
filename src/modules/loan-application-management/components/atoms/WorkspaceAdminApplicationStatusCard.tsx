import { cn } from "../../../../lib/utils"
import { type IWorkspaceAdminApplicationStageStat } from "../../../../types/application/application-assign.type"
import { LoanApplicationStatus } from "../../../../types/loan-application.type"
import { StatApplicationStatusCard } from "./StatApplicationStatusCard"

export function WorkspaceAdminApplicationStatusCard({
  stageStat
}: {
  stageStat?: IWorkspaceAdminApplicationStageStat
}) {
  const isLoading = stageStat == null

  return (
    <div className={cn("my-4")}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <StatApplicationStatusCard
          isLoading={isLoading}
          round={LoanApplicationStatus.PENDING_SUBMISSION}
          value={stageStat?.totalApplicationPendingSubmission ?? 0}
        />
        <StatApplicationStatusCard
          isLoading={isLoading}
          round={LoanApplicationStatus.READY_FOR_REVIEW}
          value={stageStat?.totalApplicationReadyToReview ?? 0}
        />
        <StatApplicationStatusCard
          isLoading={isLoading}
          round={LoanApplicationStatus.ROUND_1}
          value={stageStat?.totalApplicationRound1 ?? 0}
        />
        <StatApplicationStatusCard
          isLoading={isLoading}
          round={LoanApplicationStatus.ROUND_2}
          value={stageStat?.totalApplicationRound2 ?? 0}
        />
        <StatApplicationStatusCard
          isLoading={isLoading}
          round={LoanApplicationStatus.ROUND_3}
          value={stageStat?.totalApplicationRound3 ?? 0}
        />
      </div>
    </div>
  )
}
