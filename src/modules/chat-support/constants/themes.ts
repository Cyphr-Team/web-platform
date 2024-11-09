import { type Params } from "react-chatbotify"

export const themes = [{ id: "cyborg", version: "0.1.0" }]

interface ThemeOptionType {
  title: string
  questions: string[]
}

type ThemeOptionsMapType = Record<string, ThemeOptionType>

const themeOptionsMap: ThemeOptionsMapType = {
  findingEIN: {
    title: "Finding EIN",
    questions: ["What’s a EIN/TIN?", "Where do I find my EIN?"]
  },
  businessFormation: {
    title: "Business Formation & Documentation",
    questions: [
      "What are Articles of Organization?",
      "What if I don't have a business address, can I use my residential address?",
      "What is a Certificate of Good Standing?"
    ]
  },
  businessManagement: {
    title: "Business Financial Management",
    questions: ["Can I use my personal bank account for my business?"]
  },
  loanAffordability: {
    title: "Loan Affordability",
    questions: ["What is my loan affordability?"]
  },
  loanPaymentGuidance: {
    title: "Loan Payment Guidance",
    questions: ["How can I calculate the total loan amount?"]
  },
  platformConnectivity: {
    title: "Platform Connectivity",
    questions: ["I’m having issues connecting to Plaid. Can you help me?"]
  },
  applicationProcess: {
    title: "Application Process & Submission",
    questions: [
      "When will I find out if my application has been accepted?",
      "Can I submit more than one application?",
      "Can I update my information after I have submitted my application?"
    ]
  }
}

const themeQuestionOptions = (params: Params) => {
  return Object.values(themeOptionsMap).filter(
    (theme) => theme.title === params.userInput
  )[0].questions
}

export { themeOptionsMap, themeQuestionOptions }
