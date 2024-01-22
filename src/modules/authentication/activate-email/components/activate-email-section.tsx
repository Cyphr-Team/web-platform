import { ArrowLeft } from "lucide-react"
import { APP_PATH } from "@/constants"
import { Button } from "@/components/ui/button"
import { ActivateEmailForm } from "./activate-email-form"
import { Link } from "react-router-dom"

export function ActivateEmailSection() {
  return (
    <div className="p-4 lg:p-8 flex items-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[360px]">
        <ActivateEmailForm />

        <Button
          variant="link"
          className="px-1 text-sm text-foreground py-0 self-center"
          asChild
        >
          <Link to={APP_PATH.LOGIN}>
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back to log in
          </Link>
        </Button>
      </div>
    </div>
  )
}
