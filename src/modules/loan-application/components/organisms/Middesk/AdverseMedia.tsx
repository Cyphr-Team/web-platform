import {
  BusinessAdverseMediaData,
  BusinessAdverseMediaDetail,
  TaskFieldStatus
} from "@/modules/loan-application-management/constants/types/business.type"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { MiddeskBadge } from "../../molecules/MiddeskBadge"
import { MiddeskCard } from "../../molecules/MiddeskCard"
import { DateHeader } from "./DateHeader"
import { INSIGHT_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

const mockData: BusinessAdverseMediaData = {
  subLabel: "High risk",
  status: TaskFieldStatus.FAILURE,
  data: [
    {
      screened: {
        value: "Business with adverse media high risk",
        fieldName: "Business name"
      },
      risk: {
        sublabel: "High risk",
        status: TaskFieldStatus.FAILURE
      },
      mediaSources: "4"
    },
    {
      screened: {
        value: "John Smith",
        fieldName: "Person"
      },
      risk: {
        sublabel: "High risk",
        status: TaskFieldStatus.FAILURE
      },
      mediaSources: "7"
    }
  ]
}

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
            {data.screened.fieldName}
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
        <MiddeskBadge status={data.risk.status} label={data.risk.sublabel} />
      )
    }
  }
]

export const AdverseMedia = () => {
  const { isLoading } = useLoanApplicationDetailContext()
  const memoizedColumns = useMemo(() => columns, [])

  const badge = (
    <MiddeskBadge status={mockData.status} label={mockData.subLabel} />
  )

  const headerTitle = <>Adverse Media {badge}</>

  const content = (
    <MiddeskTable
      columns={memoizedColumns}
      data={mockData.data}
      isLoading={isLoading}
      noResultText={"No adverse media found"}
    />
  )
  return (
    <MiddeskCard
      id={INSIGHT_TOC.adverseMedia}
      headerTitle={headerTitle}
      headerRight={<DateHeader />}
      content={content}
    />
  )
}
