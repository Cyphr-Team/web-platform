import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { type UserDetailInfo, UserStatus } from "@/types/user.type.ts"
import { isApplicant, isPlatformAdmin } from "@/utils/check-roles"
import { isEnableChatSupport } from "@/utils/feature-flag.utils"
import { MoreHorizontal } from "lucide-react"
import DialogDeleteUser from "@/modules/admin/user/components/DialogDeleteUser.tsx"
import { useBoolean } from "@/hooks"

export interface UserDetailListActionProps {
  userInfo: UserDetailInfo
}

export function UserDetailListAction({ userInfo }: UserDetailListActionProps) {
  const openDeleteDialog = useBoolean(false)

  const isAbleToModifyPermission =
    !isApplicant(userInfo.roles) && !isPlatformAdmin(userInfo.roles)
  const isAbleToViewChat = isEnableChatSupport() && isApplicant(userInfo.roles)

  // We will hide this button if there are no actions to be shown
  if (!isAbleToModifyPermission && !isAbleToViewChat) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="text-center" size="icon" variant="ghost">
          <MoreHorizontal className="size-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48">
        {userInfo.status === UserStatus.PENDING &&
        !isApplicant(userInfo.roles) ? (
          <>
            <DropdownMenuItem role="button">Resend invitation</DropdownMenuItem>
            <DropdownMenuItem role="button">Cancel invitation</DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem role="button" onClick={openDeleteDialog.onTrue}>
            Remove user
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
      <DialogDeleteUser
        listUser={[userInfo]}
        open={openDeleteDialog.value}
        setOpen={openDeleteDialog.setValue}
      />
    </DropdownMenu>
  )
}
