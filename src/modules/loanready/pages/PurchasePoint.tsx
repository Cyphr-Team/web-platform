import { PaymentLayout } from "@/modules/loanready/components/layouts/PaymentLayout"
import { PaymentDetail } from "@/modules/loanready/components/organisms/PaymentDetail"

export function Component() {
  return (
    <PaymentLayout>
      <PaymentDetail />
    </PaymentLayout>
  )
}

Component.displayName = "PurchasePoint"
