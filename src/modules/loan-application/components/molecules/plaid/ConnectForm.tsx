import { Card, CardContent } from "@/components/ui/card"
import { Form, FormField } from "@/components/ui/form"
import { SearchSelect } from "@/components/ui/search-select"
import { Separator } from "@/components/ui/separator"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { FormSubmitButton } from "@/modules/loan-application/components/atoms/FormSubmitButton"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout"
import { PlaidConnectButton } from "@/modules/loan-application/components/molecules/plaid/ConnectButton"
import {
  plaidFormSchema,
  type PlaidFormValue
} from "@/modules/loan-application/constants/plaid"
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
import { useEffect, useMemo, useState } from "react"
import { useForm, useFormContext } from "react-hook-form"
import { useUpdateEffect } from "react-use"
import { ClickableTooltip } from "@/shared/atoms/ClickableTooltip.tsx"
import { useClearGeneratedPDF } from "@/modules/loan-application/hooks/useClearGeneratedPDF.tsx"
import { CashFlowConnectedBadge } from "@/shared/atoms/CashFlowConnectedBadge.tsx"
import { cashFlowColumns } from "@/shared/atoms/CashFlowColumns.tsx"

interface PlaidConnectFormProps {
  wrapperClassName?: string
}

interface FormHeaderProps {
  isConnected?: boolean
}

export function PlaidConnectForm({ wrapperClassName }: PlaidConnectFormProps) {
  const form = useForm<PlaidFormValue>({
    resolver: zodResolver(plaidFormSchema)
  })
  const { connectedAccounts } = usePlaidContext()

  return (
    <FormLayout hideTopNavigation cardClassName={wrapperClassName}>
      <FormHeader isConnected={connectedAccounts.length > 0} />
      <Separator />
      <Form {...form}>
        <PlaidForm />
      </Form>
    </FormLayout>
  )
}

function FormHeader({ isConnected }: FormHeaderProps) {
  return (
    <div className="flex flex-col gap-3">
      <h5 className="text-lg font-semibold">
        <span className="mr-4">Connected Accounts</span>
        {isConnected ? <CashFlowConnectedBadge /> : null}
      </h5>
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
  const clearGeneratedPDF = useClearGeneratedPDF()

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

  const { connectedAccounts, isConnecting, linkTokenError } = usePlaidContext()

  const tooltipContent = useMemo(() => {
    return !formState.isValid ? (
      <div className="text-center">
        <div>Please select Banking institution</div>
        <div>before connecting</div>
      </div>
    ) : null
  }, [formState.isValid])

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
      clearGeneratedPDF()
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

      <ClickableTooltip tooltipContent={tooltipContent}>
        <div className="self-end">
          <PlaidConnectButton
            disabled={isFetchingDetails || !formState.isValid}
            hasConnectedAccounts={!!connectedAccounts.length}
            isBankAccountsLoading={isConnecting || isFetchingDetails}
          />
        </div>
      </ClickableTooltip>

      {connectedAccounts.length ? (
        <div className="flex flex-col w-full mt-2">
          <LoadingWrapper isLoading={isFetchingDetails}>
            <Card className="border-none shadow-none">
              <CardContent className="p-0 md:p-0">
                <MiddeskTable
                  cellClassName="py-6"
                  columns={cashFlowColumns(false)}
                  data={connectedAccounts}
                  noResultText="No connected accounts found"
                />
              </CardContent>
            </Card>
          </LoadingWrapper>

          <Separator />
        </div>
      ) : null}

      {!isReviewApplicationStep(step) && !!connectedAccounts.length ? (
        <FormSubmitButton
          className="w-full"
          isDisabled={!connectedAccounts.length || isConnecting}
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
    <div className="flex justify-between items-center gap-4">
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
