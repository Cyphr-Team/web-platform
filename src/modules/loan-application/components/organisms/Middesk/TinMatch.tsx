import { Dot } from "@/components/ui/dot"
import { FORMAT_DATE_MM_DD_YYYY } from "@/constants/date.constants"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { MiddeskTableHeader } from "@/modules/loan-application-management/components/table/middesk-table-header"
import { KYC_STATUS } from "@/modules/loan-application-management/constants/types/kyc"
import { TinMatchReport } from "@/modules/loan-application-management/constants/types/middesk.type"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { MiddeskBadge } from "../../molecules/MiddeskBadge"
import { MiddeskCard } from "../../molecules/MiddeskCard"

const columns: ColumnDef<TinMatchReport>[] = [
  {
    accessorKey: "name",
    header: () => <MiddeskTableHeader title={"TIN matched business"} />,
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="min-w-0 flex items-center">
          <Dot className="flex-shrink-0 self-start mt-1" variantColor="green" />
          <p>{data?.name ?? "-"}</p>
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
          <p>{data.taxID}</p>
        </div>
      )
    }
  }
]

export const TinMatch = () => {
  const data: TinMatchReport[] = [
    {
      name: "Larry’s Latte LLC",
      taxID: "12-3456789",
      status: KYC_STATUS.VERIFIED
    }
  ]

  const badge = <MiddeskBadge status={KYC_STATUS.VERIFIED} />
  const headerTitle = <>TIN Match {badge}</>
  const headerRight = (
    <div className="text-text-tertiary">
      Last updated on {format(new Date(), FORMAT_DATE_MM_DD_YYYY)}
    </div>
  )

  const content = (
    <MiddeskTable
      tableClassName={"table-fixed"}
      columns={columns}
      data={data}
    />
  )

  return (
    <MiddeskCard
      headerTitle={headerTitle}
      headerRight={headerRight}
      content={content}
    />
  )
}
