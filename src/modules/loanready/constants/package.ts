const enum LoanReadyPlanEnum {
  BASIC = "BASIC",
  PLUS = "PLUS"
}

const LoanReadyPlan = {
  [LoanReadyPlanEnum.BASIC]: {
    price: 9900,
    currency: "USD"
  },
  [LoanReadyPlanEnum.PLUS]: {
    price: 15000,
    currency: "USD"
  }
}

const LoanReadyPlanOptions = {
  [LoanReadyPlanEnum.BASIC]: {
    label: "Loan Ready",
    price: LoanReadyPlan[LoanReadyPlanEnum.BASIC].price
  },
  [LoanReadyPlanEnum.PLUS]: {
    label: "Loan Ready+",
    price: LoanReadyPlan[LoanReadyPlanEnum.PLUS].price
  }
}

export { LoanReadyPlanEnum, LoanReadyPlan, LoanReadyPlanOptions }
