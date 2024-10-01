import { LoadingWrapper } from "@/shared/atoms/LoadingWrapper.tsx"
import { cn } from "@/lib/utils.ts"
import { CashFlowGlanceCard } from "@/modules/loan-application/[module]-financial-projection/components/molecules/CashFlowGlanceCard.tsx"
import { PropsWithChildren } from "react"

export function Component() {
  const { isLoading, data } = {
    isLoading: false,
    data: {
      revenue: 21_0000,
      operatingExpenses: 14_0000,
      netOperatingIncome: 70_000,
      operatingMargin: 33.4,
      totalDebtService: 35000,
      debtServiceCoverage: 1.5,
      debtToIncome: 33.5,
      assessment: "Very Good"
    }
  }

  return (
    <div className="flex flex-col gap-y-6xl">
      <Section>
        <Title>Cash Flow at a Glance</Title>

        <Layout isLoading={isLoading}>
          <Grid>
            <CashFlowGlanceCard
              title="Revenue / Gross Income"
              value={data.revenue}
              type="currency"
            />
            <CashFlowGlanceCard
              title="Operating Expenses"
              value={data.operatingExpenses}
              type="currency"
            />
            <CashFlowGlanceCard
              title="Net Operating Income (NOI)"
              value={data.netOperatingIncome}
              type="currency"
            />
            <CashFlowGlanceCard
              title="Operating Margin"
              value={data.operatingMargin}
              type="percent"
            />
            <CashFlowGlanceCard
              title="Total Debt Service (TDS)"
              value={data.totalDebtService}
              type="currency"
            />
            <CashFlowGlanceCard
              title="Debt Service Coverage (DSCR)"
              value={data.debtServiceCoverage}
            />
            <CashFlowGlanceCard
              title="Debt-to-Income (DTI)"
              value={data.debtToIncome}
              type="percent"
            />
            <CashFlowGlanceCard
              title="Cash Flow Assessment"
              value={data.assessment}
            />
          </Grid>
        </Layout>
      </Section>

      <Section>
        <Title>Charts</Title>
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
