import type { Row } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button, ButtonLoading } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { useBoolean } from "@/hooks"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { LoanReadyRefundReasons } from "@/modules/loanready/constants/package"

import type { LoanReadyRefundReasonEnum } from "@/modules/loanready/constants/package"
import { useState } from "react"
import useCreateRefundRequest from "@/modules/loanready/hooks/refund/useCreateRefundRequest"
import { type Transaction } from "@/types/transaction.type"

interface RefundActionProps {
  row: Row<Transaction>
}

function RefundTableAction(props: RefundActionProps) {
  const { value: openAlert, setValue, onTrue, onFalse } = useBoolean(false)
  const [refundReason, setRefundReason] = useState<LoanReadyRefundReasonEnum>()
  const { mutate, isPending } = useCreateRefundRequest()
  const { row } = props

  const requestRefund = () => {
    if (!refundReason) return
    mutate(
      {
        paymentTransactionId: row.original.id,
        refundReason
      },
      {
        onSettled: onFalse
      }
    )
  }

  const handleSelectRefundReason = (reason: LoanReadyRefundReasonEnum) => {
    setRefundReason(reason)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button className="text-center" size="icon" variant="ghost">
            <MoreHorizontal className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuItem role="button" onClick={onTrue}>
            Request refund
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={openAlert} onOpenChange={setValue}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-semibold">
              Please select a reason for a refund
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className="text-sm text-[#252828]">
            Click 'Confirm' to proceed with requesting your refund.
          </div>
          <Select onValueChange={handleSelectRefundReason}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Please select reason" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(LoanReadyRefundReasons).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <ButtonLoading
              disabled={Boolean(!refundReason)}
              isLoading={isPending}
              onClick={requestRefund}
            >
              Confirm
            </ButtonLoading>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default RefundTableAction

export enum RefundStatus {
  PAID = "PAID",
  REQUESTED_REFUND = "REQUESTED_REFUND",
  REFUNDED = "REFUNDED",
  DENIED = "DENIED"
}
