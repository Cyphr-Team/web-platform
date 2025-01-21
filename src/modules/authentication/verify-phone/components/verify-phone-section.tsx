import { VerifyPhoneForm } from "./verify-phone-form"
import { LogoHeader } from "@/shared/atoms/LogoHeader"
import { useLocation } from "react-router-dom"

export function VerifyPhoneSection() {
  const { state } = useLocation()

  return (
    <div className="mx-auto h-auto rounded-[32px] bg-white p-8 shadow-primary md:w-[540px]">
      <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[480px]">
        <div className="flex flex-col text-center">
          <div className="relative flex justify-center">
            <div className="self-center">
              <LogoHeader />
            </div>
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight">
            {state.member.mfaPhoneNumberVerified
              ? "Verify your account"
              : "Check your phone"}
          </h1>

          <div className="text-subtitle mt-3 text-sm">
            <p>
              We’ve sent a verification code to your phone number ending in{" "}
              <span className="font-medium">
                {state.member.mfaPhoneNumber?.slice(-4)}
              </span>
              .
            </p>
            <p>Enter the code to verify your account. </p>
          </div>
        </div>

        <VerifyPhoneForm />
      </div>
    </div>
  )
}
