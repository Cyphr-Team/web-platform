import React, { useState } from "react"
import { ButtonLoading } from "@/components/ui/button.tsx"
import { MinusCircle } from "lucide-react"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import { useDeactivateUser } from "@/modules/admin/user/hooks/useDeactivateUser.ts"

export function ButtonDeactivateUser({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const { mutate, isPending } = useDeactivateUser()
  const [isConfirmed, setIsConfirmed] = useState(false)

  const handleDeactivateUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    mutate({ userId: userId })
    setIsOpen(false)
    setIsConfirmed(true)
  }

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen(true)
  }

  return (
    <CustomAlertDialog
      actionClassName="bg-red-500 hover:bg-red-600 text-white"
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
      isOpen={isOpen}
      title="Deactivate this account?"
      onCanceled={(e) => {
        e.stopPropagation()
        setIsOpen(false)
      }}
      onConfirmed={handleDeactivateUser}
    >
      <ButtonLoading
        className="h-max cursor-pointer text-red-900 p-2 space-x-2 flex flex-row w-full"
        disabled={isConfirmed}
        id={userId}
        isLoading={isPending}
        type="submit"
        variant="ghost"
        onClick={handleOpen}
      >
        <MinusCircle className="w-5 h-5" /> <span>Deactivate</span>
        {!isPending}
      </ButtonLoading>
    </CustomAlertDialog>
  )
}
