import { Button, ButtonLoading } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { SelectInstitution } from "./components/SelectInstitution"
import SuccessMessage from "./components/SuccessMessage"
import { UpdateInstitutionMetadata } from "./components/UpdateInstitutionMetadata"
import { useMultipleStepForm } from "@/hooks/useMultipleStepForm.ts"
import { onboardingForm, type OnboardingFormValue } from "./types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { useOnboardingInstitution } from "./hooks/useOnboardingInstitution"

export function Component() {
  const {
    previousStep,
    nextStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    showSuccessMsg
  } = useMultipleStepForm(2)

  const { mutate, isPending } = useOnboardingInstitution()

  const form = useForm<OnboardingFormValue>({
    resolver: zodResolver(onboardingForm),
    values: {
      adminEmail: "",
      name: "",
      subdomain: "",
      key: "",
      logo: "",
      textLogo: "",
      supportEmail: "",
      isMfaEnabled: false
    },
    mode: "onChange",
    reValidateMode: "onChange"
  })

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (currentStepIndex === 0) {
      const validStep1 = await form.trigger([
        "name",
        "subdomain",
        "key",
        "adminEmail",
        "isMfaEnabled"
      ])

      if (validStep1) nextStep()
    } else if (currentStepIndex === 1) {
      const validStep2 = await form.trigger([
        "logo",
        "textLogo",
        "supportEmail"
      ])

      if (validStep2) {
        form.handleSubmit((data) =>
          mutate(data, {
            onSuccess: () => {
              nextStep()
            }
          })
        )()
      }
    }
  }

  return (
    <div className="relative m-1 mx-auto flex max-w-4xl justify-between rounded-lg p-4">
      <main
        className={
          showSuccessMsg ? "w-full" : "mx-auto w-full md:mt-5 md:w-[65%]"
        }
      >
        <Form {...form}>
          {showSuccessMsg ? (
            <SuccessMessage />
          ) : (
            <form
              className="flex size-full flex-col justify-between"
              onSubmit={handleOnSubmit}
            >
              <div>
                {currentStepIndex === 0 && <SelectInstitution />}
                {currentStepIndex === 1 && (
                  <UpdateInstitutionMetadata
                    subdomain={form.watch("subdomain")}
                  />
                )}
              </div>

              <div className="mt-4 flex w-full items-center justify-between">
                <div className="">
                  <Button
                    className={isFirstStep ? "invisible" : "visible"}
                    disabled={isPending}
                    type="button"
                    variant="ghost"
                    onClick={previousStep}
                  >
                    Go Back
                  </Button>
                </div>
                <div className="flex items-center">
                  <ButtonLoading isLoading={isPending} type="submit">
                    {isLastStep ? "Confirm" : "Next Step"}
                  </ButtonLoading>
                </div>
              </div>
            </form>
          )}
        </Form>
      </main>
    </div>
  )
}

Component.displayName = "Onboard"
