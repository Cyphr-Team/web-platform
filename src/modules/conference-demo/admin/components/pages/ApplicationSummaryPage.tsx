import { Header } from "../organisms/Header"
import { TopNav } from "../organisms/TopNav"
import { ApplicationSummary } from "../organisms/ApplicationSummary"

export const ApplicationSummaryPage = () => {
  return (
    <div className="flex flex-col w-full h-full md:pt-4">
      <div className="flex flex-col space-y-3xl border-b mt-xl">
        <Header />
        <TopNav />
      </div>
      <div className={"p-4xl pt-3xl flex-1 overflow-auto bg-gray-50"}>
        <ApplicationSummary />
      </div>
    </div>
  )
}
