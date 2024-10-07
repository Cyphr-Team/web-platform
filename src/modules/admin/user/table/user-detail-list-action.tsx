import { UserRoles, UserStatus } from "@/types/user.type.ts"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { ModifyUserPermissionAction } from "@/modules/admin/user/table/modify-user-permission-action"
import { isApplicant, isPlatformAdmin } from "@/utils/check-roles"
import { isEnableChatSupport } from "@/utils/feature-flag.utils"
import { ViewUserChatAction } from "@/modules/admin/user/table/view-user-chat-action"

export interface UserDetailListActionProps {
  userId: string
  status: UserStatus
  roles: UserRoles[]
}

export const UserDetailListAction = ({
  userId,
  status,
  roles
}: UserDetailListActionProps) => {
  const isJudgePending =
    roles.includes(UserRoles.JUDGE.toLowerCase() as UserRoles) &&
    status === UserStatus.PENDING
  const isAbleToModifyPermission =
    !isApplicant(roles) && !isPlatformAdmin(roles) && !isJudgePending
  const isAbleToViewChat = isEnableChatSupport() && isApplicant(roles)
  // We will hide this button if there are no actions to be shown
  if (!isAbleToModifyPermission && !isAbleToViewChat) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-center" size="icon">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        {isAbleToModifyPermission ? (
          <ModifyUserPermissionAction
            userId={userId}
            status={status}
            roles={roles}
          />
        ) : null}
        {isAbleToViewChat ? <ViewUserChatAction userId={userId} /> : null}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
