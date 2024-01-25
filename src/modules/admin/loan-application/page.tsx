import { json, useLoaderData, useNavigate } from "react-router-dom"
import { LoanApplication, columns } from "./table/columns"
import { DataTable } from "@/components/ui/data-table"
import { LoanApplicationTableHeader } from "./table/header"
import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs"
import { MOCK_DATA } from "./constants"
import { APP_BREADS, APP_PATH } from "@/constants"

async function getData(): Promise<LoanApplication[]> {
  return MOCK_DATA
}

export async function loader() {
  const data = await getData()

  return json(data)
}

export function Component() {
  const data = useLoaderData() as LoanApplication[]
  const navigate = useNavigate()

  const handleClickDetail = () => {
    navigate(APP_PATH.LOAN_APPLICATION_DETAILS.KYB)
  }

  return (
    <div className="container mx-auto py-4xl">
      <div className="mb-3xl">
        <Breadcrumbs
          breads={APP_BREADS.LOAN_APPLICATION_DETAILS.list}
          className="px-0"
        />
      </div>
      <div className="bg-gray-100 bg-opacity-60 p-5 rounded-lg">
        <LoanApplicationTableHeader />
      </div>
      <DataTable
        handleClickDetail={handleClickDetail}
        columns={columns}
        data={data}
      />
    </div>
  )
}

Component.displayName = "LoanApplication"
