import { ASSETS } from "@/assets"
import { Button } from "@/components/ui/button"
import { RefreshCcw } from "lucide-react"
import { useFormContext } from "react-hook-form"
import { OnboardingFormValue } from "../types"
import { getTenantDomain } from "@/utils/domain.utils"

const SuccessMessage = () => {
  const refresh = () => window.location.reload()
  const form = useFormContext<OnboardingFormValue>()

  const values = form.getValues()

  return (
    <section className="flex flex-col items-center justify-center gap-4 md:gap-2 text-center">
      <img
        src={ASSETS.successIcon}
        width="150"
        height="150"
        alt="Success Icon"
        className="md:mb-4"
      />
      <h4 className="text-2xl font-semibold md:text-3xl">Summary!</h4>
      <p className="text-sm max-w-md md:text-base">
        You have successfully created a new institution:{" "}
        <span className="font-bold whitespace-nowrap">{values.name}</span>.
      </p>
      <div className="flex items-center gap-1 w-full justify-center">
        <img src={values.logo} className="w-8 h-8" alt="Institution logo" />
        <img
          src={values.textLogo}
          alt="Institution text logo"
          className="h-8 max-w-[100px]"
          height={32}
        />
      </div>
      <p>
        And also sent the invitation email to the email:{" "}
        <span className="font-bold">{values.adminEmail}</span>.
      </p>
      <p>
        Here is the link to their portal:{" "}
        <a
          href={getTenantDomain(values.subdomain)}
          className="text-blue-700 font-semibold underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          {getTenantDomain(values.subdomain)}
        </a>
      </p>
      <div className="flex items-center mt-6">
        <div className="relative after:pointer-events-none after:absolute after:inset-px after:rounded-[11px] after:shadow-highlight after:shadow-white/10 focus-within:after:shadow-[#77f6aa] after:transition">
          <Button onClick={refresh}>
            <RefreshCcw className="mr-2 h-4 w-4" /> Restart
          </Button>
        </div>
      </div>
    </section>
  )
}

export default SuccessMessage
