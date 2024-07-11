import { Row } from "@tanstack/react-table"
import { LoanApplication } from "../../../../../types/loan-application.type"
import {
  UserDetailInfo,
  UserRoles,
  UserStatus
} from "../../../../../types/user.type"
import { cn } from "../../../../../lib/utils"
import { WrapperDialogModifyAssignedJudges } from "./WrapperDialogModifyAssignedJudges"
import { LoanStage } from "../../../../loan-application-management/constants/types/application"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Props = {
  row: Row<LoanApplication>
}

export const AssigningJudgeRow: React.FC<Props> = ({ row }) => {
  const index = row.index
  // TODO: Remove mock data
  const mockUser: UserDetailInfo = {
    id: "1",
    institutionId: "A",
    authId: "auth1",
    name: "Judge Number 1",
    email: "judge1@gmail.com",
    avatar: "",
    status: UserStatus.ACTIVE,
    roles: [UserRoles.JUDGE],
    loggedInAt: "",
    authProvider: "",
    createdAt: ""
  }
  // TODO: Remove mock data
  const mockUsers = Array.from(Array(index)).map(() => mockUser)
  // TODO: Remove mock data
  const judgeAvatar = mockUsers.map((item, index) => {
    const margin = index == 0 ? "" : "-ml-2"
    return (
      <Avatar
        className={cn(
          margin,
          "h-8 w-8 rounded-full overflow-hidden outline outline-slate-400 bg-white"
        )}
      >
        <AvatarImage src={item.avatar ?? ""} alt={item.name ?? ""} />
        <AvatarFallback className="flex flex-row align-middle items-center justify-center bg-gray-100 h-full">
          {item.name?.slice(0, 2)}
        </AvatarFallback>
      </Avatar>
    )
  })
  return (
    <div className="flex flex-row align-middle items-center justify-center">
      <WrapperDialogModifyAssignedJudges
        applicationId={"dbbfb382-7525-428a-8695-269c4d9883ef"} // TODO: Remove mock data
        currentStage={LoanStage.ROUND_1} // TODO: Remove mock data
      />
      <div className="flex flex-row align-middle items-center justify-center">
        {judgeAvatar}
      </div>
    </div>
  )
}
