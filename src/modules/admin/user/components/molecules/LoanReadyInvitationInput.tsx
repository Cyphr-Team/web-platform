import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DETAILS_PERMISSION_BY_ROLE } from "@/modules/admin/user/constants/permission.constants"
import { UserRoles } from "@/types/user.type"
import { checkValidEmail, removeWhitespace } from "@/utils"
import { type KeyboardEvent } from "react"
import { X } from "lucide-react"
import { useFieldArray, useFormContext } from "react-hook-form"
import { type LoanReadyInvitationFormValue } from "@/modules/admin/user/modules/loan-ready-v2/DrawerInviteUser"

const InvitationRoles = {
  [UserRoles.WORKSPACE_ADMIN]: "Admin",
  [UserRoles.REVIEWER]: "Reviewer",
  [UserRoles.VIEWER]: "Viewer"
}

// This component is for LoanReady Invitation feature (Non-CSV flow)
// Extended from src/modules/admin/user/components/molecules/InvitationInput.tsx
function InvitationInput() {
  const form = useFormContext<LoanReadyInvitationFormValue>()
  const { fields, append, remove } = useFieldArray({
    name: "emails"
  })

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const target = event.target as HTMLInputElement

    if (event.key !== "Enter") return

    // Email Validation: Check if the email is valid and not duplicated
    const newEmail = removeWhitespace(target.value)

    if (!newEmail || !checkValidEmail(newEmail)) return

    const currentEmails = form.getValues("emails") ?? []
    const emailExists = currentEmails.includes(newEmail)

    if (emailExists) return

    append(newEmail)
    target.value = ""
  }

  // This function is added to prevent auto-submitting the form when pressing Enter key
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
    }
  }

  return (
    <div className="h-[calc(90vh-230px)]">
      <div className="mt-6">
        <p className="font-semibold text-base">Choose a role</p>

        <p className="text-sm leading-5 my-2 font-normal">
          The role you choose will be applied to everyone added below.
        </p>

        <div className="mt-3 space-y-3">
          {Object.entries(InvitationRoles).map(([role, label]) => (
            <div key={role}>
              <label className="inline-flex items-center space-x-2 text-sm">
                <input
                  className="accent-[#4F6161]"
                  type="radio"
                  value={role}
                  {...form.register("role")}
                />
                <span className="font-semibold text-sm">{label}</span>
              </label>
              <p className="text-xs ml-5">
                {
                  DETAILS_PERMISSION_BY_ROLE[
                    role as keyof typeof InvitationRoles
                  ]
                }
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="font-semibold text-base">Invite team members</p>

        <Input
          className="border my-1 w-full rounded-sm"
          placeholder="Enter email"
          type="text"
          wrapperClassName="w-full"
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        />

        <p className="my-2 text-[10px] text-gray-500">
          Tip: Invite up to 10 people at once with shared profile setting.
        </p>

        <div className="">
          {fields?.map((item, index) => {
            return (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white m-1 md:max-w-full"
              >
                <div className="flex w-full items-center">
                  <Button
                    className="cursor-pointer p-0 text-center hover:bg-white disabled:cursor-not-allowed disabled:bg-white disabled:opacity-50"
                    name={`btn-delete-user-${index + 1}`}
                    type="button"
                    variant="ghost"
                    onClick={() => remove(index)}
                  >
                    <X size={15} />
                  </Button>
                  <div className="w-full">
                    <p className="pl-2 text-sm">
                      {form.watch(`emails.${index}`)}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default InvitationInput
