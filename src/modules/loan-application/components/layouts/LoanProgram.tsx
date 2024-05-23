import { Separator } from "@/components/ui/separator"
import { useTenant } from "@/providers/tenant-provider"
import { LoanPrograms } from "../organisms/LoanPrograms"
import { Image } from "@/shared/atoms/Image"
import { getImageURL } from "@/utils/aws.utils"
import { sanitizeDOM } from "@/utils/file.utils"
import { cn } from "@/lib/utils"

const WelcomeLine = () => {
  const { tenantData } = useTenant()
  const { loanProgramWelcome, name } = tenantData ?? {}

  return (
    <section>
      <h2 className="text-3xl md:text-4xl font-semibold mb-6">
        Welcome to {name}!
      </h2>
      <p
        className="text-lg whitespace-pre-wrap text-justify"
        dangerouslySetInnerHTML={{ __html: sanitizeDOM(loanProgramWelcome) }}
      />
    </section>
  )
}

export const Component = () => {
  const { tenantData } = useTenant()

  return (
    <div className="overflow-auto flex flex-col flex-1">
      <div className={cn("grid grid-cols-10", "md:grid-cols-8")}>
        <section className={cn("col-span-10", "md:col-span-8")}>
          <Image
            className="mx-auto max-h-72 object-cover w-full max-w-full border-b h-72"
            placeholderClassName="bg-slate-600 max-h-72 mx-auto max-w-full"
            src={getImageURL(tenantData?.loanProgramOverviewHeroImage)}
            alt="Cover Photo for Institution"
            height={292}
          />
        </section>

        <section
          className={cn(
            "pt-8 p-6 col-span-10",
            "md:px-0 md:col-span-6 md:col-start-2"
          )}
        >
          <div>
            <WelcomeLine />
          </div>

          <Separator className="my-6" />

          <div>
            <LoanPrograms />
          </div>
        </section>
      </div>
    </div>
  )
}

Component.displayName = "LoanProgram"
