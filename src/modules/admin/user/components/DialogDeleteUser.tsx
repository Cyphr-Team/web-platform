import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"

interface DialogDeleteUserProps {
  listUser: string[]
  onDelete: (listUser: string[]) => void
  open: boolean
  setOpen: (open: boolean) => void
}

function DialogDeleteUser(props: DialogDeleteUserProps) {
  const { listUser, onDelete, open, setOpen } = props

  const handleDelete = () => {
    onDelete(listUser)
  }

  const getDescriptionQuantity = () => {
    if (listUser.length === 1) {
      return "This user"
    }

    return `These ${listUser.length} users`
  }

  const getTitleQuantity = () => {
    if (listUser.length === 1) {
      return `Delete ${listUser.length} team member`
    }

    return `These ${listUser.length} team members`
  }

  return (
    <CustomAlertDialog
      cancelText="Cancel"
      confirmText="Confirm"
      description={
        getDescriptionQuantity() +
        " will no longer have access to the platform. This action cannot be undone."
      }
      isOpen={open}
      title={getTitleQuantity()}
      onCanceled={() => setOpen(false)}
      onConfirmed={handleDelete}
    />
  )
}

export default DialogDeleteUser
