import { APP_PATH } from "@/constants"
import { Button } from "@/components/ui/button"
import { SetupProfileForm } from "./accept-invite-form"

import { Link } from "react-router-dom"

export function AcceptInviteSection() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[360px]">
      <div className="flex flex-col">
        <h1 className="text-3xl font-semibold tracking-tight mt-6">Sign up</h1>

        <div className="text-muted-foreground mt-3">
          <p>Finish setup your account</p>
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
  )
}
