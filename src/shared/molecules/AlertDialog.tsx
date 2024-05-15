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
  cancelText?: string
  confirmText?: string
  onCanceled?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onConfirmed?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
export const CustomAlertDialog: React.FC<Props> = ({
  children,
  title,
  isOpen,
  onCanceled,
  onConfirmed,
  confirmText = null,
  cancelText = null,
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
          {cancelText && (
            <AlertDialogCancel onClick={onCanceled}>
              {cancelText}
            </AlertDialogCancel>
          )}
          {confirmText && (
            <AlertDialogAction
              onClick={onConfirmed}
              className={actionClassName}
            >
              {confirmText}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
