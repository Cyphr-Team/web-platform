import { Button } from "@/components/ui/button"
import { APP_PATH } from "@/constants"
import { LogoHeader } from "@/shared/atoms/LogoHeader"
import { Link } from "react-router-dom"
import { SignUpForm } from "./sign-up-form"
import { isSbb } from "@/utils/domain.utils"

export function SignUpFormSection() {
  return (
    <div className="rounded-[32px] shadow-primary md:w-[540px] mx-auto h-auto p-8 bg-white">
      <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[360px]">
        <div className="flex flex-col text-center">
          <div className="self-center">
            <LogoHeader />
          </div>

          <h1 className="text-4xl font-semibold tracking-tight mt-6">
            Create an account
          </h1>

          <p className="text-muted-foreground mt-3 text-sm font-normal">
            {isSbb()
              ? "Accelerate your access to business banking"
              : "Accelerate your access to financing"}
          </p>
        </div>

        <SignUpForm />

        <p className="px-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button asChild className="p-0 h-auto text-primary" variant="link">
            <Link to={APP_PATH.LOGIN}>Log in</Link>
          </Button>
        </p>
      </div>
    </div>
  )
}
