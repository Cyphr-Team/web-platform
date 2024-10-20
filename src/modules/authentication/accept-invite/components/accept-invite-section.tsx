import { APP_PATH } from "@/constants"
import { Button } from "@/components/ui/button"
import { SetupProfileForm } from "./accept-invite-form"

import { Link } from "react-router-dom"

export function AcceptInviteSection() {
  return (
    <div className="rounded-[32px] shadow-primary md:w-[540px] mx-auto h-auto p-8 bg-white">
      <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[360px]">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-semibold tracking-tight mt-6">
            Sign up
          </h1>

          <div className="text-muted-foreground mt-3">
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
