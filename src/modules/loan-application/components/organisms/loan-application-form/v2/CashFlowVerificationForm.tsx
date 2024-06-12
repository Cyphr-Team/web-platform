import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { useTenant } from "@/providers/tenant-provider"
import { useCallback, useState } from "react"

import { cn } from "@/lib/utils"

import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import {
  LOAN_APPLICATION_STEPS,
  LOAN_APPLICATION_STEP_STATUS
} from "@/modules/loan-application/models/LoanApplicationStep/type"
import { ConnectBankAccountsButton } from "../../../molecules/out-of-box/v2/ConnectBankAccountsButton"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LoanApplicationBankAccount } from "@/modules/loan-application/constants/type"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { ColumnDef } from "@tanstack/react-table"
import { getBadgeVariantByMiddeskStatus } from "@/modules/loan-application-management/services/middesk.service"
import { TaskFieldStatus } from "@/modules/loan-application-management/constants/types/business.type"
import { Badge } from "@/components/ui/badge"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider"

const columns: ColumnDef<LoanApplicationBankAccount>[] = [
  {
    accessorKey: "bankAccountName",
    header: () => (
      <div className="flex items-center space-x-2 text-gray-700">Account</div>
    )
  },
  {
    accessorKey: "connectedOn",
    header: () => (
      <div className="flex items-center space-x-2 text-gray-700">
        Connected on
      </div>
    )
  },
  {
    id: "status",
    header: () => (
      <div className="flex items-center space-x-2 text-gray-700">Status</div>
    ),
    cell: () => {
      return (
        <div className="min-w-0">
          <Badge
            isDot
            variant="soft"
            variantColor={getBadgeVariantByMiddeskStatus(
              TaskFieldStatus.SUCCESS
            )}
            className="capitalize text-sm rounded-lg font-medium"
            isDotBefore={false}
            border
          >
            Connected
          </Badge>
        </div>
      )
    }
  }
]

export const CashFlowVerificationFormV2 = () => {
  const { tenantData } = useTenant()

  const [isConfirmedConnect, setIsConfirmedConnect] = useState(false)

  // FIXME - Refactor this using form context stored in useLoanApplicationFormContext
  const [connectedAccounts, setConnectedAccounts] = useState<
    LoanApplicationBankAccount[]
  >([])

  const { finishCurrentStep, progress, completeSpecificStep } =
    useLoanApplicationProgressContext()
  const { financialInformationForm, dispatchFormAction } =
    useLoanApplicationFormContext()

  const fetchConnectedAccounts = () => {
    // TODO: call api to fetch connected accounts
    setConnectedAccounts([
      ...connectedAccounts,
      {
        bankAccountPk: "JP MORGAN SAVINGS PLAID SAVING",
        bankAccountName: "JP Morgan",
        connectedOn: "04/15/2024"
      },
      {
        bankAccountPk: "CHASE SAVINGS PLAID CREDIT",
        bankAccountName: "Chase",
        connectedOn: "04/15/2024"
      }
    ])
  }

  const isComplete = useCallback(() => {
    return (
      progress.find(
        (item) => item.step === LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION
      )?.status === LOAN_APPLICATION_STEP_STATUS.COMPLETE
    )
  }, [progress])

  const handleNextClick = () => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION,
      state: {
        id: financialInformationForm?.id ?? "",
        incomeCategories: [],
        w2sFile: []
      }
    })
    completeSpecificStep(LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION)
    finishCurrentStep()
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6"
      )}
    >
      <Card
        className={cn(
          "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6",
          "md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-sm"
        )}
      >
        <h5 className="text-lg font-semibold">Cash Flow Verification</h5>
        <Separator />
        <div className="flex flex-col gap-y-2xl gap-x-4xl">
          <div className="flex flex-col gap-y-sm">
            <p className="text-sm font-medium text-gray-700">
              Connect your bank accounts securely. This step helps us understand
              your business financial health through cash flow data and expedite
              the loan approval process. Learn how it works{" "}
              <a
                href="https://plaid.com/legal/#consumers"
                className=" underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              .
            </p>
          </div>
          <div className="flex flex-col gap-lg">
            <div className="flex gap-2 mt-1">
              <Checkbox
                className="w-5 h-5"
                checked={isConfirmedConnect || isComplete()}
                onCheckedChange={(value: boolean) => {
                  setIsConfirmedConnect(value)
                }}
              />
              <p className="text-sm text-gray-700">
                <b>I understand</b> that, by connecting my accounts, I authorize
                Plaid to share my business transaction history with{" "}
                {tenantData?.name ?? ""} for the purpose of evaluating my loan
                application.
              </p>
            </div>
          </div>
        </div>
      </Card>
      {(!!connectedAccounts.length || isConfirmedConnect) && (
        <Card
          className={cn(
            "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6 w-full",
            "md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-sm"
          )}
        >
          <div className="flex flex-row justify-between items-center">
            <h5 className="text-lg font-semibold">Connected Accounts</h5>
            <ConnectBankAccountsButton
              disabled={!isConfirmedConnect}
              hasConnectedAccounts={!!connectedAccounts.length}
              fetchConnectedAccounts={fetchConnectedAccounts}
            />
          </div>
          <Separator />
          <div className="flex flex-col gap-x-4xl gap-y-1 items-center p-0">
            {connectedAccounts.length <= 0 && (
              <>
                <p className=" text-sm text-text-secondary">No Account Found</p>
                <p className=" text-sm text-text-secondary mb-5">
                  Click the “Connect” button to continue
                </p>
                <Separator />
              </>
            )}
            {!!connectedAccounts.length && (
              <div className="flex flex-col w-full">
                <Card className="border-none shadow-none">
                  <CardContent className="p-0 md:p-0">
                    <MiddeskTable
                      tableClassName="text-gray-700 font-sm"
                      cellClassName="py-6"
                      columns={columns}
                      data={connectedAccounts}
                      isLoading={false}
                      noResultText={"No connected accounts found"}
                    />
                  </CardContent>
                </Card>
                <Separator />
                <Button
                  className="w-full mt-5"
                  disabled={!connectedAccounts.length}
                  onClick={handleNextClick}
                >
                  Next <ArrowRight className="ml-1.5 w-5 h-5" />
                </Button>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}
