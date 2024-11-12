import { APP_PATH } from "@/constants"
import { Button } from "@/components/ui/button"
import { SetupProfileForm } from "./setup-profile-form"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Icons } from "@/components/ui/icons"
import { X } from "lucide-react"
import { useAlert } from "../hooks/useAlert"
import { Link } from "react-router-dom"

export function SetupProfileSection() {
  const { isVisible, hide } = useAlert()

  const conditionAlert = isVisible ? (
    <Alert className="shadow-lg">
      <Icons.alertSuccess className="-ml-2 -mt-2" />
      <AlertTitle className="ml-2 text-sm">
        <Button
          className="absolute right-4 size-auto p-0 text-muted-foreground"
          size="icon"
          variant="ghost"
          onClick={hide}
        >
          <X size={20} />
        </Button>
        Successfully verified email
      </AlertTitle>
      <AlertDescription className="ml-2 text-muted-foreground">
        Complete your account sign up below
      </AlertDescription>
    </Alert>
  ) : null

  return (
    <div className="mx-auto h-auto rounded-[32px] bg-white p-8 shadow-primary md:w-[540px]">
      <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[360px]">
        <div className="flex flex-col items-center">
          <div className="relative mx-0 flex justify-center sm:-mx-8">
            {conditionAlert}
          </div>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight">
            Sign up
          </h1>

          <div className="mt-3 text-muted-foreground">
            <p>Start your loan application right away</p>
          </div>
        </div>

        <SetupProfileForm />

        <p className="px-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button asChild className="p-0 text-primary" variant="link">
            <Link to={APP_PATH.LOGIN}>Log in</Link>
          </Button>
        </p>
      </div>
    </div>
  )
}
