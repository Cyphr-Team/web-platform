import SettingsPageTopNav from "../components/molecules/SettingsPageTopNav"
import { LoanReadyTransactionsPage } from "../components/pages/Transactions"

export function Component(): JSX.Element {
  return (
    <div className="mx-auto w-full p-6 md:p-8">
      <h1 className="text-3.5xl font-semibold">Settings</h1>
      <p className="mb-2 mt-1">
        Keep track of your account assessments and their statuses
      </p>
      <SettingsPageTopNav />
      <LoanReadyTransactionsPage />
    </div>
  )
}

Component.displayName = "TransactionList"
