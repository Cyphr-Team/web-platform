import { LoanReadiness } from "@/modules/loan-application-management/constants/types/loan-readiness.type.ts"
import { useQuery } from "@tanstack/react-query"

export const useQueryLoanReadinessAssessmentByApplicationId = () => {
  return useQuery<LoanReadiness>({
    queryKey: ["DEMO_LOAN_READINESS"],
    queryFn: () => {
      return {
        criteria: {
          businessAge: {
            criteriaName: "BUSINESS_AGE",
            ratingLevel: "EXCELLENT",
            description:
              "No additional action plan needed; long-term stability and established reputation speak for themselves."
          },
          annualRevenue: {
            criteriaName: "ANNUAL_REVENUE",
            ratingLevel: "EXCELLENT",
            description:
              "No additional action plan needed; strong revenue performance speaks for itself. Maintain current strategies to sustain success."
          },
          profitability: {
            criteriaName: "PROFITABILITY",
            ratingLevel: "VERY_GOOD",
            description:
              "Invest in scaling operations while maintaining cost controls. Explore new market opportunities and innovative marketing strategies to further enhance profitability."
          },
          creditScore: {
            criteriaName: "CREDIT_SCORE",
            ratingLevel: "VERY_GOOD",
            description:
              "Focus on maintaining excellent credit habits, such as low credit utilization and timely payments. Consider diversifying credit mix with different types of credit accounts to further strengthen the credit profile."
          },
          cashFlowStability: {
            criteriaName: "CASH_FLOW_STABILITY",
            ratingLevel: "EXCELLENT",
            description:
              "Focus on maintaining stability by regularly monitoring cash flow and adjusting forecasts as needed. Explore investment opportunities to make efficient use of surpluses and further stabilize cash flow."
          },
          debtToIncomeRatio: {
            criteriaName: "DEBT_TO_INCOME_RATIO",
            ratingLevel: "VERY_GOOD",
            description:
              "Leverage the current debt position to negotiate better terms on existing loans. Continue to manage debt responsibly and maintain a balance between income and expenses."
          },
          industryRisk: {
            criteriaName: "INDUSTRY_RISK",
            ratingLevel: "EXCELLENT",
            description:
              "Maintain a proactive approach to risk management by continuously monitoring industry trends and potential threats. Leverage the relatively lower risk to attract investors and secure favorable financing."
          },
          loanAmount: {
            criteriaName: "LOAN_AMOUNT",
            ratingLevel: "VERY_GOOD",
            description:
              "Strengthen your revenue by expanding your customer base, exploring partnerships, and enhancing your product or service offerings. Maintain careful control over expenses to ensure profitability and sustainability."
          },
          employeeCount: {
            criteriaName: "EMPLOYEE_COUNT",
            ratingLevel: "POOR",
            description:
              "Recommend strategies for efficient workforce management and growth."
          },
          existingLoans: {
            criteriaName: "EXISTING_LOANS",
            ratingLevel: "GOOD",
            description:
              "Prioritize paying down existing loans to reduce debt burden. Consider consolidating loans and simplifying payments to potentially lower interest rates."
          }
        },
        applicationScore: {
          score: 85,
          ratingLevel: "VERY_GOOD",
          category: "STRONG_APPLICANT",
          actionPlan:
            "The overall performance is above average. This score indicates that the entity performs well in most areas, showing strength and competence. There are few areas requiring minor improvements. This level of performance suggests a solid foundation and good practices, making the entity reliable and efficient."
        }
      }
    }
  })
}
