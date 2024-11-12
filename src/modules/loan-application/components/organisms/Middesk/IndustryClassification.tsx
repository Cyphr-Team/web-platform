import { Dot } from "@/components/ui/dot"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { MiddeskTableHeader } from "@/modules/loan-application-management/components/table/middesk-table-header"
import {
  type BusinessIndustryClassificationDetail,
  BusinessIndustryClassificationHighRiskCategory
} from "@/modules/loan-application-management/constants/types/business.type"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { type ColumnDef } from "@tanstack/react-table"
import { MiddeskBadge } from "../../molecules/middesk/MiddeskBadge"
import { MiddeskCard } from "../../molecules/middesk/MiddeskCard"
import { DateHeader } from "./DateHeader"
import { INSIGHT_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"
import { Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip.tsx"
import { capitalizeFirstOnly, formatBoundaryValues } from "@/utils"

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
        <div className="flex min-w-0 items-center">
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
              <div className="max-w-72 font-light text-white">
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

export function IndustryClassification() {
  const { loanKybDetail, isLoading } = useLoanApplicationDetailContext()

  const industryClassification = loanKybDetail?.businessIndustryClassification
  const badge = (
    <MiddeskBadge
      label={industryClassification?.subLabel}
      status={loanKybDetail?.insights.industry?.status}
    />
  )
  const headerTitle = <>Industry Classification {badge}</>

  const content = (
    <MiddeskTable
      columns={columns}
      data={industryClassification?.data ?? []}
      isLoading={isLoading}
      tableClassName="table-fixed"
    />
  )

  return (
    <MiddeskCard
      content={content}
      headerRight={<DateHeader />}
      headerTitle={headerTitle}
      id={INSIGHT_TOC.industryClassification}
    />
  )
}
