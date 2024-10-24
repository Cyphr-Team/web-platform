import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormField } from "@/components/ui/form"
import { SearchSelect } from "@/components/ui/search-select"
import { Separator } from "@/components/ui/separator"
import { FORMAT_DATE_MM_DD_YYYY } from "@/constants/date.constants"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { TaskFieldStatus } from "@/modules/loan-application-management/constants/types/business.type"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service"
import { FormSubmitButton } from "@/modules/loan-application/components/atoms/FormSubmitButton"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout"
import { PlaidConnectButton } from "@/modules/loan-application/components/molecules/plaid/ConnectButton"
import {
  plaidFormSchema,
  type PlaidFormValue
} from "@/modules/loan-application/constants/plaid"
import { type LoanApplicationBankAccount } from "@/modules/loan-application/constants/type"
import { usePlaidInstitutions } from "@/modules/loan-application/hooks/usePlaidInstitutions"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import {
  useBRLoanApplicationDetailsContext,
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext,
  usePlaidContext
} from "@/modules/loan-application/providers"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { LoadingWrapper } from "@/shared/atoms/LoadingWrapper"
import { type Option } from "@/types/common.type"
import { toastError } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { type ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { useEffect, useMemo, useState } from "react"
import { useForm, useFormContext } from "react-hook-form"
import { useUpdateEffect } from "react-use"

interface PlaidConnectFormProps {
  wrapperClassName?: string
}

export function PlaidConnectForm({ wrapperClassName }: PlaidConnectFormProps) {
  const form = useForm<PlaidFormValue>({
    resolver: zodResolver(plaidFormSchema)
  })

  return (
    <FormLayout wrapperClassName={wrapperClassName}>
      <FormHeader />
      <Separator />
      <Form {...form}>
        <PlaidForm />
      </Form>
    </FormLayout>
  )
}

function FormHeader() {
  return (
    <div className="flex flex-col gap-2">
      <h5 className="text-lg font-semibold">Connected Accounts</h5>
      <p className="text-sm financial-projection text-muted-foreground">
        Please note that if your bank connection status is pending, you can
        still complete and submit your application. We'll notify you once your
        bank connection status has been updated.
      </p>
    </div>
  )
}

function PlaidForm() {
  const { watch, setValue, formState, resetField } =
    useFormContext<PlaidFormValue>()
  const { institutions, searchInstitutions, isLoading, total } =
    usePlaidInstitutions()
  const { isFetchingDetails } = useBRLoanApplicationDetailsContext()
  const { finishCurrentStep, step, completeSpecificStep } =
    useLoanApplicationProgressContext()
  const { financialInformationForm, dispatchFormAction } =
    useLoanApplicationFormContext()
  const handleNextClick = () => {
    finishCurrentStep()
  }

  const [routingNumberOptions, setRoutingNumberOptions] = useState<Option[]>([])

  const institutionOptions: Option[] = useMemo(
    () =>
      institutions.map((institution) => ({
        label: institution.name,
        icon: institution?.logo
          ? () => (
              <img
                alt="Plaid institution logo"
                className="h-5 w-5"
                src={`data:image/png;base64,${institution?.logo}`}
              />
            )
          : undefined,
        value: institution.institutionId
      })),
    [institutions]
  )
  const selectedInstitution = watch("institution")

  const {
    institutions: detailInstitutions,
    isConnecting,
    linkTokenError
  } = usePlaidContext()

  const connectedAccounts: LoanApplicationBankAccount[] = useMemo(() => {
    return detailInstitutions
      .map((ins) =>
        ins.accounts.map((account) => ({
          institutionName: ins.institutionName,
          bankAccountPk: account.id,
          bankAccountName: account.name,
          mask: account?.mask,
          connectedOn: account.connectedOn
            ? account.connectedOn
            : format(new Date(), FORMAT_DATE_MM_DD_YYYY)
        }))
      )
      .flat()
      .sort((a, b) => {
        return a.institutionName.localeCompare(b.institutionName)
      })
  }, [detailInstitutions])

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "institution") {
        setValue("routingNumber", undefined)

        const selectedInstitutionData = institutions.find(
          (institution) =>
            institution.institutionId === value.institution?.value
        )

        setRoutingNumberOptions(
          selectedInstitutionData?.routingNumbers.map((routingNumber) => ({
            label: routingNumber,
            value: routingNumber
          })) ?? []
        )
      }
    })

    return () => subscription.unsubscribe()
  }, [institutions, setValue, watch])

  useEffect(() => {
    if (connectedAccounts.length > 0) {
      completeSpecificStep(LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION)
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

  /**
   * Remove all values when the plaid popup is disappeared
   */
  useUpdateEffect(() => {
    if (!isConnecting) {
      resetField("institution", { defaultValue: undefined })
    }
  }, [isConnecting, resetField])

  useUpdateEffect(() => {
    if (linkTokenError.errorMessage) {
      toastError({
        title: "Connect Bank Account Error",
        description: linkTokenError.errorMessage
      })
    }
  }, [linkTokenError])

  return (
    <div className="w-full flex flex-col gap-5 text-secondary-700 text-sm">
      <InstitutionField
        isLoading={isLoading}
        options={institutionOptions}
        total={total}
        onSearch={searchInstitutions}
      />
      <RoutingNumberField
        disabled={!selectedInstitution}
        options={routingNumberOptions}
      />

      {connectedAccounts.length ? (
        <div className="flex flex-col w-full mt-2">
          <LoadingWrapper isLoading={isFetchingDetails}>
            <Card className="border-none shadow-none">
              <CardContent className="p-0 md:p-0">
                <MiddeskTable
                  cellClassName="py-6"
                  columns={columns}
                  data={connectedAccounts}
                  noResultText="No connected accounts found"
                  tableClassName="text-gray-700 font-sm"
                />
              </CardContent>
            </Card>
          </LoadingWrapper>

          <Separator />
        </div>
      ) : null}

      <PlaidConnectButton
        disabled={isFetchingDetails || !formState.isValid}
        hasConnectedAccounts={!!connectedAccounts.length}
        isBankAccountsLoading={isConnecting || isFetchingDetails}
      />

      {!isReviewApplicationStep(step) && !!connectedAccounts.length ? (
        <FormSubmitButton
          className="w-full"
          isDisabled={!connectedAccounts.length}
          onSubmit={handleNextClick}
        />
      ) : null}
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

const columns: ColumnDef<LoanApplicationBankAccount>[] = [
  {
    accessorKey: "bankAccountName",
    size: 200,
    header: () => (
      <div className="flex items-center text-gray-700 -mx-4">Account</div>
    ),
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="min-w-0 -mx-4 uppercase">
          {data.institutionName} {data.bankAccountName} {data.mask}
        </div>
      )
    }
  },
  {
    accessorKey: "connectedOn",
    header: () => (
      <div className="flex items-center space-x-2 text-gray-700">
        Connected on2
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
            border
            isDot
            className="capitalize text-sm rounded-lg font-medium"
            isDotBefore={false}
            variant="soft"
            variantColor={getBadgeVariantByInsightStatus(
              TaskFieldStatus.SUCCESS
            )}
          >
            Connected
          </Badge>
        </div>
      )
    }
  }
]
