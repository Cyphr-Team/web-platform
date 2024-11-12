import { useEffect, useState } from "react"
import { EditUserRolesButton } from "@/modules/admin/user/components/EditUserRolesButton.tsx"
import { editRoleOptions } from "@/modules/admin/user/constants/roles.constants.ts"
import { type UserRoles } from "@/types/user.type.ts"
import { isReviewerRole } from "@/utils/check-roles"
import { MultiChoices } from "@/components/ui/multi-choice-selection.tsx"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Edit } from "lucide-react"
import { Button } from "@/components/ui/button.tsx"
import { cn } from "@/lib/utils"

export function ModifyUserPermission({
  userId,
  roles
}: {
  userId: string
  roles: UserRoles[]
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRoles, setSelectedRoles] = useState<UserRoles[]>([])

  useEffect(() => {
    if (roles) {
      setSelectedRoles((prevRoles) => [...prevRoles, ...roles])
    }
  }, [roles])

  const handleRoleClick = (roleValue: UserRoles) => {
    const lowercaseRoleValue = roleValue.toLowerCase() as UserRoles

    if (selectedRoles.includes(lowercaseRoleValue)) {
      setSelectedRoles(
        selectedRoles.filter((role) => role !== lowercaseRoleValue)
      )
    } else {
      setSelectedRoles([...selectedRoles, lowercaseRoleValue])
    }
  }

  const handleUserEditForm = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleUserEditForm}>
      <DialogTrigger asChild>
        <Button
          className="flex w-full flex-row space-x-2 p-2"
          id={userId}
          style={{
            padding: "0px"
          }}
          variant="ghost"
        >
          <Edit className="size-5" /> <span>Modify roles</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Update Role</DialogTitle>
          <DialogDescription>Modify User's permission</DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4 rounded-lg bg-gray-100 p-4">
          {editRoleOptions().map((role) => (
            <MultiChoices
              key={role.label}
              description={
                isReviewerRole(role.value)
                  ? "Manages loan applications, interacts with borrowers, ensures lending process efficiency."
                  : "Manages administrative aspects, ensures platform functionality, and oversees user management."
              }
              iconClassName={
                selectedRoles.includes(role.value.toLowerCase() as UserRoles)
                  ? "text-primary"
                  : "hover:cursor-pointer hover:text-destructive"
              }
              isSelected={selectedRoles.includes(
                role.value.toLowerCase() as UserRoles
              )}
              itemClassName={cn(
                selectedRoles.includes(role.value.toLowerCase() as UserRoles)
                  ? "bg-white"
                  : "hover:bg-gray-300",
                "rounded-lg hover:opacity-80"
              )}
              role={role}
              onClick={() => handleRoleClick(role.value)}
            />
          ))}
        </form>
        <div className="ml-auto mr-0 flex flex-col-reverse pt-4 sm:flex-row sm:justify-between sm:space-x-2">
          <DialogFooter>
            <EditUserRolesButton
              roles={selectedRoles}
              setIsUserEditFormOpen={setIsOpen}
              userId={userId}
            />
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
