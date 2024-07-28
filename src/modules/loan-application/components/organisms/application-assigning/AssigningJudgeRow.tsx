import {
  LaunchKCStageResponse,
  LoanApplicationResponse
} from "@/types/application/application-assign.type"
import { Row } from "@tanstack/react-table"
import { LoanStage } from "../../../../loan-application-management/constants/types/application"
import { WrapperDialogModifyAssignedJudges } from "./WrapperDialogModifyAssignedJudges"

type Props = {
  row: Row<LoanApplicationResponse<LaunchKCStageResponse>>
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
      disabled={disabled}
      applicationId={application.id}
      currentStage={currentStage}
    />
  )
}
