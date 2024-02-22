import { CreateLoanProgramDialog } from "./components/create-loan-program-dialog"

import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs"

import { APP_BREADS, REQUEST_LIMIT_PARAM } from "@/constants"
import { InfiniteDataTable } from "@/components/ui/infinite-data-table"
import { Row } from "@tanstack/react-table"
import { columns } from "./table/columns"
import { useGetListLoanProgram } from "./hooks/useGetListLoanProgram"
import { LoanProgram } from "@/types/loan-program.type"
import { useState } from "react"
import { useGetDetailLoanProgram } from "./hooks/useGetDetailLoanProgram"

export function Component() {
  const [detailId, setDetailId] = useState<string>()

  const handleClickDetail = (detail: Row<LoanProgram>) => {
    setDetailId(detail.original.id)
  }

  const { data, fetchNextPage, isFetching } = useGetListLoanProgram({
    limit: REQUEST_LIMIT_PARAM,
    offset: 0
  })

  const detailData = useGetDetailLoanProgram({ loanProgramId: detailId })

  return (
    <div className="container mx-auto py-4xl">
      <div className="mb-3xl">
        <Breadcrumbs
          breads={APP_BREADS.CDFI_LOAN_PROGRAM_MANAGEMENT.list}
          className="px-0"
        />
      </div>
      <h1 className="mb-3xl text-3xl font-semibold">Loan Programs</h1>
      <CreateLoanProgramDialog
        defaultData={detailData.data}
        detailId={detailId}
        setDetailId={setDetailId}
      />
      <InfiniteDataTable
        handleClickDetail={handleClickDetail}
        columns={columns}
        data={data}
        fetchNextPage={fetchNextPage}
        isFetching={isFetching}
      />
    </div>
  )
}

Component.displayName = "CDFILoanProgramList"
