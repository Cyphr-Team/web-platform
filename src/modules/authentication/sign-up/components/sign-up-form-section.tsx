import { Button } from "@/components/ui/button"
import { APP_PATH } from "@/constants"
import { LogoHeader } from "@/shared/atoms/LogoHeader"
import { Link } from "react-router-dom"
import { SignUpForm } from "./sign-up-form"
import { isCapitalCollab, isSbb } from "@/utils/domain.utils"
import { CapitalCollabSignUpForm } from "@/modules/loan-application/capital-collab/components/organisms/CapitalCollabSignUpForm"

export function SignUpFormSection() {
  return (
    <div className="mx-auto h-auto rounded-[32px] bg-white p-8 shadow-primary md:w-[540px]">
      <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[360px]">
        <div className="flex flex-col text-center">
          <div className="self-center">
            <LogoHeader />
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight">
            Create an account
          </h1>

          <p className="mt-3 text-sm font-normal text-muted-foreground">
            {isSbb()
              ? "Accelerate your access to business banking"
              : "Accelerate your access to financing"}
          </p>
        </div>

        {isCapitalCollab() ? <CapitalCollabSignUpForm /> : <SignUpForm />}

        <p className="px-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button asChild className="h-auto p-0 text-primary" variant="link">
            <Link to={APP_PATH.LOGIN}>Log in</Link>
          </Button>
        </p>
      </div>
    </div>
  )
}
