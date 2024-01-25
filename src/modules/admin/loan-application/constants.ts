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

const MOCK_DATA = [
  {
    username: "Ethan Foster",
    email: "ethan@example.com",
    loanProduct: "Microloan",
    loanAmount: "50000",
    currency: "USD",
    status: "Ready",
    progress: "50"
  },
  {
    username: "Aria Thompson",
    email: "aria@example.com",
    loanProduct: "Emergency",
    loanAmount: "12000",
    currency: "USD",
    status: "Closed",
    progress: "20"
  },
  {
    username: "Liam Patel",
    email: "liam@example.com",
    loanProduct: "Credit Line",
    loanAmount: "60000",
    currency: "USD",
    status: "In Progress",
    progress: "10"
  },
  {
    username: "Madison Kim",
    email: "madison@example.com",
    loanProduct: "Revenue Share",
    loanAmount: "800000",
    currency: "USD",
    status: "Flagged",
    progress: "90"
  },
  {
    username: "Noah Rodriguez",
    email: "noah@example.com",
    loanProduct: "Microloan",
    loanAmount: "42000",
    currency: "USD",
    status: "Closed",
    progress: "80"
  },
  {
    username: "Ava Brown",
    email: "ava@example.com",
    loanProduct: "Emergency",
    loanAmount: "15000",
    currency: "USD",
    status: "Ready",
    progress: "30"
  },
  {
    username: "Oliver White",
    email: "oliver@example.com",
    loanProduct: "Credit Line",
    loanAmount: "70000",
    currency: "USD",
    status: "In Progress",
    progress: "60"
  },
  {
    username: "Sophia Lee",
    email: "sophia@example.com",
    loanProduct: "Revenue Share",
    loanAmount: "700000",
    currency: "USD",
    status: "Flagged",
    progress: "40"
  },
  {
    username: "Lucas Smith",
    email: "lucas@example.com",
    loanProduct: "Microloan",
    loanAmount: "30000",
    currency: "USD",
    status: "In Progress",
    progress: "70"
  },
  {
    username: "Emma Turner",
    email: "emma@example.com",
    loanProduct: "Emergency",
    loanAmount: "18000",
    currency: "USD",
    status: "Ready",
    progress: "25"
  },
  {
    username: "Mia Hall",
    email: "mia@example.com",
    loanProduct: "Credit Line",
    loanAmount: "50000",
    currency: "USD",
    status: "Closed",
    progress: "95"
  },
  {
    username: "Liam Davis",
    email: "liam@example.com",
    loanProduct: "Revenue Share",
    loanAmount: "600000",
    currency: "USD",
    status: "Flagged",
    progress: "15"
  },
  {
    username: "Ava Wilson",
    email: "ava@example.com",
    loanProduct: "Microloan",
    loanAmount: "48000",
    currency: "USD",
    status: "Closed",
    progress: "45"
  },
  {
    username: "Olivia Harris",
    email: "olivia@example.com",
    loanProduct: "Emergency",
    loanAmount: "12000",
    currency: "USD",
    status: "In Progress",
    progress: "85"
  },
  {
    username: "Elijah Turner",
    email: "elijah@example.com",
    loanProduct: "Credit Line",
    loanAmount: "65000",
    currency: "USD",
    status: "Ready",
    progress: "55"
  }
]

export { MOCK_DATA, LOAN_STATUS, LOAN_PRODUCTS, LOAN_AMOUNT }
