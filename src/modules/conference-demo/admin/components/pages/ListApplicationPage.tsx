import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs"
import { DataTable } from "@/components/ui/data-table"
import { cn } from "@/lib/utils"
import { LoanApplicationTableHeader } from "@/modules/conference-demo/admin/components/organisms/LoanApplicationTableHeader.tsx"
import { MOCK_APPLICATIONS } from "@/modules/conference-demo/admin/constants/application-data.ts"
import { applicationColumns } from "@/modules/conference-demo/admin/constants/application-columns.tsx"
import { type Breadcrumb } from "@/types/common.type.ts"
import { useNavigate } from "react-router-dom"

const crumbsMock: Breadcrumb[] = [
  {
    label: "Home",
    to: "/"
  },
  {
    label: "Applications",
    to: "/admin/applications"
  }
]

export function ListApplicationPage() {
  const navigate = useNavigate()

  return (
    <div className={cn("container mx-auto p-2xl", "md:p-4xl")}>
      <div className="flex flex-wrap justify-between gap-4">
        <div className="flex flex-col gap-1">
          <Breadcrumbs breads={crumbsMock} className="px-0" />
          <h1 className="text-2xl font-semibold">Loan Applications</h1>
        </div>

        <LoanApplicationTableHeader />
      </div>

      <DataTable
        columns={applicationColumns(navigate)}
        data={MOCK_APPLICATIONS}
        tableContainerClassName="flex max-h-[84vh] flex-1 flex-col overflow-hidden"
        total={MOCK_APPLICATIONS.length}
      />
    </div>
  )
}
