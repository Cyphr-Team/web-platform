import React, { useState } from "react"
import { ButtonLoading } from "@/components/ui/button.tsx"
import { MinusCircle } from "lucide-react"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import { useDeactivateUser } from "@/modules/admin/user/hooks/useDeactivateUser.ts"

export const ButtonDeactivateUser = ({ userId }: { userId: string }) => {
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
    setIsConfirmed(true)
  }

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen(true)
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
            This action will remove their access from the organization.
          </strong>{" "}
          Are you sure you want to proceed?
        </span>
      }
      actionClassName="bg-red-500 hover:bg-red-600 text-white"
    >
      <ButtonLoading
        variant="ghost"
        type="submit"
        id={userId}
        isLoading={isPending}
        className={
          "h-max cursor-pointer text-red-900 p-2 space-x-2 flex flex-row w-full"
        }
        onClick={handleOpen}
        disabled={isConfirmed}
      >
        <MinusCircle className="w-5 h-5" /> <span>Deactivate</span>
        {!isPending}
      </ButtonLoading>
    </CustomAlertDialog>
  )
}
