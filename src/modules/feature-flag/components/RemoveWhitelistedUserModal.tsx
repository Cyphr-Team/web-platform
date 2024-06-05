import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"

type Props = {
  id: string
}

export const RemoveWhitelistedUserModal: React.FC<Props> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false)

  const confirmDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen(false)
    console.log(`Removing user with id: ${id}`)
  }

  return (
    <CustomAlertDialog
      isOpen={isOpen}
      onConfirmed={confirmDelete}
      onCanceled={(e) => {
        e.stopPropagation()
        setIsOpen(false)
      }}
      title="Remove this user?"
      cancelText="Cancel"
      confirmText="Confirm"
      description={<span> Remove this user from the whitelist?</span>}
      actionClassName="bg-red-500 hover:bg-red-600 text-white"
    >
      <Button
        size="sm"
        className="bg-error"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsOpen(true)
        }}
      >
        <Trash size={16} />
      </Button>
    </CustomAlertDialog>
  )
}
