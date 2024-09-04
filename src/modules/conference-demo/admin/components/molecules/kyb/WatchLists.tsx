import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { MiddeskTableHeader } from "@/modules/loan-application-management/components/table/middesk-table-header"
import { BusinessWatchlistData } from "@/modules/loan-application-management/constants/types/business.type"
import { ColumnDef } from "@tanstack/react-table"

import { Dot } from "@/components/ui/dot"
import { INSIGHT_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service"
import { InsightStatus } from "@/modules/loan-application-management/constants/types/insight.type"
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
    header: () => <MiddeskTableHeader title={"Screened business"} />,
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="flex items-start">
          <Dot
            className="flex-shrink-0 self-start mt-1"
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
          {data?.people && (
            <Dot
              className="flex-shrink-0 self-start mt-1"
              variantColor={getBadgeVariantByInsightStatus(data?.status)}
            />
          )}
          <p>{data?.people ?? "-"}</p>
        </div>
      )
    }
  }
]

export const WatchLists = () => {
  const watchlist = MOCK_KYB_DETAIL.businessWatchlist
  const label = MOCK_KYB_DETAIL.insights.watchlists?.subLabel
  const status = MOCK_KYB_DETAIL.insights.watchlists?.status

  const badge = <MiddeskBadge status={status} label={label} />
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
        tableClassName={"table-fixed"}
        columns={columns}
        data={screenedData}
      />

      <WatchListHit />
    </>
  )

  return (
    <MiddeskCard
      id={INSIGHT_TOC.watchLists}
      headerTitle={headerTitle}
      headerRight={<DateHeader updatedAt={MOCK_KYB_DETAIL.updatedAt} />}
      content={content}
    />
  )
}
