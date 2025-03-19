import { Button } from "@/components/ui/button"
import backgroundPatternDecorative from "@/assets/background-pattern-decorative.svg"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { BadgeAlert } from "lucide-react"

export function InstitutionNotFoundLayout() {
  return (
    <div className="absolute left-1/2 top-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
      <div className="relative flex justify-center">
        <img
          alt="Pattern decorative"
          className="absolute left-1/2 top-[28px] -z-10 size-[756px] max-w-[100vw] -translate-x-1/2 -translate-y-1/2 dark:opacity-15"
          height={756}
          src={backgroundPatternDecorative}
          width={756}
        />
        <div className="w-[64px] self-center">
          <AspectRatio ratio={1 / 1}>
            <div className="flex size-full items-center justify-center rounded-xl border">
              <BadgeAlert className="size-8" />
            </div>
          </AspectRatio>
        </div>
      </div>

      <h2 className="font-heading mx-auto mt-2 max-w-[400px] text-4xl font-semibold">
        Uh oh, we can’t find that page...
      </h2>
      <p className="mt-6">
        Sorry, the page you are looking for doesn&apos;t exist or has been
        moved.
      </p>

      <div className="mt-6 flex flex-col items-center gap-2">
        <p>If you believe this is an error, please report it to below link</p>
        <Button asChild className="mt-2 text-base">
          <a href="mailto:info@cyphrai.com?subject=404%20Error%20Report&body=Hello%20Support%20Team,%0D%0A%0D%0AI%20encountered%20a%20404%20error%20while%20trying%20to%20access%20the%20following%20URL:%20[Please%20insert%20the%20URL%20of%20the%20page%20here].%20%0D%0A%0D%0AAdditional%20comments:%20[Please%20provide%20any%20additional%20details%20or%20comments%20here].%0D%0A%0D%0AThank%20you,%0D%0A[Your%20Name]">
            info@cyphrai.com
          </a>
        </Button>
      </div>
    </div>
  )
}
