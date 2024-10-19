import { DataTable } from "@/components/ui/data-table"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import { type ColumnDef, type Row } from "@tanstack/react-table"
import { PAYMENT } from "./amortization-schedule-table"
import {
  type FullAmortizationResponse,
  type PaymentDetail,
  type TotalMonthlyPayment
} from "../../constants/types/debt-schedule.type"
import {
  convertMonthYearAndAddMonths,
  snakeCaseToText,
  toCurrency
} from "@/utils"
import { get } from "lodash"
import { Image } from "@/shared/atoms/Image"
import sbbLogo from "@/assets/sbb-logo.jpg"
import { format } from "date-fns"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@/components/ui/table"
import { useLoanApplicationDetailContext } from "../../providers/LoanApplicationDetailProvider"
import { FORMAT_DATE_MM_DD_YYYY } from "@/constants/date.constants"
import { type CurrentLoanInformationResponse } from "@/modules/loan-application/constants/type"

interface DebtSchedulePdfProps {
  amortization?: FullAmortizationResponse
  createdDate: string
  itemsRef: React.MutableRefObject<
    Partial<Record<string, HTMLDivElement | null>>
  >
}

interface PaymentDetailRowProps {
  row: Row<PaymentDetail>
}

const ClosingBalanceCell: React.FC<PaymentDetailRowProps> = ({ row }) => {
  return (
    <p className="truncate font-medium text-2xl">
      {toCurrency(get(row.original, PAYMENT.CLOSING_BALANCE, 0))}
    </p>
  )
}
const OpeningBalanceCell: React.FC<PaymentDetailRowProps> = ({ row }) => {
  return (
    <p className="truncate font-light text-2xl">
      {toCurrency(get(row.original, PAYMENT.OPENING_BALANCE, 0))}
    </p>
  )
}

const TotalPaymentCell: React.FC<PaymentDetailRowProps> = ({ row }) => (
  <p className="truncate font-light text-2xl">{`(${get(
    row.original,
    PAYMENT.TOTAL_PAYMENT,
    "N/A"
  )})`}</p>
)

const InterestPaymentCell: React.FC<PaymentDetailRowProps> = ({ row }) => (
  <p className="truncate font-light text-2xl">{`(${get(
    row.original,
    PAYMENT.INTEREST_PAYMENT,
    "N/A"
  )})`}</p>
)

const PrincipalPaymentCell: React.FC<PaymentDetailRowProps> = ({ row }) => (
  <p className="truncate font-light text-2xl">{`(${get(
    row.original,
    PAYMENT.PRINCIPAL_PAYMENT,
    "N/A"
  )})`}</p>
)

const DisclaimerNote: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <Image
        alt="Institution text logo"
        className="h-8 max-w-[100px]"
        height={32}
        placeholderClassName="bg-slate-400 rounded"
        src={sbbLogo}
        width={100}
      />

      <p className="text-4xl font-semibold">Debt Schedule</p>
      <div className="font-light text-xl text-justify">
        <p>
          <strong>Confidentiality Notice:</strong> This document and its
          contents are confidential, intended solely for the use of the named
          recipient(s). Unauthorized use, disclosure, or copying of this
          document or any information contained within it is strictly prohibited
          and may be unlawful. If you have received this document in error,
          please notify the sender immediately and delete it from your system.
        </p>
        <p>
          <strong>Disclaimer:</strong> This loan summary is provided for
          informational purposes only and does not constitute a commitment to
          lend. All loan approvals are subject to the completion of a formal
          application, credit review, and other underwriting requirements. The
          terms and conditions described herein are preliminary and are subject
          to change or withdrawal at any time without notice. Neither the
          presentation of this summary nor any discussions arising from it
          constitute a legal agreement or promise of a loan.
        </p>
        <p>
          The financial data and debt schedule provided herein have been
          compiled based on a number of sources, along with information
          submitted by the applicant through our platform. While Cyphr has
          exercised reasonable care in the preparation of this data, we do not
          guarantee the accuracy, completeness, or timeliness of the
          information. The organization is responsible for conducting their own
          due diligence to verify the data provided.
        </p>
        <p>
          By utilizing this report, the organization acknowledges and agrees
          that Cyphr is not liable for any errors, omissions, or inaccuracies in
          the data, nor for any decisions made based on the information
          contained herein. The use of this data is at the organization's own
          risk, and it is recommended that independent verification be conducted
          before making any lending decisions.These texts aim to clearly
          communicate the sensitive nature of the document and the conditions
          under which the information is provided.
        </p>
        <p>
          Adjusting the language to suit your specific legal and organizational
          requirements is advisable, and consulting with legal counsel can
          ensure that these notices adequately protect your interests.
        </p>
      </div>
    </div>
  )
}

const AmortizationScheduleTitle: React.FC = () => {
  return (
    <div className="flex flex-col mb-3">
      <p className="font-semibold text-4xl mb-2">Amortization Schedule</p>
      <p className="text-2xl font-light">
        A consolidated monthly schedule of each debt through to payoff. This
        will display as a scrolling horizontal amortization schedule, as will be
        a beta feature as we get feedback from the end users. This backend
        calculation is also a key piece of the upcoming financial forecasting
        and financial statement creation.
      </p>
    </div>
  )
}

const CurrentLoanOverview: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-semibold text-4xl">Current Loans Overview</p>
      <p className="text-2xl font-light">
        A detailed table displaying each debt obligation with key information:
        Lender Name, Loan Type, Outstanding Loan Balance, Monthly Payment
        Amount, Loan Term Remaining (months), Annual Interest Rate.
      </p>
    </div>
  )
}

function SBBLogo() {
  return (
    <Image
      alt="Institution text logo"
      className="h-8 max-w-[100px]"
      height={32}
      placeholderClassName="bg-slate-400 rounded"
      src={sbbLogo}
      width={100}
    />
  )
}

const PageHeader: React.FC<{
  createdDate: string
}> = ({ createdDate }) => {
  return (
    <div className="flex items-center w-full justify-between mb-3 pb-2 border-b-2">
      <SBBLogo />
      <p>Updated on {format(createdDate, FORMAT_DATE_MM_DD_YYYY)}</p>
    </div>
  )
}

export const DebtSchedulePdf: React.FC<DebtSchedulePdfProps> = ({
  amortization,
  itemsRef,
  createdDate
}) => {
  const MAX_ROWS_PER_PAGE = 25

  const totalMonthlyPayment = splitData(
    amortization?.totalMonthlyPayment ?? [],
    MAX_ROWS_PER_PAGE
  )

  enum RefKeys {
    disclaimerNote = "disclaimerNote",
    currentLoanOverview = "currentLoanOverview"
  }

  const provideRef = (key: string) => (e: HTMLDivElement) => {
    if (itemsRef.current) itemsRef.current[key] = e
  }

  return (
    <div className="flex flex-col">
      <div
        ref={provideRef(RefKeys.disclaimerNote)}
        className="flex justify-center"
      >
        <DisclaimerNote />
      </div>
      <div
        ref={provideRef(RefKeys.currentLoanOverview)}
        className="flex flex-col gap-3"
      >
        <PageHeader createdDate={createdDate} />

        <CurrentLoanOverview />
        <CurrentLoanOverviewTable />
      </div>

      {amortization?.amortizationSchedule.map((amortization, index) => {
        const splitDataList = splitData(
          amortization.paymentDetail,
          MAX_ROWS_PER_PAGE
        )

        return splitDataList.map((data, ind) => (
          <div
            key={`${amortization.lenderName}-${ind}`}
            ref={provideRef(`${amortization.lenderName}-${ind}`)}
          >
            <PageHeader createdDate={createdDate} />

            {index === 0 && ind == 0 && <AmortizationScheduleTitle />}
            {ind !== 0 && <p>...continued from previous page</p>}
            <DebtScheduleTable
              key={index}
              createdAt={amortization.createdAt}
              data={data as PaymentDetail[]}
              lenderName={amortization.lenderName}
            />
          </div>
        ))
      })}
      {!!totalMonthlyPayment.length &&
        totalMonthlyPayment.map((data, index) => (
          <div
            key={`totalMonthlyPayment-${index}`}
            ref={provideRef(`totalMonthlyPayment-${index}`)}
            className="flex flex-col gap-3"
          >
            <PageHeader createdDate={createdDate} />
            {index !== 0 && <p>...continued from previous page</p>}
            <TotalMonthlyPaymentTables
              createdAt={createdDate}
              data={data as TotalMonthlyPayment[]}
            />
          </div>
        ))}
    </div>
  )
}

const DebtScheduleTable: React.FC<{
  data: PaymentDetail[]
  lenderName: string
  createdAt: string
}> = ({ data, lenderName, createdAt }) => {
  const columns: ColumnDef<PaymentDetail>[] = [
    {
      id: "month",
      accessorKey: "month",
      header: ({ column }) => (
        <DataTableColumnHeader
          className="text-2xl text-primary max-w-[100px]"
          column={column}
          title="Date"
        />
      ),
      cell: ({ row }) => (
        <p className="text-2xl">
          {convertMonthYearAndAddMonths(createdAt, row.original.month - 1)}
        </p>
      ),
      enableSorting: false
    },
    {
      id: PAYMENT.OPENING_BALANCE,
      accessorKey: PAYMENT.OPENING_BALANCE,
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader
          className="text-2xl text-primary max-w-[100px]"
          column={column}
          title="Opening Balance"
        />
      ),
      cell: OpeningBalanceCell
    },
    {
      id: PAYMENT.TOTAL_PAYMENT,
      accessorKey: PAYMENT.TOTAL_PAYMENT,
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader
          className="text-2xl text-primary max-w-[100px]"
          column={column}
          title="Total Payment"
        />
      ),
      cell: TotalPaymentCell
    },
    {
      id: PAYMENT.INTEREST_PAYMENT,
      accessorKey: PAYMENT.INTEREST_PAYMENT,
      enableSorting: false,

      header: ({ column }) => (
        <DataTableColumnHeader
          className="text-2xl text-primary max-w-[100px]"
          column={column}
          title="Interest Payment"
        />
      ),
      cell: InterestPaymentCell
    },
    {
      id: PAYMENT.PRINCIPAL_PAYMENT,
      accessorKey: PAYMENT.PRINCIPAL_PAYMENT,
      enableSorting: false,

      header: ({ column }) => (
        <DataTableColumnHeader
          className="text-2xl text-primary max-w-[100px]"
          column={column}
          title="Principal Payment"
        />
      ),
      cell: PrincipalPaymentCell
    },
    {
      id: PAYMENT.CLOSING_BALANCE,
      accessorKey: PAYMENT.CLOSING_BALANCE,
      enableSorting: false,

      header: ({ column }) => (
        <DataTableColumnHeader
          className="text-2xl text-primary max-w-[100px]"
          column={column}
          title="Closing Balance"
        />
      ),
      cell: ClosingBalanceCell
    }
  ]

  return (
    <div className="flex flex-col">
      <h3 className="font-semibold text-4xl">{lenderName}</h3>
      <DataTable
        columns={columns}
        data={data}
        tableContainerClassName="overflow-hidden"
        total={data.length}
      />
    </div>
  )
}

const TotalMonthlyPaymentTables: React.FC<{
  data: TotalMonthlyPayment[]
  createdAt: string
}> = ({ data, createdAt }) => {
  const columns: ColumnDef<TotalMonthlyPayment>[] = [
    {
      id: "month",
      accessorKey: "month",
      header: ({ column }) => (
        <DataTableColumnHeader
          className="text-2xl text-primary"
          column={column}
          title="Month"
        />
      ),
      cell: ({ row }) => (
        <p className="text-2xl">
          {convertMonthYearAndAddMonths(createdAt, row.original.month - 1)}
        </p>
      ),
      enableSorting: false
    },
    {
      id: "amount",
      accessorKey: "amount",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader
          className="text-2xl text-primary "
          column={column}
          title="Total monthly payment"
        />
      ),
      cell: ({ row }) => (
        <p className="text-2xl">{toCurrency(row.original.amount)}</p>
      )
    }
  ]

  return (
    <div className="flex flex-col">
      <h3 className="font-semibold text-4xl">Total Monthly Payment</h3>
      <DataTable
        columns={columns}
        data={data}
        tableContainerClassName="overflow-hidden"
        total={data.length}
      />
    </div>
  )
}

const CurrentLoanOverviewTable: React.FC = () => {
  const { loanSummary } = useLoanApplicationDetailContext()
  const currentLoan = loanSummary?.currentLoanForms

  const splitDataList = splitData(currentLoan ?? [], 3) // Max 3 loans per table

  return (
    <div className="flex flex-col gap-6">
      {splitDataList.map((data, index) => (
        <div key={index}>
          <CurrentLoanOverviewTableData
            data={data as CurrentLoanInformationResponse[]}
          />
        </div>
      ))}
    </div>
  )
}

const CurrentLoanOverviewTableData: React.FC<{
  data: CurrentLoanInformationResponse[]
}> = ({ data }) => {
  return (
    <div className="rounded-md border relative max-h-full overflow-auto">
      <Table className="text-2xl relative">
        <TableBody className="bg-white">
          <TableRow key="lenderName" className="relative">
            <TableHead className="text-2xl font-medium bg-gray-100 text-black w-80" />
            {data?.map((row, ind) => (
              <TableCell
                key={`${row.lenderName}-${ind}`}
                className="text-2xl font-medium border-l bg-gray-100 text-center"
              >
                {row.lenderName}
              </TableCell>
            ))}
          </TableRow>
          <TableRow key="loanType" className="relative">
            <TableHead className="text-2xl font-semibold bg-white text-black border-r border-b">
              Loan type
            </TableHead>
            {data?.map((row, ind) => (
              <TableCell
                key={`${row.loanType}-${ind}`}
                className="text-2xl border-l text-center capitalize"
              >
                {snakeCaseToText(row.loanType)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow key="outstandingLoanBalance" className="relative">
            <TableHead className="text-2xl font-semibold bg-white text-black border-r border-b">
              Outstanding loan balance
            </TableHead>
            {data?.map((row, ind) => (
              <TableCell
                key={`${row.outstandingLoanBalance}-${ind}`}
                className="text-2xl border-l text-center"
              >
                {toCurrency(row.outstandingLoanBalance)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow key="monthlyPaymentAmount" className="relative">
            <TableHead className="text-2xl font-semibold bg-white text-black border-r border-b">
              Monthly payment amount
            </TableHead>
            {data?.map((row, ind) => (
              <TableCell
                key={`${row.monthlyPaymentAmount}-${ind}`}
                className="text-2xl border-l text-center"
              >
                {toCurrency(row.monthlyPaymentAmount)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow key="loanTermRemaining" className="relative">
            <TableHead className="text-2xl font-semibold bg-white text-black border-r border-b">
              Loan term remaining
            </TableHead>
            {data?.map((row, ind) => (
              <TableCell
                key={`${row.loanTermRemainingInMonths}-${ind}`}
                className="text-2xl border-l text-center"
              >
                {row.loanTermRemainingInMonths}
              </TableCell>
            ))}
          </TableRow>
          <TableRow key="annualInterestRate" className="relative">
            <TableHead className="text-2xl font-semibold bg-white text-black border-r">
              Annual interest rate
            </TableHead>
            {data?.map((row, ind) => (
              <TableCell
                key={`${row.annualInterestRate}-${ind}`}
                className="text-2xl border-l text-center"
              >
                {`${row.annualInterestRate}%`}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

const splitData = (
  data:
    | PaymentDetail[]
    | TotalMonthlyPayment[]
    | CurrentLoanInformationResponse[],
  splitSize: number
) => {
  const result = []

  for (let i = 0; i < data.length; i += splitSize) {
    result.push(data.slice(i, i + splitSize))
  }

  return result
}
