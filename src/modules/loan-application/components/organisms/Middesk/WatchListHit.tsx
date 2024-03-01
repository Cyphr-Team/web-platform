import { Dot } from "@/components/ui/dot"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { MiddeskTableHeader } from "@/modules/loan-application-management/components/table/middesk-table-header"
import {
  MIDDESK_HIT_STATUS,
  WatchlistsHitsReport
} from "@/modules/loan-application-management/constants/types/middesk.type"
import { getBadgeVariantByMiddeskStatus } from "@/modules/loan-application-management/services/middesk.service"
import { ColumnDef } from "@tanstack/react-table"

const columns: ColumnDef<WatchlistsHitsReport>[] = [
  {
    accessorKey: "found",
    header: () => <MiddeskTableHeader title={"Found"} />,
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="min-w-0 flex items-center">
          <Dot
            className="flex-shrink-0 self-start mt-1"
            variantColor={getBadgeVariantByMiddeskStatus(data?.status)}
          />
          <p>{data?.found ?? "-"}</p>
        </div>
      )
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
          <p className="text-sm text-text-tertiary">{data?.agencyCountry}</p>
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
        </div>
      )
    }
  },
  {
    accessorKey: "country",
    header: () => <MiddeskTableHeader title="Country" />,
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="min-w-0">
          <p>{data.country ?? "-"}</p>
          <p className="text-sm text-text-tertiary">{data?.subCountry}</p>
        </div>
      )
    }
  }
]

export const WatchListHit = () => {
  const data: WatchlistsHitsReport[] = [
    {
      found: "Fraud Frappucino Inc.",
      agency: "Office of Foreign Assets Control",
      agencyCountry: "U.S. Department of Treasury",
      status: MIDDESK_HIT_STATUS.HITS,
      list: "Specially Designated Nationals",
      country: "United States of America",
      subCountry: "U.S. Department of Treasury"
    },
    {
      found: "Sam Bankman Fraud",
      agency: "Financial Supervisory Authority",
      list: "Warnings from Foreign Supervisory Authorities",
      status: MIDDESK_HIT_STATUS.HITS,
      country: "Finland",
      subCountry: "European Union"
    }
  ]

  return (
    <MiddeskTable
      tableClassName={"table-fixed"}
      columns={columns}
      data={data}
    />
  )
}
