import { preQualificationSchema } from "@/modules/loan-application/constants/form"

export const questions = [
  {
    field: preQualificationSchema.keyof().Enum.isCompanyBasedInUs,
    label: "Is the Company based in the United States?"
  },
  {
    field: preQualificationSchema.keyof().Enum.foundingTeamEligibleToWorkInUs,
    label:
      "Are all members of the founding team eligible to work in the United States?"
  },
  {
    field: preQualificationSchema.keyof().Enum.isForProfitTechCompany,
    label:
      "Is your Company a for profit entity that provides a technology-based product, service, or solution?"
  },
  {
    field: preQualificationSchema.keyof().Enum.hasMvpWithRevenueUnderOneMillion,
    label: "Do you have a minimum viable product with revenue under 1 million?"
  }
]

export const options = [
  {
    value: "YES",
    label:
      "Yes, the company and 51% of the founding team are located in Kansas City, Missouri."
  },
  {
    value: "NO_BUT_WILL_CHANGE",
    label:
      "No, but I am willing to relocate the company and 51% of the founding team to Kansas City, Missouri and establish an operating presence."
  },
  {
    value: "NO",
    label:
      "No, I am not willing to relocate the company and 51% of the founding team to Kansas City, Missouri"
  }
]
