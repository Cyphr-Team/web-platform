import { Button, ButtonLoading } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusIcon, XIcon } from "lucide-react"
import { memo, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { DialogUploadCSV } from "../../components/DialogUploadCSV"
import useClickOutside from "../../hooks/useClickOutSide"
import { useSendBulkInvitation } from "@/modules/admin/user/hooks/useSendInvitation"
import { APP_PATH } from "@/constants"
import { type UserRoles } from "@/types/user.type"
import InvitationInput from "@/modules/admin/user/components/molecules/LoanReadyInvitationInput"
import { RHFProvider } from "@/modules/form-template/providers"

export const loanReadyInvitationFormSchema = z.object({
  emails: z
    .array(z.string().email("Please enter a valid email address."))
    .nonempty("Email is required."),
  role: z
    .string()
    .min(1, "Role is required.")
    .transform((role) => role.toLocaleLowerCase())
})

export type LoanReadyInvitationFormValue = z.infer<
  typeof loanReadyInvitationFormSchema
>

interface InvitationInfo {
  email: string
  role: UserRoles
}

type InvitationNonEmptyList = [InvitationInfo, ...InvitationInfo[]]

const DrawerInviteUser = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  const form = useForm<LoanReadyInvitationFormValue>({
    resolver: zodResolver(loanReadyInvitationFormSchema),
    mode: "onChange"
  })

  const { mutate: mutateSendInputList, isPending: isPendingInputList } =
    useSendBulkInvitation()

  const formSubmit = form.handleSubmit((data) => {
    const baseUrl = `${window.location.origin}${APP_PATH.ACCEPT_INVITE}`
    const expirationDays = "SEVEN_DAYS"

    if (!data.emails.length) return

    const invitations = data.emails.map((email) => ({
      role: data.role,
      email
    })) as InvitationNonEmptyList

    mutateSendInputList({ invitations, baseUrl, expirationDays })
  })

  useClickOutside(drawerRef, () => {
    setIsOpenDrawer(false)
  })

  return (
    <>
      <Button
        className="hover:bg-[#a1d80b] ml-4"
        variant="success"
        onClick={() => setIsOpenDrawer(true)}
      >
        <PlusIcon className="mr-1" size={20} /> Invite people
      </Button>

      <div ref={drawerRef}>
        <Drawer open={isOpenDrawer} onOpenChange={setIsOpenDrawer}>
          <div
            className={cn(
              "fixed inset-y-0 right-0 z-50 flex w-[402px] flex-col border-l bg-background p-3xl",
              isOpenDrawer ? "translate-x-0" : "translate-x-full",
              "transition-transform duration-300 ease-in-out"
            )}
          >
            <RHFProvider methods={form} onSubmit={formSubmit}>
              <DrawerHeader className="p-2 flex justify-between items-center">
                <DrawerTitle>Invite team members</DrawerTitle>

                <DrawerClose onClick={() => setIsOpenDrawer(false)}>
                  <XIcon className="h-6 w-6" />
                </DrawerClose>
              </DrawerHeader>

              <div className="p-2 overflow-y-auto">
                <p className="py-2 text-sm">
                  Invite team members and assign roles to manage access.
                </p>

                <p className="mt-2 text-sm border py-4 px-3 border-separate border-dashed rounded-xl">
                  <strong>Tip:</strong>{" "}
                  <span className="text-[#475467]">
                    Inviting more than 10 people at once?
                  </span>
                  <DialogUploadCSV
                    onFileSelect={() => {
                      return
                    }}
                  />
                </p>

                <InvitationInput />
              </div>

              <DrawerFooter className="absolute right-4 bottom-0 flex flex-row justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpenDrawer(false)}
                >
                  Cancel
                </Button>

                <ButtonLoading
                  disabled={!form.formState.isValid}
                  isLoading={isPendingInputList}
                  type="submit"
                >
                  Send invite
                </ButtonLoading>
              </DrawerFooter>
            </RHFProvider>
          </div>
        </Drawer>
      </div>
    </>
  )
}

export default memo(DrawerInviteUser)
