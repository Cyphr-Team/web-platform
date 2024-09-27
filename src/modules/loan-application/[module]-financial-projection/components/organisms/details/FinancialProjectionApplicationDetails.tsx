import { ButtonLoading } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { FinancialApplicationFormDetail } from "@/modules/loan-application/[module]-financial-projection/components/molecules/details"
import { useFinancialApplicationDetail } from "@/modules/loan-application/[module]-financial-projection/hooks/details"
import { FolderDown } from "lucide-react"

export const FinancialProjectionApplicationDetails = () => {
  return (
    <Layout>
      <Header />
      <Main />
    </Layout>
  )
}

const Header = () => {
  return (
    <nav className={cn("mt-4", "md:mt-8")}>
      <div className="flex items-center gap-2 min-w-20">
        <h1
          className={cn(
            "text-lg font-semibold truncate min-w-20",
            "md:text-[2.5rem] md:leading-tight"
          )}
        >
          Application Summary
        </h1>
        <div className="ml-auto">
          <ButtonLoading>
            <FolderDown className="w-4 h-4 mr-1" /> Download PDF
          </ButtonLoading>
        </div>
      </div>

      <Separator className={cn("mt-2", "md:mt-5")} />
    </nav>
  )
}

const Main = () => {
  const { financialApplicationDetailData } = useFinancialApplicationDetail()

  const render = financialApplicationDetailData.map(
    ({
      id,
      subId = "",
      title,
      subTitle,
      financialApplicationFormData,
      subChildren
    }) => (
      <FinancialApplicationFormDetail
        key={id + subId}
        title={title}
        subTitle={subTitle}
        financialApplicationFormData={financialApplicationFormData}
        subChildren={subChildren}
      />
    )
  )

  return (
    <main className={cn("flex flex-col gap-4", "md:gap-8")}>
      {render}
      {/* TODO: Operating Expenses (monthly), Direct Costs, Connected Accounts */}
      {/* FIX: Current Employees, Future  Employees, Revenue, Debt Financing */}
    </main>
  )
}

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      id="financial-application-detail"
      className={cn(
        "flex flex-col gap-4 px-4 flex-1 overflow-auto pb-4",
        "md:px-8 md:gap-8 md:pb-8"
      )}
    >
      {children}
    </div>
  )
}

export default FinancialProjectionApplicationDetails
