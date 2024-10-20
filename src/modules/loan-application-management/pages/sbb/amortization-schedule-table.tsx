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
    <div className="rounded-md border relative max-h-full overflow-auto">
      <Table className="text-sm relative" isLoading={false}>
        <TableBody className="bg-white">
          <TableRow key="date" className="relative">
            <TableHead className="text-sm font-medium sticky left-0 bg-gray-100 text-black w-52 ">
              {loanName}
            </TableHead>
            {data.map((row) => (
              <TableCell
                key={row.date}
                className="text-sm font-medium border-l bg-gray-100 text-center"
              >
                {row.date}
              </TableCell>
            ))}
          </TableRow>
          <TableRow key="openingBalance" className="relative">
            <TableHead className="text-sm font-normal sticky left-0 bg-white text-black border-r">
              Opening Balance
            </TableHead>
            {data.map((row) => (
              <TableCell
                key={row.date}
                className="text-sm border-l text-center"
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
                    className="text-sm font-normal sticky left-0 text-black bg-white !min-w-52"
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
                        className="text-red-500 !min-w-52 border-l text-center"
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
            <TableHead className="text-sm font-medium sticky left-0 bg-white text-black !w-52">
              Closing Balance
            </TableHead>
            {data.map((row) => (
              <TableCell
                key={row.date}
                className="text-sm font-medium !w-52 border-l text-center"
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
      className="rounded-md border relative max-h-full overflow-auto"
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
      <div className="rounded-md border relative max-h-full overflow-auto">
        <Table className="text-sm bg-white">
          <TableHeader>
            <TableRow>
              <TableCell className="text-sm font-medium sticky left-0 bg-white text-black !min-w-52" />
              {totalMonthlyPayment?.map((payment) => {
                return (
                  <TableCell
                    key={payment.month}
                    className="bg-gray-100 font-medium border-l !min-w-52 text-center"
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
              <TableCell className="text-sm font-medium sticky left-0 bg-white text-black !min-w-52">
                TOTAL MONTHLY PAYMENT
              </TableCell>
              {totalMonthlyPayment?.map((payment) => {
                return (
                  <TableCell
                    key={payment.month}
                    className="text-red-500 font-medium border-l !min-w-52 text-center"
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
