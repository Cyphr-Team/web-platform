import { LoadingWrapper } from "@/shared/atoms/LoadingWrapper.tsx"
import { cn } from "@/lib/utils.ts"
import { CashFlowGlanceCard } from "@/modules/loan-application/[module]-financial-projection/components/molecules/CashFlowGlanceCard.tsx"
import { type PropsWithChildren } from "react"
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
              title="Revenue"
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
              value={_.startCase(cashFlow?.ratingScale.toLowerCase())}
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

interface Layout extends PropsWithChildren {
  isLoading: boolean
}

function Layout({ isLoading, children }: Layout) {
  return (
    <div className="flex flex-col space-y-3xl">
      <LoadingWrapper
        className={cn(
          isLoading &&
            "flex min-h-40 items-center justify-center gap-4 rounded-lg border bg-white pb-10 shadow-sm"
        )}
        isLoading={isLoading}
      >
        {children}
      </LoadingWrapper>
    </div>
  )
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
