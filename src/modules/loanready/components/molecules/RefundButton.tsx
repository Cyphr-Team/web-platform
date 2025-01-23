import React from "react"
import { ButtonLoading } from "@/components/ui/button.tsx"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import { useProceedRefund } from "@/modules/admin/user/hooks/useProceedRefund"
import { RefundDecisionStatus } from "@/types/transaction.type"
import { useBoolean } from "@/hooks"
import { USDFormatter } from "@/modules/form-template/components/molecules/RHFCurrencyInput"

export interface RefundButtonProps {
  transactionId: string
  email: string
  amount: string
  refundDecision: RefundDecisionStatus
  actionText: string
}

export function RefundButton({
  transactionId,
  email,
  amount,
  refundDecision,
  actionText
}: RefundButtonProps) {
  const isOpen = useBoolean(false)
  const { mutate, isPending } = useProceedRefund()
  const isConfirmed = useBoolean(false)

  const handleRefund = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    mutate({
      transactionId,
      refundDecision
    })
    isOpen.onFalse()
    isConfirmed.onTrue()
  }

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    isOpen.onTrue()
  }

  return (
    <CustomAlertDialog
      actionClassName="text-white"
      cancelText="Cancel"
      confirmText="Confirm"
      description={
        refundDecision === RefundDecisionStatus.APPROVED ||
        refundDecision === RefundDecisionStatus.ISSUE_REFUND ? (
          <span>
            Refund{" "}
            <strong>
              {USDFormatter(amount, { symbol: "$", precision: 2 }).format()}
            </strong>{" "}
            to <strong>{email}</strong>.
          </span>
        ) : (
          <span>
            Are you sure you want to deny refund request for{" "}
            <strong>{email}</strong>?
          </span>
        )
      }
      isOpen={isOpen.value}
      title={
        refundDecision === RefundDecisionStatus.APPROVED ||
        refundDecision === RefundDecisionStatus.ISSUE_REFUND
          ? "Refund payment"
          : "Deny refund request"
      }
      onCanceled={(e) => {
        e.stopPropagation()
        isOpen.onFalse()
      }}
      onConfirmed={handleRefund}
    >
      <ButtonLoading
        className="flex h-max w-full cursor-pointer flex-row space-x-2 p-2 justify-start"
        disabled={isConfirmed.value}
        id={transactionId}
        isLoading={isPending}
        type="submit"
        variant="ghost"
        onClick={handleOpen}
      >
        {actionText}
      </ButtonLoading>
    </CustomAlertDialog>
  )
}
