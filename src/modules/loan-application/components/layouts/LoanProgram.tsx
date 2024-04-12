import { Separator } from "@/components/ui/separator"
import { useTenant } from "@/providers/tenant-provider"
import { LoanPrograms } from "../organisms/LoanPrograms"
import { Image } from "@/shared/atoms/Image"
import { getImageURL } from "@/utils/aws.utils"
import { sanitizeDOM } from "@/utils/file.utils"

const WelcomeLine = () => {
  const { tenantData } = useTenant()
  const { loanProgramWelcome, name } = tenantData ?? {}

  return (
    <section>
      <h2 className="text-3xl md:text-4xl font-semibold mb-6">
        Welcome to {name}!
      </h2>
      <p
        className="text-lg whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: sanitizeDOM(loanProgramWelcome) }}
      />
    </section>
  )
}

export const Component = () => {
  const { tenantData } = useTenant()

  return (
    <div className="overflow-auto flex flex-col items-center flex-1">
      <div className="grid grid-cols-8">
        <section className="col-span-8">
          <Image
            className="w-[1200px] mx-auto max-h-[292px] object-contain max-w-full border-b"
            placeholderClassName="w-[1200px] bg-slate-600 max-h-[216px] mx-auto max-w-full"
            src={getImageURL(tenantData?.loanProgramOverviewHeroImage)}
            alt="Cover Photo for Institution"
            height={292}
            width={1200}
          />
        </section>

        <section className="p-6 pt-8 md:px-0 col-span-6 col-start-2 mx-auto">
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
