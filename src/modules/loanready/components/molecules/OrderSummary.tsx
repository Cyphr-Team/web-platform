import { Separator } from "@/components/ui/separator"
import {
  LoanReadyPlanEnum,
  LoanReadyPlanOptions
} from "@/modules/loanready/constants/package"
import { toCurrency } from "@/utils"

interface OrderSummaryProps {
  selectedPlan: LoanReadyPlanEnum
}

export function OrderSummary({ selectedPlan }: OrderSummaryProps) {
  const selectedPlanDetail =
    LoanReadyPlanOptions.find((plan) => plan.value === selectedPlan) || null

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-[#252828]">
        Order Summary
      </h3>
      <Separator />
      {selectedPlanDetail ? (
        <div className="py-4 text-sm">
          <div className="grid grid-cols-[3fr_1fr] gap-4">
            <div>
              <p className="font-medium text-text-foreground">
                {selectedPlanDetail.value === LoanReadyPlanEnum.UPGRADE &&
                  "Upgrade to "}
                {selectedPlanDetail.label}
              </p>
              <p className="mt-1 font-normal">
                {toCurrency(selectedPlanDetail.price / 100)} x 1 assessment
              </p>
            </div>
            <div className="flex items-center justify-end font-medium text-text-foreground">
              {toCurrency(selectedPlanDetail.price / 100)}
            </div>
          </div>
          <Separator className="my-4" />

          {/* Total due */}
          <div className="mt-2 flex justify-between font-semibold text-text-foreground">
            <p>Total Due</p>
            <p>{toCurrency(selectedPlanDetail.price / 100)}</p>
          </div>
        </div>
      ) : null}
    </div>
  )
}
