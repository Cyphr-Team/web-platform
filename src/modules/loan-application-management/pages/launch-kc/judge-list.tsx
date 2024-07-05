import { DataTable } from "@/components/ui/data-table"
import { useBreadcrumb } from "@/hooks/useBreadcrumb"
import { cn } from "@/lib/utils"
import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs"
import { assigneeLoanApplicationColumns } from "../../components/table/loan-application-columns"

// TODO: Integrate API table
// TODO: Integrate API filters
export function JudgeApplicationList() {
  const crumbs = useBreadcrumb()

  return (
    <div
      className={cn("container mx-auto px-2xl py-2xl", "md:px-4xl md:py-4xl")}
    >
      <div className="flex flex-wrap justify-between gap-4">
        <div className="flex flex-col gap-1">
          <Breadcrumbs breads={crumbs} className="px-0" />
          <h1 className="text-2xl font-semibold">Loan Applications</h1>
        </div>
      </div>

      <DataTable
        tableContainerClassName="flex flex-col flex-1 overflow-hidden max-h-[700px]"
        columns={assigneeLoanApplicationColumns}
        data={[]}
        total={0}
      />
    </div>
  )
}
