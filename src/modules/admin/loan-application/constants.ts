import { Option } from "@/common"

const LOAN_STATUS: Option[] = [
  { label: "Flagged", value: "Flagged" },
  { label: "Closed", value: "Closed" },
  { label: "Ready", value: "Ready" },
  { label: "In Progress", value: "In Progress" }
]

const LOAN_PRODUCTS: Option[] = [
  { label: "Revenue Share", value: "Revenue Share" },
  { label: "Emergency", value: "Emergency" },
  { label: "Micro Loan", value: "Micro Loan" },
  { label: "Term Loan", value: "Term Loan" },
  { label: "Credit Line", value: "Credit Line" },
  { label: "SBA", value: "SBA" }
]

const LOAN_AMOUNT: Option[] = [
  { label: "< $1,000", value: "< $1,000" },
  { label: "$1,000 - $10,000", value: "$1,000 - $10,000" },
  { label: "$10,000 - $20,000", value: "$10,000 - $20,000" },
  { label: "$20,000 - $30,000", value: "$20,000 - $30,000" },
  { label: "$40,000 - $50,000", value: "$40,000 - $50,000" },
  { label: "> $50,000", value: "> $50,000" }
]

export { LOAN_STATUS, LOAN_PRODUCTS, LOAN_AMOUNT }
