import { DataTable } from "@/components/ui/data-table"
import { MOCK_DOCUMENTS } from "@/modules/conference-demo/admin/constants/data"
import { documentColumns } from "@/modules/conference-demo/admin/constants/document-columns"
import { useParams } from "react-router-dom"

function Documents() {
  const data = MOCK_DOCUMENTS
  const { id = "" } = useParams()

  return (
    <div>
      <div className="rounded-t-xl border border-b-0 px-6 py-5">
        <h3 className="mb-1 text-lg font-semibold">Documentation</h3>
        <p className="text-sm text-text-tertiary">
          Documents and assets that have been attached to this loan application
        </p>
      </div>

      <DataTable
        columns={documentColumns(id)}
        data={data?.data ?? []}
        tableHeaderClassName="border-t-0"
        tableWrapperClassName="-mt-6 rounded-b-xl rounded-t-none border-t-0"
        total={data?.total ?? 0}
      />
    </div>
  )
}

export default Documents
