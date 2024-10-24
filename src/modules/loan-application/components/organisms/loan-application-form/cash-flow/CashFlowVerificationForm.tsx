import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { useTenant } from "@/providers/tenant-provider"
import { useState } from "react"
import { ConnectBankAccountsButton } from "../../../molecules/out-of-box/ConnectBankAccountsButton"

import { cn } from "@/lib/utils"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { LOAN_APPLICATION_STEPS } from "../../../../models/LoanApplicationStep/type"
import { useLoanApplicationProgressContext } from "../../../../providers"
import { FormSubmitButton } from "../../../atoms/FormSubmitButton"

export function CashFlowVerificationForm() {
  const { tenantData } = useTenant()

  const { step, getStepStatus, finishCurrentStep } =
    useLoanApplicationProgressContext()

  const [isConfirmedConnect, setIsConfirmedConnect] = useState(false)

  const isComplete = getStepStatus(
    LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION
  )
  const isChecked = isConfirmedConnect || isComplete

  const handleNextClick = () => {
    finishCurrentStep()
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-3xl rounded-lg h-fit overflow-auto col-span-8 mx-6",
        "md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-sm"
      )}
    >
      <Card className="flex flex-col gap-2xl p-4xl shadow-none">
        <h5 className="text-lg font-semibold">Cash Flow Verification4</h5>
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
              the bank accounts you want to connect. Plaid will never ask for
              your full login credentials or passwords.
            </p>
            <p className="text-sm text-text-secondary font-medium">
              3. Once connected, Plaid will securely share your recent
              transaction history with us. This allows us to verify your income
              and expenses, helping us determine the best loan option for your
              business needs.
            </p>
          </div>
          <div className="flex flex-col gap-lg">
            <ConnectBankAccountsButton disabled={!isConfirmedConnect} />
            <div className="flex gap-2 mt-1">
              <Checkbox
                checked={isChecked}
                className="w-5 h-5"
                onCheckedChange={(value: boolean) => {
                  setIsConfirmedConnect(value)
                }}
              />
              <p className="text-sm text-text-secondary font-medium">
                I understand that, by connecting my accounts, I authorize Plaid
                to share my business transaction history with{" "}
                {tenantData?.name ?? ""} for the purpose of evaluating my loan
                application.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {!isReviewApplicationStep(step) && isComplete ? (
        <FormSubmitButton isDisabled={!isChecked} onSubmit={handleNextClick} />
      ) : null}
    </div>
  )
}
