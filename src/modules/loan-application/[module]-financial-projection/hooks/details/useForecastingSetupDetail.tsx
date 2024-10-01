import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { useBRLoanApplicationDetailsContext } from "@/modules/loan-application/providers"

export const useForecastingSetupDetail = () => {
  const { forecastingSetup } = useBRLoanApplicationDetailsContext()

  const forecastingSetupDetail = {
    id: LOAN_APPLICATION_STEPS.FORECASTING_SETUP,
    title: "Forecasting Setup",
    financialApplicationFormData: [
      {
        id: "startingYearForForecast",
        title: "Starting year for the forecast:",
        content: forecastingSetup?.firstYearOfForecast
      },
      {
        id: "forecastLengthToGenerate",
        title: "Forecast length to generate:",
        content: forecastingSetup?.lengthOfForecast
      }
    ]
  }

  return { forecastingSetupDetail }
}
