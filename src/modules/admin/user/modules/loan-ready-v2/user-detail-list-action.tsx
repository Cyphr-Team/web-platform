import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import COLORS from "@/styles/colors"
import { type UserRoles } from "@/types/user.type.ts"
import { isApplicant, isPlatformAdmin } from "@/utils/check-roles"
import { isEnableChatSupport } from "@/utils/feature-flag.utils"
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu"
import { MoreHorizontal } from "lucide-react"

export interface UserDetailListActionProps {
  roles: UserRoles[]
}

export function UserDetailListAction({ roles }: UserDetailListActionProps) {
  const isAbleToModifyPermission =
    !isApplicant(roles) && !isPlatformAdmin(roles)
  const isAbleToViewChat = isEnableChatSupport() && isApplicant(roles)

  // We will hide this button if there are no actions to be shown
  if (!isAbleToModifyPermission && !isAbleToViewChat) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="text-center" size="icon" variant="ghost">
          <MoreHorizontal className="size-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="px-0 py-1 w-48 absolute right-0">
        <DropdownMenuLabel>
          <div
            className={`w-full rounded-none text-sm py-2 px-4 hover:bg-[${COLORS.ADMIN_LOANREADY_BUTTON_RESEND_EMAIL}] hover:cursor-pointer`}
          >
            Resend invitation
          </div>
        </DropdownMenuLabel>

        <DropdownMenuLabel>
          <div
            className={`w-full rounded-none text-sm py-2 px-4 hover:bg-[${COLORS.ADMIN_LOANREADY_BUTTON_RESEND_EMAIL}] hover:cursor-pointer`}
          >
            Cancel invitation
          </div>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
