import { ButtonLoading } from "@/components/ui/button"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import { useState } from "react"
import { useRevokeInvitation } from "@/modules/admin/user/hooks/useRevokeInvitation.ts"
import { cn } from "@/lib/utils.ts"

export const ButtonRevokeInvitation = ({
  invitationId
}: {
  invitationId: string
}) => {
  const { mutate, isPending } = useRevokeInvitation()
  const [isOpen, setIsOpen] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)

  const handleRevokeInvitation = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    e.stopPropagation()
    mutate({ invitationId: invitationId })
    setIsOpen(false)
    setIsConfirmed(true)
  }

  return (
    <CustomAlertDialog
      isOpen={isOpen}
      onConfirmed={handleRevokeInvitation}
      onCanceled={(e) => {
        e.stopPropagation()
        setIsOpen(false)
      }}
      title="Revoke invitation?"
      cancelText="Cancel"
      confirmText="Confirm"
      description={
        <span>
          <strong>Revoke this invitation?</strong> This action is permanent and
          cannot be undone.
        </span>
      }
      actionClassName="bg-red-500 hover:bg-red-600 text-white"
    >
      <ButtonLoading
        isLoading={isPending}
        variant="ghost"
        className={cn(
          "w-full text-destructive cursor-pointer text-center",
          isConfirmed
            ? "bg-gray-100"
            : "hover:bg-gray-100 hover:text-destructive"
        )}
        type="button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsOpen(true)
        }}
        disabled={isConfirmed}
      >
        Revoke invitation
      </ButtonLoading>
    </CustomAlertDialog>
  )
}
