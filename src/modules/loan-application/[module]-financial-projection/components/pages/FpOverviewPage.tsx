import { LoadingWrapper } from "@/shared/atoms/LoadingWrapper.tsx"
import { cn } from "@/lib/utils.ts"
import { CashFlowGlanceCard } from "@/modules/loan-application/[module]-financial-projection/components/molecules/CashFlowGlanceCard.tsx"
import { PropsWithChildren } from "react"
import { useQueryCashFlowAtAGlance } from "@/modules/loan-application/[module]-financial-projection/hooks/forecasting-results/useQueryCashFlowAtAGlance.ts"
import { useParams } from "react-router-dom"
import { valueOrZero } from "@/utils"
import _ from "lodash"

export function Component() {
  const { id: applicationId } = useParams()

  const { data: cashFlow, isLoading } = useQueryCashFlowAtAGlance({
    applicationId: applicationId!,
    enabled: !!applicationId
  })

  return (
    <div className="flex flex-col gap-y-6xl">
      <Section>
        <Title>Cash Flow at a Glance</Title>

        <Layout isLoading={isLoading}>
          <Grid>
            <CashFlowGlanceCard
              title="Revenue / Gross Income"
              value={valueOrZero(cashFlow?.revenue)}
              type="currency"
            />
            <CashFlowGlanceCard
              title="Operating Expenses"
              value={valueOrZero(cashFlow?.operatingExpenses)}
              type="currency"
            />
            <CashFlowGlanceCard
              title="Net Operating Income (NOI)"
              value={valueOrZero(cashFlow?.netOperatingIncome)}
              type="currency"
            />
            <CashFlowGlanceCard
              title="Operating Margin"
              value={valueOrZero(cashFlow?.operatingMargin) * 100}
              type="percent"
            />
            <CashFlowGlanceCard
              title="Total Debt Service (TDS)"
              value={valueOrZero(cashFlow?.totalDebtService)}
              type="currency"
            />
            <CashFlowGlanceCard
              title="Debt Service Coverage (DSCR)"
              value={valueOrZero(cashFlow?.debtServiceCoverage)}
              type="default"
            />
            <CashFlowGlanceCard
              title="Debt-to-Income (DTI)"
              value={valueOrZero(cashFlow?.debtToIncome) * 100}
              type="percent"
            />
            <CashFlowGlanceCard
              title="Cash Flow Assessment"
              value={_.startCase(cashFlow?.cashFlowAssessment.toLowerCase())}
            />
          </Grid>
        </Layout>
      </Section>

      <Section>
        <Title>Charts</Title>
        <div className="flex justify-center items-center relative h-[20vh] border-2 border-dashed rounded">
          <div className="sticky top-1/2 left-1/2 justify-center items-center w-full flex flex-col opacity-60 text-xl">
            Coming soon
          </div>
        </div>
      </Section>
    </div>
  )
}

interface Layout extends PropsWithChildren {
  isLoading: boolean
}

const Layout = ({ isLoading, children }: Layout) => {
  return (
    <div className="flex flex-col space-y-3xl">
      <LoadingWrapper
        isLoading={isLoading}
        className={cn(
          isLoading &&
            "pb-10 gap-4 rounded-lg border bg-white min-h-40 flex items-center justify-center shadow-sm"
        )}
      >
        {children}
      </LoadingWrapper>
    </div>
  )
}

const Title = ({ children }: PropsWithChildren) => {
  return <h1 className="text-2xl font-semibold">{children}</h1>
}

const Section = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-col gap-y-4xl">{children}</div>
}

const Grid = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-4">
      {children}
    </div>
  )
}
