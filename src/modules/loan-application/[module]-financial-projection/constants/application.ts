import { APP_PATH } from "@/constants"

export enum ApplicationMenuName {
  overview = "Overview",
  cashFlow = "Cash Flow",
  balanceSheet = "Balance Sheet",
  incomeStatement = "Income Statement",
  loanReady = "LoanReady"
}

export const APPLICANT_APPLICATION_MENU = (id: string) => [
  {
    name: ApplicationMenuName.overview as string,
    href: APP_PATH.LOAN_APPLICATION.FINANCIAL.OVERVIEW(id)
  },
  {
    name: ApplicationMenuName.cashFlow as string,
    href: APP_PATH.LOAN_APPLICATION.FINANCIAL.CASH_FLOW(id)
  },
  {
    name: ApplicationMenuName.balanceSheet as string,
    href: APP_PATH.LOAN_APPLICATION.FINANCIAL.BALANCE_SHEET(id)
  },
  {
    name: ApplicationMenuName.incomeStatement as string,
    href: APP_PATH.LOAN_APPLICATION.FINANCIAL.INCOME_STATEMENT(id)
  },
  {
    name: ApplicationMenuName.loanReady as string,
    href: APP_PATH.LOAN_APPLICATION.FINANCIAL.LOAN_READY(id)
  }
]

export const APPLICANT_APPLICATION_MENU_V2 = (
  loanProgramId: string,
  id: string
) => [
  {
    name: ApplicationMenuName.overview,
    href: APP_PATH.LOAN_APPLICATION.FINANCIAL_APPLICATIONS.detailFinancialProjections.overview(
      loanProgramId,
      id
    )
  },
  {
    name: ApplicationMenuName.cashFlow,
    href: APP_PATH.LOAN_APPLICATION.FINANCIAL_APPLICATIONS.detailFinancialProjections.cashFlow(
      loanProgramId,
      id
    )
  },
  {
    name: ApplicationMenuName.balanceSheet,
    href: APP_PATH.LOAN_APPLICATION.FINANCIAL_APPLICATIONS.detailFinancialProjections.balanceSheet(
      loanProgramId,
      id
    )
  },
  {
    name: ApplicationMenuName.incomeStatement,
    href: APP_PATH.LOAN_APPLICATION.FINANCIAL_APPLICATIONS.detailFinancialProjections.incomeStatement(
      loanProgramId,
      id
    )
  }
]

export const ADMIN_APPLICATION_MENU = (id: string) => [
  {
    name: ApplicationMenuName.overview as string,
    href: APP_PATH.LOAN_APPLICATION_MANAGEMENT.FINANCIAL.OVERVIEW(id)
  },
  {
    name: ApplicationMenuName.cashFlow as string,
    href: APP_PATH.LOAN_APPLICATION_MANAGEMENT.FINANCIAL.CASH_FLOW(id)
  },
  {
    name: ApplicationMenuName.balanceSheet as string,
    href: APP_PATH.LOAN_APPLICATION_MANAGEMENT.FINANCIAL.BALANCE_SHEET(id)
  },
  {
    name: ApplicationMenuName.incomeStatement as string,
    href: APP_PATH.LOAN_APPLICATION_MANAGEMENT.FINANCIAL.INCOME_STATEMENT(id)
  },
  {
    name: ApplicationMenuName.loanReady as string,
    href: APP_PATH.LOAN_APPLICATION_MANAGEMENT.FINANCIAL.LOAN_READY(id)
  }
]

export const ADMIN_APPLICATION_MENU_V2 = (id: string) => [
  {
    name: ApplicationMenuName.overview,
    href: APP_PATH.LOAN_APPLICATION_MANAGEMENT.FINANCIAL.OVERVIEW(id)
  },
  {
    name: ApplicationMenuName.cashFlow,
    href: APP_PATH.LOAN_APPLICATION_MANAGEMENT.FINANCIAL.CASH_FLOW(id)
  },
  {
    name: ApplicationMenuName.balanceSheet,
    href: APP_PATH.LOAN_APPLICATION_MANAGEMENT.FINANCIAL.BALANCE_SHEET(id)
  },
  {
    name: ApplicationMenuName.incomeStatement,
    href: APP_PATH.LOAN_APPLICATION_MANAGEMENT.FINANCIAL.INCOME_STATEMENT(id)
  }
]
