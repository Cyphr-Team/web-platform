import { PASSWORD_REGEX, PASSWORD_REGEX_TEXT, PasswordRegex } from "@/constants"
import { type MultipleFieldErrors, useFormContext } from "react-hook-form"
import * as z from "zod"

export const passwordSchema = z
  .string()
  .min(8, PASSWORD_REGEX_TEXT[PasswordRegex.AT_LEAST_EIGHT_CHARACTER])
  .max(255, PASSWORD_REGEX_TEXT[PasswordRegex.AT_MOST_255_CHARACTER])
  .regex(
    PASSWORD_REGEX[PasswordRegex.AT_LEAST_ONE_SPECIAL_CHARACTER],
    PASSWORD_REGEX_TEXT[PasswordRegex.AT_LEAST_ONE_SPECIAL_CHARACTER]
  )
  .regex(
    PASSWORD_REGEX[PasswordRegex.AT_LEAST_ONE_UPPERCASE],
    PASSWORD_REGEX_TEXT[PasswordRegex.AT_LEAST_ONE_UPPERCASE]
  )
  .regex(
    PASSWORD_REGEX[PasswordRegex.AT_LEAST_ONE_LOWERCASE],
    PASSWORD_REGEX_TEXT[PasswordRegex.AT_LEAST_ONE_LOWERCASE]
  )
  .regex(
    PASSWORD_REGEX[PasswordRegex.AT_LEAST_ONE_DIGIT],
    PASSWORD_REGEX_TEXT[PasswordRegex.AT_LEAST_ONE_DIGIT]
  )
  .regex(
    PASSWORD_REGEX[PasswordRegex.NONE_SPACES],
    PASSWORD_REGEX_TEXT[PasswordRegex.NONE_SPACES]
  )

export const passwordFormSchema = z.object({
  password: passwordSchema
})

export type PasswordFormValue = z.infer<typeof passwordFormSchema>

export const usePasswordMatch = <T extends PasswordFormValue>() => {
  const { formState } = useFormContext<T>()

  const matchRegex = (keyError: PasswordRegex) => {
    return !!(
      (formState.errors?.password?.types as MultipleFieldErrors)
        ?.invalid_string as string[] | undefined
    )?.includes(keyError)
  }

  const isAtLeastEightCharacters =
    formState.errors?.password?.type === z.ZodIssueCode.too_small

  const isAtLeastOneSpecialCharacter = matchRegex(
    PasswordRegex.AT_LEAST_ONE_SPECIAL_CHARACTER
  )
  const isAtLeastOneUpperCase = matchRegex(PasswordRegex.AT_LEAST_ONE_UPPERCASE)
  const isAtLeastOneLowerCase = matchRegex(PasswordRegex.AT_LEAST_ONE_LOWERCASE)
  const isAtLeastOneDigit = matchRegex(PasswordRegex.AT_LEAST_ONE_DIGIT)

  const isNoneSpaces = matchRegex(PasswordRegex.NONE_SPACES)

  return {
    isAtLeastEightCharacters,
    isAtLeastOneSpecialCharacter,
    isAtLeastOneUpperCase,
    isAtLeastOneLowerCase,
    isAtLeastOneDigit,
    isNoneSpaces
  }
}
