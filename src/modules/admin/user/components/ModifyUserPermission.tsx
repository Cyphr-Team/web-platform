import { useEffect, useState } from "react"
import { EditUserRolesButton } from "@/modules/admin/user/components/EditUserRolesButton.tsx"
import { EDIT_ROLES } from "@/modules/admin/user/constants/edit-roles.constants.ts"
import { UserRoles } from "@/types/user.type.ts"
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
import { ButtonDeactivateUser } from "@/modules/admin/user/components/DeactivateUserButton.tsx"
import { Edit } from "lucide-react"
import { Button } from "@/components/ui/button.tsx"

export const ModifyUserPermission = ({
  userId,
  roles
}: {
  userId: string
  roles: UserRoles[]
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRoles, setSelectedRoles] = useState<UserRoles[]>([])
  const isLoanOfficer = (role: UserRoles): boolean => {
    return role === UserRoles.LOAN_OFFICER
  }

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
          variant="ghost"
          id={userId}
          size="icon"
          style={{
            padding: "0px"
          }}
        >
          <Edit className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Modify User's permission</DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4 p-4 bg-gray-200 rounded-lg">
          {EDIT_ROLES.map((role) => (
            <MultiChoices
              role={role}
              isSelected={selectedRoles.includes(
                role.value.toLowerCase() as UserRoles
              )}
              onClick={() => handleRoleClick(role.value)}
              description={
                isLoanOfficer(role.value)
                  ? "Manages loan applications, interacts with borrowers, ensures lending process efficiency."
                  : "Manages administrative aspects, ensures platform functionality, and oversees user management."
              }
              itemClassName={
                selectedRoles.includes(role.value.toLowerCase() as UserRoles)
                  ? "bg-white"
                  : "hover:bg-gray-300"
              }
              iconClassName={
                selectedRoles.includes(role.value.toLowerCase() as UserRoles)
                  ? "text-primary"
                  : "hover:cursor-pointer hover:text-destructive"
              }
            />
          ))}
        </form>
        <div className="flex flex-col-reverse sm:flex-row sm:space-x-2 sm:justify-between pt-4">
          <DialogFooter>
            <ButtonDeactivateUser
              userId={userId}
              setIsUserEditFormOpen={setIsOpen}
            />
          </DialogFooter>
          <DialogFooter>
            <EditUserRolesButton
              userId={userId}
              roles={selectedRoles}
              setIsUserEditFormOpen={setIsOpen}
            />
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
