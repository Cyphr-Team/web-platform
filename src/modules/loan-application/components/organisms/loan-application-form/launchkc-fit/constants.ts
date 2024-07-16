import { LaunchKcFitFormResponse } from "./type"

export const questions = [
  {
    question: "How did you hear about LaunchKC?",
    field: "referralSource"
  },
  {
    question: "Do any of your founders have ties to Kansas City, Mo?",
    field: "founderKcTies"
  },
  {
    question: "What will this award make possible for your business?",
    field: "awardImpact"
  },
  {
    question:
      "What do equity and inclusion mean to you as a business owner? How is your business inclusive with regards to your team, your customers, and your product design and function?",
    field: "inclusionApproach"
  }
]

export const FAKE_DATA = {
  id: "1",
  referralSource:
    "I heard about LaunchKC through a friend who participated in the program last year.",
  founderKcTies: "None of our founders have ties to Kansas City, Mo.",
  awardImpact:
    "This award will enable us to expand our product line and reach new customers in the Kansas City area. With the additional funding, we plan to invest in product development, marketing, and hiring local talent to support our growth.",
  inclusionApproach:
    "Equity and inclusion are core values of our business. We believe in creating a diverse and inclusive workplace that reflects the communities we serve. Our team is made up of individuals from different backgrounds, cultures, and experiences, and we actively promote a culture of respect, collaboration, and belonging. In our product design and function, we prioritize accessibility, usability, and inclusivity to ensure that all users can benefit from our solutions."
} as LaunchKcFitFormResponse
