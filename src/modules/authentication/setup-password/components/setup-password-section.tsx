import { SetupPasswordForm } from "./setup-password-form"

export function SetupPasswordSection() {
  return (
    <div className="rounded-[32px] shadow-lg md:w-[540px] mx-auto h-auto p-8 bg-white">
      <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[360px]">
        <SetupPasswordForm />
      </div>
    </div>
  )
}
