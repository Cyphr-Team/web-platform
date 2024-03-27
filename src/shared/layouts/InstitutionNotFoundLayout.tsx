import { Button } from "@/components/ui/button"
import backgroundPatternDecorative from "@/assets/background-pattern-decorative.svg"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { BadgeAlert } from "lucide-react"

export function InstitutionNotFoundLayout() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mb-16 items-center justify-center text-center">
      <div className="flex justify-center relative">
        <img
          className="max-w-[100vw] absolute w-[756px] h-[756px] -z-10 left-1/2 -translate-x-1/2 top-[28px] -translate-y-1/2 dark:opacity-15"
          src={backgroundPatternDecorative}
          alt="Pattern decorative"
          width={756}
          height={756}
        />
        <div className="w-[64px] self-center">
          <AspectRatio ratio={1 / 1}>
            <div className="w-full h-full border flex justify-center items-center rounded-xl">
              <BadgeAlert className="w-8 h-8" />
            </div>
          </AspectRatio>
        </div>
      </div>

      <h2 className="mt-2 font-heading text-4xl font-semibold mx-auto max-w-[400px]">
        Uh oh, we can’t find that page...
      </h2>
      <p className="mt-6">
        Sorry, the page you are looking for doesn&apos;t exist or has been
        moved.
      </p>

      <div className="mt-6 flex flex-col items-center gap-2">
        <p>If you believe this is an error, please report it to below link</p>
        <Button className="text-base mt-2" asChild>
          <a href="mailto:support@tryforesight.link?subject=404%20Error%20Report&body=Hello%20Support%20Team,%0D%0A%0D%0AI%20encountered%20a%20404%20error%20while%20trying%20to%20access%20the%20following%20URL:%20[Please%20insert%20the%20URL%20of%20the%20page%20here].%20%0D%0A%0D%0AAdditional%20comments:%20[Please%20provide%20any%20additional%20details%20or%20comments%20here].%0D%0A%0D%0AThank%20you,%0D%0A[Your%20Name]">
            support@tryforesight.link
          </a>
        </Button>
      </div>
    </div>
  )
}
