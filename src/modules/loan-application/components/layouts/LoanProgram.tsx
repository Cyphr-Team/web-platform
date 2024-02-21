import { ASSETS } from "@/assets"
import { Separator } from "@/components/ui/separator"
import { LoanPrograms } from "../organisms/LoanPrograms"

const WelcomeLine = () => {
  return (
    <section>
      <h2 className="text-3xl md:text-4xl font-semibold mb-6">
        Welcome to AltCap
      </h2>
      <p className="text-lg">
        AltCap is an ally to underestimated entrepreneurs. We offer financing to
        businesses and communities that traditional lenders do not serve. Our
        flexible, patient capital meets the unique needs of each entrepreneur
        and local investment.
      </p>
    </section>
  )
}

export const Component = () => {
  return (
    <div className="overflow-auto flex flex-col items-center flex-1">
      <div>
        <section className="w-full">
          <img
            className="w-full max-h-[292px]"
            src={ASSETS.altCapLoanProgramLarge}
            alt="altcap loan program"
            height={292}
            srcSet={`${ASSETS.altCapLoanProgram} 600w, ${ASSETS.altCapLoanProgramLarge} 1200w`}
          />
        </section>

        <section className="p-6 md:px-0 md:w-4/5 xl:w-3/4 m-auto">
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
