import { Dot } from "@/components/ui/dot"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { MiddeskTableHeader } from "@/modules/loan-application-management/components/table/middesk-table-header"
import { type BusinessTinDetail } from "@/modules/loan-application-management/constants/types/business.type"
import { type ColumnDef } from "@tanstack/react-table"
import { INSIGHT_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service"
import { type InsightStatus } from "@/modules/loan-application-management/constants/types/insight.type"
import { MOCK_KYB_DETAIL } from "@/modules/conference-demo/admin/constants/data"
import { MiddeskCard } from "@/modules/loan-application/components/molecules/middesk/MiddeskCard"
import { MiddeskBadge } from "@/modules/loan-application/components/molecules/middesk/MiddeskBadge"
import { DateHeader } from "@/modules/conference-demo/admin/components/atoms/DateHeader"

const columns: ColumnDef<BusinessTinDetail & { status?: InsightStatus }>[] = [
  {
    accessorKey: "matchedBusinessName",
    header: () => <MiddeskTableHeader title="TIN matched business" />,
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="flex min-w-0 items-center">
          <Dot
            className="mt-1 shrink-0 self-start"
            variantColor={getBadgeVariantByInsightStatus(data?.status)}
          />
          <p>{data?.matchedBusinessName ?? "-"}</p>
        </div>
      )
    }
  },
  {
    accessorKey: "submitted",
    header: () => <MiddeskTableHeader title="Tax ID" />,
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="min-w-0">
          <p>{data?.tin ?? "-"}</p>
        </div>
      )
    }
  }
]

export function TinMatch() {
  const tinMatch = MOCK_KYB_DETAIL.businessTin
  const status = MOCK_KYB_DETAIL.insights.tin?.status

  const badge = (
    <MiddeskBadge
      label={tinMatch?.subLabel}
      status={MOCK_KYB_DETAIL.insights.tin?.status}
    />
  )
  const headerTitle = <>TIN Match {badge}</>

  const content = (
    <MiddeskTable
      columns={columns}
      data={tinMatch?.data ? [{ ...tinMatch.data, status }] : []}
      tableClassName="table-fixed"
    />
  )

  return (
    <MiddeskCard
      content={content}
      headerRight={<DateHeader updatedAt={MOCK_KYB_DETAIL.updatedAt} />}
      headerTitle={headerTitle}
      id={INSIGHT_TOC.tinMatch}
    />
  )
}
