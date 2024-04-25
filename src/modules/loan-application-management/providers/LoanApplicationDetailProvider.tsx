import { UserMicroLoanApplication } from "@/types/loan-application.type"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
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
import { useQueryGetApplicationDetails } from "../hooks/useQuery/useQueryApplicationDetails"
import { useQueryGetCashFlowAnalysis } from "../hooks/useQuery/useQueryGetCashFlowAnalysis"
import { useQueryGetKyb } from "../hooks/useQuery/useQueryGetKyb"
import { useQueryGetKyc } from "../hooks/useQuery/useQueryGetKyc"
import { useQueryGetLoanSummary } from "../hooks/useQuery/useQueryLoanSummary"

type LoanApplicationDetailContextType = {
  loanKybDetail?: ApplicationKybDetailResponse
  loanKycDetail?: LoanApplicationsKyc
  loanApplicationDetails?: UserMicroLoanApplication
  cashFlowAnalysis?: ApplicationCashFlow
  onChangeTimePeriod: (key: string, period: string) => void
  isFetchingCashflow: boolean
  isFetchingBankAccount: boolean
  isFetchingSummary: boolean
  isLoading: boolean
  loanSummary?: LoanSummary
  onChangeTransactionTags: (option: TRANSACTION_TAG[]) => void
  onChangeAccountFilter: (value: string[]) => void
  onChangeTimeRangeFilter: (from: string | null, to: string | null) => void
  selectedTags: TRANSACTION_TAG[]
  filters: CashFlowRequestFilters
  cashFlowAccounts: BankAccount[]
}

export const LoanApplicationDetailContext =
  createContext<LoanApplicationDetailContextType>({
    isLoading: false,
    isFetchingCashflow: false,
    isFetchingSummary: false,
    isFetchingBankAccount: false,
    onChangeTransactionTags: () => {},
    selectedTags: [],
    onChangeTimePeriod: () => {},
    onChangeAccountFilter: () => {},
    filters: {} as CashFlowRequestFilters,
    cashFlowAccounts: [],
    onChangeTimeRangeFilter: () => {}
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

  const params = useParams()

  const kybDetailQuery = useQueryGetKyb({
    applicationId: params.id!
  })

  const kycDetailQuery = useQueryGetKyc({
    applicationId: params.id!
  })

  const userLoanApplicationQuery = useQueryGetApplicationDetails({
    applicationId: params.id!
  })

  const loanSummaryQuery = useQueryGetLoanSummary({
    applicationId: params.id
  })

  const bankAccountsQuery = useQueryGetBankAccounts({
    applicationId: params.id!
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

  const cashFlowQuery = useQueryGetCashFlowAnalysis(
    {
      applicationId: params.id!
    },
    {
      ...filters
    }
  )

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

  const providerValues = useMemo(
    () => ({
      loanKybDetail: kybDetailQuery.data,
      loanKycDetail: kycDetailQuery.data,
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
      onChangeTransactionTags,

      selectedTags,
      onChangeTimePeriod,
      onChangeAccountFilter,
      onChangeTimeRangeFilter
    }),
    [
      kybDetailQuery.data,
      kybDetailQuery.isLoading,
      kycDetailQuery.data,
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
      onChangeTimeRangeFilter
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
