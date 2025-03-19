import { type BusinessAdverseMediaDetail } from "@/modules/loan-application-management/constants/types/business.type"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { MiddeskBadge } from "../../molecules/middesk/MiddeskBadge"
import { MiddeskCard } from "../../molecules/middesk/MiddeskCard"
import { DateHeader } from "./DateHeader"
import { INSIGHT_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { type ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"
import { capitalizeWords, snakeCaseToText } from "@/utils"
import { Badge } from "@/components/ui/badge"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service"

const columns: ColumnDef<BusinessAdverseMediaDetail>[] = [
  {
    accessorKey: "screened",
    header: () => <div className="text-left">Screened</div>,
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="min-w-0">
          <p>{data.screened.value}</p>
          <p className="text-sm text-text-tertiary">
            {capitalizeWords(
              snakeCaseToText(data.screened.field.toLowerCase())
            )}
          </p>
        </div>
      )
    }
  },
  {
    accessorKey: "risk",
    header: () => <div className="text-left">Risk</div>,
    cell: ({ row }) => {
      const data = row.original

      return (
        <Badge
          isDot
          className="rounded-lg bg-transparent pl-0 text-sm capitalize text-text-tertiary"
          variant="soft"
          variantColor={getBadgeVariantByInsightStatus(data?.risk?.status)}
        >
          {data?.risk?.subLabel ?? "--"}
        </Badge>
      )
    }
  },
  {
    accessorKey: "mediaSources",
    header: () => <div className="text-left">Media sources</div>,
    cell: ({ row }) => {
      const data = row.original

      return <p>{data.mediaSources}</p>
    }
  }
]

export function AdverseMedia() {
  const { isLoading, loanKybDetail } = useLoanApplicationDetailContext()
  const memoizedColumns = useMemo(() => columns, [])

  const adverseMedia = loanKybDetail?.businessAdverseMedia
  const insight = loanKybDetail?.insights.adverseMedia
  const badge = useMemo(
    () => <MiddeskBadge label={insight?.subLabel} status={insight?.status} />,
    [insight?.status, insight?.subLabel]
  )
  const headerTitle = <>Adverse Media {badge}</>

  const content = useMemo(() => {
    const data = adverseMedia?.data ?? []

    return (
      <MiddeskTable
        columns={memoizedColumns}
        data={data}
        isLoading={isLoading}
        tableClassName="table-fixed"
      />
    )
  }, [adverseMedia?.data, isLoading, memoizedColumns])

  return (
    <MiddeskCard
      content={content}
      headerRight={<DateHeader />}
      headerTitle={headerTitle}
      id={INSIGHT_TOC.adverseMedia}
    />
  )
}
