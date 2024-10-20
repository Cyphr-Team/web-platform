import { UI_DATA_SETUP_PHONE_HEADER } from "../constants"
import { LogoHeader } from "@/shared/atoms/LogoHeader"

export function SetupPhoneFormHeader() {
  return (
    <div className="flex flex-col text-center">
      <div className="flex justify-center relative">
        <div className="w-auto self-center">
          <div className="self-center">
            <LogoHeader />
          </div>
        </div>
      </div>

      <h1 className="text-[34px] font-semibold tracking-tight mt-6">
        {UI_DATA_SETUP_PHONE_HEADER.enterPhone.title}
      </h1>

      <div className="text-subtitle mt-3 text-sm">
        <p>
          {UI_DATA_SETUP_PHONE_HEADER.enterPhone.description}{" "}
          <a
            className="text-black underline font-medium"
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
