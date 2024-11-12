import { Separator } from "@/components/ui/separator"
import {
  LoanReadyPlanOptions,
  type LoanReadyPlanEnum
} from "@/modules/loanready/constants/package"
import { toCurrency } from "@/utils"

interface OrderSummaryProps {
  selectedPlan: LoanReadyPlanEnum
}

export function OrderSummary({ selectedPlan }: OrderSummaryProps) {
  const selectedPlanDetail =
    (selectedPlan && LoanReadyPlanOptions[selectedPlan]) || null

  return (
    <div>
      <h3 className="text-lg text-[#252828] font-semibold mb-4">
        Order summary
      </h3>
      <Separator />
      {selectedPlanDetail ? (
        <div className="py-4 text-sm">
          <div className="grid grid-cols-[3fr_1fr] gap-4">
            <div>
              <p className="font-medium text-text-foreground">
                {selectedPlanDetail.label}
              </p>
              <p className="font-normal mt-1">
                {toCurrency(selectedPlanDetail.price / 100)} x 1 application
              </p>
            </div>
            <div className="flex items-center justify-end font-medium text-text-foreground">
              {toCurrency(selectedPlanDetail.price / 100)}
            </div>
          </div>
          <Separator className="my-4" />

          {/* Total due */}
          <div className="flex justify-between text-text-foreground font-semibold mt-2">
            <p>Total Due</p>
            <p>{toCurrency(selectedPlanDetail.price / 100)}</p>
          </div>
        </div>
      ) : null}
    </div>
  )
}
