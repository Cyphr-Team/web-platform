import { Input } from "@/components/ui/input"
import { type KeyboardEvent, useState } from "react"
import { FormControl } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { useFormContext } from "react-hook-form"
import { inviteLaunchKCRoleOptions } from "../../constants/roles.constants"
import { checkValidEmail, removeWhitespace } from "@/utils"
import { type UserRoles } from "@/types/user.type"

interface InvitationInfo {
  email: string
  role: UserRoles
}

export function InvitationInput() {
  const form = useFormContext()
  const [currentRole, setCurrentRole] = useState<string | null>(null)

  const handleValueChange = (value: string) => {
    setCurrentRole(value)
  }

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const target = event.target as HTMLInputElement

    if (event.key !== "Enter") return

    // Add invitation record (Email, Role) to the form state
    // If one field is missing or invalid, form state will not be updated
    const trimmedValue = removeWhitespace(target.value)

    if (!trimmedValue || !checkValidEmail(trimmedValue)) return

    if (!currentRole) return

    const currentInvitations = form.getValues("invitations")
    const emailExists = currentInvitations.some(
      (invitation: InvitationInfo) => invitation.email === trimmedValue
    )

    if (emailExists) return

    const newInvitation = { email: trimmedValue, role: currentRole }

    form.setValue("invitations", [...currentInvitations, newInvitation])
    form.trigger("invitations")
    target.value = ""
  }

  // This function is added to prevent auto-submitting the form when pressing Enter key
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
    }
  }

  return (
    <div className="mt-1">
      <p className="font-medium">Invite team members</p>
      <div className="flex flex-wrap flex-row gap-2 border border-black shadow-md p-2 rounded-lg mt-1">
        <div className="w-3/5 flex flex-wrap items-center">
          <Input
            className="rounded-sm w-full border-1 m-1"
            placeholder="Type to add..."
            type="text"
            wrapperClassName="w-full"
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
          />
        </div>

        <div className="md:w-1/3 mt-1 mr-0 ml-auto">
          <Select onValueChange={handleValueChange}>
            <FormControl>
              <SelectTrigger className="bg-gray-200 rounded-lg px-3 py-1 flex items-center group">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {inviteLaunchKCRoleOptions().map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
