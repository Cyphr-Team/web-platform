import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs"
import { DataTable } from "@/components/ui/data-table"
import { cn } from "@/lib/utils"
import { LoanApplicationTableHeader } from "@/modules/conference-demo/admin/components/organisms/LoanApplicationTableHeader.tsx"
import { applicationColumns } from "@/modules/conference-demo/admin/constants/application-columns.tsx"
import { type Breadcrumb, SortOrder } from "@/types/common.type.ts"
import { useNavigate } from "react-router-dom"
import { useListAssessmentForAdmin } from "@/modules/conference-demo/admin/hooks/useListApplicationForAdmin.tsx"
import { useCallback, useState } from "react"
import { type SortingState } from "@tanstack/react-table"

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

  // Sort state
  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true }
  ])
  const getSort = useCallback(() => {
    if (!sorting.length) return undefined

    return {
      [sorting[0].id]: sorting[0].desc
        ? SortOrder.DESC_NULLS_LAST
        : SortOrder.ASC_NULLS_FIRST
    }
  }, [sorting])

  // Query list applications
  const data = useListAssessmentForAdmin({
    sort: getSort()
  })

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
        manualSorting
        columns={applicationColumns(navigate)}
        data={data?.data ?? []}
        setSorting={setSorting}
        sorting={sorting}
        tableContainerClassName="flex max-h-[84vh] flex-1 flex-col overflow-hidden"
        total={data?.total ?? 0}
      />
    </div>
  )
}
