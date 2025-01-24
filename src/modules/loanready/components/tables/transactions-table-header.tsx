import { Form, FormField } from "@/components/ui/form"
import { type Option } from "@/types/common.type"
import { type ReactNode, useMemo } from "react"
import { type UseFormReturn } from "react-hook-form"
import { MultiSelectRound } from "@/components/ui/multi-select-round.tsx"
import { Badge } from "@/components/ui/badge.tsx"
import {
  getBadgeVariantByStatus,
  getStatusDisplayName,
  RefundStatus
} from "@/types/transaction.type"
import { LoanReadyPlanEnum } from "@/modules/loanready/constants/package"
import { getLabelByPlan } from "@/modules/loanready/services"
import {
  type TransactionFilterValues,
  useQueryListPaginateTransaction
} from "@/modules/loanready/hooks/payment/useQueryListPaginateTransaction"
import { formatBirthday } from "@/utils/date.utils"
import { FORMAT_REQUEST_DATE } from "@/constants/date.constants"
import { format } from "date-fns"
import { checkIsLoanApplicant } from "@/utils/check-roles"

interface IFilter {
  filterForm: UseFormReturn<TransactionFilterValues>
}

const enum FormFieldNames {
  Status = "transactionStatus",
  Search = "search",
  PaidOn = "paidOn",
  Product = "product"
}

const STATUS_OPTIONS: Option<RefundStatus>[] = Object.values(RefundStatus).map(
  (status) => ({
    value: status,
    label: getStatusDisplayName(status)
  })
)

const PLAN_OPTIONS: Option<LoanReadyPlanEnum>[] = [
  {
    value: LoanReadyPlanEnum.BASIC,
    label: "LoanReady"
  },
  {
    value: LoanReadyPlanEnum.PLUS,
    label: "LoanReady+"
  }
]

const PaidOnMultiSelectComponent = (option: Option, close: ReactNode) => (
  <div className="break-all">
    {option.label}
    {close}
  </div>
)

const StatusMultiSelectComponent = (
  option: Option<RefundStatus>,
  close: ReactNode
) => (
  <Badge
    className="whitespace-nowrap text-black"
    variant="solid"
    variantColor={getBadgeVariantByStatus(option.value)}
  >
    {option.label}
    {close}
  </Badge>
)

const LoanProgramMultiSelectComponent = (
  option: Option<LoanReadyPlanEnum>,
  close: ReactNode
) => (
  <div>
    {getLabelByPlan(option.value)}
    {close}
  </div>
)

export function TransactionsTableHeader({ filterForm }: IFilter) {
  const isApplicant = checkIsLoanApplicant()
  // Fetch all dates for the email filter
  const { data } = useQueryListPaginateTransaction({
    limit: 100_000_000, // A random big integer - I don't think LoanReady will have this many transactions
    offset: 0,
    isApplicant
  })

  const PAID_ON_OPTIONS = useMemo(
    () =>
      Array.from(
        new Set(data?.data.map((item) => formatBirthday(item.paidOn) ?? ""))
      ).map((paidOn) => ({
        value: format(paidOn, FORMAT_REQUEST_DATE) ?? "",
        label: formatBirthday(paidOn) ?? "Unknown"
      })),
    [data]
  )

  return (
    <Form {...filterForm}>
      <div className="flex gap-3">
        <FormField
          control={filterForm.control}
          name={FormFieldNames.Status}
          render={({ field }) => (
            <MultiSelectRound
              field={field}
              label="Status"
              labelHOC={(option, close) =>
                StatusMultiSelectComponent(option, close)
              }
              options={STATUS_OPTIONS}
              subLabel="Select status"
            />
          )}
        />
        <FormField
          control={filterForm.control}
          name={FormFieldNames.Product}
          render={({ field }) => (
            <MultiSelectRound
              field={field}
              label="Product"
              labelHOC={(option, close) =>
                LoanProgramMultiSelectComponent(option, close)
              }
              options={PLAN_OPTIONS}
              subLabel="Select product"
            />
          )}
        />
        {PAID_ON_OPTIONS && !isApplicant ? (
          <FormField
            control={filterForm.control}
            name={FormFieldNames.PaidOn}
            render={({ field }) => (
              <MultiSelectRound
                field={field}
                label="Paid On"
                labelHOC={(option, close) =>
                  PaidOnMultiSelectComponent(option, close)
                }
                options={PAID_ON_OPTIONS}
                subLabel="Select date"
              />
            )}
          />
        ) : null}
      </div>
    </Form>
  )
}
