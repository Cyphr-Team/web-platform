import { ProductServiceFormResponse } from "./type"

export const productServiceFormQuestions = [
  {
    question: "What is the problem your product of service addresses?",
    field: "solutionFocus"
  },
  {
    question:
      "What is the product or service? What is the value proposition to your customers?",
    field: "businessValue"
  },
  {
    question:
      "How have you validated that people need the product or service (i.e. proof of need, customer discovery efforts, etc.)?",
    field: "proofOfMarket"
  },
  {
    question:
      "What is your intellectual property status and if applicable, who holds the rights to the IP? ",
    field: "intellectualProperty"
  }
]

export const FAKE_PRODUCT_SERVICE_DATA = {
  id: "1",
  solutionFocus:
    "Many small and medium-sized enterprises (SMEs) struggle with efficiently managing their customer relationships and sales processes due to the lack of affordable, easy-to-use Customer Relationship Management (CRM) software. They often rely on manual methods or overly complex solutions that do not fit their specific needs, leading to lost sales opportunities, poor customer service, and inefficient workflows.",
  businessValue:
    "Our product, EasyCRM, is an intuitive and affordable CRM solution tailored specifically for SMEs. It simplifies customer relationship management, automates sales workflows, and provides insightful analytics to help businesses grow.",
  proofOfMarket:
    "We conducted extensive customer discovery efforts, including surveys, interviews, and focus groups with over 200 SMEs across various industries. Our findings indicated a strong demand for a user-friendly and cost-effective CRM solution.",
  intellectualProperty:
    "We have applied for a patent for the unique algorithms used in our analytics engine. Additionally, our software, branding, and design elements are protected by copyrights and trademarks. The intellectual property is held by our company, EasyCRM Inc., ensuring that we retain full control over our innovations and brand identity."
} as ProductServiceFormResponse
