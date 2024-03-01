import { Dot } from "@/components/ui/dot"
import { FORMAT_DATE_MM_DD_YYYY } from "@/constants/date.constants"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { MiddeskTableHeader } from "@/modules/loan-application-management/components/table/middesk-table-header"
import {
  MIDDESK_HIT_STATUS,
  WatchlistsReport
} from "@/modules/loan-application-management/constants/types/middesk.type"
import { getBadgeVariantByMiddeskStatus } from "@/modules/loan-application-management/services/middesk.service"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { MiddeskBadge } from "../../molecules/MiddeskBadge"
import { MiddeskCard } from "../../molecules/MiddeskCard"
import { WatchListHit } from "./WatchListHit"

const columns: ColumnDef<WatchlistsReport>[] = [
  {
    accessorKey: "name",
    header: () => <MiddeskTableHeader title={"Screened Business"} />,
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="min-w-0 flex items-center">
          <Dot
            className="flex-shrink-0 self-start mt-1"
            variantColor={getBadgeVariantByMiddeskStatus(
              data?.business?.status
            )}
          />
          <p>{data?.business?.name ?? "-"}</p>
        </div>
      )
    }
  },
  {
    accessorKey: "submitted",
    header: () => <MiddeskTableHeader title="Screened Individual" />,
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="min-w-0 flex items-center">
          <Dot
            className="flex-shrink-0 self-start mt-1"
            variantColor={getBadgeVariantByMiddeskStatus(
              data?.individual?.status
            )}
          />
          <p>{data?.individual?.name ?? "-"}</p>
        </div>
      )
    }
  }
]

export const WatchList = () => {
  const data: WatchlistsReport[] = [
    {
      business: {
        name: "Fraud Frappucino Inc.",
        status: MIDDESK_HIT_STATUS.HITS
      },
      individual: {
        name: "Sam-Bankman Fraud",
        status: MIDDESK_HIT_STATUS.HITS
      }
    }
  ]

  const badge = <MiddeskBadge status={MIDDESK_HIT_STATUS.HITS} />
  const headerTitle = <>Watchlists {badge}</>
  const headerRight = (
    <div className="text-text-tertiary">
      Last updated on {format(new Date(), FORMAT_DATE_MM_DD_YYYY)}
    </div>
  )

  const content = (
    <>
      <MiddeskTable
        tableClassName={"table-fixed"}
        columns={columns}
        data={data}
      />

      <WatchListHit />
    </>
  )

  return (
    <MiddeskCard
      headerTitle={headerTitle}
      headerRight={headerRight}
      content={content}
    />
  )
}
