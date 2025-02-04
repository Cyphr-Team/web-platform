import { CashFlowGlanceCard } from "@/modules/loan-application/[module]-financial-projection/components/molecules/CashFlowGlanceCard.tsx"
import { valueOrZero } from "@/utils"
import _ from "lodash"
import type { PropsWithChildren } from "react"
import { type CashFlowAtAGlanceResponse } from "@/modules/loan-application/[module]-financial-projection/types/financial-projection-forecast.ts"

const cashFlow: CashFlowAtAGlanceResponse = {
  financialForecastSetupId: "ff123456-7890-abcd-ef01-234567890abc",
  revenue: 210_000,
  operatingExpenses: 140_000,
  netOperatingIncome: 70_000,
  cashFlowAssessment: "Very Good",
  ratingScale: "Very Good",
  operatingMargin: 33.4,
  totalDebtService: 35_000.0,
  debtServiceCoverage: 1.5,
  debtToIncome: 35.5
}

export function Component() {
  return (
    <div className="flex flex-col gap-y-6xl">
      <Section>
        <Title>Cash Flow at a Glance</Title>

        <Layout>
          <Grid>
            <CashFlowGlanceCard
              title="Revenue / Gross Income"
              type="currency"
              value={valueOrZero(cashFlow?.revenue)}
            />
            <CashFlowGlanceCard
              title="Operating Expenses"
              type="currency"
              value={valueOrZero(cashFlow?.operatingExpenses)}
            />
            <CashFlowGlanceCard
              title="Net Operating Income (NOI)"
              type="currency"
              value={valueOrZero(cashFlow?.netOperatingIncome)}
            />
            <CashFlowGlanceCard
              title="Operating Margin"
              type="percent"
              value={valueOrZero(cashFlow?.operatingMargin)}
            />
            <CashFlowGlanceCard
              title="Total Debt Service (TDS)"
              type="currency"
              value={valueOrZero(cashFlow?.totalDebtService)}
            />
            <CashFlowGlanceCard
              title="Debt Service Coverage (DSCR)"
              type="default"
              value={valueOrZero(cashFlow?.debtServiceCoverage)}
            />
            <CashFlowGlanceCard
              title="Debt-to-Income (DTI)"
              type="percent"
              value={valueOrZero(cashFlow?.debtToIncome)}
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
        <div className="relative flex h-[20vh] items-center justify-center rounded border-2 border-dashed">
          <div className="sticky left-1/2 top-1/2 flex w-full flex-col items-center justify-center text-xl opacity-60">
            Coming soon
          </div>
        </div>
      </Section>
    </div>
  )
}

function Layout({ children }: PropsWithChildren) {
  return <div className="flex flex-col space-y-3xl">{children}</div>
}

function Title({ children }: PropsWithChildren) {
  return <h1 className="text-2xl font-semibold">{children}</h1>
}

function Section({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-y-4xl">{children}</div>
}

function Grid({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
      {children}
    </div>
  )
}
