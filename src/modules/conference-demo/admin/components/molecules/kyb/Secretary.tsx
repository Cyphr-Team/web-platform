import { Dot } from "@/components/ui/dot"
import { KybState } from "@/modules/loan-application-management/components/molecules/KybState"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { MiddeskTableHeader } from "@/modules/loan-application-management/components/table/middesk-table-header"
import { BusinessSosDetail } from "@/modules/loan-application-management/constants/types/business.type"
import { ColumnDef } from "@tanstack/react-table"
import { INSIGHT_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service"
import { SourceToolTip } from "@/modules/loan-application/components/molecules/SourceToolTip"
import { MiddeskBadge } from "@/modules/loan-application/components/molecules/middesk/MiddeskBadge"
import { MOCK_KYB_DETAIL } from "@/modules/conference-demo/admin/constants/data"
import { MiddeskCard } from "@/modules/loan-application/components/molecules/middesk/MiddeskCard"
import { DateHeader } from "@/modules/conference-demo/admin/components/atoms/DateHeader"

const columns: ColumnDef<BusinessSosDetail>[] = [
  {
    accessorKey: "fileDate",
    header: () => <MiddeskTableHeader title={"File date"} />,
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
          {data.subStatus && (
            <>
              <Dot
                className="flex-shrink-0 self-start mt-1"
                variantColor={getBadgeVariantByInsightStatus(
                  data.source.status
                )}
              />
              <SourceToolTip
                data={[data.source]}
                sourceContent={data.subStatus}
              />
            </>
          )}
        </div>
      )
    }
  }
]

export const Secretary = () => {
  const sosFillings = MOCK_KYB_DETAIL.businessSosFillings

  const badge = (
    <MiddeskBadge
      status={MOCK_KYB_DETAIL.insights.sosFillings?.status}
      label={sosFillings?.subLabel}
    />
  )
  const headerTitle = <>Secretary of State filings {badge}</>

  const content = (
    <>
      <div className="flex flex-col gap-y-lg my-4">
        <p className="text-lg font-medium">Registration Status</p>
        <KybState sosFillings={sosFillings} />
      </div>

      <MiddeskTable
        tableClassName={"table-fixed"}
        columns={columns}
        data={sosFillings?.data ?? []}
      />
    </>
  )

  return (
    <MiddeskCard
      id={INSIGHT_TOC.sosFillings}
      headerTitle={headerTitle}
      headerRight={<DateHeader updatedAt={MOCK_KYB_DETAIL.updatedAt} />}
      content={content}
    />
  )
}
