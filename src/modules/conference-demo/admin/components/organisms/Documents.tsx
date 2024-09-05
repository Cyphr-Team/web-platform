import { DataTable } from "@/components/ui/data-table"
import { MOCK_DOCUMENTS } from "@/modules/conference-demo/admin/constants/data"
import { documentColumns } from "@/modules/conference-demo/admin/constants/document-columns"

const Documents = () => {
  const data = MOCK_DOCUMENTS

  return (
    <div>
      <div className="rounded-t-xl border border-b-0 px-6 py-5">
        <h3 className="font-semibold text-lg mb-1">Documentation</h3>
        <p className="text-text-tertiary text-sm">
          Documents and assets that have been attached to this loan application
        </p>
      </div>

      <DataTable
        tableWrapperClassName="rounded-t-none border-t-0 -mt-6 rounded-b-xl"
        tableHeaderClassName="border-t-0"
        columns={documentColumns}
        data={data?.data ?? []}
        total={data?.total ?? 0}
      />
    </div>
  )
}

export default Documents
