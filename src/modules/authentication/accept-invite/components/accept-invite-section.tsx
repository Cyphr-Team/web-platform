import { APP_PATH } from "@/constants"
import { Button } from "@/components/ui/button"
import { SetupProfileForm } from "./accept-invite-form"

import { Link } from "react-router-dom"

export function AcceptInviteSection() {
  return (
    <div className="mx-auto h-auto rounded-[32px] bg-white p-8 shadow-primary md:w-[540px]">
      <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[360px]">
        <div className="flex flex-col items-center">
          <h1 className="mt-6 text-3xl font-semibold tracking-tight">
            Sign up
          </h1>

          <div className="mt-3 text-muted-foreground">
            <p>Finish setup your account</p>
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
