import { ASSETS } from "@/assets"
import { Button } from "@/components/ui/button"
import { RefreshCcw } from "lucide-react"
import { useFormContext } from "react-hook-form"
import { type OnboardingFormValue } from "../types"
import {
  getTenantDomain,
  getTenantRedirectURL,
  isProductionEnvironment
} from "@/utils/domain.utils"

function SuccessMessage() {
  const refresh = () => window.location.reload()
  const form = useFormContext<OnboardingFormValue>()

  const values = form.getValues()

  return (
    <section className="flex flex-col items-center justify-center gap-4 md:gap-2 text-center">
      <img
        alt="Success Icon"
        className="md:mb-4"
        height="150"
        src={ASSETS.successIcon}
        width="150"
      />
      <h4 className="text-2xl font-semibold md:text-3xl">Summary!</h4>
      <p className="text-sm max-w-md md:text-base">
        You have successfully created a new institution:{" "}
        <span className="font-bold whitespace-nowrap">{values.name}</span>.
      </p>
      <div className="flex items-center gap-1 w-full justify-center">
        <img alt="Institution logo" className="w-8 h-8" src={values.logo} />
        <img
          alt="Institution text logo"
          className="h-8 max-w-[100px]"
          height={32}
          src={values.textLogo}
        />
      </div>
      <p>
        And also sent the invitation email to the email:{" "}
        <span className="font-bold">{values.adminEmail}</span>.
      </p>
      <p>
        Here is the link to their portal:{" "}
        <a
          className="text-blue-700 font-semibold underline"
          href={getTenantDomain(values.subdomain)}
          rel="noopener noreferrer"
          target="_blank"
        >
          {getTenantDomain(values.subdomain)}
        </a>
      </p>
      <p>
        To enable MFA for OAuth for the institution, please add this URL:{" "}
        <b>{getTenantRedirectURL(values.subdomain)}</b> to <br />
        <a
          className="text-blue-700 font-semibold underline"
          href={`https://stytch.com/dashboard/redirect-urls?env=${
            isProductionEnvironment() ? "live" : "test"
          }`}
          rel="noopener noreferrer"
          target="_blank"
        >
          Cyphr's Stytch Dashboard
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
