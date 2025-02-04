import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer"
import { Form } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusIcon, XIcon } from "lucide-react"
import { memo, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { DialogUploadCSV } from "../../components/DialogUploadCSV"
import useClickOutside from "../../hooks/useClickOutSide"
import COLORS from "@/styles/colors"
import {
  DETAILS_PERMISSION_BY_ROLE,
  ROLES
} from "../../constants/permission.constants"

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  role: z.enum(["admin", "reviewer", "viewer"])
})

const DrawerInviteUser = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange"
  })

  const handleConfirm = () => {
    //upcomming
    return
  }

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
            <Form {...form}>
              <form>
                <DrawerHeader className="p-2 flex justify-between items-center">
                  <DrawerTitle>Invite team members</DrawerTitle>

                  <DrawerClose onClick={() => setIsOpenDrawer(false)}>
                    <XIcon className="h-6 w-6" />
                  </DrawerClose>
                </DrawerHeader>

                <div className="p-2 overflow-y-auto">
                  <p className="text-sm">
                    Invite team members and assign roles to manage access.
                  </p>

                  <p className="mt-2 text-sm border py-4 px-3 border-separate border-dashed">
                    <strong>Tip:</strong> Inviting more than 10 people at once?{" "}
                    <DialogUploadCSV
                      onFileSelect={() => {
                        return
                      }}
                    />
                  </p>

                  <div className="mt-6">
                    <p className="font-medium text-sm">Choose a role</p>

                    <p className="text-sm leading-5 mt-2">
                      The role you choose will be applied to everyone added
                      below.
                    </p>

                    <div className="mt-2 space-y-2">
                      <label className="inline-flex items-center space-x-2 text-sm">
                        <input
                          className={`accent-[${COLORS.ADMIN_LOANREADY_INPUT_RADIO}]`}
                          type="radio"
                          {...form.register("role")}
                        />
                        <span className="font-medium text-sm">
                          {ROLES.ADMIN}
                        </span>
                      </label>

                      <p className="text-xs text-gray-500 ml-6">
                        {DETAILS_PERMISSION_BY_ROLE[ROLES.ADMIN]}
                      </p>

                      <label className="inline-flex items-center space-x-2 text-sm">
                        <input
                          className={`accent-[${COLORS.ADMIN_LOANREADY_INPUT_RADIO}]`}
                          type="radio"
                          {...form.register("role")}
                        />
                        <span className="font-medium text-sm">
                          {ROLES.REVIEWER}
                        </span>
                      </label>

                      <p className="text-xs text-gray-500 ml-6">
                        {DETAILS_PERMISSION_BY_ROLE[ROLES.REVIEWER]}
                      </p>

                      <label className="inline-flex items-center space-x-2 text-sm">
                        <input
                          className={`accent-[${COLORS.ADMIN_LOANREADY_INPUT_RADIO}]`}
                          type="radio"
                          {...form.register("role")}
                        />
                        <span className="font-medium text-sm">
                          {ROLES.VIEWER}
                        </span>
                      </label>

                      <p className="text-xs text-gray-500 ml-6">
                        {DETAILS_PERMISSION_BY_ROLE[ROLES.VIEWER]}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="font-medium text-sm">Invite team members</p>

                    <input
                      className="mt-2 w-full border rounded px-3 py-2 text-sm"
                      placeholder="firstlast@gmail.com"
                      type="email"
                      {...form.register("email")}
                    />

                    <p className="mt-1 text-xs text-gray-500">
                      Tip: Invite up to 10 people at once with shared profile
                      setting.
                    </p>
                  </div>
                </div>

                <DrawerFooter className="absolute right-0 bottom-0 flex flex-row justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpenDrawer(false)}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    onClick={form.handleSubmit(handleConfirm)}
                  >
                    Send invite
                  </Button>
                </DrawerFooter>
              </form>
            </Form>
          </div>
        </Drawer>
      </div>
    </>
  )
}

export default memo(DrawerInviteUser)
