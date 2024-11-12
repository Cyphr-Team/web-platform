import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import {
  convertMonthYearAndAddMonths,
  roundAndConvertToUSLocale,
  toCurrency
} from "@/utils"
import { first, get } from "lodash"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table"
import { useLoanApplicationDetailContext } from "../../providers/LoanApplicationDetailProvider"
import {
  type FullAmortizationResponse,
  type PaymentDetail
} from "../../constants/types/debt-schedule.type"
import { DebtSchedulePdf } from "./debt-schedule-pdf"
import { ButtonLoading } from "@/components/ui/button"
import { getPDF } from "@/modules/loan-application/services/pdf.service"
import { useRef, useState } from "react"

export interface AmortizationScheduleType {
  date: string
  data: Omit<PaymentDetail, "month">
}

export const enum PAYMENT {
  OPENING_BALANCE = "openingBalance",
  TOTAL_PAYMENT = "totalPayment",
  INTEREST_PAYMENT = "interestPayment",
  PRINCIPAL_PAYMENT = "principalPayment",
  CLOSING_BALANCE = "closingBalance"
}

const columns: ColumnDef<AmortizationScheduleType>[] = [
  {
    id: PAYMENT.OPENING_BALANCE,
    header: ({ column }) => (
      <DataTableColumnHeader
        className="truncate"
        column={column}
        title="Opening Balance"
      />
    )
  },
  {
    id: PAYMENT.TOTAL_PAYMENT,
    header: ({ column }) => (
      <DataTableColumnHeader
        className="truncate"
        column={column}
        title="Total Payment"
      />
    )
  },
  {
    id: PAYMENT.INTEREST_PAYMENT,
    header: ({ column }) => (
      <DataTableColumnHeader
        className="truncate"
        column={column}
        title="Interest Payment"
      />
    )
  },
  {
    id: PAYMENT.PRINCIPAL_PAYMENT,
    header: ({ column }) => (
      <DataTableColumnHeader
        className="truncate"
        column={column}
        title="Principal Payment"
      />
    )
  },
  {
    id: PAYMENT.CLOSING_BALANCE,
    header: ({ column }) => (
      <DataTableColumnHeader
        className="truncate"
        column={column}
        title="Closing Balance"
      />
    )
  }
]

function TableData({
  data,
  loanName
}: {
  data: AmortizationScheduleType[]
  loanName: string
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })
  const payments = [
    PAYMENT.TOTAL_PAYMENT.toString(),
    PAYMENT.INTEREST_PAYMENT.toString(),
    PAYMENT.PRINCIPAL_PAYMENT.toString()
  ]

  return (
    <div className="relative max-h-full overflow-auto rounded-md border">
      <Table className="relative text-sm" isLoading={false}>
        <TableBody className="bg-white">
          <TableRow key="date" className="relative">
            <TableHead className="sticky left-0 w-52 bg-gray-100 text-sm font-medium text-black ">
              {loanName}
            </TableHead>
            {data.map((row) => (
              <TableCell
                key={row.date}
                className="border-l bg-gray-100 text-center text-sm font-medium"
              >
                {row.date}
              </TableCell>
            ))}
          </TableRow>
          <TableRow key="openingBalance" className="relative">
            <TableHead className="sticky left-0 border-r bg-white text-sm font-normal text-black">
              Opening Balance
            </TableHead>
            {data.map((row) => (
              <TableCell
                key={row.date}
                className="border-l text-center text-sm"
              >
                {toCurrency(row.data.openingBalance, 0)}
              </TableCell>
            ))}
          </TableRow>
          {table.getFlatHeaders().map((header) => {
            return (
              payments.includes(header.id) && (
                <TableRow
                  key={header.id}
                  className={`relative w-max ${
                    header.id === PAYMENT.PRINCIPAL_PAYMENT
                      ? "border-b-2 border-black"
                      : ""
                  }`}
                >
                  <TableHead
                    key={header.id}
                    className="sticky left-0 !min-w-52 bg-white text-sm font-normal text-black"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {/* Render row */}
                  </TableHead>
                  {data.map((row) => {
                    return (
                      <TableCell
                        key={row.date}
                        className="!min-w-52 border-l text-center text-red-500"
                      >
                        (
                        {roundAndConvertToUSLocale(get(row.data, header.id, 0))}
                        )
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            )
          })}
          <TableRow key="closingBalance" className="relative w-max">
            <TableHead className="sticky left-0 !w-52 bg-white text-sm font-medium text-black">
              Closing Balance
            </TableHead>
            {data.map((row) => (
              <TableCell
                key={row.date}
                className="!w-52 border-l text-center text-sm font-medium"
              >
                {toCurrency(row.data.closingBalance, 0)}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

const AmortizationScheduleTableUnit = ({
  fullAmortization,
  createdDate
}: {
  fullAmortization?: FullAmortizationResponse
  createdDate: string
}) =>
  fullAmortization?.amortizationSchedule.map((entry) => (
    <div
      key={entry.createdAt}
      className="relative max-h-full overflow-auto rounded-md border"
    >
      <TableData
        data={entry.paymentDetail.map((detail) => ({
          //We plus the number of months to the started date to calculate the current date
          date: convertMonthYearAndAddMonths(createdDate, detail.month - 1),
          data: detail
        }))}
        loanName={entry.lenderName}
      />
    </div>
  ))

export function AmortizationScheduleTable() {
  const [isExporting, setIsExporting] = useState(false)
  const { fullAmortization } = useLoanApplicationDetailContext()

  const totalMonthlyPayment = fullAmortization?.totalMonthlyPayment
  //Currently we are using the date that the user input the form (form created date) as the start date.
  const createdDate =
    first(
      fullAmortization?.amortizationSchedule.map((entry) => entry.createdAt)
    ) ?? new Date().toDateString()

  const elementToExportRef = useRef<Partial<Record<string, HTMLDivElement>>>({})

  const exportToPdf = async () => {
    try {
      setIsExporting(true)
      if (elementToExportRef.current) {
        const { pdf } = await getPDF(
          Object.values(elementToExportRef.current).filter(
            (element) => element !== undefined
          ) as HTMLDivElement[],
          true
        )

        pdf.save(`amortization_schedule_${new Date().valueOf()}.pdf`)
      }
    } catch (error) {
      // console.error(error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex justify-between">
        <p className="text-2xl font-semibold">Amortization Schedule</p>
        <ButtonLoading isLoading={isExporting} onClick={exportToPdf}>
          Export
        </ButtonLoading>
      </div>

      <div className="hidden">
        <DebtSchedulePdf
          amortization={fullAmortization}
          createdDate={createdDate}
          itemsRef={elementToExportRef}
        />
      </div>

      <AmortizationScheduleTableUnit
        createdDate={createdDate}
        fullAmortization={fullAmortization}
      />
      <div className="relative max-h-full overflow-auto rounded-md border">
        <Table className="bg-white text-sm">
          <TableHeader>
            <TableRow>
              <TableCell className="sticky left-0 !min-w-52 bg-white text-sm font-medium text-black" />
              {totalMonthlyPayment?.map((payment) => {
                return (
                  <TableCell
                    key={payment.month}
                    className="!min-w-52 border-l bg-gray-100 text-center font-medium"
                  >
                    {convertMonthYearAndAddMonths(
                      createdDate,
                      payment.month - 1
                    )}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="sticky left-0 !min-w-52 bg-white text-sm font-medium text-black">
                TOTAL MONTHLY PAYMENT
              </TableCell>
              {totalMonthlyPayment?.map((payment) => {
                return (
                  <TableCell
                    key={payment.month}
                    className="!min-w-52 border-l text-center font-medium text-red-500"
                  >
                    {toCurrency(payment.amount, 0)}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
