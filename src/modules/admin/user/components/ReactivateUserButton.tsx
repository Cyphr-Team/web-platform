import React, { useState } from "react"
import { ButtonLoading } from "@/components/ui/button.tsx"
import { PlusCircle } from "lucide-react"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import { useReactivateUser } from "@/modules/admin/user/hooks/useReactivateUser.ts"

export const ButtonReactivateUser = ({ userId }: { userId: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { mutate, isPending } = useReactivateUser()
  const [isConfirmed, setIsConfirmed] = useState(false)

  const handleReactivateUser = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    e.stopPropagation()
    mutate({ userId: userId })
    setIsOpen(false)
    setIsConfirmed(true)
  }

  return (
    <CustomAlertDialog
      isOpen={isOpen}
      onConfirmed={handleReactivateUser}
      onCanceled={(e) => {
        e.stopPropagation()
        setIsOpen(false)
      }}
      title="Reactivate this account?"
      cancelText="Cancel"
      confirmText="Confirm"
      description={
        <span>
          <strong>
            This action will reactivate the user within the organization.
          </strong>{" "}
          Are you sure you want to proceed?
        </span>
      }
      actionClassName="bg-red-500 hover:bg-red-600 text-white"
    >
      <ButtonLoading
        type="submit"
        isLoading={isPending}
        variant="ghost"
        id={userId}
        size="icon"
        style={{
          padding: "0px"
        }}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsOpen(true)
        }}
        disabled={isConfirmed}
      >
        {!isPending && <PlusCircle className="w-5 h-5" />}
      </ButtonLoading>
    </CustomAlertDialog>
  )
}
