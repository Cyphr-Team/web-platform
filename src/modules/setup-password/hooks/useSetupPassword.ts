import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

export enum PasswordRegex {
  AT_LEAST_ONE_SPECIAL_CHARACTER = "AT_LEAST_ONE_SPECIAL_CHARACTER"
}

const formSchema = z
  .object({
    password: z
      .string()
      .min(8)
      .regex(
        /(?=.*[^a-zA-Z0-9])^.+$/,
        PasswordRegex.AT_LEAST_ONE_SPECIAL_CHARACTER
      )
      .regex(/(?=.*[^a-zA-Z0-9])^.+$/, "AT_LEAST_ONE_SPECIAL_CHARACTER123"),
    confirmPassword: z.string(),
    successMsg: z.string().optional()
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The confirm passwords did not match",
        path: ["confirmPassword"]
      })
    }
  })

export type UserFormValue = z.infer<typeof formSchema>

export const useSetupPassword = () => {
  const defaultValues = {
    password: "",
    confirmPassword: ""
  }

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all"
  })

  return { form }
}
