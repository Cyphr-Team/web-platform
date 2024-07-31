import { cn } from "../../../../lib/utils"
import { IWorkspaceAdminApplicationStageStat } from "../../../../types/application/application-assign.type"
import { LoanApplicationStatus } from "../../../../types/loan-application.type"
import { StatApplicationStatusCard } from "./StatApplicationStatusCard"

export const WorkspaceAdminApplicationStatusCard = ({
  stageStat
}: {
  stageStat?: IWorkspaceAdminApplicationStageStat
}) => {
  const isLoading = stageStat == null

  return (
    <div className={cn("my-4")}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <StatApplicationStatusCard
          isLoading={isLoading}
          value={stageStat?.totalApplicationPendingSubmission ?? 0}
          round={LoanApplicationStatus.PENDING_SUBMISSION}
        />
        <StatApplicationStatusCard
          isLoading={isLoading}
          value={stageStat?.totalApplicationReadyToReview ?? 0}
          round={LoanApplicationStatus.READY_FOR_REVIEW}
        />
        <StatApplicationStatusCard
          isLoading={isLoading}
          value={stageStat?.totalApplicationRound1 ?? 0}
          round={LoanApplicationStatus.ROUND_1}
        />
        <StatApplicationStatusCard
          isLoading={isLoading}
          value={stageStat?.totalApplicationRound2 ?? 0}
          round={LoanApplicationStatus.ROUND_2}
        />
        <StatApplicationStatusCard
          isLoading={isLoading}
          value={stageStat?.totalApplicationRound3 ?? 0}
          round={LoanApplicationStatus.ROUND_3}
        />
      </div>
    </div>
  )
}
