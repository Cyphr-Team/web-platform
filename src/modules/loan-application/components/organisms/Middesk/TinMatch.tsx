import { Dot } from "@/components/ui/dot"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { MiddeskTableHeader } from "@/modules/loan-application-management/components/table/middesk-table-header"
import { type BusinessTinDetail } from "@/modules/loan-application-management/constants/types/business.type"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { type ColumnDef } from "@tanstack/react-table"
import { MiddeskBadge } from "../../molecules/middesk/MiddeskBadge"
import { MiddeskCard } from "../../molecules/middesk/MiddeskCard"
import { DateHeader } from "./DateHeader"
import { INSIGHT_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service"
import { type InsightStatus } from "@/modules/loan-application-management/constants/types/insight.type"

const columns: ColumnDef<BusinessTinDetail & { status?: InsightStatus }>[] = [
  {
    accessorKey: "matchedBusinessName",
    header: () => <MiddeskTableHeader title="TIN matched business" />,
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="min-w-0 flex items-center">
          <Dot
            className="flex-shrink-0 self-start mt-1"
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
  const { loanKybDetail, isLoading } = useLoanApplicationDetailContext()

  const tinMatch = loanKybDetail?.businessTin
  const status = loanKybDetail?.insights.tin?.status

  const badge = (
    <MiddeskBadge
      label={tinMatch?.subLabel}
      status={loanKybDetail?.insights.tin?.status}
    />
  )
  const headerTitle = <>TIN Match {badge}</>

  const content = (
    <MiddeskTable
      columns={columns}
      data={tinMatch?.data ? [{ ...tinMatch.data, status }] : []}
      isLoading={isLoading}
      tableClassName="table-fixed"
    />
  )

  return (
    <MiddeskCard
      content={content}
      headerRight={<DateHeader />}
      headerTitle={headerTitle}
      id={INSIGHT_TOC.tinMatch}
    />
  )
}
