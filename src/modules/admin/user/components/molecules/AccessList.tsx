import { DeleteUserButton } from "./DeleteUserButton"
import { nameByRole } from "../../constants/roles.constants"
import { type UserRoles } from "@/types/user.type"
import { useFormContext } from "react-hook-form"

interface InvitationInfo {
  email: string
  role: UserRoles
}

export function AccessList() {
  const form = useFormContext()

  const removeUser = (email: string) => {
    const updatedInvitations = form
      .getValues("invitations")
      .filter((item: InvitationInfo) => item.email !== email)

    form.setValue("invitations", updatedInvitations)
    form.trigger("invitations")
  }

  return (
    <div className="mt-1">
      <div>
        <div className="mt-2 flex w-full justify-between">
          <p className="font-medium">People with access</p>
          <p className="invisible mr-5 font-medium md:visible">Role</p>
        </div>
        <hr className="mt-2" />
      </div>
      <div className="mt-2 max-h-80 overflow-y-auto bg-white pr-2">
        {form
          .watch("invitations")
          .map((record: InvitationInfo, index: number) => {
            return (
              <div
                key={record.email} // Already handled the duplication of email in InvitationInput.tsx
                className="flex items-center justify-between bg-white p-2 pl-0 md:max-w-full"
              >
                <div className="flex w-full items-center md:w-2/3">
                  <DeleteUserButton
                    index={index}
                    userEmail={record.email}
                    onRemove={() => removeUser(record.email)}
                  />
                  <div className="w-full">
                    <p className="pl-2 text-sm">{record.email}</p>
                  </div>
                </div>
                <div className="visible text-right md:w-1/3">
                  <span className="text-sm font-normal">
                    {nameByRole(record.role)}
                  </span>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
