import { AspectRatio } from "@/components/ui/aspect-ratio"
import { ArrowLeft, Mail } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { APP_PATH } from "@/constants"
import { Button } from "@/components/ui/button"

export function MagicLinkSection() {
  const location = useLocation()
  return (
    <div className="rounded-[32px] shadow-primary md:w-[540px] mx-auto h-auto p-8 bg-white">
      <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[360px]">
        <div className="flex flex-col text-center">
          <div className="flex justify-center relative">
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
            <p className="font-medium">{location.state.email}</p>
          </div>
        </div>

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
