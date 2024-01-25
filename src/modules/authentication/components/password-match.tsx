import { useFormContext } from "react-hook-form"
import { PasswordFormValue, usePasswordMatch } from "../hooks/usePasswordMatch"
import { Matcher, getMatcherVariants } from "@/components/ui/matcher"

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
