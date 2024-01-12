import { useFormContext } from "react-hook-form"
import { Matcher, getMatcherVariants } from "../../../components/ui/matcher"
import { PasswordRegex, UserFormValue } from "../hooks/useSetupPassword"
import { ZodIssueCode } from "zod"

export function SetupPasswordMatch() {
  const { formState, getValues } = useFormContext<UserFormValue>()

  const isAtLeastEightCharacters =
    formState.errors?.password?.type === ZodIssueCode.too_small

  const isAtLeastOneSpecialCharacter = !!(
    formState.errors?.password?.types?.invalid_string as string[] | undefined
  )?.includes(PasswordRegex.AT_LEAST_ONE_SPECIAL_CHARACTER)

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
        <div>Must contain at least 1 special character</div>
      </Matcher>
    </>
  )
}
