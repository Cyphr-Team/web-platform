import { type FinancialApplicationDetailData } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import { type ForecastingSetupFormValue } from "@/modules/loan-application/[module]-financial-projection/types/forecasting-form"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"

interface UseForecastingSetupDetailProps {
  forecastingSetupFormValue?: ForecastingSetupFormValue
}

export const useForecastingSetupDetail = ({
  forecastingSetupFormValue
}: UseForecastingSetupDetailProps) => {
  const forecastingSetupDetail: FinancialApplicationDetailData = {
    id: LOAN_APPLICATION_STEPS.FORECASTING_SETUP,
    title: "Forecasting Setup",
    financialApplicationFormData: [
      {
        id: "startingYearForForecast",
        title: "Starting year for the forecast:",
        content: forecastingSetupFormValue?.firstYearOfForecast
      },
      {
        id: "forecastLengthToGenerate",
        title: "Forecast length to generate:",
        content: forecastingSetupFormValue?.lengthOfForecast
      }
    ]
  }

  return { forecastingSetupDetail }
}
