import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { useTenant } from "@/providers/tenant-provider"
import { useEffect, useMemo, useState } from "react"

import { cn } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"
import { FORMAT_DATE_MM_DD_YYYY } from "@/constants/date.constants"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { TaskFieldStatus } from "@/modules/loan-application-management/constants/types/business.type"
import { LoanApplicationBankAccount } from "@/modules/loan-application/constants/type"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import {
  useBRLoanApplicationDetailsContext,
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext,
  usePlaidContext
} from "@/modules/loan-application/providers"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { ConnectBankAccountsButton } from "../../../molecules/out-of-box/v2/ConnectBankAccountsButton"
import { LoadingWrapper } from "@/shared/atoms/LoadingWrapper"
import { toastError } from "@/utils"
import { useUpdateEffect } from "react-use"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service"
import { FormSubmitButton } from "../../../atoms/FormSubmitButton"

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

export const CashFlowVerificationFormV2 = () => {
  const { finishCurrentStep, completeSpecificStep, step } =
    useLoanApplicationProgressContext()

  const { financialInformationForm, dispatchFormAction } =
    useLoanApplicationFormContext()

  const { tenantData } = useTenant()

  const { institutions, linkTokenError, isConnecting } = usePlaidContext()

  const { isFetchingDetails } = useBRLoanApplicationDetailsContext()

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

  const handleNextClick = () => {
    finishCurrentStep()
  }

  useEffect(() => {
    if (connectedAccounts.length > 0) {
      completeSpecificStep(LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION)
      // TODO: remove financial form submission when form configuration is ready
      dispatchFormAction({
        action: FORM_ACTION.SET_DATA,
        key: LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION,
        state: {
          id: financialInformationForm?.id ?? "",
          incomeCategories: [],
          w2sFile: []
        }
      })
    }
  }, [
    completeSpecificStep,
    connectedAccounts,
    dispatchFormAction,
    financialInformationForm?.id
  ])

  useUpdateEffect(() => {
    if (linkTokenError.errorMessage) {
      toastError({
        title: "Connect Bank Account Error",
        description: linkTokenError.errorMessage
      })
    }
  }, [linkTokenError])

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
            <p className="text-sm text-gray-700">
              Connect your bank accounts securely. This step helps us understand
              your business financial health through cash flow data and expedite
              the loan approval process. Learn how it works{" "}
              <a
                href="https://plaid.com/legal/#consumers"
                className="underline text-black"
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
            "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6 mt-6 shadow-none",
            "md:w-full md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-sm"
          )}
        >
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-2">
            <div>
              <h5 className="text-lg font-semibold">Connected Accounts</h5>
            </div>

            <ConnectBankAccountsButton
              disabled={!canConnect || isFetchingDetails}
              hasConnectedAccounts={!!connectedAccounts.length}
              isBankAccountsLoading={isConnecting || isFetchingDetails}
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

                  {!isReviewApplicationStep(step) && (
                    <FormSubmitButton
                      className="w-full mt-5"
                      onSubmit={handleNextClick}
                      isDisabled={!connectedAccounts.length}
                    />
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
