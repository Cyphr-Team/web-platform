import { MOCK_OCROLUS_DATA } from "@/modules/conference-demo/admin/constants/document-data"
import { type DocumentDetailsType } from "@/modules/conference-demo/admin/constants/type"
import { type LoanReadiness } from "@/modules/loan-application-management/constants/types/loan-readiness.type.ts"
import { type ErrorResponse } from "@/types/common.type"
import { useQuery } from "@tanstack/react-query"

export const useQueryLoanReadinessAssessmentByApplicationId = () => {
  return useQuery<LoanReadiness>({
    queryKey: ["DEMO_LOAN_READINESS"],
    queryFn: () => {
      return {
        criteria: {
          annualRevenue: {
            criteriaName: "ANNUAL_REVENUE",
            ratingLevel: "VERY_GOOD",
            description:
              "Focus on expanding product or service offerings to attract a wider audience. Strengthen brand positioning and explore new sales channels to maximize revenue potential."
          },
          businessAge: {
            criteriaName: "BUSINESS_AGE",
            ratingLevel: "POOR",
            description:
              "Focus on laying a strong foundation. Highlight growth potential and prioritize market research and customer feedback."
          },
          cashFlowStability: {
            criteriaName: "CASH_FLOW_STABILITY",
            ratingLevel: "VERY_GOOD",
            description:
              "Focus on maintaining stability by regularly monitoring cash flow and adjusting forecasts as needed. Explore investment opportunities to make efficient use of surplus cash and further stabilize cash flow."
          },
          creditScore: {
            criteriaName: "CREDIT_SCORE",
            ratingLevel: "GOOD",
            description:
              "Leverage the current credit position to negotiate better terms on loans and credit cards. Continue to manage credit responsibly and monitor credit reports regularly for accuracy."
          },
          debtToIncomeRatio: {
            criteriaName: "DEBT_TO_INCOME_RATIO",
            ratingLevel: "VERY_GOOD",
            description:
              "Focus on maintaining a low debt-to-income ratio by managing debts efficiently and keeping new debt to a minimum. Consider investing in income-generating opportunities to further improve the ratio."
          },
          employeeCount: {
            criteriaName: "EMPLOYEE_COUNT",
            ratingLevel: "EXCELLENT",
            description:
              "No additional action plan needed; a robust team structure is already in place. Continue to support and develop employees to sustain business growth and success."
          },
          existingLoans: {
            criteriaName: "EXISTING_LOANS",
            ratingLevel: "FAIR",
            description:
              "No additional action plan needed; an excellent loan situation speaks for itself. Maintain current financial management strategies to sustain a healthy financial position."
          },
          industryRisk: {
            criteriaName: "INDUSTRY_RISK",
            ratingLevel: "VERY_GOOD",
            description:
              "Maintain a proactive approach to risk management by continuously monitoring industry trends and potential threats. Leverage the relatively lower risk to attract investors and secure favorable financing."
          },
          loanAmount: {
            criteriaName: "LOAN_AMOUNT",
            ratingLevel: "VERY_GOOD",
            description:
              "Continue to build on your stable revenue streams by investing in marketing and sales strategies that have proven effective. Consider reinvesting profits into areas that drive growth, such as research and development, technology upgrades, or expanding your market reach. Maintain a focus on cost control to sustain your financial health."
          },
          profitability: {
            criteriaName: "PROFITABILITY",
            ratingLevel: "VERY_GOOD",
            description:
              "Invest in scaling operations while maintaining cost controls. Explore new market opportunities and innovative marketing strategies to further enhance profitability."
          }
        },
        applicationScore: {
          score: 72,
          ratingLevel: "GOOD",
          category: "POTENTIAL_APPLICANT",
          actionPlan:
            "The overall performance is average. This score reflects that the entity meets basic expectations but lacks strength in key areas, particularly in financial health and business operations. While the entity is likely able to meet its repayment obligations, there are significant opportunities for improvement to become more competitive and efficient. This performance level indicates a satisfactory status but highlights considerable potential for growth and enhancement."
        }
      }
    }
  })
}

export const useQueryGetDocumentDetails = () => {
  return useQuery<DocumentDetailsType, ErrorResponse>({
    queryKey: ["DEMO_OCROLUS_DOCUMENT"],
    queryFn: () => {
      return MOCK_OCROLUS_DATA
    }
  })
}
