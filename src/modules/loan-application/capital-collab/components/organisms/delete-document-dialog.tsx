import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { type CCLoanDocument } from "@/types/loan-document.type"

interface DeleteDocumentDialogProps {
  row: CCLoanDocument
  onDelete: (row: CCLoanDocument) => void
}

function DeleteDocumentDialog(props: DeleteDocumentDialogProps) {
  const { row, onDelete } = props
  const handleDelete = () => {
    onDelete(row)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">
          <Icons.trash className="w-5 h-5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete file?</AlertDialogTitle>
          <AlertDialogDescription className="break-keep">
            Are you sure you want to delete&nbsp;
            <strong>{row.originFileName}</strong> from your account?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteDocumentDialog
