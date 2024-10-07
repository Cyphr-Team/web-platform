import { APP_PATH } from "@/constants"

export enum ApplicationMenuName {
  overview = "Overview",
  cashflow = "Cash Flow",
  balanceSheet = "Balance Sheet",
  incomeStatement = "Income Statement",
  loanReady = "Loan Ready"
}

export const APPLICATION_MENU = (id: string) => [
  {
    name: ApplicationMenuName.overview as string,
    href: APP_PATH.LOAN_APPLICATION.FINANCIAL.OVERVIEW + "#" + id
  },
  {
    name: ApplicationMenuName.cashflow as string,
    href: APP_PATH.LOAN_APPLICATION.FINANCIAL.CASH_FLOW + "#" + id
  },
  {
    name: ApplicationMenuName.balanceSheet as string,
    href: APP_PATH.LOAN_APPLICATION.FINANCIAL.BALANCE_SHEET + "#" + id
  },
  {
    name: ApplicationMenuName.incomeStatement as string,
    href: APP_PATH.LOAN_APPLICATION.FINANCIAL.INCOME_STATEMENT + "#" + id
  },
  {
    name: ApplicationMenuName.loanReady as string,
    href: APP_PATH.LOAN_APPLICATION.FINANCIAL.LOAN_READY + "#" + id
  }
]

export const ADMIN_APPLICATION_MENU = (id: string) => [
  {
    name: ApplicationMenuName.overview as string,
    href: APP_PATH.LOAN_APPLICATION_MANAGEMENT.FINANCIAL.OVERVIEW(id)
  },
  {
    name: ApplicationMenuName.cashflow as string,
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
