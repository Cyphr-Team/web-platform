import * as z from "zod"
import { createDateSchema } from "@/constants/validate"

export const enum PeopleField {
  CurrentEmployeesEnrolled = "currentEmployeesEnrolled",
  CurrentEmployees = "currentEmployees",
  FutureEmployees = "futureEmployees"
}

export type PeopleFormValue = z.infer<typeof peopleFormSchema>

export const peopleFormSchema = z.object({
  id: z.string().nullable(),
  [PeopleField.CurrentEmployeesEnrolled]: z
    .string()
    .min(1, "This field is required"),
  [PeopleField.CurrentEmployees]: z
    .array(
      z.object({
        departmentName: z.string().min(1, "This field is required"),
        numberOfEmployees: z.coerce
          .number()
          .min(1, "This field is required")
          .max(100_000_000, "Current employees cannot exceed 100,000,000"),
        annualSalary: z.coerce.number().min(1, "This field is required")
      })
    )
    .min(1),
  [PeopleField.FutureEmployees]: z.array(
    z.object({
      isEnrolledInBenefits: z.string().min(1, "This field is required"),
      role: z.string().min(1, "This field is required"),
      startDate: createDateSchema(),
      annualSalary: z.coerce.number().min(1, "This field is required")
    })
  )
})

export const PEOPLE_DEFAULT_VALUE = {
  [PeopleField.CurrentEmployees]: {
    departmentName: "",
    numberOfEmployees: "",
    annualSalary: ""
  },
  [PeopleField.FutureEmployees]: {
    isEnrolledInBenefits: "",
    role: "",
    startDate: "",
    annualSalary: ""
  }
}
