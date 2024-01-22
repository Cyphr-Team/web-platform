import { SetupPasswordForm } from "./setup-password-form"

export function SetupPasswordSection() {
  return (
    <div className="p-4 lg:p-8 flex items-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[360px]">
        <SetupPasswordForm />
      </div>
    </div>
  )
}
