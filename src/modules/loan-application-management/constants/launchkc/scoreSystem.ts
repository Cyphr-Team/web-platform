const SCORE_SYSTEMS = [
  { rangeScore: "5-4", describe: "Exceed" },
  { rangeScore: "3-2", describe: "Meets" },
  { rangeScore: "1-0", describe: "Below" }
]

const SCORE_SYSTEMS_EXPLAINS = [
  {
    target: "PRODUCT OR SERVICE",
    describe:
      "The product or service is clearly described, validated, and the value proposition is unique and compelling."
  },
  {
    target: "MARKET OPPORTUNITY",
    describe:
      "The market is clearly understood and and there is a strong plan in place to access customers."
  },
  {
    target: "BUSINESS MODEL",
    describe:
      "The business model shows strong revenue and provides a compelling plan to scale."
  },
  {
    target: "EXECUTION",
    describe:
      "The finances, past, and future milestones, and team are a standout and create a high probability of success."
  },
  {
    target: "LAUNCHKC FIT",
    describe:
      "The business is an ideal LaunchKC fit with a: (i) Promising growth trajectory (ii) Potential to create jobs (iii) Likelihood to stay in KCMO long term (iv) Commitment to equity and inclusion."
  }
]

export { SCORE_SYSTEMS, SCORE_SYSTEMS_EXPLAINS }
