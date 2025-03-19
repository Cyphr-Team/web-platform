import React, { useState } from "react"
import { ButtonLoading } from "@/components/ui/button.tsx"
import { PlusCircle } from "lucide-react"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import { useReactivateUser } from "@/modules/admin/user/hooks/useReactivateUser.ts"

export function ButtonReactivateUser({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const { mutate, isPending } = useReactivateUser()
  const [isConfirmed, setIsConfirmed] = useState(false)

  const handleReactivateUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    mutate({ userId: userId })
    setIsOpen(false)
    setIsConfirmed(true)
  }

  return (
    <CustomAlertDialog
      actionClassName="bg-red-500 text-white hover:bg-red-600"
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
      isOpen={isOpen}
      title="Reactivate this account?"
      onCanceled={(e) => {
        e.stopPropagation()
        setIsOpen(false)
      }}
      onConfirmed={handleReactivateUser}
    >
      <ButtonLoading
        className="flex w-full flex-row space-x-2 p-2 text-green-900"
        disabled={isConfirmed}
        id={userId}
        isLoading={isPending}
        style={{
          padding: "0px"
        }}
        type="submit"
        variant="ghost"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsOpen(true)
        }}
      >
        {!isPending && (
          <>
            <PlusCircle className="size-5" />
            <span>Reactivate</span>
          </>
        )}
      </ButtonLoading>
    </CustomAlertDialog>
  )
}
