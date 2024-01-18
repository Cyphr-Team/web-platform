import { AspectRatio } from "@/components/ui/aspect-ratio"
import { SignUpForm } from "./sign-up-form"
import foresightLogo from "/foresight.svg"
import { APP_PATH } from "@/constants"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export function SignUpFormSection() {
  return (
    <div className="p-4 lg:p-8 h-full flex items-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[360px]">
        <div className="flex flex-col text-center">
          <div className="w-[48px] self-center">
            <AspectRatio ratio={1 / 1}>
              <img
                src={foresightLogo}
                className="rounded-md object-cover"
                alt="Foresight logo"
                width="100%"
                height="100%"
              />
            </AspectRatio>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight mt-6">
            Create an account
          </h1>

          <p className="text-muted-foreground mt-3">
            Accelerate your access to financing
          </p>
        </div>

        <SignUpForm />

        <p className="px-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button variant="link" className="p-0 h-auto text-primary" asChild>
            <Link to={APP_PATH.LOGIN}>Log in</Link>
          </Button>
        </p>
      </div>
    </div>
  )
}
