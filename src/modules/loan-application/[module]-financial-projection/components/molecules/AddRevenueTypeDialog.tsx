import { Dispatch, SetStateAction, useCallback } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import { RevenueType } from "@/modules/loan-application/[module]-financial-projection/components/organisms/RevenueForm.tsx"
import { RevenueTypeSelection } from "@/modules/loan-application/[module]-financial-projection/components/molecules/RevenueTypeSelection.tsx"

interface AddRevenueTypeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: VoidFunction

  currentFormType: RevenueType[]
  setCurrentFormType: Dispatch<SetStateAction<RevenueType[]>>
}

export const AddRevenueTypeDialog = (props: AddRevenueTypeDialogProps) => {
  const { open, onOpenChange, onConfirm, currentFormType, setCurrentFormType } =
    props

  const handleAbort = useCallback(() => {
    onOpenChange(false)
  }, [onOpenChange])

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="w-[40rem] max-w-[40rem]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl mb-2">
            Add revenue type
          </AlertDialogTitle>
        </AlertDialogHeader>

        <RevenueTypeSelection
          setCurrentFormType={setCurrentFormType}
          currentFormType={currentFormType}
        />
        <Separator />
        <AlertDialogFooter className="mt-8">
          <AlertDialogCancel onClick={handleAbort}>Cancel</AlertDialogCancel>
          <AlertDialogAction className="w-20" onClick={onConfirm}>
            Add
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
