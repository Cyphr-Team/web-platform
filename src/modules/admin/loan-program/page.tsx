import { CreateLoanProgramDialog } from "./components/create-loan-program-dialog"

import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs"

import { REQUEST_LIMIT_PARAM } from "@/constants"
import { InfiniteDataTable } from "@/components/ui/infinite-data-table"
import { type Row } from "@tanstack/react-table"
import { columns } from "./table/columns"
import { useGetListLoanProgram } from "./hooks/useGetListLoanProgram"
import { type LoanProgram } from "@/types/loan-program.type"
import { useState } from "react"
import { useGetDetailLoanProgram } from "./hooks/useGetDetailLoanProgram"
import { useBreadcrumb } from "@/hooks/useBreadcrumb"
import { isEnableLoanProgramChangesManagement } from "@/utils/feature-flag.utils"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import { capitalizeWords } from "@/utils"

export function Component() {
  const [detailId, setDetailId] = useState<string>()

  const crumbs = useBreadcrumb()

  const handleClickDetail = (detail: Row<LoanProgram>) => {
    setDetailId(detail.original.id)
  }

  const { data, fetchNextPage, isFetching } = useGetListLoanProgram({
    limit: REQUEST_LIMIT_PARAM,
    offset: 0
  })

  const tableColumns = isEnableLoanProgramChangesManagement()
    ? columns.concat({
        accessorKey: "status",
        header: ({ column }) => {
          return <DataTableColumnHeader column={column} title="Status" />
        },
        cell: ({ row }) => {
          return (
            <p className="capitalize">
              {capitalizeWords(row.original.status ?? "N/A")}
            </p>
          )
        },
        size: 100
      })
    : columns

  const detailData = useGetDetailLoanProgram({ loanProgramId: detailId })

  return (
    <div className="mx-auto p-6 pt-6 md:p-8">
      <div className="mb-3xl">
        <Breadcrumbs breads={crumbs} className="px-0" />
      </div>
      <h1 className="mb-3xl text-3xl font-semibold">Loan Programs</h1>
      <CreateLoanProgramDialog
        defaultData={detailData.data}
        detailId={detailId}
        isFetching={detailData.isFetching || detailData.isLoading}
        setDetailId={setDetailId}
      />
      <InfiniteDataTable
        columns={tableColumns}
        data={data}
        fetchNextPage={fetchNextPage}
        handleClickDetail={handleClickDetail}
        isFetching={isFetching}
      />
    </div>
  )
}

Component.displayName = "CDFILoanProgramList"
