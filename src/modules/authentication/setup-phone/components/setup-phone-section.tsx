import { SetupPhoneForm } from "./setup-phone-form"

export function SetupPhoneSection() {
  return (
    <div className="mx-auto h-auto rounded-[32px] bg-white p-8 shadow-primary md:w-[540px]">
      <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[360px]">
        <SetupPhoneForm />
      </div>
    </div>
  )
}
