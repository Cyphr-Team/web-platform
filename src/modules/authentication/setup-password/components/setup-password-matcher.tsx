import { useFormContext } from "react-hook-form"
import { Matcher, getMatcherVariants } from "../../../../components/ui/matcher"
import {
  PasswordRegex,
  SetupPasswordFormValue
} from "../hooks/useSetupPassword"
import { ZodIssueCode } from "zod"

export function SetupPasswordMatch() {
  const { formState, getValues } = useFormContext<SetupPasswordFormValue>()

  const matchRegex = (keyError: PasswordRegex) => {
    return !!(
      formState.errors?.password?.types?.invalid_string as string[] | undefined
    )?.includes(keyError)
  }

  const isAtLeastEightCharacters =
    formState.errors?.password?.type === ZodIssueCode.too_small

  const isAtLeastOneSpecialCharacter = matchRegex(
    PasswordRegex.AT_LEAST_ONE_SPECIAL_CHARACTER
  )
  const isAtLeastOneUpperCase = matchRegex(PasswordRegex.AT_LEAST_ONE_UPPERCASE)
  const isAtLeastOneLowerCase = matchRegex(PasswordRegex.AT_LEAST_ONE_LOWERCASE)
  const isAtLeastOneDigit = matchRegex(PasswordRegex.AT_LEAST_ONE_DIGIT)

  const isNoneSpaces = matchRegex(PasswordRegex.NONE_SPACES)

  return (
    <>
      <Matcher
        variant={getMatcherVariants(
          getValues("password"),
          isAtLeastEightCharacters
        )}
      >
        <div>Must be at least 8 characters</div>
      </Matcher>

      <Matcher
        variant={getMatcherVariants(
          getValues("password"),
          isAtLeastOneSpecialCharacter
        )}
      >
        <div>Must contain at least one special character</div>
      </Matcher>

      <Matcher
        variant={getMatcherVariants(
          getValues("password"),
          isAtLeastOneUpperCase
        )}
      >
        <div>Must contain at least one uppercase character</div>
      </Matcher>

      <Matcher
        variant={getMatcherVariants(
          getValues("password"),
          isAtLeastOneLowerCase
        )}
      >
        <div>Must contain at least one lowercase character</div>
      </Matcher>

      <Matcher
        variant={getMatcherVariants(getValues("password"), isAtLeastOneDigit)}
      >
        <div>Must contain at least one digit</div>
      </Matcher>

      <Matcher
        variant={getMatcherVariants(getValues("password"), isNoneSpaces)}
      >
        <div>Can't contain spaces</div>
      </Matcher>
    </>
  )
}
