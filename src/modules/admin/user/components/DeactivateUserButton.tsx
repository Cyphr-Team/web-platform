import React, { useState } from "react"
import { ButtonLoading } from "@/components/ui/button.tsx"
import { PlusCircle, Send } from "lucide-react"
import { cn } from "@/lib/utils.ts"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import { useDeactivateUser } from "@/modules/admin/user/hooks/useDeactivateUser.ts"

export const ButtonDeactivateUser = ({
  userId,
  setIsUserEditFormOpen
}: {
  userId: string
  setIsUserEditFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { mutate, isPending } = useDeactivateUser()
  const [isConfirmed, setIsConfirmed] = useState(false)

  const handleDeactivateUser = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    e.stopPropagation()
    mutate({ userId: userId })
    setIsOpen(false)
    setIsUserEditFormOpen(false)
    setIsConfirmed(true)
  }

  return (
    <CustomAlertDialog
      isOpen={isOpen}
      onConfirmed={handleDeactivateUser}
      onCanceled={(e) => {
        e.stopPropagation()
        setIsOpen(false)
      }}
      title="Deactivate this account?"
      cancelText="Cancel"
      confirmText="Confirm"
      description={
        <span>
          <strong>
            This action will deactivate them from the organization.
          </strong>{" "}
          Are you sure you want to proceed?
        </span>
      }
      actionClassName="bg-red-500 hover:bg-red-600 text-white"
    >
      <ButtonLoading
        type="submit"
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
