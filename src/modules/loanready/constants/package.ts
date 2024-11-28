const enum LoanReadyPlanEnum {
  BASIC = "BASIC",
  PLUS = "PLUS"
}

const LoanReadyPlan = {
  [LoanReadyPlanEnum.BASIC]: {
    name: "LoanReady",
    price: 9900,
    currency: "USD"
  },
  [LoanReadyPlanEnum.PLUS]: {
    name: "LoanReady+",
    price: 15000,
    currency: "USD"
  }
}

const LoanReadyPlanOptions = [
  {
    label: "LoanReady",
    value: LoanReadyPlanEnum.BASIC,
    price: LoanReadyPlan[LoanReadyPlanEnum.BASIC].price,
    description: [
      {
        id: "desc1",
        text: "Receive a loan readiness score along with tailored feedback to boost your approval chances."
      }
    ]
  },
  {
    label: "LoanReady+",
    value: LoanReadyPlanEnum.PLUS,
    price: LoanReadyPlan[LoanReadyPlanEnum.PLUS].price,
    description: [
      {
        id: "desc1",
        text: "Receive a loan readiness score along with tailored feedback to boost your approval chances."
      },
      {
        id: "desc2",
        text: "Includes a generated income statement to simplify your loan application process."
      }
    ]
  }
]

export { LoanReadyPlanEnum, LoanReadyPlan, LoanReadyPlanOptions }
