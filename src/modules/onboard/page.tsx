import { Button, ButtonLoading } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { SelectInstitution } from "./components/SelectInstitution"
import SuccessMessage from "./components/SuccessMessage"
import { UpdateInstitutionMetadata } from "./components/UpdateInstitutionMetadata"
import { useMultipleStepForm } from "@/hooks/useMultipleStepForm.ts"
import { OnboardingFormValue, onboardingForm } from "./types"
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
      logo: "",
      textLogo: "",
      supportEmail: ""
    },
    mode: "onChange",
    reValidateMode: "onChange"
  })

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (currentStepIndex === 0) {
      const validStep1 = await form.trigger(["name", "subdomain", "adminEmail"])
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
    <div
      className={`flex justify-between max-w-4xl relative m-1 rounded-lg p-4 mx-auto`}
    >
      <main
        className={`${
          showSuccessMsg ? "w-full" : "w-full md:mt-5 md:w-[65%] mx-auto"
        }`}
      >
        <Form {...form}>
          {showSuccessMsg ? (
            <SuccessMessage />
          ) : (
            <form
              onSubmit={handleOnSubmit}
              className="w-full flex flex-col justify-between h-full"
            >
              <div>
                {currentStepIndex === 0 && <SelectInstitution />}
                {currentStepIndex === 1 && (
                  <UpdateInstitutionMetadata
                    subdomain={form.watch("subdomain")}
                  />
                )}
              </div>

              <div className="w-full items-center flex justify-between mt-4">
                <div className="">
                  <Button
                    onClick={previousStep}
                    type="button"
                    variant="ghost"
                    className={`${isFirstStep ? "invisible" : "visible"}`}
                    disabled={isPending}
                  >
                    Go Back
                  </Button>
                </div>
                <div className="flex items-center">
                  <ButtonLoading type="submit" isLoading={isPending}>
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
