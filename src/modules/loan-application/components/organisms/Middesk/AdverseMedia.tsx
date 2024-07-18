import { BusinessAdverseMediaDetail } from "@/modules/loan-application-management/constants/types/business.type"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { MiddeskBadge } from "../../molecules/MiddeskBadge"
import { MiddeskCard } from "../../molecules/MiddeskCard"
import { DateHeader } from "./DateHeader"
import { INSIGHT_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"
import { capitalizeWords, snakeCaseToText } from "@/utils"

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
        <MiddeskBadge status={data.risk.status} label={data.risk.subLabel} />
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

export const AdverseMedia = () => {
  const { isLoading, loanKybDetail } = useLoanApplicationDetailContext()
  const memoizedColumns = useMemo(() => columns, [])

  const adverseMedia = loanKybDetail?.businessAdverseMedia

  const badge = useMemo(
    () => (
      <MiddeskBadge
        status={adverseMedia?.status}
        label={adverseMedia?.subLabel}
      />
    ),
    [adverseMedia?.status, adverseMedia?.subLabel]
  )

  const headerTitle = <>Adverse Media {badge}</>

  const content = useMemo(() => {
    const data = adverseMedia?.data ?? []
    return (
      <MiddeskTable
        columns={memoizedColumns}
        data={data}
        isLoading={isLoading}
      />
    )
  }, [adverseMedia?.data, isLoading, memoizedColumns])

  return (
    <MiddeskCard
      id={INSIGHT_TOC.adverseMedia}
      headerTitle={headerTitle}
      headerRight={<DateHeader />}
      content={content}
    />
  )
}
