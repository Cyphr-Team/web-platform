import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import debounce from "lodash.debounce"
import { Link } from "lucide-react"
import { type ColumnDef } from "@tanstack/react-table"
import * as z from "zod"

import { Badge } from "@/components/ui/badge"
import { Button, ButtonLoading } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormField } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { FORMAT_DATE_MM_DD_YYYY } from "@/constants/date.constants"
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
import { TaskFieldStatus } from "@/modules/loan-application-management/constants/types/business.type"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service"
import { LoadingWrapper } from "@/shared/atoms/LoadingWrapper"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { SearchSelect } from "@/components/ui/search-select.tsx"
import { type Option } from "@/types/common.type.ts"
import { ConferenceFormLayout } from "@/modules/conference-demo/applicant/components/layouts/ConferenceFormLayout.tsx"

// Types
interface Institution {
  institutionId: string
  name: string
  logo?: string
}

interface BankAccount {
  id: string
  name: string
  connectedOn?: string
}

interface PlaidInstitutionProviderData {
  institutionName: string
  accounts: BankAccount[]
}

interface LoanApplicationBankAccount {
  institutionName: string
  bankAccountPk: string
  bankAccountName: string
  connectedOn: string
  mask?: string
}

interface ConnectedAccountsHeaderProps {
  connectedAccounts: LoanApplicationBankAccount[]
}

interface ConnectedAccountsTableProps {
  connectedAccounts: LoanApplicationBankAccount[]
  isFetchingDetails: boolean
  isReviewApplicationStep: boolean
  onSubmit: () => void
}

// Validation Schema
const plaidFormSchema = z.object({
  institution: z.object({ label: z.string(), value: z.string() }).nullable(),
  routingNumber: z.object({ label: z.string(), value: z.string() }).optional()
})

type PlaidFormValue = z.infer<typeof plaidFormSchema>

// Table Configuration
const tableColumns: ColumnDef<LoanApplicationBankAccount>[] = [
  {
    accessorKey: "bankAccountName",
    size: 200,
    header: () => (
      <div className="flex items-center text-gray-700 -mx-4">Account</div>
    ),
    cell: ({ row }) => {
      const { institutionName, bankAccountName, mask } = row.original

      return (
        <div className="min-w-0 -mx-4 uppercase text-sm">
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
          className="capitalize text-sm rounded-full font-medium py-1"
          variant="soft"
          variantColor={getBadgeVariantByInsightStatus(TaskFieldStatus.PENDING)}
        >
          Pending
        </Badge>
      </div>
    )
  }
]

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
      setState((prev) => ({
        ...prev,
        isConnecting: false,
        isFetchingDetails: false,
        institutions: PLAID_BANKING_ACCOUNTS
      }))
      finishStep(STEP.CASH_FLOW_VERIFICATION)
    }, 3000)
  }, [finishStep])

  const connectedAccounts = useMemo((): LoanApplicationBankAccount[] => {
    return state.institutions
      .flatMap((ins) =>
        ins.accounts.map((account) => ({
          institutionName: ins.institutionName,
          bankAccountPk: account.id,
          bankAccountName: account.name,
          connectedOn:
            account.connectedOn || format(new Date(), FORMAT_DATE_MM_DD_YYYY)
        }))
      )
      .sort((a, b) => a.institutionName.localeCompare(b.institutionName))
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
    <ConferenceFormLayout title="Cash Flow Verification" wrapperClassName={wrapperClassName}>
      <h5 className="text-lg font-semibold">Cash Flow Verification</h5>
      <Separator />
      <div className="flex flex-col gap-y-2xl gap-x-4xl">
        <p className="text-sm">
          Connect your bank accounts securely. This step helps us understand
          your business financial health through cash flow data and expedite the
          loan approval process. Learn how it works{" "}
          <a
            className="underline text-primary font-medium"
            href="https://plaid.com/legal/#consumers"
            rel="noopener noreferrer"
            target="_blank"
          >
            here
          </a>
          .
        </p>
        <div className="flex gap-3 mt-1">
          <Checkbox
            checked={canConnect}
            className="w-5 h-5"
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
    <ConferenceFormLayout hideTopNavigation cardClassName="mt-10" wrapperClassName={wrapperClassName}>
      <ConnectedAccountsHeader connectedAccounts={connectedAccounts} />
      <Separator />

      <PlaidConnectionForm />

      <ButtonLoading
        className="text-sm rounded-lg self-end"
        disabled={!canConnect || isFetchingDetails}
        isLoading={isConnecting || isFetchingDetails}
        size="sm"
        type="button"
        variant="outline"
        onClick={onConnect}
      >
        <Link className="w-4 h-4 mr-1" strokeWidth={2.5} />
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
                className="h-5 w-5"
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
      <div className="w-full flex flex-col gap-5 text-secondary-700 text-sm">
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

export default memo(CashFlowVerificationForm)

// Connected Accounts Header Component
export function ConnectedAccountsHeader({
  connectedAccounts
}: ConnectedAccountsHeaderProps) {
  const renderStatus = () => {
    if (!connectedAccounts.length) return null

    return (
      <Badge
        isDot
        isDotBefore
        className="capitalize text-sm rounded-full font-medium py-1"
        variant="soft"
        variantColor={getBadgeVariantByInsightStatus(TaskFieldStatus.PENDING)}
      >
        Pending
      </Badge>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
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
          tableClassName="text-gray-700 font-sm"
        />
      </CardContent>
    </Card>
  )

  const renderSubmitButton = () => {
    if (isReviewApplicationStep) return null

    return (
      <Button
        className="w-full mt-5"
        disabled={!connectedAccounts.length}
        onClick={onSubmit}
      >
        Next
      </Button>
    )
  }

  return (
    <div className="flex flex-col gap-x-4xl gap-y-1 items-center p-0">
      <div className="flex flex-col w-full">
        <LoadingWrapper isLoading={isFetchingDetails}>
          {renderTable()}
          <Separator />
          {renderSubmitButton()}
        </LoadingWrapper>
      </div>
    </div>
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
    <div className="flex justify-between items-center gap-4">
      <p>Banking institution</p>
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
    <div className="flex justify-between items-center gap-4">
      <p>Routing number</p>
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
