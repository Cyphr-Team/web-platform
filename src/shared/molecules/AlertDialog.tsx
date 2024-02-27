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

type Props = {
  title: string
  actionClassName?: string
  description?: React.ReactNode
  children?: React.ReactNode
  isOpen?: boolean
  cancelText: string
  confirmText: string
  onCanceled?: () => void
  onConfirmed?: () => void
}
export const CustomAlertDialog: React.FC<Props> = ({
  children,
  title,
  isOpen,
  onCanceled,
  onConfirmed,
  confirmText,
  cancelText,
  description,
  actionClassName
}) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCanceled}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirmed} className={actionClassName}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
