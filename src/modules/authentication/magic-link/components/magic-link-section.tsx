import { AspectRatio } from "@/components/ui/aspect-ratio"
import { ArrowLeft, Mail } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { APP_PATH } from "@/constants"
import { Button } from "@/components/ui/button"

export function MagicLinkSection() {
  const location = useLocation()

  return (
    <div className="mx-auto h-auto rounded-[32px] bg-white p-8 shadow-primary md:w-[540px]">
      <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[360px]">
        <div className="flex flex-col text-center">
          <div className="relative flex justify-center">
            <div className="w-[56px] self-center">
              <AspectRatio ratio={1 / 1}>
                <div className="flex size-full items-center justify-center rounded-xl border">
                  <Mail size={28} />
                </div>
              </AspectRatio>
            </div>
          </div>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight">
            Check your email
          </h1>

          <div className="mt-3 text-muted-foreground">
            <p>We sent a verification link to</p>
            <p className="font-medium">{location.state.email}</p>
          </div>
        </div>

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
