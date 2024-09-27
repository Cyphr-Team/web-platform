import {
  ConnectedAccountDetail,
  FinancialApplicationFormDetail,
  FinancialOperatingExpensesFormDetail
} from "@/modules/loan-application/[module]-financial-projection/components/molecules/details"
import { DirectCostsFormDetail } from "@/modules/loan-application/[module]-financial-projection/components/molecules/details/DirectCostsFormDetail"
import { FinancialApplicationDetailData } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"

export const useFinancialApplicationDetail = () => {
  const businessInformationData = {
    id: LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION,
    title: "Business Information",
    financialApplicationFormData: [
      {
        id: "businessLegalName",
        title: "Business legal name:",
        content: "Larry Latte LLC"
      },
      {
        id: "businessTradeName",
        title: "Business trade name/DBA:",
        content: "Latte JR LLC"
      },
      {
        id: "businessStreetAddress",
        title: "Business street address:",
        content: "123 Coffee Lane, Suite 321, WA, 97531"
      },
      {
        id: "employeeIdentificationNumber",
        title: "Employee Identification Number (EIN):",
        content: "12-3456789"
      },
      {
        id: "businessWebsite",
        title: "Business website:",
        content: "www.larryslatte.com"
      },
      {
        id: "businessStage",
        title: "Business stage:",
        content:
          "Idea stage:Conceptualization and validation of the business idea"
      },
      {
        id: "businessDescription",
        title: "Business description:",
        content: "Lorem ipsum dolor sit amet consectetur"
      }
    ]
  }

  const currentEmployeesData = {
    id: LOAN_APPLICATION_STEPS.PEOPLE,
    subTitle: "currentEmployee",
    title: "Current Employees",
    financialApplicationFormData: [
      {
        id: "employeesCurrentlyEnrolledInBenefits",
        title: "Employees currently enrolled in benefits:",
        content: "Yes"
      }
    ],
    subChildren: (
      <div className="flex flex-col gap-3">
        {[
          [
            {
              id: "productDepartment",
              title: "Department name:",
              content: "Product Department"
            },
            {
              id: "productDepartmentEmployees",
              title: "Number of employees:",
              content: "8"
            },
            {
              id: "productDepartmentSalaries",
              title: "Annual department salaries:",
              content: "$820,000"
            }
          ],
          [
            {
              id: "marketingDepartment",
              title: "Department name:",
              content: "Marketing Department"
            },
            {
              id: "marketingDepartmentEmployees",
              title: "Number of employees:",
              content: "2"
            },
            {
              id: "marketingDepartmentSalaries",
              title: "Annual department salaries:",
              content: "$120,000"
            }
          ]
        ].map((detailData, key) => (
          <FinancialApplicationFormDetail
            key={key}
            isSubChildren
            financialApplicationFormData={detailData}
          />
        ))}
      </div>
    )
  }

  const debtFinancingAccountsPayableData = {
    id: LOAN_APPLICATION_STEPS.DEBT_FINANCING,
    subId: "accountsPayable",
    title: "Debt Financing: Accounts Payable",
    subTitle:
      "Liabilities represent the financial obligations your business owes, including amounts owed by customers for past credit sales. Understanding how much is owed and the time frame for collection is crucial for managing your cash flow and financial stability",
    financialApplicationFormData: [
      {
        id: "DaysToGetPaid: ",
        title: "Days to get paid: ",
        content: "Net 15 days"
      }
    ]
  }

  const debtFinancingLoanFormData = {
    id: LOAN_APPLICATION_STEPS.DEBT_FINANCING,
    subId: "loanForm",
    title: "Debt Financing",
    subTitle:
      "Debt financing, including loan financing, involves borrowing money that you agree to repay over time with interest. This option provides immediate funds while allowing you to retain full ownership of your business, but it also adds a financial obligation with regular payments that must be met, impacting your cash flow.",
    financialApplicationFormData: [
      {
        id: "totalInvestment",
        title:
          "State the total investment made in the company for ownership or equity:",
        content: 90000
      },
      {
        id: "outstandingLoans",
        title: "Indicate whether your business has any outstanding loans:",
        content: "Yes"
      }
    ],
    subChildren: (
      <FinancialApplicationFormDetail
        isSubChildren
        financialApplicationFormData={[
          {
            id: "key",
            title: "LOAN 1",
            content: ""
          },
          {
            id: "loan1Name",
            title: "Enter name of loan:",
            content: "Name of loan"
          },
          {
            id: "lenderName",
            title: "Enter name of Lender/Financial Institution:",
            content: "Bank of America"
          },
          {
            id: "loanType",
            title: "Type of loan:",
            content: "Equipment Financing"
          },
          {
            id: "loanDate",
            title: "Date of loan:",
            content: "01/2024"
          },
          {
            id: "remainingLoanBalance",
            title: "Remaining loan balance:",
            content: 100000
          },
          {
            id: "monthlyLoanPayment",
            title: "Loan term per month:",
            content: "24 /mo"
          },
          {
            id: "annualInterestRate",
            title: "Annual interest rate:",
            content: "10%"
          }
        ]}
      />
    )
  }

  const equityFinancingData = {
    id: LOAN_APPLICATION_STEPS.EQUITY,
    title: "Equity Financing",
    subTitle:
      "Equity investment involves raising capital by selling shares of your business to investors. In exchange, these investors gain partial ownership and a share in future profits, allowing you to grow without incurring debt, but it also means sharing control and future earnings.",
    financialApplicationFormData: [
      {
        id: "equityInvestmentName",
        title: "Enter name of equity investment:",
        content: "Name of loan"
      },
      {
        id: "equityReceivedDate",
        title: "Specify when equity will be received:",
        content: "01/2024"
      },
      {
        id: "equityInvestmentTotal",
        title: "Equity investment total amount:",
        content: 100000
      }
    ]
  }

  const financialStatementsData = {
    id: LOAN_APPLICATION_STEPS.FINANCIAL_STATEMENTS,
    title: "Financial Statements",
    financialApplicationFormData: [
      {
        id: "financialStatementsAvailable",
        title: "Financial statements are available:",
        content: "No"
      }
    ]
  }

  const forecastingSetupData = {
    id: LOAN_APPLICATION_STEPS.FORECASTING_SETUP,
    title: "Forecasting Setup",
    financialApplicationFormData: [
      {
        id: "startingYearForForecast",
        title: "Starting year for the forecast:",
        content: "2024"
      },
      {
        id: "forecastLengthToGenerate",
        title: "Forecast length to generate:",
        content: "3 years"
      }
    ]
  }

  const futureEmployeesData = {
    id: LOAN_APPLICATION_STEPS.PEOPLE,
    subId: "futureEmployee",
    title: "Future Employees",
    financialApplicationFormData: [],
    subChildren: (
      <div className="flex flex-col gap-3">
        {[
          [
            {
              id: "employeeEligibleForBenefits1",
              title: "Employee eligible for benefits:",
              content: "Yes"
            },
            {
              id: "futureRole1",
              title: "Future role:",
              content: "HR"
            },
            {
              id: "startDate1",
              title: "Start date:",
              content: "01/2025"
            },
            {
              id: "annualSalary1",
              title: "Annual salary:",
              content: "$90,000"
            }
          ],
          [
            {
              id: "employeeEligibleForBenefits2",
              title: "Employee eligible for benefits:",
              content: "Yes"
            },
            {
              id: "futureRole2",
              title: "Future role:",
              content: "Marketing"
            },
            {
              id: "startDate2",
              title: "Start date:",
              content: "01/2025"
            },
            {
              id: "annualSalary2",
              title: "Annual salary:",
              content: "$100,000"
            }
          ]
        ].map((detailData, key) => (
          <FinancialApplicationFormDetail
            key={key}
            isSubChildren
            financialApplicationFormData={detailData}
          />
        ))}
      </div>
    )
  }

  const individualInformationData = {
    id: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
    title: "Individual Information",
    financialApplicationFormData: [
      {
        id: "fullLegalName",
        title: "Full legal name:",
        content: "Larry Latte"
      },
      {
        id: "yourRole",
        title: "Your role:",
        content: "CEO"
      },
      {
        id: "residentAddress",
        title: "Resident address:",
        content: "123 Coco Lane, Seattle, WA, 97531"
      },
      {
        id: "emailAddress",
        title: "Email address:",
        content: "larrylatte@gmail.com"
      },
      {
        id: "phoneNumber",
        title: "Phone number:",
        content: "+1 (123) 456-7890"
      },
      {
        id: "dateOfBirth",
        title: "Date of birth:",
        content: "01/01/1990"
      },
      {
        id: "ssn",
        title: "SSN:",
        content: "123-45-6789"
      },
      {
        id: "percentageOfBusinessOwnership",
        title: "Percentage of business ownership:",
        content: "75%"
      }
    ]
  }

  const revenueData = {
    id: LOAN_APPLICATION_STEPS.REVENUE,
    title: "Revenue",
    financialApplicationFormData: [
      {
        id: "selectedRevenueModel",
        title: "Selected revenue model:",
        content: "Billable Hours"
      },
      {
        id: "revenueStreamTitle",
        title: "The revenue stream in your forecast should be titled:",
        content: "Billable Hours"
      },
      {
        id: "revenueStreamStartDate",
        title: "Revenue stream start date:",
        content: "01/2024"
      },
      {
        id: "estimateNewMonthlyCustomerSignUps",
        title: "Estimate new monthly customer sign-ups:",
        content: "24/mo"
      },
      {
        id: "estimateMonthlyIncreaseInNewCustomers",
        title: "Estimate the monthly increase in new customers:",
        content: "1%/mo"
      },
      {
        id: "estimateAverageMonthlyBilledHoursPerCustomer",
        title: "Estimate average monthly billed hours per customer:",
        content: "120/mo"
      },
      {
        id: "pricePerUnit",
        title: "Price per unit:",
        content: "$75.00"
      }
    ]
  }

  const taxRatesData = {
    id: LOAN_APPLICATION_STEPS.TAX_RATES,
    title: "Tax Rates",
    subTitle:
      "Income Tax: Enter a tax rate to cover income taxes (federal, state, local). A 20% rate is a good estimate. Taxes apply only when profitable, though unprofitable years may still incur some taxes.",
    financialApplicationFormData: [
      {
        id: "incomeTaxRate",
        title: "Estimate your income tax rate:",
        content: "20%"
      }
    ]
  }

  const loanRequestData = {
    id: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
    title: "Loan Request",
    financialApplicationFormData: [
      {
        id: "loanAmountRequested",
        title: "Loan amount requested:",
        content: 10000
      },
      {
        id: "proposedUseOfLoan",
        title: "Proposed use of loan:",
        content: "Equipment purchase"
      }
    ]
  }

  const assetReceivableData = {
    id: LOAN_APPLICATION_STEPS.ASSETS,
    subId: "receivable",
    title: "Assets: Account Receivables",
    subTitle:
      "Accounts Receivable represents the outstanding payments your business is owed from customers. The number of days to get paid helps estimate how long cash is tied up before being available.",
    financialApplicationFormData: [
      {
        id: "DaysToGetPaid: ",
        title: "Days to get paid: ",
        content: "Net 15 days"
      }
    ]
  }

  const assetLongTermData = {
    id: LOAN_APPLICATION_STEPS.ASSETS,
    subId: "longTerm",
    title: "Assets: Long Term Assets",
    subTitle:
      "Long-term assets represent significant investments your business has made in resources like equipment, property, and vehicles that are expected to provide value over several years. These assets are crucial for supporting sustained growth and long-term strategic goals.",
    financialApplicationFormData: [
      {
        id: "assetName",
        title: "Name of asset:",
        content: "Name of asset"
      },
      {
        id: "purchaseDate",
        title: "Purchase date:",
        content: "01/2025"
      },
      {
        id: "costOfAsset",
        title: "Cost of asset:",
        content: 90000
      },
      {
        id: "usefulLife",
        title: "Useful life of asset:",
        content: "3 years"
      }
    ]
  }

  const operatingExpensesData = {
    id: LOAN_APPLICATION_STEPS.FP_OPERATING_EXPENSES,
    title: "Operating Expenses (monthly)",
    subTitle: (
      <>
        <p className="text-sm">
          Operating Expenses are costs directly related to the day-to-day
          functioning of your business. Please specify the amount for some
          common expense categories below, and add any that apply to your
          business. For categories which don’t apply, please leave them blank.
        </p>
        <p className="text-sm">
          (Note: This form excludes Non-Operating expenses such as Interest
          Expense, Income Taxes, Raw Materials, or Losses from Asset Sales).
        </p>
      </>
    ),
    financialApplicationFormData: [],
    subChildren: <FinancialOperatingExpensesFormDetail />
  }

  const directCostData = {
    id: LOAN_APPLICATION_STEPS.FP_OPERATING_EXPENSES,
    title: "Direct Costs",
    subTitle: (
      <>
        <p className="text-sm">
          Direct Costs are expenses directly related to creating or delivering a
          product or service. Common direct costs are raw materials to make a
          product, manufacturing supplies, shipping costs, and costs of
          employees or third-party providers who directly contribute to
          production.
        </p>
        <p className="text-sm">
          This section shouldn’t include costs essential to keeping the business
          running, like rent for your office, salaries for your marketing team,
          or the electricity bill. Those are Operating Expenses; we’ll ask for
          those in the next section.
        </p>
      </>
    ),
    financialApplicationFormData: [],
    subChildren: <DirectCostsFormDetail />
  }

  const connectedAccountData = {
    id: LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION,
    title: "Connected Accounts",
    financialApplicationFormData: [],
    subChildren: <ConnectedAccountDetail />
  }

  const financialApplicationDetailData: FinancialApplicationDetailData[] = [
    loanRequestData,
    businessInformationData,
    individualInformationData,
    forecastingSetupData,
    financialStatementsData,
    revenueData,
    currentEmployeesData,
    futureEmployeesData,
    connectedAccountData,
    directCostData,
    operatingExpensesData,
    taxRatesData,
    assetReceivableData,
    assetLongTermData,
    debtFinancingAccountsPayableData,
    debtFinancingLoanFormData,
    equityFinancingData
  ]
  return { financialApplicationDetailData }
}
