import { AspectRatio } from "@/components/ui/aspect-ratio"
import { ArrowLeft, Mail } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { APP_PATH } from "@/constants"
import { Button } from "@/components/ui/button"
import { VerifyEmailForm } from "./verify-email-form"
import backgroundPatternDecorative from "@/assets/background-pattern-decorative.svg"

export function VerifyEmailSection() {
  const { email } = useParams()

  return (
    <div className="rounded-[32px] shadow-primary md:w-[540px] mx-auto h-auto p-8 bg-white">
      <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[360px]">
        <div className="flex flex-col text-center">
          <div className="flex justify-center relative">
            <img
              alt="Pattern decorative"
              className="max-w-[100vw] absolute w-[756px] h-[756px] -z-10 left-1/2 -translate-x-1/2 top-[28px] -translate-y-1/2 dark:opacity-15"
              height={756}
              src={backgroundPatternDecorative}
              width={756}
            />
            <div className="w-[56px] self-center">
              <AspectRatio ratio={1 / 1}>
                <div className="w-full h-full border flex justify-center items-center rounded-xl">
                  <Mail size={28} />
                </div>
              </AspectRatio>
            </div>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight mt-6">
            Check your email
          </h1>

          <div className="text-muted-foreground mt-3">
            <p>We sent a verification link to</p>
            <p className="font-medium">{email}</p>
          </div>
        </div>

        <VerifyEmailForm />

        <Button
          asChild
          className="px-1 text-sm text-foreground py-0 self-center"
          variant="link"
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
