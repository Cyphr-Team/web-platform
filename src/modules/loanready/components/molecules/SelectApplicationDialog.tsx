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
}

export function SelectApplicationDialog({
  isOpen,
  onClose
}: SelectApplicationDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="h-2/3 flex flex-col px-0 pb-0">
        <AlertDialogHeader className="px-6">
          <AlertDialogTitle>Select application</AlertDialogTitle>
          <AlertDialogDescription className="break-keep">
            Choose an application below to use for Loan Ready+, or start a new
            one if you prefer. By selecting 'Done,' you confirm your purchase.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-3 mt-3 flex-grow px-6">
          <p className="text-base font-semibold">Applications</p>
          <Separator />
          {/* Application option 1 */}
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <p className="font-medium">Larry’s Latte</p>
              <p className="text-gray-600">Submitted on June 6, 2023</p>
            </div>
            <label className="relative flex items-center cursor-pointer">
              <input
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                name="application"
                type="radio"
              />
              <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </label>
          </div>
          <Separator />
          {/* Application option 2 */}
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <p className="font-medium">Larry’s Latte</p>
              <p className="text-gray-600">Submitted on June 6, 2023</p>
            </div>
            <label className="relative flex items-center cursor-pointer">
              <input
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                name="application"
                type="radio"
              />
              <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </label>
          </div>
        </div>
        <Separator />
        <AlertDialogFooter className="sm:justify-between px-6 pb-4">
          <Button variant="outline">
            <Icons.newApplication className="mr-1" />
            New application
          </Button>
          <div className="flex space-x-2">
            <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onClose}>Done</AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
