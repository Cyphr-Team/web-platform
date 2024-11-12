import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/ui/icons.tsx"

interface SelectApplicationDialogProps {
  isOpen: boolean
  onClose: VoidFunction
  onConfirmed: (isNewApplication: boolean) => void
}

export function SelectApplicationDialog({
  isOpen,
  onClose,
  onConfirmed
}: SelectApplicationDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="flex h-2/3 flex-col px-0 pb-0">
        <AlertDialogHeader className="px-6">
          <AlertDialogTitle>Select application</AlertDialogTitle>
          <AlertDialogDescription className="break-keep">
            Choose an application below to use for Loan Ready+, or start a new
            one if you prefer. By selecting 'Done,' you confirm your purchase.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="mt-3 grow space-y-3 px-6">
          <p className="text-base font-semibold">Applications</p>
          <Separator />
          {/* Application option 1 */}
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <p className="font-medium">Larry’s Latte</p>
              <p className="text-gray-600">Submitted on June 6, 2023</p>
            </div>
            <label className="relative flex cursor-pointer items-center">
              <input
                className="peer size-5 cursor-pointer appearance-none rounded-full border border-slate-300 transition-all checked:border-slate-400"
                name="application"
                type="radio"
              />
              <span className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-800 opacity-0 transition-opacity duration-200 peer-checked:opacity-100" />
            </label>
          </div>
          <Separator />
          {/* Application option 2 */}
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <p className="font-medium">Larry’s Latte</p>
              <p className="text-gray-600">Submitted on June 6, 2023</p>
            </div>
            <label className="relative flex cursor-pointer items-center">
              <input
                className="peer size-5 cursor-pointer appearance-none rounded-full border border-slate-300 transition-all checked:border-slate-400"
                name="application"
                type="radio"
              />
              <span className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-800 opacity-0 transition-opacity duration-200 peer-checked:opacity-100" />
            </label>
          </div>
        </div>
        <Separator />
        <AlertDialogFooter className="px-6 pb-4 sm:justify-between">
          <Button variant="outline" onClick={() => onConfirmed(true)}>
            <Icons.newApplication className="mr-1" />
            New application
          </Button>
          <div className="flex space-x-2">
            <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => onConfirmed(false)}>
              Done
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
