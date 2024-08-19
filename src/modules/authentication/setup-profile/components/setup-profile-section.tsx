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
          variant="ghost"
          size="icon"
          className="absolute p-0 text-muted-foreground right-4 h-auto w-auto"
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
    <div className="rounded-[32px] shadow-primary md:w-[540px] mx-auto h-auto p-8 bg-white">
      <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[360px]">
        <div className="flex flex-col items-center">
          <div className="flex justify-center relative sm:-mx-8 mx-0">
            {conditionAlert}
          </div>

          <h1 className="text-3xl font-semibold tracking-tight mt-6">
            Sign up
          </h1>

          <div className="text-muted-foreground mt-3">
            <p>Start your loan application right away</p>
          </div>
        </div>

        <SetupProfileForm />

        <p className="px-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button variant="link" className="p-0 text-primary" asChild>
            <Link to={APP_PATH.LOGIN}>Log in</Link>
          </Button>
        </p>
      </div>
    </div>
  )
}
