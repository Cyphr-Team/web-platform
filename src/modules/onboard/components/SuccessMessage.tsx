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
    <section className="flex flex-col items-center justify-center gap-4 text-center md:gap-2">
      <img
        alt="Success Icon"
        className="md:mb-4"
        height="150"
        src={ASSETS.successIcon}
        width="150"
      />
      <h4 className="text-2xl font-semibold md:text-3xl">Summary!</h4>
      <p className="max-w-md text-sm md:text-base">
        You have successfully created a new institution:{" "}
        <span className="whitespace-nowrap font-bold">{values.name}</span>.
      </p>
      <div className="flex w-full items-center justify-center gap-1">
        {values.logo ? (
          <img alt="Institution logo" className="size-8" src={values.logo} />
        ) : null}
        {values.textLogo ? (
          <img
            alt="Institution text logo"
            className="h-8 max-w-[100px]"
            height={32}
            src={values.textLogo}
          />
        ) : null}
      </div>
      <p>
        And also sent the invitation email to the email:{" "}
        <span className="font-bold">{values.adminEmail}</span>.
      </p>
      <p>
        Here is the link to their portal:{" "}
        <a
          className="font-semibold text-blue-700 underline"
          href={getTenantDomain(values.subdomain)}
          rel="noopener noreferrer"
          target="_blank"
        >
          {getTenantDomain(values.subdomain)}
        </a>
      </p>
      <p>
        If your institution is using MFA, please do the following steps:
        <ul className="list-disc pl-6">
          <li className="list-item text-left">
            Add <b>{getTenantRedirectURL(values.subdomain)}</b> to <br />
            <a
              className="font-semibold text-blue-700 underline"
              href={`https://stytch.com/dashboard/redirect-urls?env=${
                isProductionEnvironment() ? "live" : "test"
              }`}
              rel="noopener noreferrer"
              target="_blank"
            >
              Stytch Redirect URLs
            </a>
          </li>
          <li className="list-item text-left w-full">
            Add <b>{getTenantDomain(values.subdomain)}</b> to <br />
            <a
              className="font-semibold text-blue-700 underline"
              href={`https://stytch.com/dashboard/sdk-configuration?env=${
                isProductionEnvironment() ? "live" : "test"
              }`}
              rel="noopener noreferrer"
              target="_blank"
            >
              Stytch SDK Authorized applications
            </a>
          </li>
        </ul>
      </p>
      <div className="mt-6 flex items-center">
        <div className="after:shadow-highlight relative after:pointer-events-none after:absolute after:inset-px after:rounded-[11px] after:shadow-white/10 after:transition focus-within:after:shadow-[#77f6aa]">
          <Button onClick={refresh}>
            <RefreshCcw className="mr-2 size-4" /> Restart
          </Button>
        </div>
      </div>
    </section>
  )
}

export default SuccessMessage
