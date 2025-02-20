import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { X } from "lucide-react"
import {
  LoanReadyPlan,
  LoanReadyPlanEnum
} from "@/modules/loanready/constants/package.ts"
import { Button } from "@/components/ui/button.tsx"

interface ThankYouDialogProps {
  plan: LoanReadyPlanEnum
  isOpen: boolean
  onClose: () => void
}

export function ThankYouDialog({ plan, isOpen, onClose }: ThankYouDialogProps) {
  const planText =
    plan === LoanReadyPlanEnum.BASIC
      ? LoanReadyPlan[LoanReadyPlanEnum.BASIC].name
      : LoanReadyPlan[LoanReadyPlanEnum.PLUS].name
  const actionText =
    plan === LoanReadyPlanEnum.UPGRADE ? "upgraded to" : "purchased"

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="w-100 pb-10">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between">
            <span>Thank you for the order</span>
            <Button size="icon" variant="ghost" onClick={onClose}>
              <X />
            </Button>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="text-base">
          You’ve successfully {actionText}{" "}
          <span className="font-semibold text-black">{planText}</span>.
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  )
}
