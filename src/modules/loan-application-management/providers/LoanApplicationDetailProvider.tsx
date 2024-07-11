import { UserMicroLoanApplication } from "@/types/loan-application.type"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { createContext, useContext } from "use-context-selector"
import { DEFAULT_TRANSACTION_TAGS } from "../constants"
import { ApplicationKybDetailResponse } from "../constants/types/business.type"
import {
  ApplicationCashFlow,
  BankAccount,
  CashFlowRequestFilters,
  GRAPH_FREQUENCY,
  TRANSACTION_TAG
} from "../constants/types/cashflow.type"
import { LoanApplicationsKyc } from "../constants/types/kyc"
import { LoanSummary } from "../constants/types/loan-summary.type"
import { useQueryGetBankAccounts } from "../hooks/useQuery/cash-flow/useQueryGetBankAccounts"
import { useQueryGetApplicationDetailsByType } from "../hooks/useQuery/useQueryApplicationDetails"
import { useQueryGetCashFlowAnalysis } from "../hooks/useQuery/useQueryGetCashFlowAnalysis"
import { useQueryGetKyb } from "../hooks/useQuery/useQueryGetKyb"
import { useQueryGetKyc } from "../hooks/useQuery/useQueryGetKyc"
import { useQueryGetLoanSummary } from "../hooks/useQuery/useQueryLoanSummary"
import {
  BaseCashFlowFilters,
  CashFlowGlanceResponse
} from "../constants/types/v2/cashflow.type"
import { useQueryGetCashFlowGlance } from "../hooks/useQuery/cash-flow/v2/useQueryGetCashFlowGlance"
import {
  isCapsight,
  isCyphrBank,
  isKccBank,
  isLoanReady,
  isSbb
} from "@/utils/domain.utils"
import { TimeRangeValue } from "@/types/time-range.type.ts"
import { getTimeRangeDates } from "@/utils/time-range.utils.ts"
import { format } from "date-fns"
import { useQueryGetSmartKyc } from "../hooks/useQuery/smart-kyc/useQueryGetSmartKyc"
import { SmartKyc } from "../../../lib/persona/persona.types"
import { isEnableIdentityVerificationSectionView } from "../../../utils/feature-flag.utils"

type LoanApplicationDetailContextType = {
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
  loanSummary?: LoanSummary
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
    onChangeTransactionTags: () => {},
    selectedTags: [],
    onChangeTimePeriod: () => {},
    onChangeAccountFilter: () => {},
    filters: {} as CashFlowRequestFilters,
    cashFlowAccounts: [],
    onChangeTimeRangeFilter: () => {},
    // new Cash Flow 2.0
    newCashFlowGlance: {} as CashFlowGlanceResponse,
    isFetchingNewCashFlow: false,
    newCashFlowFilter: {} as BaseCashFlowFilters,
    onChangeNewTimeRangeFilter: () => {}
  })

type Props = {
  children: React.ReactNode
}

export const LoanApplicationDetailProvider: React.FC<Props> = ({
  children
}) => {
  const [selectedTags, setSelectedTags] = useState<TRANSACTION_TAG[]>(
    DEFAULT_TRANSACTION_TAGS
  )
  const { state } = useLocation()

  const params = useParams()

  const kybDetailQuery = useQueryGetKyb({
    applicationId: params.id!
  })

  const kycDetailQuery = useQueryGetKyc({
    applicationId: params.id!
  })

  const userLoanApplicationQuery = useQueryGetApplicationDetailsByType(
    state?.applicationDetail.type,
    params.id!
  )

  const loanSummaryQuery = useQueryGetLoanSummary({
    applicationId: params.id
  })

  const bankAccountsQuery = useQueryGetBankAccounts({
    applicationId: params.id!,
    enabledByInstitution: isLoanReady() || isCapsight() // TODO: should have an enum of institution having out-of-the-box UI
  })
  const loanSmartKycDetailQuery = useQueryGetSmartKyc({
    applicationId: params.id,
    enabledByInstitution:
      (isKccBank() || isSbb()) && isEnableIdentityVerificationSectionView()
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
    enabledByInstitution: isCyphrBank() || isKccBank() || isSbb() // TODO: should have an enum of institution having out-of-the-box UI
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
      loanKycDetail: kycDetailQuery.data,
      loanSmartKycDetail: loanSmartKycDetailQuery.data,
      loanApplicationDetails: userLoanApplicationQuery.data,
      loanSummary: loanSummaryQuery.data,
      cashFlowAnalysis: cashFlowQuery.data,
      cashFlowAccounts: bankAccountsQuery.data?.bankAccounts ?? [],
      filters,
      isFetchingSummary: loanSummaryQuery.isLoading,
      isFetchingBankAccount: bankAccountsQuery.isFetching,
      isFetchingCashflow:
        cashFlowQuery.isLoading || bankAccountsQuery.isLoading,
      isLoading: kybDetailQuery.isLoading,
      isLoadingLoanSmartKycDetail: loanSmartKycDetailQuery.isLoading,
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
      kycDetailQuery.data,
      loanSmartKycDetailQuery.data,
      loanSmartKycDetailQuery.isLoading,
      userLoanApplicationQuery.data,
      loanSummaryQuery.data,
      loanSummaryQuery.isLoading,
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
      // new Cash Flow 2.0

      newCashFlowGlanceQuery.data,
      newCashFlowGlanceQuery.isLoading,
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
