import { useFormContext } from "react-hook-form"
import {
  type PasswordFormValue,
  usePasswordMatch
} from "../hooks/usePasswordMatch"
import { getMatcherVariants, Matcher } from "@/components/ui/matcher"
import { PASSWORD_REGEX_TEXT, PasswordRegex } from "@/constants"

export function PasswordMatch() {
  const { getValues } = useFormContext<PasswordFormValue>()
  const {
    isAtLeastEightCharacters,
    isAtLeastOneSpecialCharacter,
    isAtLeastOneUpperCase,
    isAtLeastOneLowerCase,
    isAtLeastOneDigit,
    isNoneSpaces
  } = usePasswordMatch<PasswordFormValue>()

  return (
    <>
      <Matcher
        variant={getMatcherVariants(
          getValues("password"),
          isAtLeastEightCharacters
        )}
      >
        <div>{PASSWORD_REGEX_TEXT[PasswordRegex.AT_LEAST_EIGHT_CHARACTER]}</div>
      </Matcher>

      <Matcher
        variant={getMatcherVariants(
          getValues("password"),
          isAtLeastOneSpecialCharacter
        )}
      >
        <div>
          {PASSWORD_REGEX_TEXT[PasswordRegex.AT_LEAST_ONE_SPECIAL_CHARACTER]}
        </div>
      </Matcher>

      <Matcher
        variant={getMatcherVariants(
          getValues("password"),
          isAtLeastOneUpperCase
        )}
      >
        <div>{PASSWORD_REGEX_TEXT[PasswordRegex.AT_LEAST_ONE_UPPERCASE]}</div>
      </Matcher>

      <Matcher
        variant={getMatcherVariants(
          getValues("password"),
          isAtLeastOneLowerCase
        )}
      >
        <div>{PASSWORD_REGEX_TEXT[PasswordRegex.AT_LEAST_ONE_LOWERCASE]}</div>
      </Matcher>

      <Matcher
        variant={getMatcherVariants(getValues("password"), isAtLeastOneDigit)}
      >
        <div>{PASSWORD_REGEX_TEXT[PasswordRegex.AT_LEAST_ONE_DIGIT]}</div>
      </Matcher>

      <Matcher
        variant={getMatcherVariants(getValues("password"), isNoneSpaces)}
      >
        <div>{PASSWORD_REGEX_TEXT[PasswordRegex.NONE_SPACES]}</div>
      </Matcher>
    </>
  )
}
