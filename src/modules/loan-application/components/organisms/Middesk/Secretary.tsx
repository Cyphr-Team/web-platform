import { Dot } from "@/components/ui/dot"
import {
  KybState,
  KybStateSkeleton
} from "@/modules/loan-application-management/components/molecules/KybState"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { MiddeskTableHeader } from "@/modules/loan-application-management/components/table/middesk-table-header"
import { type BusinessSosDetail } from "@/modules/loan-application-management/constants/types/business.type"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { type ColumnDef } from "@tanstack/react-table"
import { MiddeskBadge } from "../../molecules/middesk/MiddeskBadge"
import { MiddeskCard } from "../../molecules/middesk/MiddeskCard"
import { SourceToolTip } from "../../molecules/SourceToolTip"
import { DateHeader } from "./DateHeader"
import { INSIGHT_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service"

const columns: ColumnDef<BusinessSosDetail>[] = [
  {
    accessorKey: "fileDate",
    header: () => <MiddeskTableHeader title="File date" />,
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="min-w-0">
          <p>{data?.fileDate ?? "-"}</p>
        </div>
      )
    }
  },
  {
    accessorKey: "state",
    header: () => <MiddeskTableHeader title="State" />,
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="min-w-0">
          <p>{data?.state ?? "-"}</p>
        </div>
      )
    }
  },
  {
    accessorKey: "status",
    header: () => <MiddeskTableHeader title="Status" />,
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="min-w-0">
          <MiddeskBadge status={data?.status} />
        </div>
      )
    }
  },
  {
    accessorKey: "subStatus",
    header: () => <MiddeskTableHeader title="Sub-status" />,
    cell: ({ row }) => {
      const data = row.original

      if (!data.source.status) return "-"

      return (
        <div className="flex items-start">
          {data.subStatus ? (
            <>
              <Dot
                className="mt-1 shrink-0 self-start"
                variantColor={getBadgeVariantByInsightStatus(
                  data.source.status
                )}
              />
              <SourceToolTip
                data={[data.source]}
                sourceContent={data.subStatus}
              />
            </>
          ) : null}
        </div>
      )
    }
  }
]

export function Secretary() {
  const { loanKybDetail, isLoading } = useLoanApplicationDetailContext()

  const sosFillings = loanKybDetail?.businessSosFillings

  const badge = (
    <MiddeskBadge
      label={sosFillings?.subLabel}
      status={loanKybDetail?.insights.sosFillings?.status}
    />
  )
  const headerTitle = <>Secretary of State filings {badge}</>

  const content = (
    <>
      <div className="my-4 flex flex-col gap-y-lg">
        <p className="text-lg font-medium">Registration Status</p>
        {isLoading ? (
          <KybStateSkeleton />
        ) : (
          <KybState sosFillings={sosFillings} />
        )}
      </div>

      <MiddeskTable
        columns={columns}
        data={sosFillings?.data ?? []}
        isLoading={isLoading}
        tableClassName="table-fixed"
      />
    </>
  )

  return (
    <MiddeskCard
      content={content}
      headerRight={<DateHeader />}
      headerTitle={headerTitle}
      id={INSIGHT_TOC.sosFillings}
    />
  )
}
