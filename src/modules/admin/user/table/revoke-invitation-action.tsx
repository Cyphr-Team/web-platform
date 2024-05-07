import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"
import { Invitation } from "@/types/invitation.type.ts"
import { ButtonRevokeInvitation } from "@/modules/admin/user/components/RevokeInvitationButton.tsx"

export const RevokeInvitationAction = ({
  invitation
}: {
  invitation: Invitation
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          id={invitation.id}
          name="btn-menu-invitation"
        >
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel asChild>
          <ButtonRevokeInvitation invitationId={invitation.id} />
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
