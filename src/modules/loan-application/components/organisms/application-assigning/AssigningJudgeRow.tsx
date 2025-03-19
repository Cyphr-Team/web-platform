import { type IWorkspaceAdminApplicationScore } from "@/types/application/application-assign.type"
import { type Row } from "@tanstack/react-table"
import { type LoanStage } from "../../../../loan-application-management/constants/types/application"
import { WrapperDialogModifyAssignedJudges } from "./WrapperDialogModifyAssignedJudges"

interface Props {
  row: Row<IWorkspaceAdminApplicationScore>
  currentStage: LoanStage
  disabled: boolean
}

export const AssigningJudgeRow: React.FC<Props> = ({
  row,
  currentStage,
  disabled
}) => {
  const application = row.original

  return (
    <WrapperDialogModifyAssignedJudges
      applicationId={application.id}
      currentStage={currentStage}
      disabled={disabled}
    />
  )
}
