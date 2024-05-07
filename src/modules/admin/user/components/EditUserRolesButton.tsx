import React, { useState } from "react"
import { ButtonLoading } from "@/components/ui/button.tsx"
import { PlusCircle, Send } from "lucide-react"
import { useEditUserRole } from "@/modules/admin/user/hooks/useEditUserRole.ts"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog.tsx"
import { EDIT_ROLES } from "@/modules/admin/user/constants/edit-roles.constants.ts"
import { cn } from "@/lib/utils.ts"
import { UserRoles } from "@/types/user.type.ts"
export const EditUserRolesButton = ({
  userId,
  roles,
  setIsUserEditFormOpen
}: {
  userId: string
  roles: UserRoles[]
  setIsUserEditFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const { mutate, isPending } = useEditUserRole({ userId, roles })

  const handleEditUserRoles = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    e.stopPropagation()
    mutate({ userId: userId, newRoles: roles.filter((role) => role !== null) })
    setIsOpen(false)
    setIsUserEditFormOpen(false)
    setIsConfirmed(true)
  }
  const labels = EDIT_ROLES.map((roleValue) => {
    const role = roles.find((role) => role === roleValue.value.toLowerCase())
    return !role ? null : roleValue.label
  })

  return (
    <CustomAlertDialog
      isOpen={isOpen}
      onConfirmed={handleEditUserRoles}
      onCanceled={(e) => {
        e.stopPropagation()
        setIsOpen(false)
      }}
      title="Are you sure you want to update the roles for this user?"
      cancelText="Cancel"
      confirmText="Confirm"
      description={
        <span>
          They will now have the roles of{" "}
          {labels.filter((role) => role !== null).join(" and ")}.
        </span>
      }
    >
      <ButtonLoading
        type="button"
        isLoading={isPending}
        className={cn("h-8 w-full cursor-pointer text-center")}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsOpen(true)
        }}
        disabled={isConfirmed}
      >
        <PlusCircle size={16} className="text-sm mr-1.5" />
        Submit {!isPending && <Send className="ml-1.5" size="16" />}
      </ButtonLoading>
    </CustomAlertDialog>
  )
}
