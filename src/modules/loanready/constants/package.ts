import { isRepSubdomain } from "@/utils/domain.utils"

const enum LoanReadyPlanEnum {
  BASIC = "BASIC",
  PLUS = "PLUS",
  UPGRADE = "UPGRADE"
}

const LoanReadyPlan = {
  [LoanReadyPlanEnum.BASIC]: {
    name: "LoanReady",
    price: isRepSubdomain() ? 100 : 9900,
    currency: "USD"
  },
  [LoanReadyPlanEnum.PLUS]: {
    name: "LoanReady+",
    price: isRepSubdomain() ? 105 : 15000,
    currency: "USD"
  },
  [LoanReadyPlanEnum.UPGRADE]: {
    name: "Upgrade",
    price: isRepSubdomain() ? 101 : 5900,
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
  },
  {
    label: "LoanReady+",
    value: LoanReadyPlanEnum.UPGRADE,
    price: LoanReadyPlan[LoanReadyPlanEnum.UPGRADE].price,
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

const enum LoanReadyRefundReasonEnum {
  DUPLICATE_PURCHASE = "DUPLICATE_PURCHASE",
  ACCIDENTAL_PURCHASE = "ACCIDENTAL_PURCHASE",
  UNAUTHORIZED_TRANSACTION = "UNAUTHORIZED_TRANSACTION"
}

const LoanReadyRefundReasons: Record<LoanReadyRefundReasonEnum, string> = {
  [LoanReadyRefundReasonEnum.DUPLICATE_PURCHASE]: "Duplicate purchase",
  [LoanReadyRefundReasonEnum.ACCIDENTAL_PURCHASE]: "Accidental purchase",
  [LoanReadyRefundReasonEnum.UNAUTHORIZED_TRANSACTION]:
    "Unauthorized transaction"
}

export {
  LoanReadyPlanEnum,
  LoanReadyPlan,
  LoanReadyPlanOptions,
  LoanReadyRefundReasonEnum,
  LoanReadyRefundReasons
}
