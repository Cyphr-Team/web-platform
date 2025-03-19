import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import debounce from "lodash.debounce"
import { Link } from "lucide-react"
import * as z from "zod"
import { Button, ButtonLoading } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormField } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { STEP } from "@/modules/conference-demo/applicant/constants"

import {
  MOCK_PLAID_INSTITUTIONS,
  MOCK_PLAID_ROUTING_NUMBERS,
  PLAID_BANKING_ACCOUNTS
} from "@/modules/conference-demo/applicant/constants/data"
import {
  useIsReviewApplicationStep,
  useProgress
} from "@/modules/conference-demo/applicant/stores/useProgress"
import { SearchSelect } from "@/components/ui/search-select.tsx"
import { type Option } from "@/types/common.type.ts"
import { ConferenceFormLayout } from "@/modules/conference-demo/applicant/components/layouts/ConferenceFormLayout.tsx"
import { transformToConnectedAccounts } from "@/modules/loan-application/hooks/form-cash-flow/useQueryGetPlaidConnectedBankAccountsByApplicationId.ts"
import { type PlaidInstitutionProviderData } from "@/modules/loan-application/constants"
import { type LoanApplicationBankAccount } from "@/modules/loan-application/constants/type.ts"
import { Card, CardContent } from "@/components/ui/card.tsx"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table.tsx"
import { LoadingWrapper } from "@/shared/atoms/LoadingWrapper.tsx"
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge.tsx"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service.ts"
import { TaskFieldStatus } from "@/modules/loan-application-management/constants/types/business.type.ts"

// Types
interface Institution {
  institutionId: string
  name: string
  logo?: string
}

interface CashFlowVerificationFormProps {
  wrapperClassName?: string
}

// Component Implementation
function CashFlowVerificationForm({
  wrapperClassName
}: CashFlowVerificationFormProps) {
  const isReviewApplicationStep = useIsReviewApplicationStep()
  const { goToStep, finishStep, checkStep } = useProgress.use.action()

  const [state, setState] = useState({
    isFetchingDetails: false,
    isConnecting: false,
    isConfirmedConnect: false,
    institutions: [] as PlaidInstitutionProviderData[]
  })

  const handlePlaidConnection = useCallback(() => {
    setState((prev) => ({ ...prev, isConnecting: true }))

    // Simulate Plaid connection
    setTimeout(() => {
      setState((prev) => {
        const bankSize = PLAID_BANKING_ACCOUNTS.length
        const genRandom = () => Math.floor(Math.random() * 100) % bankSize

        const newAccounts =
          prev.institutions.length < 12
            ? [
                PLAID_BANKING_ACCOUNTS[genRandom()],
                PLAID_BANKING_ACCOUNTS[bankSize - genRandom() + 1]
              ]
            : []

        return {
          ...prev,
          isConnecting: false,
          isFetchingDetails: false,
          institutions: [...prev.institutions, ...newAccounts]
        }
      })
      finishStep(STEP.CASH_FLOW_VERIFICATION)
    }, 2000)
  }, [finishStep])

  const connectedAccounts = useMemo((): LoanApplicationBankAccount[] => {
    return transformToConnectedAccounts(state.institutions)
  }, [state.institutions])

  const canConnect = useMemo(
    () => !!connectedAccounts.length || state.isConfirmedConnect,
    [connectedAccounts.length, state.isConfirmedConnect]
  )

  const handleSubmit = useCallback(() => {
    finishStep(STEP.CASH_FLOW_VERIFICATION)
    goToStep(STEP.ARTICLES_OF_ORGANIZATION)
  }, [finishStep, goToStep])

  useEffect(() => {
    if (checkStep(STEP.CASH_FLOW_VERIFICATION)) {
      setState((prev) => ({ ...prev, institutions: PLAID_BANKING_ACCOUNTS }))
    }
  }, [checkStep])

  return (
    <>
      <InformationCard
        canConnect={canConnect}
        connectedAccounts={connectedAccounts}
        wrapperClassName={wrapperClassName}
        onConfirmConnect={(value) =>
          setState((prev) => ({ ...prev, isConfirmedConnect: value }))
        }
      />

      {!!connectedAccounts.length || state.isConfirmedConnect ? (
        <ConnectedAccountsCard
          canConnect={canConnect}
          connectedAccounts={connectedAccounts}
          isConnecting={state.isConnecting}
          isFetchingDetails={state.isFetchingDetails}
          isReviewApplicationStep={isReviewApplicationStep}
          wrapperClassName={wrapperClassName}
          onConnect={handlePlaidConnection}
          onSubmit={handleSubmit}
        />
      ) : null}
    </>
  )
}

export default memo(CashFlowVerificationForm)

// Subcomponents
interface InformationCardProps {
  canConnect: boolean
  connectedAccounts: LoanApplicationBankAccount[]
  onConfirmConnect: (value: boolean) => void
  wrapperClassName?: string
}

function InformationCard({
  canConnect,
  connectedAccounts,
  onConfirmConnect,
  wrapperClassName
}: InformationCardProps) {
  return (
    <ConferenceFormLayout
      title="Cash Flow Verification"
      wrapperClassName={wrapperClassName}
    >
      <h5 className="text-lg font-semibold">Cash Flow Verification</h5>
      <Separator />
      <div className="flex flex-col gap-x-4xl gap-y-2xl">
        <p className="text-sm">
          Connect your bank accounts securely. This step helps us understand
          your business financial health through cash flow data and expedite the
          loan approval process. Learn how it works{" "}
          <a
            className="font-medium text-primary underline"
            href="https://plaid.com/legal/#consumers"
            rel="noopener noreferrer"
            target="_blank"
          >
            here
          </a>
          .
        </p>
        <div className="mt-1 flex gap-3">
          <Checkbox
            checked={canConnect}
            className="size-5"
            disabled={!!connectedAccounts.length}
            onCheckedChange={(value: boolean) => onConfirmConnect(value)}
          />
          <p className="text-sm">
            <b>I understand</b> that, by connecting my accounts, I authorize
            Plaid to share my business transaction history with Cyphr for the
            purpose of evaluating my loan application.
          </p>
        </div>
      </div>
    </ConferenceFormLayout>
  )
}

interface ConnectedAccountsHeaderProps {
  connectedAccounts: LoanApplicationBankAccount[]
}

export function ConnectedAccountsHeader({
  connectedAccounts
}: ConnectedAccountsHeaderProps) {
  const renderStatus = () => {
    if (!connectedAccounts.length) return null

    return (
      <Badge
        isDot
        isDotBefore
        className="rounded-full py-1 text-sm font-medium capitalize"
        variant="soft"
        variantColor={getBadgeVariantByInsightStatus(TaskFieldStatus.PENDING)}
      >
        Pending
      </Badge>
    )
  }

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <h5 className="text-lg font-semibold">Connected Accounts</h5>
        {renderStatus()}
      </div>
      <div className="text-sm text-gray-600">
        <p>
          Please note that if your bank connection status is pending, you can
          still complete and submit your application. We'll notify you once your
          bank connection status has been updated.
        </p>
      </div>
    </div>
  )
}

interface ConnectedAccountsTableProps {
  connectedAccounts: LoanApplicationBankAccount[]
  isFetchingDetails: boolean
  isReviewApplicationStep: boolean
  onSubmit: () => void
}

// Connected Accounts Table Component
export function ConnectedAccountsTable({
  connectedAccounts,
  isFetchingDetails,
  isReviewApplicationStep,
  onSubmit
}: ConnectedAccountsTableProps) {
  const renderTable = () => (
    <Card className="border-none shadow-none">
      <CardContent className="p-0 md:p-0">
        <MiddeskTable
          cellClassName="py-6"
          columns={tableColumns}
          data={connectedAccounts}
          noResultText="No connected accounts found"
          tableClassName="font-sm text-gray-700"
        />
      </CardContent>
    </Card>
  )

  const renderSubmitButton = () => {
    if (isReviewApplicationStep) return null

    return (
      <Button
        className="mt-5 w-full"
        disabled={!connectedAccounts.length}
        onClick={onSubmit}
      >
        Next
      </Button>
    )
  }

  return (
    <div className="flex flex-col items-center gap-x-4xl gap-y-1 p-0">
      <div className="flex w-full flex-col">
        <LoadingWrapper isLoading={isFetchingDetails}>
          {renderTable()}
          <Separator />
          {renderSubmitButton()}
        </LoadingWrapper>
      </div>
    </div>
  )
}

// Table Configuration
const tableColumns: ColumnDef<LoanApplicationBankAccount>[] = [
  {
    accessorKey: "bankAccountName",
    size: 200,
    header: () => (
      <div className="-mx-4 flex items-center text-gray-700">Account</div>
    ),
    cell: ({ row }) => {
      const { institutionName, bankAccountName, mask } = row.original

      return (
        <div className="-mx-4 min-w-0 text-sm uppercase">
          {institutionName} {bankAccountName} {mask}
        </div>
      )
    }
  },
  {
    accessorKey: "connectedOn",
    header: () => (
      <div className="flex items-center space-x-2 text-gray-700">
        Connected on
      </div>
    ),
    cell: ({ row }) => {
      const { connectedOn } = row.original

      return <div className="min-w-0 text-sm">{connectedOn}</div>
    }
  },
  {
    id: "status",
    header: () => (
      <div className="flex items-center space-x-2 text-gray-700">Status</div>
    ),
    cell: () => (
      <div className="min-w-0">
        <Badge
          isDot
          isDotBefore
          className="rounded-full py-1 text-sm font-medium capitalize"
          variant="soft"
          variantColor={getBadgeVariantByInsightStatus(TaskFieldStatus.PENDING)}
        >
          Pending
        </Badge>
      </div>
    )
  }
]

interface ConnectedAccountsCardProps {
  canConnect: boolean
  connectedAccounts: LoanApplicationBankAccount[]
  isConnecting: boolean
  isFetchingDetails: boolean
  isReviewApplicationStep: boolean
  onConnect: () => void
  onSubmit: () => void
  wrapperClassName?: string
}

function ConnectedAccountsCard({
  canConnect,
  connectedAccounts,
  isConnecting,
  isFetchingDetails,
  isReviewApplicationStep,
  onConnect,
  onSubmit,
  wrapperClassName
}: ConnectedAccountsCardProps) {
  return (
    <ConferenceFormLayout
      hideTopNavigation
      cardClassName="mt-10"
      wrapperClassName={wrapperClassName}
    >
      <ConnectedAccountsHeader connectedAccounts={connectedAccounts} />
      <Separator />

      <PlaidConnectionForm />

      <ButtonLoading
        className="self-end rounded-lg text-sm"
        disabled={!canConnect || isFetchingDetails}
        isLoading={isConnecting || isFetchingDetails}
        size="sm"
        type="button"
        variant="outline"
        onClick={onConnect}
      >
        <Link className="mr-1 size-4" strokeWidth={2.5} />
        {connectedAccounts.length ? " Connect More" : " Connect with Plaid"}
      </ButtonLoading>

      {!!connectedAccounts.length && (
        <ConnectedAccountsTable
          connectedAccounts={connectedAccounts}
          isFetchingDetails={isFetchingDetails}
          isReviewApplicationStep={isReviewApplicationStep}
          onSubmit={onSubmit}
        />
      )}
    </ConferenceFormLayout>
  )
}

// Validation Schema
const plaidFormSchema = z.object({
  institution: z.object({ label: z.string(), value: z.string() }).nullable(),
  routingNumber: z.object({ label: z.string(), value: z.string() }).optional()
})

type PlaidFormValue = z.infer<typeof plaidFormSchema>

// Plaid Form Implementation
function PlaidConnectionForm() {
  const [search, setSearch] = useState("")

  const { data: institutions, isFetching } = useQuery({
    queryKey: ["institutions", search],
    queryFn: async (): Promise<Institution[]> => {
      await new Promise((resolve) => setTimeout(resolve, 400))

      return MOCK_PLAID_INSTITUTIONS
    },
    placeholderData: keepPreviousData
  })

  const institutionOptions: Option[] = useMemo(
    () =>
      (institutions ?? MOCK_PLAID_INSTITUTIONS).map((institution) => ({
        label: institution.name,
        value: institution.institutionId,
        icon: institution?.logo
          ? () => (
              <img
                alt="Plaid institution logo"
                className="size-5"
                src={`data:image/png;base64,${institution.logo}`}
              />
            )
          : undefined
      })),
    [institutions]
  )

  const routingNumberOptions: Option[] = useMemo(
    () =>
      MOCK_PLAID_ROUTING_NUMBERS.map((number) => ({
        label: number,
        value: number
      })),
    []
  )

  const form = useForm<PlaidFormValue>({
    resolver: zodResolver(plaidFormSchema),
    defaultValues: {
      institution: institutionOptions[0],
      routingNumber: routingNumberOptions[0]
    }
  })

  const onSearch = useMemo(
    () => debounce((value: string) => setSearch(value), 300),
    []
  )

  const selectedInstitution = form.watch("institution")

  return (
    <Form {...form}>
      <div className="flex w-full flex-col gap-5 text-sm text-secondary-700">
        <InstitutionField
          isLoading={isFetching}
          options={institutionOptions}
          total={institutionOptions.length}
          onSearch={onSearch}
        />
        <RoutingNumberField
          disabled={!selectedInstitution}
          options={routingNumberOptions}
        />
      </div>
    </Form>
  )
}

function InstitutionField({
  options,
  onSearch,
  isLoading,
  total
}: {
  options: Option[]
  onSearch: (value: string) => void
  isLoading: boolean
  total?: number
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="font-medium text-secondary-400">Banking institution</p>
      <FormField
        name="institution"
        render={({ field }) => (
          <SearchSelect
            isLogo
            field={field}
            handleSearch={onSearch}
            isFetching={isLoading}
            options={options}
            placeholder="Start typing your institution"
            totalOptions={total}
          />
        )}
      />
    </div>
  )
}

function RoutingNumberField({
  options,
  disabled
}: {
  options: Option[]
  disabled: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="font-medium text-secondary-400">Routing number</p>
      <FormField
        name="routingNumber"
        render={({ field }) => (
          <SearchSelect
            disabled={disabled}
            field={field}
            options={options}
            placeholder="Select a routing number"
          />
        )}
      />
    </div>
  )
}
