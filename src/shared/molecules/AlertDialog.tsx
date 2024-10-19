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
import React, { type PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
  title: string
  actionClassName?: string
  description?: React.ReactNode
  isOpen?: boolean
  cancelText?: string
  confirmText?: string
  onCanceled?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onConfirmed?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export function CustomAlertDialog(props: Props) {
  const {
    children,
    title,
    isOpen,
    onCanceled,
    onConfirmed,
    confirmText = null,
    cancelText = null,
    description,
    actionClassName
  } = props

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {cancelText ? (
            <AlertDialogCancel onClick={onCanceled}>
              {cancelText}
            </AlertDialogCancel>
          ) : null}
          {confirmText ? (
            <AlertDialogAction
              className={actionClassName}
              onClick={onConfirmed}
            >
              {confirmText}
            </AlertDialogAction>
          ) : null}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
