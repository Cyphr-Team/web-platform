import { UI_DATA_SETUP_PHONE_HEADER } from "../constants"
import { LogoHeader } from "@/shared/atoms/LogoHeader"
import { isCapitalCollab } from "@/utils/domain.utils.ts"

export function SetupPhoneFormHeader() {
  return (
    <div className="flex flex-col text-center">
      <div className="relative flex justify-center">
        <div className="w-auto self-center">
          <div className="self-center">
            <LogoHeader isShowLogo={!isCapitalCollab()} />
          </div>
        </div>
      </div>

      <h1 className="mt-6 text-[34px] font-semibold tracking-tight">
        {UI_DATA_SETUP_PHONE_HEADER.enterPhone.title}
      </h1>

      <div className="text-subtitle mt-3 text-sm">
        <p>
          {UI_DATA_SETUP_PHONE_HEADER.enterPhone.description}{" "}
          <a
            className="font-medium text-black underline"
            href="https://www.cyphrai.com/privacy"
            rel="noopener noreferrer"
            target="privacy"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}
