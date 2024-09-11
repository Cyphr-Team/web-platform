import * as z from "zod"
import { createDateSchema } from "@/constants/validate"

export const enum PeopleField {
  CURRENT_EMPLOYEES_ENROLLED = "currentEmployeesEnrolled",
  CURRENT_EMPLOYEES = "currentEmployees",
  FUTURE_EMPLOYEES = "futureEmployees"
}

export type PeopleFormValue = z.infer<typeof peopleFormSchema>

export const peopleFormSchema = z.object({
  id: z.string().nullable(),
  [PeopleField.CURRENT_EMPLOYEES_ENROLLED]: z
    .string()
    .min(1, "This field is required"),
  [PeopleField.CURRENT_EMPLOYEES]: z
    .array(
      z.object({
        departmentName: z.string().min(1, "This field is required"),
        numberOfEmployees: z.coerce.number().min(1, "This field is required"),
        annualSalary: z.coerce.number().min(1, "This field is required")
      })
    )
    .min(1, "This field is required"),
  [PeopleField.FUTURE_EMPLOYEES]: z.array(
    z.object({
      isEnrolledInBenefits: z.string().min(1, "This field is required"),
      role: z.string().min(1, "This field is required"),
      startDate: createDateSchema(),
      annualSalary: z.coerce.number().min(1, "This field is required")
    })
  )
})

export const PEOPLE_DEFAULT_VALUE = {
  [PeopleField.CURRENT_EMPLOYEES]: {
    departmentName: "",
    numberOfEmployees: "",
    annualSalary: ""
  },
  [PeopleField.FUTURE_EMPLOYEES]: {
    isEnrolledInBenefits: "",
    role: "",
    startDate: "",
    annualSalary: ""
  }
}
