import React, { useState } from "react"
import { ButtonLoading } from "@/components/ui/button.tsx"
import { PlusCircle } from "lucide-react"
import { useEditUserRole } from "@/modules/admin/user/hooks/useEditUserRole.ts"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog.tsx"
import { editRoleOptions } from "@/modules/admin/user/constants/roles.constants.ts"
import { cn } from "@/lib/utils.ts"
import { type UserRoles } from "@/types/user.type.ts"

export function EditUserRolesButton({
  userId,
  roles,
  setIsUserEditFormOpen
}: {
  userId: string
  roles: UserRoles[]
  setIsUserEditFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const { mutate, isPending } = useEditUserRole({ userId, roles })

  const handleEditUserRoles = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    mutate({ userId: userId, newRoles: roles.filter((role) => role !== null) })
    setIsOpen(false)
    setIsConfirmed(true)
    setIsUserEditFormOpen(false)
  }
  const labels = editRoleOptions().map((roleValue) => {
    const role = roles.find((role) => role === roleValue.value.toLowerCase())

    return !role ? null : roleValue.label
  })

  return (
    <>
      {roles.length > 0 ? (
        <CustomAlertDialog
          cancelText="Cancel"
          confirmText="Confirm"
          description={
            <span>
              This user will now have the roles of{" "}
              <strong>
                {labels.filter((role) => role !== null).join(" and ")}
              </strong>
            </span>
          }
          isOpen={isOpen}
          title="Are you sure you want to modify the roles for this user?"
          onCanceled={(e) => {
            e.stopPropagation()
            setIsOpen(false)
          }}
          onConfirmed={handleEditUserRoles}
        />
      ) : (
        <CustomAlertDialog
          cancelText="Cancel"
          isOpen={isOpen}
          title="You are not allowed to remove all roles for this user"
          onCanceled={(e) => {
            e.stopPropagation()
            setIsOpen(false)
          }}
        />
      )}
      <ButtonLoading
        className={cn("h-max cursor-pointer text-center")}
        disabled={isConfirmed}
        id={userId}
        isLoading={isPending}
        type="button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsOpen(true)
        }}
      >
        <PlusCircle className="mr-1.5 text-sm" size={16} />
        Submit {!isPending}
      </ButtonLoading>
    </>
  )
}
