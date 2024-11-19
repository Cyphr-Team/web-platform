import { type PreQualificationResponse } from "@/modules/loan-application/constants/type"
import { type UserMicroLoanApplication } from "@/types/loan-application.type"
import { TimeRangeValue } from "@/types/time-range.type.ts"
import {
  isCapsight,
  isCyphrBank,
  isKccBank,
  isLaunchKC,
  isLoanReady,
  isSbb
} from "@/utils/domain.utils"
import { getTimeRangeDates } from "@/utils/time-range.utils.ts"
import { format } from "date-fns"
import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react"
import { useLocation, useParams } from "react-router-dom"
import { createContext, useContext } from "use-context-selector"
import { type SmartKyc } from "@/lib/persona/persona.types.ts"
import { DEFAULT_TRANSACTION_TAGS } from "../constants"
import { type ApplicationKybDetailResponse } from "../constants/types/business.type"
import {
  type ApplicationCashFlow,
  type BankAccount,
  type CashFlowRequestFilters,
  GRAPH_FREQUENCY,
  type TRANSACTION_TAG
} from "../constants/types/cashflow.type"
import { type FullAmortizationResponse } from "../constants/types/debt-schedule.type"
import { type LoanApplicationsKyc } from "../constants/types/kyc"
import {
  type ApplicationSummary,
  type LoanSummary
} from "../constants/types/loan-summary.type"
import {
  type BaseCashFlowFilters,
  type CashFlowGlanceResponse
} from "../constants/types/v2/cashflow.type"
import { useQueryGetBankAccounts } from "../hooks/useQuery/cash-flow/useQueryGetBankAccounts"
import { useQueryGetCashFlowGlance } from "../hooks/useQuery/cash-flow/v2/useQueryGetCashFlowGlance"
import { useQueryGetSmartKyc } from "../hooks/useQuery/smart-kyc/useQueryGetSmartKyc"
import { useQueryGetApplicationDetailsByType } from "../hooks/useQuery/useQueryApplicationDetails"
import { useQueryFullAmortization } from "../hooks/useQuery/useQueryFullAmortizations"
import { useQueryGetCashFlowAnalysis } from "../hooks/useQuery/useQueryGetCashFlowAnalysis"
import { useQueryGetKyb } from "../hooks/useQuery/useQueryGetKyb"
import { useQueryGetLoanSummary } from "../hooks/useQuery/useQueryLoanSummary"
import { useQueryGetApplicationSummary } from "@/modules/loan-application-management/hooks/useQuery/useQueryApplicationSummary.ts"
import { isEnableFormV2 } from "@/utils/feature-flag.utils.ts"

interface LoanApplicationDetailContextType {
  loanKybDetail?: ApplicationKybDetailResponse
  loanKycDetail?: LoanApplicationsKyc
  loanSmartKycDetail?: SmartKyc
  loanApplicationDetails?: UserMicroLoanApplication
  cashFlowAnalysis?: ApplicationCashFlow
  onChangeTimePeriod: (key: string, period: string) => void
  isFetchingCashflow: boolean
  isFetchingBankAccount: boolean
  isFetchingSummary: boolean
  isLoading: boolean
  isLoadingLoanSmartKycDetail: boolean
  isLoadingFullAmortization: boolean
  loanSummary?: LoanSummary
  applicationSummary?: ApplicationSummary
  fullAmortization?: FullAmortizationResponse
  loanApplicationPreQualificationDetails?: PreQualificationResponse
  onChangeTransactionTags: (option: TRANSACTION_TAG[]) => void
  onChangeAccountFilter: (value: string[]) => void
  onChangeTimeRangeFilter: (from: string | null, to: string | null) => void
  selectedTags: TRANSACTION_TAG[]
  filters: CashFlowRequestFilters
  cashFlowAccounts: BankAccount[]
  // new Cash Flow 2.0
  newCashFlowGlance?: CashFlowGlanceResponse
  isFetchingNewCashFlow: boolean
  onChangeNewTimeRangeFilter: (from: string | null, to: string | null) => void
  newCashFlowFilter: BaseCashFlowFilters
}

export const LoanApplicationDetailContext =
  createContext<LoanApplicationDetailContextType>({
    isLoading: false,
    isLoadingLoanSmartKycDetail: false,
    isFetchingCashflow: false,
    isFetchingSummary: false,
    isFetchingBankAccount: false,
    isLoadingFullAmortization: false,
    onChangeTransactionTags: () => ({}),
    selectedTags: [],
    onChangeTimePeriod: () => ({}),
    onChangeAccountFilter: () => ({}),
    filters: {} as CashFlowRequestFilters,
    cashFlowAccounts: [],
    onChangeTimeRangeFilter: () => ({}),
    // new Cash Flow 2.0
    newCashFlowGlance: {} as CashFlowGlanceResponse,
    isFetchingNewCashFlow: false,
    newCashFlowFilter: {} as BaseCashFlowFilters,
    onChangeNewTimeRangeFilter: () => ({})
  })

export function LoanApplicationDetailProvider({ children }: PropsWithChildren) {
  const [selectedTags, setSelectedTags] = useState<TRANSACTION_TAG[]>(
    DEFAULT_TRANSACTION_TAGS
  )
  const { state } = useLocation()

  const params = useParams()

  const kybDetailQuery = useQueryGetKyb({
    applicationId: params.id!
  })

  const userLoanApplicationQuery = useQueryGetApplicationDetailsByType(
    state?.applicationDetail.type,
    params.id!
  )

  const loanSummaryQuery = useQueryGetLoanSummary({
    applicationId: params.id
  })

  const applicationSummaryQuery = useQueryGetApplicationSummary({
    applicationId: params.id,
    enabled: isEnableFormV2()
  })

  const fullAmortizationQuery = useQueryFullAmortization({
    applicationId: params.id!,
    enabledByInstitution: isLoanReady()
  })
  const bankAccountsQuery = useQueryGetBankAccounts({
    applicationId: params.id!,
    enabledByInstitution: isLoanReady() || isCapsight() // TODO: should have an enum of institution having out-of-the-box UI
  })
  const loanSmartKycDetailQuery = useQueryGetSmartKyc({
    applicationId: params.id,
    enabledByInstitution: isKccBank() || isSbb() || isLaunchKC()
  })

  const defaultFilters = {
    timeRangeFilter: {
      from: null,
      to: null
    },
    balanceFilter: {
      frequency: GRAPH_FREQUENCY.MONTHLY
    }
  }

  const [filters, setFilters] = useState<CashFlowRequestFilters>(defaultFilters)

  useEffect(() => {
    if (bankAccountsQuery.data?.bankAccounts.length === 0) return
    const listBankAccount =
      bankAccountsQuery.data?.bankAccounts.map((item) => item.bankAccountPk) ??
      []

    setFilters((prev) => ({
      ...prev,
      accountFilter: listBankAccount
    }))
  }, [bankAccountsQuery.data])

  const onChangeTransactionTags = useCallback((value: TRANSACTION_TAG[]) => {
    setSelectedTags(value)
  }, [])

  const onChangeTimePeriod = useCallback((key: string, period: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: {
        ...prev[key as keyof typeof prev],
        frequency: period
      }
    }))
  }, [])

  const onChangeAccountFilter = useCallback((value: string[]) => {
    setFilters((prev) => ({
      ...prev,
      accountFilter: value
    }))
  }, [])

  const onChangeTimeRangeFilter = useCallback(
    (from: string | null, to: string | null) => {
      setFilters((prev) => ({
        ...prev,
        timeRangeFilter: {
          from,
          to
        }
      }))
    },
    []
  )

  const cashFlowQuery = useQueryGetCashFlowAnalysis(
    {
      applicationId: params.id!
    },
    {
      ...filters
    },
    isLoanReady() || isCapsight()
  )

  // New Cash Flow 2.0
  const newDefaultFilters = {
    timeRangeFilter: {
      from: format(
        getTimeRangeDates(TimeRangeValue.LAST_3_MONTHS).from,
        "yyyy-MM-dd"
      ),
      to: format(
        getTimeRangeDates(TimeRangeValue.LAST_3_MONTHS).to,
        "yyyy-MM-dd"
      )
    },
    frequency: GRAPH_FREQUENCY.MONTHLY
  }
  const [newCashFlowFilter, setNewCashFlowFilter] =
    useState<BaseCashFlowFilters>(newDefaultFilters)

  const newCashFlowGlanceQuery = useQueryGetCashFlowGlance({
    applicationId: params.id!,
    filters: {
      timeRangeFilter: newCashFlowFilter.timeRangeFilter
    },
    enabledByInstitution:
      isCyphrBank() || isKccBank() || isSbb() || isLaunchKC() || isLoanReady() // TODO: should have an enum of institution having out-of-the-box UI
  })

  const onChangeNewTimeRangeFilter = useCallback(
    (from: string | null, to: string | null) => {
      setNewCashFlowFilter((prev) => ({
        ...prev,
        timeRangeFilter: {
          from,
          to
        }
      }))
    },
    []
  )

  const providerValues = useMemo(
    () => ({
      loanKybDetail: kybDetailQuery.data,
      loanSmartKycDetail: loanSmartKycDetailQuery.data,
      loanApplicationDetails: userLoanApplicationQuery.data,
      loanSummary: loanSummaryQuery.data,
      applicationSummary: applicationSummaryQuery.data,
      fullAmortization: fullAmortizationQuery.data,
      cashFlowAnalysis: cashFlowQuery.data,
      cashFlowAccounts: bankAccountsQuery.data?.bankAccounts ?? [],
      filters,
      isFetchingSummary:
        loanSummaryQuery.isLoading || applicationSummaryQuery.isLoading,
      isFetchingBankAccount: bankAccountsQuery.isFetching,
      isFetchingCashflow:
        cashFlowQuery.isLoading || bankAccountsQuery.isLoading,
      isLoading: kybDetailQuery.isLoading,
      isLoadingLoanSmartKycDetail: loanSmartKycDetailQuery.isLoading,
      isLoadingFullAmortization: fullAmortizationQuery.isLoading,
      onChangeTransactionTags,

      selectedTags,
      onChangeTimePeriod,
      onChangeAccountFilter,
      onChangeTimeRangeFilter,
      // new Cash Flow 2.0
      isFetchingNewCashFlow: newCashFlowGlanceQuery.isLoading,
      newCashFlowGlance: newCashFlowGlanceQuery.data,
      newCashFlowFilter,
      onChangeNewTimeRangeFilter
    }),
    [
      kybDetailQuery.data,
      kybDetailQuery.isLoading,
      loanSmartKycDetailQuery.data,
      loanSmartKycDetailQuery.isLoading,
      userLoanApplicationQuery.data,
      loanSummaryQuery.data,
      loanSummaryQuery.isLoading,
      applicationSummaryQuery.data,
      applicationSummaryQuery.isLoading,
      fullAmortizationQuery.data,
      fullAmortizationQuery.isLoading,
      cashFlowQuery.data,
      cashFlowQuery.isLoading,
      bankAccountsQuery.data?.bankAccounts,
      bankAccountsQuery.isFetching,
      bankAccountsQuery.isLoading,
      filters,
      onChangeTransactionTags,
      selectedTags,
      onChangeTimePeriod,
      onChangeAccountFilter,
      onChangeTimeRangeFilter,
      newCashFlowGlanceQuery.isLoading,
      // new Cash Flow 2.0
      newCashFlowGlanceQuery.data,
      newCashFlowFilter,
      onChangeNewTimeRangeFilter
    ]
  )

  return (
    <LoanApplicationDetailContext.Provider value={providerValues}>
      {children}
    </LoanApplicationDetailContext.Provider>
  )
}

export const useLoanApplicationDetailContext = () => {
  return useContext(LoanApplicationDetailContext)
}
