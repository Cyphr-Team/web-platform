import { Separator } from "@/components/ui/separator"

interface OrderSummaryProps {
  selectedPlanDetail: { label: string; price: number } | null
}

export function OrderSummary({ selectedPlanDetail }: OrderSummaryProps) {
  return (
    <div>
      <h3 className="text-[18px] text-[#252828] font-semibold mb-4">
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
                ${selectedPlanDetail.price}.00 x 1 application
              </p>
            </div>
            <div className="flex items-center justify-end font-medium text-text-foreground">
              ${selectedPlanDetail.price}.00
            </div>
          </div>
          <Separator className="my-4" />

          {/* Total due */}
          <div className="flex justify-between text-text-foreground font-semibold mt-2">
            <p>Total Due</p>
            <p>${selectedPlanDetail.price}.00</p>
          </div>
        </div>
      ) : null}
    </div>
  )
}
