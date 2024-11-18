import { ButtonLoading } from "@/components/ui/button"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import { useState } from "react"
import { useRevokeInvitation } from "@/modules/admin/user/hooks/useRevokeInvitation.ts"
import { cn } from "@/lib/utils.ts"

export function ButtonRevokeInvitation({
  invitationId
}: {
  invitationId: string
}) {
  const { mutate, isPending } = useRevokeInvitation()
  const [isOpen, setIsOpen] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)

  const handleRevokeInvitation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    mutate({ invitationId: invitationId })
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
          <strong>Revoke this invitation?</strong> This action is permanent and
          cannot be undone.
        </span>
      }
      isOpen={isOpen}
      title="Revoke invitation?"
      onCanceled={(e) => {
        e.stopPropagation()
        setIsOpen(false)
      }}
      onConfirmed={handleRevokeInvitation}
    >
      <ButtonLoading
        className={cn(
          "w-full cursor-pointer text-center text-destructive",
          isConfirmed
            ? "bg-gray-100"
            : "hover:bg-gray-100 hover:text-destructive"
        )}
        disabled={isConfirmed}
        isLoading={isPending}
        type="button"
        variant="ghost"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsOpen(true)
        }}
      >
        Revoke invitation
      </ButtonLoading>
    </CustomAlertDialog>
  )
}
