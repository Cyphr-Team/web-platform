import { Button, ButtonLoading } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { isApplicant, isPlatformAdmin } from "@/utils/check-roles"
import { isEnableChatSupport } from "@/utils/feature-flag.utils"
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { useRevokeInvitation } from "../../hooks/useRevokeInvitation"
import { useSendInvitation } from "../../hooks/useSendInvitation"
import { type Invitation } from "@/types/invitation.type"
import { ExpirationDays } from "@/types/expiration-day.type"
import { APP_PATH } from "@/constants"
import { toastError } from "@/utils"

export interface UserDetailListActionProps {
  invitation: Invitation
}

export function InvitationListAction({
  invitation
}: UserDetailListActionProps) {
  const { roles, id: invitationId } = invitation
  const isAbleToModifyPermission =
    !isApplicant(roles) && !isPlatformAdmin(roles)
  const isAbleToViewChat = isEnableChatSupport() && isApplicant(roles)

  const { mutate: revokeInvitation, isPending: isRevoking } =
    useRevokeInvitation()
  const { mutate: resendInvitation, isPending: isResending } =
    useSendInvitation()

  // We will hide this button if there are no actions to be shown
  if (!isAbleToModifyPermission && !isAbleToViewChat) return null

  const handleRevokeInvitation = () => {
    revokeInvitation({
      invitationId
    })
  }

  const handleSendInvitation = () => {
    if (invitation.roles.length === 0) {
      toastError({
        title: "Error",
        description: "The user has no role, cannot send an invitation"
      })
    }
    resendInvitation({
      email: invitation.recipientEmail,
      roles: invitation.roles[0],
      institutionId: invitation.institutionId,
      baseUrl: `${window.location.origin}${APP_PATH.ACCEPT_INVITE}`,
      expirationDays: ExpirationDays.SEVEN_DAYS
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="text-center" size="icon" variant="ghost">
          <MoreHorizontal className="size-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="py-1 w-48">
        <DropdownMenuLabel>
          <ButtonLoading
            className="flex h-max w-full px-4 justify-start font-normal"
            isLoading={isResending}
            type="submit"
            variant="ghost"
            onClick={handleSendInvitation}
          >
            Resend invitation
          </ButtonLoading>
        </DropdownMenuLabel>

        <DropdownMenuLabel>
          <ButtonLoading
            className="flex h-max w-full px-4 justify-start font-normal"
            isLoading={isRevoking}
            type="submit"
            variant="ghost"
            onClick={handleRevokeInvitation}
          >
            Cancel invitation
          </ButtonLoading>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
