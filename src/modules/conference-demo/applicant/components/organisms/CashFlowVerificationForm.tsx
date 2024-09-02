import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { memo, useCallback, useEffect, useMemo, useState } from "react"

import { Button, ButtonLoading } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowRight, Link } from "lucide-react"
import {
  useIsReviewApplicationStep,
  useProgress
} from "../../stores/useProgress"
import { STEP } from "../../constants"
import { Badge } from "@/components/ui/badge"
import { TaskFieldStatus } from "@/modules/loan-application-management/constants/types/business.type"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service"
import { LoanApplicationBankAccount } from "@/modules/loan-application/constants/type"
import { ColumnDef } from "@tanstack/react-table"
import { FORMAT_DATE_MM_DD_YYYY } from "@/constants/date.constants"
import { format } from "date-fns"
import { LoadingWrapper } from "@/shared/atoms/LoadingWrapper"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { IPlaidInstitutionProviderData } from "@/modules/loan-application/constants"
import { PLAID_BANKING_ACCOUNTS } from "../../constants/data"

const columns: ColumnDef<LoanApplicationBankAccount>[] = [
  {
    accessorKey: "institutionName",
    header: () => (
      <div className="flex items-center space-x-2 text-gray-700">
        Institution
      </div>
    )
  },
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
            variantColor={getBadgeVariantByInsightStatus(
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

const CashFlowVerificationForm = () => {
  const isReviewApplicationStep = useIsReviewApplicationStep()
  const { goToStep, finishStep, checkStep } = useProgress.use.action()

  useEffect(() => {
    if (checkStep(STEP.CASH_FLOW_VERIFICATION)) {
      setInstitutions(PLAID_BANKING_ACCOUNTS)
    }
  }, [checkStep])

  // FAKE PLAID CONNECTION
  const [isFetchingDetails, setIsFetchingDetails] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [institutions, setInstitutions] = useState<
    IPlaidInstitutionProviderData[]
  >([])
  // Connected Accounts will appear after 3 seconds
  const handleOnClick = useCallback(() => {
    setIsConnecting(true)
    setTimeout(() => {
      setIsConnecting(false)
      finishStep(STEP.CASH_FLOW_VERIFICATION)
      setInstitutions(PLAID_BANKING_ACCOUNTS)
      setIsFetchingDetails(false)
    }, 3000)
  }, [finishStep])

  const connectedAccounts: LoanApplicationBankAccount[] = useMemo(() => {
    return institutions
      .map((ins) =>
        ins.accounts.map((account) => ({
          institutionName: ins.institutionName,
          bankAccountPk: account.id,
          bankAccountName: account.name,
          connectedOn: account.connectedOn
            ? account.connectedOn
            : format(new Date(), FORMAT_DATE_MM_DD_YYYY)
        }))
      )
      .flat()
      .sort((a, b) => {
        return a.institutionName.localeCompare(b.institutionName)
      })
  }, [institutions])

  const [isConfirmedConnect, setIsConfirmedConnect] = useState(false)

  const canConnect = useMemo(() => {
    return !!connectedAccounts.length || isConfirmedConnect
  }, [isConfirmedConnect, connectedAccounts.length])

  const onSubmit = useCallback(() => {
    finishStep(STEP.CASH_FLOW_VERIFICATION)
    goToStep(STEP.ARTICLES_OF_ORGANIZATION)
  }, [finishStep, goToStep])

  return (
    <>
      <Card
        className={cn(
          "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6 shadow-none",
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
                className="underline text-[#1264A3]"
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
                disabled={!!connectedAccounts.length}
                checked={canConnect}
                onCheckedChange={(value: boolean) => {
                  setIsConfirmedConnect(value)
                }}
              />
              <p className="text-sm text-gray-700">
                <b>I understand</b> that, by connecting my accounts, I authorize
                Plaid to share my business transaction history with Cyphr for
                the purpose of evaluating my loan application.
              </p>
            </div>
          </div>
        </div>
      </Card>
      {(!!connectedAccounts.length || isConfirmedConnect) && (
        <Card
          className={cn(
            "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6 mt-6 shadow-none",
            "md:w-full md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-sm"
          )}
        >
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-2">
            <div>
              <h5 className="text-lg font-semibold">Connected Accounts</h5>
              <span className="text-sm font-medium text-gray-700">
                Having trouble connecting your bank accounts?
                <br /> Click{" "}
                <a
                  href="https://support-my.plaid.com/hc/en-us/categories/4405983222679-Connecting-Financial-Accounts"
                  className="underline text-[#1264A3]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>{" "}
                for help.
              </span>
            </div>

            <ButtonLoading
              className=" border rounded-lg text-primary bg-white text-gray-700 px-lg py-md hover:bg-zinc-100"
              onClick={handleOnClick}
              isLoading={isConnecting || isFetchingDetails}
              disabled={!canConnect || isFetchingDetails}
              type="button"
            >
              {connectedAccounts.length ? "Connect More" : "Connect"}
              <Link className="ml-1 w-4" />
            </ButtonLoading>
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
                <LoadingWrapper isLoading={isFetchingDetails}>
                  <Card className="border-none shadow-none">
                    <CardContent className="p-0 md:p-0">
                      <MiddeskTable
                        tableClassName="text-gray-700 font-sm"
                        cellClassName="py-6"
                        columns={columns}
                        data={connectedAccounts}
                        noResultText={"No connected accounts found"}
                      />
                    </CardContent>
                  </Card>

                  <Separator />

                  {!isReviewApplicationStep && (
                    <Button
                      className="w-full mt-5"
                      disabled={!connectedAccounts.length}
                      onClick={onSubmit}
                    >
                      Next <ArrowRight className="ml-1.5 w-5 h-5" />
                    </Button>
                  )}
                </LoadingWrapper>
              </div>
            )}
          </div>
        </Card>
      )}
    </>
  )
}

export default memo(CashFlowVerificationForm)
