import { Button } from "@/components/ui/button"
import { APP_PATH } from "@/constants"
import { LogoHeader } from "@/shared/atoms/LogoHeader"
import { Link } from "react-router-dom"
import { LoginForm } from "./login-form"

export function LoginFormSection() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[360px]">
      <div className="flex flex-col text-center">
        <div className="self-center">
          <LogoHeader />
        </div>

        <h1 className="text-4xl font-semibold tracking-tight mt-6">Log in</h1>
      </div>

      <LoginForm />

      <p className="px-8 text-center text-sm text-muted-foreground">
        Don’t have an account?{" "}
        <Button variant="link" className="p-0 text-primary" asChild>
          <Link to={APP_PATH.SIGN_UP}>Sign up</Link>
        </Button>
      </p>
    </div>
  )
}
