import { QueryForecastingSetupByIdResponse } from "@/modules/loan-application/[module]-financial-projection/hooks/forecasting-setup/useQueryForecastingSetup"
import { FinancialApplicationDetailData } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"

interface UseForecastingSetupDetailProps {
  forecastingSetupByIdResponse?: QueryForecastingSetupByIdResponse
}
export const useForecastingSetupDetail = ({
  forecastingSetupByIdResponse
}: UseForecastingSetupDetailProps) => {
  const forecastingSetupDetail: FinancialApplicationDetailData = {
    id: LOAN_APPLICATION_STEPS.FORECASTING_SETUP,
    title: "Forecasting Setup",
    financialApplicationFormData: [
      {
        id: "startingYearForForecast",
        title: "Starting year for the forecast:",
        content: forecastingSetupByIdResponse?.firstYearOfForecast
      },
      {
        id: "forecastLengthToGenerate",
        title: "Forecast length to generate:",
        content: forecastingSetupByIdResponse?.lengthOfForecast
      }
    ]
  }

  return { forecastingSetupDetail }
}
