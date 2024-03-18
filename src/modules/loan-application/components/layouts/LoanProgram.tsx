import { Separator } from "@/components/ui/separator"
import { useTenant } from "@/providers/tenant-provider"
import { LoanPrograms } from "../organisms/LoanPrograms"

const WelcomeLine = () => {
  const { tenantData } = useTenant()
  const { loanProgramWelcome, name } = tenantData

  return (
    <section>
      <h2 className="text-3xl md:text-4xl font-semibold mb-6">
        Welcome to {name}
      </h2>
      <p className="text-lg whitespace-pre-wrap">{loanProgramWelcome}</p>
    </section>
  )
}

export const Component = () => {
  const { tenantData } = useTenant()

  return (
    <div className="overflow-auto flex flex-col items-center flex-1">
      <div className="grid grid-cols-8">
        <section className="col-span-8">
          <img
            className="w-[1200px] mx-auto"
            src={tenantData.loanProgramOverviewHero}
            alt="loan program thumbnail"
            height={292}
            width={1200}
          />
        </section>

        <section className="p-6 md:px-0 col-span-6 col-start-2 mx-auto">
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
