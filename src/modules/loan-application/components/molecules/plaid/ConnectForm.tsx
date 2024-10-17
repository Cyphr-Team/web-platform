import { Badge } from "@/components/ui/badge"
import { ButtonLoading } from "@/components/ui/button"
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
import { LoanApplicationBankAccount } from "@/modules/loan-application/constants/type"
import { useLazyConnectPlaidEffect } from "@/modules/loan-application/hooks/useLazyConnectPlaidEffect"
import { usePlaidInstitutions } from "@/modules/loan-application/hooks/usePlaidInstitutions"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import {
  useBRLoanApplicationDetailsContext,
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext,
  usePlaidContext
} from "@/modules/loan-application/providers"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider"
import {
  generateToken,
  isReviewApplicationStep
} from "@/modules/loan-application/services"
import { LoadingWrapper } from "@/shared/atoms/LoadingWrapper"
import { Option } from "@/types/common.type"
import { toastError } from "@/utils"
import { getAxiosError } from "@/utils/custom-error"
import { zodResolver } from "@hookform/resolvers/zod"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { Link } from "lucide-react"
import React, { useEffect, useMemo, useState } from "react"
import { useForm, useFormContext } from "react-hook-form"
import { useUpdateEffect } from "react-use"
import * as z from "zod"

interface PlaidConnectFormProps {
  wrapperClassName?: string
}

const plaidFormSchema = z.object({
  institution: z
    .object({
      label: z.string(),
      value: z.string()
    })
    .nullable(),
  routingNumber: z
    .object({
      label: z.string(),
      value: z.string()
    })
    .optional()
})

type PlaidFormValue = z.infer<typeof plaidFormSchema>

export const PlaidConnectForm: React.FC<PlaidConnectFormProps> = ({
  wrapperClassName
}) => {
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

const FormHeader: React.FC = () => (
  <div className="flex flex-col gap-2">
    <h5 className="text-lg font-semibold">Connected Accounts</h5>
    <p className="text-sm financial-projection text-muted-foreground">
      Please note that if your bank connection status is pending, you can still
      complete and submit your application. We'll notify you once your bank
      connection status has been updated.
    </p>
  </div>
)

const PlaidForm: React.FC = () => {
  const { watch, setValue, formState } = useFormContext<PlaidFormValue>()
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

  const institutionOptions = useMemo(
    () =>
      institutions.map((institution) => ({
        label: institution.name,
        value: institution.institutionId
      })),
    [institutions]
  )

  const selectedInstitution = watch("institution")
  const selectedInstitutionData = institutions.find(
    (institution) => institution.institutionId === selectedInstitution?.value
  )
  const routingNumberOptions = useMemo(
    () =>
      selectedInstitutionData?.routingNumbers.map((routingNumber) => ({
        label: routingNumber,
        value: routingNumber
      })) ?? [],
    [selectedInstitutionData]
  )

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
    const subscription = watch((_, { name }) => {
      if (name === "institution") {
        setValue("routingNumber", undefined)
      }
    })

    return () => subscription.unsubscribe()
  }, [setValue, watch])

  useUpdateEffect(() => {
    if (linkTokenError.errorMessage) {
      toastError({
        title: "Connect Bank Account Error",
        description: linkTokenError.errorMessage
      })
    }
  }, [linkTokenError])

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

  return (
    <div className="w-full flex flex-col gap-5 text-secondary-700 text-sm">
      <InstitutionField
        options={institutionOptions}
        onSearch={searchInstitutions}
        isLoading={isLoading}
        total={total}
      />
      <RoutingNumberField
        options={routingNumberOptions}
        disabled={!selectedInstitution}
      />

      {!!connectedAccounts.length && (
        <div className="flex flex-col w-full mt-2">
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
          </LoadingWrapper>
        </div>
      )}

      <Separator />

      <ConnectButton
        disabled={isFetchingDetails || !formState.isValid}
        hasConnectedAccounts={!!connectedAccounts.length}
        isBankAccountsLoading={isConnecting || isFetchingDetails}
      />

      {!isReviewApplicationStep(step) && (
        <FormSubmitButton
          className="w-full"
          onSubmit={handleNextClick}
          isDisabled={!connectedAccounts.length}
        />
      )}
    </div>
  )
}

const InstitutionField: React.FC<{
  options: Option[]
  onSearch: (value: string) => void
  isLoading: boolean
  total?: number
}> = ({ options, onSearch, isLoading, total }) => (
  <div className="flex justify-between items-center gap-4">
    <p>Banking institution</p>
    <FormField
      name="institution"
      render={({ field }) => (
        <SearchSelect
          field={field}
          options={options}
          handleSearch={onSearch}
          placeholder="Start typing your institution"
          isFetching={isLoading}
          totalOptions={total}
        />
      )}
    />
  </div>
)

const RoutingNumberField: React.FC<{
  options: Option[]
  disabled: boolean
}> = ({ options, disabled }) => (
  <div className="flex justify-between items-center gap-4">
    <p>
      Routing number <small>(Optional)</small>
    </p>
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

const ConnectButton: React.FC<{
  disabled?: boolean
  hasConnectedAccounts?: boolean
  isBankAccountsLoading?: boolean
}> = ({ disabled, hasConnectedAccounts, isBankAccountsLoading }) => {
  const form = useFormContext<PlaidFormValue>()
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = usePlaidContext()

  const handleSubmit = form.handleSubmit(async (formValue) => {
    if (!formValue.institution?.value) return

    try {
      setIsLoading(true)
      await generateToken(dispatch, {
        routingNumber: formValue.routingNumber?.value,
        plaidInstitutionId: formValue.institution.value
      })
    } catch (error) {
      toastError({
        title: "Connecting failed",
        description: getAxiosError(error as Error).message
      })
    } finally {
      setIsLoading(false)
    }
  })

  useLazyConnectPlaidEffect()

  return (
    <div className="self-end">
      <ButtonLoading
        isLoading={isLoading || isBankAccountsLoading}
        onClick={handleSubmit}
        disabled={disabled || isBankAccountsLoading}
        className="text-sm rounded-lg"
        size="sm"
        variant="outline"
      >
        <Link className="w-4 h-4 mr-1" strokeWidth={2.5} />
        {hasConnectedAccounts ? " Connect More" : " Connect with Plaid"}
      </ButtonLoading>
    </div>
  )
}

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
