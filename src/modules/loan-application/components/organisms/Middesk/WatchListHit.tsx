import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { MiddeskTableHeader } from "@/modules/loan-application-management/components/table/middesk-table-header"
import { type BusinessWatchlistDetail } from "@/modules/loan-application-management/constants/types/business.type"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { type ColumnDef } from "@tanstack/react-table"
import { NotFoundAlert } from "../../molecules/NotFoundAlert"
import { SourceToolTip } from "../../molecules/SourceToolTip"

const columns: ColumnDef<BusinessWatchlistDetail>[] = [
  {
    accessorKey: "found",
    header: () => <MiddeskTableHeader title="Found" />,
    cell: ({ row }) => {
      const data = row.original

      return <p>{data?.found ?? "-"}</p>
    }
  },
  {
    accessorKey: "agency",
    header: () => <MiddeskTableHeader title="Agency" />,
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="min-w-0">
          <p>{data.agency ?? "-"}</p>
          <p className="text-sm text-text-tertiary">{data?.organization}</p>
        </div>
      )
    }
  },
  {
    accessorKey: "list",
    header: () => <MiddeskTableHeader title="List" />,
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="min-w-0">
          <p>{data?.list ?? "-"}</p>
          {data.sourceUrl ? (
            <SourceToolTip
              sourceContent="Source URL"
              subDescription={
                <a
                  className="font-semibold text-blue-700 hover:underline"
                  href={data.sourceUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {data.sourceUrl}
                </a>
              }
            />
          ) : null}
        </div>
      )
    }
  },
  {
    accessorKey: "listCountry",
    header: () => <MiddeskTableHeader title="Country" />,
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="min-w-0">
          <p>{data.listCountry ?? "-"}</p>
          <p className="text-sm text-text-tertiary">{data?.listRegion}</p>
        </div>
      )
    }
  }
]

export function WatchListHit() {
  const { loanKybDetail } = useLoanApplicationDetailContext()

  const watchlist = loanKybDetail?.businessWatchlist
  const status = loanKybDetail?.insights.bankruptcies?.status

  return watchlist?.data.length ? (
    <MiddeskTable
      columns={columns}
      data={watchlist.data}
      tableClassName="table-fixed"
    />
  ) : (
    <div className="mt-3">
      <NotFoundAlert label="No hits found" status={status} />
    </div>
  )
}
