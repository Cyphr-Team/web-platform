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
        <div className="flex justify-between w-full mt-2">
          <p className="font-medium">People with access</p>
          <p className="font-medium mr-5 invisible md:visible">Role</p>
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
                <div className="flex items-center w-full md:w-2/3">
                  <DeleteUserButton
                    index={index}
                    userEmail={record.email}
                    onRemove={() => removeUser(record.email)}
                  />
                  <div className="w-full">
                    <p className="text-sm pl-2">{record.email}</p>
                  </div>
                </div>
                <div className="md:w-1/3 text-right visible">
                  <span className="font-normal text-sm">
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
