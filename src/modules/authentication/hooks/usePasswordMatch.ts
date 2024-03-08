import { PASSWORD_REGEX, PasswordRegex } from "@/constants"
import { MultipleFieldErrors, useFormContext } from "react-hook-form"
import * as z from "zod"

export const passwordFormSchema = z.object({
  password: z
    .string()
    .min(8, PasswordRegex.AT_LEAST_EIGHT_CHARACTER)
    .max(255, PasswordRegex.AT_MOST_255_CHARACTER)
    .regex(
      PASSWORD_REGEX[PasswordRegex.AT_LEAST_ONE_SPECIAL_CHARACTER],
      PasswordRegex.AT_LEAST_ONE_SPECIAL_CHARACTER
    )
    .regex(
      PASSWORD_REGEX[PasswordRegex.AT_LEAST_ONE_UPPERCASE],
      PasswordRegex.AT_LEAST_ONE_UPPERCASE
    )
    .regex(
      PASSWORD_REGEX[PasswordRegex.AT_LEAST_ONE_LOWERCASE],
      PasswordRegex.AT_LEAST_ONE_LOWERCASE
    )
    .regex(
      PASSWORD_REGEX[PasswordRegex.AT_LEAST_ONE_DIGIT],
      PasswordRegex.AT_LEAST_ONE_DIGIT
    )
    .regex(PASSWORD_REGEX[PasswordRegex.NONE_SPACES], PasswordRegex.NONE_SPACES)
})

export type PasswordFormValue = z.infer<typeof passwordFormSchema>

export const PASSWORD_REGEX_TEXT = {
  [PasswordRegex.AT_LEAST_EIGHT_CHARACTER]: "Must be at least 8 characters",
  [PasswordRegex.AT_LEAST_ONE_SPECIAL_CHARACTER]:
    "Must contain at least one special character",
  [PasswordRegex.AT_LEAST_ONE_UPPERCASE]:
    "Must contain at least one uppercase character",
  [PasswordRegex.AT_LEAST_ONE_LOWERCASE]:
    "Must contain at least one lowercase character",
  [PasswordRegex.AT_LEAST_ONE_DIGIT]: "Must contain at least one digit",
  [PasswordRegex.NONE_SPACES]: "Can't contain spaces",
  [PasswordRegex.AT_MOST_255_CHARACTER]: "Must be at most 255 characters"
}

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
