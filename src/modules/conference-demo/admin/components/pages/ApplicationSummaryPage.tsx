import { Header } from "../organisms/Header"
import { TopNav } from "../organisms/TopNav"
import { ApplicationSummary } from "../organisms/ApplicationSummary"

export function ApplicationSummaryPage() {
  return (
    <div className="flex size-full flex-col md:pt-4">
      <div className="mt-xl flex flex-col space-y-3xl border-b">
        <Header />
        <TopNav />
      </div>
      <div className="flex-1 overflow-auto bg-gray-50 p-4xl">
        <ApplicationSummary />
      </div>
    </div>
  )
}
