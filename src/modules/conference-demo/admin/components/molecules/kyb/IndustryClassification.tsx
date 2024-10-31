import { Dot } from "@/components/ui/dot"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { MiddeskTableHeader } from "@/modules/loan-application-management/components/table/middesk-table-header"
import {
  type BusinessIndustryClassificationDetail,
  BusinessIndustryClassificationHighRiskCategory
} from "@/modules/loan-application-management/constants/types/business.type"
import { type ColumnDef } from "@tanstack/react-table"
import { MiddeskBadge } from "@/modules/loan-application/components/molecules/middesk/MiddeskBadge"
import { MiddeskCard } from "@/modules/loan-application/components/molecules/middesk/MiddeskCard"
import { DateHeader } from "@/modules/conference-demo/admin/components/atoms/DateHeader"
import { INSIGHT_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"
import { Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip.tsx"
import { capitalizeFirstOnly, formatBoundaryValues } from "@/utils"
import { MOCK_KYB_DETAIL } from "@/modules/conference-demo/admin/constants/data.ts"

export function IndustryClassification() {
  const industryClassification = MOCK_KYB_DETAIL.businessIndustryClassification
  const badge = (
    <MiddeskBadge
      label={industryClassification?.subLabel}
      status={MOCK_KYB_DETAIL.insights.industry?.status}
    />
  )
  const headerTitle = <>Industry Classification {badge}</>

  const content = (
    <MiddeskTable
      columns={columns}
      data={industryClassification?.data ?? []}
      tableClassName="table-fixed"
    />
  )

  return (
    <MiddeskCard
      content={content}
      headerRight={<DateHeader updatedAt={MOCK_KYB_DETAIL.updatedAt} />}
      headerTitle={headerTitle}
      id={INSIGHT_TOC.industryClassification}
    />
  )
}

const isHighRiskCategory = (category: string) => {
  return Object.values(BusinessIndustryClassificationHighRiskCategory).includes(
    category
  )
}

const columns: ColumnDef<BusinessIndustryClassificationDetail>[] = [
  {
    accessorKey: "classificationSystem",
    header: () => <MiddeskTableHeader title="Classification System" />,
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="min-w-0 flex items-center">
          {data.category && isHighRiskCategory(data.category) ? (
            <Dot className="truncate text-red-500" />
          ) : null}
          <p>{data.classificationSystem}</p>
        </div>
      )
    }
  },
  {
    accessorKey: "code",
    header: () => <MiddeskTableHeader title="Code" />,
    cell: ({ row }) => {
      const data = row.original

      return <div className="min-w-0">{formatBoundaryValues(data.code)}</div>
    }
  },
  {
    accessorKey: "category",
    header: () => <MiddeskTableHeader title="Category" />,
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="min-w-0">
          <p>{capitalizeFirstOnly(data?.category || "")}</p>
        </div>
      )
    }
  },
  {
    accessorKey: "confidence",
    header: () => (
      <div className="flex items-center">
        <div className="mr-1">
          <MiddeskTableHeader title="Confidence" />
        </div>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>
              <Info size={12} />
            </TooltipTrigger>
            <TooltipContent className="bg-slate-600">
              <div className="text-white max-w-72 font-light">
                Confidence is the estimated accuracy or relevance of each
                classification from a scale of 0 to 100.
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="min-w-0">
          <p>{data?.confidence} </p>
        </div>
      )
    }
  }
]
