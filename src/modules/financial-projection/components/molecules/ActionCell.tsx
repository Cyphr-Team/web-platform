import { useBoolean } from "@/hooks"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx"
import { Button } from "@/components/ui/button.tsx"
import { MoreHorizontal } from "lucide-react"
import { useCallback } from "react"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog.tsx"

interface ActionCellProps {
  onEdit: CallableFunction
  onDelete: CallableFunction
}

const ActionCell = ({ onEdit, onDelete }: ActionCellProps) => {
  const { value, setValue, onTrue, onFalse } = useBoolean(false)

  const handleDelete = useCallback(() => {
    onDelete()
    onFalse()
  }, [onDelete, onFalse])

  const handleEdit = useCallback(() => {
    onEdit()
    onFalse()
  }, [onEdit, onFalse])

  return (
    <DropdownMenu open={value} onOpenChange={setValue}>
      <DropdownMenuTrigger>
        <div className="w-full flex flex-row justify-between">
          <Button variant="outline" className="w-fit m-0 px-4" onClick={onTrue}>
            <MoreHorizontal />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent asChild className="p-0">
        <div className="w-full grid grid-cols-1 justify-end">
          <Button
            className="rounded-none"
            variant="outline"
            onClick={handleEdit}
          >
            Edit
          </Button>
          <CustomAlertDialog
            onConfirmed={handleDelete}
            title="Delete direct const?"
            cancelText="Cancel"
            confirmText="Delete"
            description="Are you sure you want to save and close this loan application?"
          >
            <Button className="rounded-none" variant="destructive">
              Delete
            </Button>
          </CustomAlertDialog>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ActionCell
