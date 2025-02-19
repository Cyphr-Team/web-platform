import { useBoolean } from "@/hooks"
import { FpCashFlowTemplate } from "@/modules/loan-application/[module]-financial-projection/components/molecules/FpCashFlowTemplate"
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
  } = useFinancialProjectionData.use.cashFlow()

  const renderHeaderActions = () => {
    return (
      <div className="flex w-full items-center justify-end gap-2">
        <LabeledSwitch label="Current financial detail" state={currentDetail} />
        <LabeledSwitch label="Monthly forecast detail" state={monthlyDetail} />
        <Drawer />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-2xl">
      <div className="flex flex-col gap-y-6xl">
        {currentDetail.value ? (
          <FpCashFlowTemplate
            data={currentData}
            headerProps={{
              title: "Cash Flow",
              // only get the first month
              data: [monthlyTimeStamp[0]]
            }}
            layout="current"
            period={ForecastPeriod.CURRENT}
            renderHeaderActions={renderHeaderActions}
            title="Current Cash Flow Statement"
          />
        ) : null}

        <FpCashFlowTemplate
          data={monthlyDetail.value ? monthlyData : annuallyData}
          headerProps={{
            title: "Cash Flow",
            data: monthlyDetail.value ? monthlyTimeStamp : annuallyTimeStamp
          }}
          layout="default"
          period={
            monthlyDetail.value
              ? ForecastPeriod.MONTHLY
              : ForecastPeriod.ANNUALLY
          }
          renderHeaderActions={renderHeaderActions}
        />
      </div>
    </div>
  )
}
