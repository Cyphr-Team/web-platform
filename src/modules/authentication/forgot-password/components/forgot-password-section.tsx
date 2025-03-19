import { ArrowLeft } from "lucide-react"
import { APP_PATH } from "@/constants"
import { Button } from "@/components/ui/button"
import { ForgotPasswordForm } from "./forgot-password-form"
import { Link } from "react-router-dom"

export function ForgotPasswordSection() {
  return (
    <div className="mx-auto h-auto rounded-[32px] bg-white p-8 shadow-primary md:w-[540px]">
      <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[360px]">
        <ForgotPasswordForm />

        <Button
          asChild
          className="self-center px-1 py-0 text-sm text-foreground"
          variant="link"
        >
          <Link to={APP_PATH.LOGIN}>
            <ArrowLeft className="mr-1 size-5" />
            Back to log in
          </Link>
        </Button>
      </div>
    </div>
  )
}
