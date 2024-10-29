import { useBoolean } from "@/hooks"
import { IncomeStatementTemplate } from "@/modules/loan-application/[module]-financial-projection/components/molecules/FpIncomeStatementTemplate"
import { LabeledSwitch } from "@/modules/loan-application/[module]-financial-projection/components/molecules/LabeledSwitch.tsx"
import { ForecastPeriod } from "@/modules/loan-application/[module]-financial-projection/types/financial-projection-forecast.ts"
import { useFinancialProjectionData } from "@/modules/conference-demo/applicant/stores/useFinancialProjectionData.ts"
import { Drawer } from "@/modules/conference-demo/applicant/components/molecules/Drawer.tsx"

export function Component() {
  const currentDetail = useBoolean(false)
  const monthlyDetail = useBoolean(false)

  const {
    annuallyData,
    annuallyTimeStamp,
    currentData,
    monthlyData,
    monthlyTimeStamp
  } = useFinancialProjectionData.use.incomeStatement()

  return (
    <div className="flex flex-col gap-y-2xl">
      <div className="w-full flex gap-2 justify-end items-center">
        <LabeledSwitch label="Current financial detail" state={currentDetail} />
        <LabeledSwitch label="Monthly forecast detail" state={monthlyDetail} />
        <Drawer />
      </div>

      <div className="flex flex-col gap-y-6xl">
        {currentDetail.value ? (
          <IncomeStatementTemplate
            data={currentData}
            headerProps={{
              title: "Income Statement",
              // only get the first month
              data: [monthlyTimeStamp[0]]
            }}
            layout="current"
            period={ForecastPeriod.CURRENT}
            title="Current Income Statement"
          />
        ) : null}

        <IncomeStatementTemplate
          data={monthlyDetail.value ? monthlyData : annuallyData}
          headerProps={{
            title: "Income Statement",
            data: monthlyDetail.value ? monthlyTimeStamp : annuallyTimeStamp
          }}
          layout="default"
          period={
            monthlyDetail.value
              ? ForecastPeriod.MONTHLY
              : ForecastPeriod.ANNUALLY
          }
        />
      </div>
    </div>
  )
}
