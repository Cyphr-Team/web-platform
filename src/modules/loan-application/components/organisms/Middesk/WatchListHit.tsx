import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { MiddeskTableHeader } from "@/modules/loan-application-management/components/table/middesk-table-header"
import { BusinessWatchlistDetail } from "@/modules/loan-application-management/constants/types/business.type"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { ColumnDef } from "@tanstack/react-table"
import { NotFoundAlert } from "../../molecules/NotFoundAlert"
import { SourceToolTip } from "../../molecules/SourceToolTip"

const columns: ColumnDef<BusinessWatchlistDetail>[] = [
  {
    accessorKey: "found",
    header: () => <MiddeskTableHeader title={"Found"} />,
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
    header: () => <MiddeskTableHeader title={"List"} />,
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="min-w-0">
          <p>{data?.list ?? "-"}</p>
          {data.sourceUrl && (
            <SourceToolTip
              sourceContent="Source URL"
              subDescription={
                <a
                  href={data.sourceUrl}
                  className="text-blue-700 font-semibold hover:underline"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {data.sourceUrl}
                </a>
              }
            />
          )}
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

export const WatchListHit = () => {
  const { loanKybDetail } = useLoanApplicationDetailContext()

  const watchlist = loanKybDetail?.businessWatchlist
  const status = loanKybDetail?.insights.bankruptcies?.status

  return watchlist?.data.length ? (
    <MiddeskTable
      tableClassName={"table-fixed"}
      columns={columns}
      data={watchlist.data}
    />
  ) : (
    <div className="mt-3">
      <NotFoundAlert status={status} label="No hits found" />
    </div>
  )
}
