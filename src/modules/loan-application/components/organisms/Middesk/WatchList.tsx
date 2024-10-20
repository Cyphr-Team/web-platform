import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { MiddeskTableHeader } from "@/modules/loan-application-management/components/table/middesk-table-header"
import { type BusinessWatchlistData } from "@/modules/loan-application-management/constants/types/business.type"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { type ColumnDef } from "@tanstack/react-table"
import { MiddeskBadge } from "../../molecules/middesk/MiddeskBadge"
import { MiddeskCard } from "../../molecules/middesk/MiddeskCard"
import { DateHeader } from "./DateHeader"
import { WatchListHit } from "./WatchListHit"
import { Dot } from "@/components/ui/dot"
import { INSIGHT_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service"
import { type InsightStatus } from "@/modules/loan-application-management/constants/types/insight.type"

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
          {data?.people ? (
            <Dot
              className="flex-shrink-0 self-start mt-1"
              variantColor={getBadgeVariantByInsightStatus(data?.status)}
            />
          ) : null}
          <p>{data?.people ?? "-"}</p>
        </div>
      )
    }
  }
]

export function WatchList() {
  const { loanKybDetail, isLoading } = useLoanApplicationDetailContext()

  const watchlist = loanKybDetail?.businessWatchlist
  const label = loanKybDetail?.insights.watchlists?.subLabel
  const status = loanKybDetail?.insights.watchlists?.status

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
        isLoading={isLoading}
        tableClassName="table-fixed"
      />

      {!isLoading && <WatchListHit />}
    </>
  )

  return (
    <MiddeskCard
      content={content}
      headerRight={<DateHeader />}
      headerTitle={headerTitle}
      id={INSIGHT_TOC.watchLists}
    />
  )
}
