import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { MiddeskTableHeader } from "@/modules/loan-application-management/components/table/middesk-table-header"
import { type BusinessWatchlistData } from "@/modules/loan-application-management/constants/types/business.type"
import { type ColumnDef } from "@tanstack/react-table"

import { Dot } from "@/components/ui/dot"
import { INSIGHT_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service"
import { type InsightStatus } from "@/modules/loan-application-management/constants/types/insight.type"
import { MOCK_KYB_DETAIL } from "@/modules/conference-demo/admin/constants/data"
import { MiddeskBadge } from "@/modules/loan-application/components/molecules/middesk/MiddeskBadge"
import { MiddeskCard } from "@/modules/loan-application/components/molecules/middesk/MiddeskCard"
import { WatchListHit } from "@/modules/loan-application/components/organisms/Middesk/WatchListHit"
import { DateHeader } from "@/modules/conference-demo/admin/components/atoms/DateHeader"

const columns: ColumnDef<
  Pick<BusinessWatchlistData, "businessName" | "people"> & {
    status?: InsightStatus
  }
>[] = [
  {
    accessorKey: "businessName",
    header: () => <MiddeskTableHeader title="Screened business" />,
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="flex items-start">
          <Dot
            className="mt-1 shrink-0 self-start"
            variantColor={getBadgeVariantByInsightStatus(data?.status)}
          />
          <p>{data?.businessName ?? "-"}</p>
        </div>
      )
    }
  },
  {
    accessorKey: "people",
    header: () => <MiddeskTableHeader title="Screened individual" />,
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="flex items-start">
          {data?.people ? (
            <Dot
              className="mt-1 shrink-0 self-start"
              variantColor={getBadgeVariantByInsightStatus(data?.status)}
            />
          ) : null}
          <p>{data?.people ?? "-"}</p>
        </div>
      )
    }
  }
]

export function WatchLists() {
  const watchlist = MOCK_KYB_DETAIL.businessWatchlist
  const label = MOCK_KYB_DETAIL.insights.watchlists?.subLabel
  const status = MOCK_KYB_DETAIL.insights.watchlists?.status

  const badge = <MiddeskBadge label={label} status={status} />
  const headerTitle = <>Watchlists {badge}</>
  const screenedData = watchlist
    ? [
        {
          businessName: watchlist.businessName,
          people: watchlist.people,
          status
        }
      ]
    : []

  const content = (
    <>
      <MiddeskTable
        columns={columns}
        data={screenedData}
        tableClassName="table-fixed"
      />

      <WatchListHit />
    </>
  )

  return (
    <MiddeskCard
      content={content}
      headerRight={<DateHeader updatedAt={MOCK_KYB_DETAIL.updatedAt} />}
      headerTitle={headerTitle}
      id={INSIGHT_TOC.watchLists}
    />
  )
}
