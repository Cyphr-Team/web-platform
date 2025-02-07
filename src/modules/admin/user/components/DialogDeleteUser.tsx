import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import { useDeleteUser } from "@/modules/admin/user/hooks/useDeleteUser.tsx"
import { type UserDetailInfo } from "@/types/user.type.ts"

interface DialogDeleteUserProps {
  listUser: UserDetailInfo[]
  open: boolean
  setOpen: (open: boolean) => void
}

function DialogDeleteUser({ listUser, open, setOpen }: DialogDeleteUserProps) {
  const { mutateAsync } = useDeleteUser()

  const handleDelete = () => {
    mutateAsync({ userIds: listUser.map((user) => user.id) })
    setOpen(false)
  }

  const getDescriptionQuantity = () => {
    if (listUser.length === 1) {
      return "This user"
    }

    return `These ${listUser.length} users`
  }

  const getTitleQuantity = () => {
    if (listUser.length === 1) {
      return `Delete ${listUser[0].name}`
    }

    return `Delete ${listUser.length} team members`
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
