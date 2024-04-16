import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ConnectBankAccountsButton } from "../molecules/out-of-box/ConnectBankAccountsButton"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { useTenant } from "@/providers/tenant-provider"
import { isLoanReady } from "@/utils/domain.utils"

import { useLoanApplicationContext } from "../../providers"
import { LOAN_APPLICATION_STEP_STATUS } from "../../constants"
import { cn } from "@/lib/utils"
export const CashFlowVerificationForm = () => {
  const { tenantData } = useTenant()

  const { progress } = useLoanApplicationContext()

  const [isConfirmedConnect, setIsConfirmedConnect] = useState(false)

  return (
    <Card
      className={cn(
        "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6",
        "md:col-span-6 md:col-start-2 md:mx-0"
      )}
    >
      <h5 className="text-lg font-semibold">Cash Flow Verification</h5>
      <Separator />
      <div className="flex flex-col gap-y-2xl gap-x-4xl">
        <div className="flex flex-col gap-y-sm">
          <p className="text-sm text-text-secondary font-medium">
            Connect your bank accounts securely. This step helps us understand
            your business financial health through cash flow data and expedite
            the loan approval process.
          </p>
          <p className="text-sm text-text-secondary font-bold my-2">
            How it works:
          </p>
          <p className="text-sm text-text-secondary font-medium">
            1. We use a secure and trusted service called Plaid to connect to
            your bank accounts. Plaid is a industry-leading provider used by
            millions of businesses and individuals to safely share financial
            data.
          </p>
          <p className="text-sm text-text-secondary font-medium">
            2. You'll be directed to a secure Plaid login where you can select
            the bank accounts you want to connect. Plaid will never ask for your
            full login credentials or passwords.
          </p>
          <p className="text-sm text-text-secondary font-medium">
            3. Once connected, Plaid will securely share your recent transaction
            history with us. This allows us to verify your income and expenses,
            helping us determine the best loan option for your business needs.
          </p>
        </div>
        {isLoanReady() && (
          <div className="text-sm">
            <em>
              <span className="font-semibold">Note:</span> Some banks are not
              currently available as options because we are still working with
              them to establish secure connections.
            </em>
          </div>
        )}
        <div className="flex flex-col gap-lg">
          <ConnectBankAccountsButton disabled={!isConfirmedConnect} />
          <div className="flex gap-2 mt-1">
            <Checkbox
              className="w-5 h-5"
              checked={
                isConfirmedConnect ||
                progress[3].status === LOAN_APPLICATION_STEP_STATUS.COMPLETE
              }
              onCheckedChange={(value: boolean) => {
                setIsConfirmedConnect(value)
              }}
            />
            <p className="text-sm text-text-secondary font-medium">
              I understand that, by connecting my accounts, I authorize Plaid to
              share my business transaction history with{" "}
              {tenantData?.name ?? ""} for the purpose of evaluating my loan
              application.
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
