import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"
import { ButtonRevokeInvitation } from "../components/revoke-invitation-button"
import { Invitation } from "@/types/invitation.type.ts"

export const DropdownAction = ({ invitation }: { invitation: Invitation }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
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
