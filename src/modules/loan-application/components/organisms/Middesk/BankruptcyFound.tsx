import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { MiddeskTableHeader } from "@/modules/loan-application-management/components/table/middesk-table-header"
import { BusinessBankruptcyDetail } from "@/modules/loan-application-management/constants/types/business.type"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { getBankruptcyByChapter } from "@/modules/loan-application-management/services"
import { ColumnDef } from "@tanstack/react-table"
import { SourceToolTip } from "../../molecules/SourceToolTip"

const columns: ColumnDef<BusinessBankruptcyDetail>[] = [
  {
    accessorKey: "fileDate",
    header: () => <MiddeskTableHeader title={"File date"} />,
    cell: ({ row }) => {
      const data = row.original

      return <p>{data?.fileDate ?? "-"}</p>
    }
  },
  {
    accessorKey: "chapter",
    header: () => <MiddeskTableHeader title="Chapter" />,
    cell: ({ row }) => {
      const data = row.original

      const bankruptcyDetail = getBankruptcyByChapter(data?.chapter)

      return (
        <div className="min-w-0">
          <SourceToolTip
            description={bankruptcyDetail.title}
            sourceContent={bankruptcyDetail.displayChapter}
            subDescription={
              <span>
                {bankruptcyDetail.description}
                <a
                  href={bankruptcyDetail.link}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="underline ml-1 text-blue-700"
                >
                  Learn more
                </a>
              </span>
            }
          />
        </div>
      )
    }
  },
  {
    accessorKey: "caseNumber",
    header: () => <MiddeskTableHeader title={"Case number"} />,
    cell: ({ row }) => {
      const data = row.original

      return <p>{data?.caseNumber ?? "-"}</p>
    }
  },
  {
    accessorKey: "court",
    header: () => <MiddeskTableHeader title="Bankruptcy court" />,
    cell: ({ row }) => {
      const data = row.original

      return <p>{data?.court ?? "-"}</p>
    }
  }
]

export const BankruptcyFound = () => {
  const { loanKybDetail, isLoading } = useLoanApplicationDetailContext()

  const bankruptcy = loanKybDetail?.businessBankruptcies

  return (
    (!!bankruptcy?.data.length || isLoading) && (
      <MiddeskTable
        tableClassName={"table-fixed"}
        columns={columns}
        data={bankruptcy?.data ?? []}
        isLoading={isLoading}
      />
    )
  )
}
