import { ExecutionFormResponse } from "./type"

export const questions = [
  {
    question: "What metrics do you use to measure the growth of your business?",
    field: "measureMetrics"
  },
  {
    question:
      "What is the most recent product development or traction milestone you have achieved?",
    field: "latestMilestone"
  },
  {
    question:
      "What is the next milestone for your business and how long will it take you to reach it?",
    field: "nextMilestone"
  },
  {
    question:
      "What are the greatest near-term challenges facing your company? How do you plan to confront them?",
    field: "nearTermChallenges"
  }
]

export const currentStage = [
  {
    label: "Idea stage",
    value: "idea_stage"
  },
  {
    label: "Developing a minimum viable product (MVP)",
    value: "developing_mvp"
  },
  {
    label: "Launched MVP to early adopters and pilot partners",
    value: "launched_mvp"
  },
  {
    label:
      "Between MVP and having a whole product ready for a full commercial launch",
    value: "between_mvp_and_whole_product"
  },
  {
    label:
      "Developed a scalable business model and go-to-market strategy, now scaling sales and marketing efforts to generate significant revenue",
    value: "scaling_sales_and_marketing"
  }
]

export const supportAreas = [
  {
    label: "A. Business model",
    value: "business_model"
  },
  {
    label: "B. Strategy",
    value: "strategy"
  },
  {
    label: "C. Human Resources",
    value: "human_resources"
  },
  {
    label: "D. Financial Modeling",
    value: "financial_modeling"
  },
  {
    label: "E. Marketing",
    value: "marketing"
  },
  {
    label: "F. Other",
    value: "other"
  }
]

export const partnerships = [
  {
    label: "A. Joint ventures",
    value: "joint_ventures"
  },
  {
    label: "B. Marketing alliances",
    value: "marketing_alliances"
  },
  {
    label: "C. Licensing arrangements",
    value: "licensing_arrangements"
  },
  {
    label: "D. Selling/distribution agreements",
    value: "selling_distribution_agreements"
  },
  {
    label: "E. Channel partnerships",
    value: "channel_partnerships"
  },
  {
    label: "F. Software agreements",
    value: "software_agreements"
  }
]

export const cashBurnOptions = [
  {
    label: "No revenue",
    value: "0"
  },
  {
    label: "$1 - $5,000",
    value: "1-5000"
  },
  {
    label: "$5,001 - $50,000",
    value: "5001-50000"
  },
  {
    label: "$50,001 - $100,000",
    value: "50001-100000"
  },
  {
    label: "$100,001 - $500,000",
    value: "100001-500000"
  },
  {
    label: "$500,001 - $1,000,000",
    value: "500001-1000000"
  },
  {
    label: "Over $1,000,000",
    value: ">1000000"
  }
]

export const FAKE_DATA = {
  id: "1",
  monthlyBurn: "1000",
  measureMetrics: "We measure growth by tracking our monthly active users",
  latestMilestone:
    "We recently launched a new feature that has increased user engagement",
  nextMilestone:
    "Our next milestone is to reach 100,000 monthly active users within the next 6 months",
  nearTermChallenges:
    "Our greatest challenge is increasing user retention. We plan to address this by improving our onboarding process",
  currentStage: currentStage.find((stage) => stage.value === "developing_mvp")
    ?.label,
  supportAreas: ["business_model", "strategy"].map(
    (area) => supportAreas.find((a) => a.value === area)?.label
  ),
  partnerships: ["joint_ventures"].map(
    (partner) => partnerships.find((p) => p.value === partner)?.label
  ),
  fundingSources: [
    {
      source: "bank_loan",
      amount: "50000"
    },
    {
      source: "friends_and_family",
      amount: "10000"
    }
  ],
  founders: [
    {
      name: "John Doe",
      title: "CEO",
      relevantExperience: "John has 5 years of experience in the tech industry",
      skills: "John is skilled in product management and software development"
    }
  ]
} as ExecutionFormResponse
