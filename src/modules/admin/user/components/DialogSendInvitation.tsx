import { useState } from "react"
import { Button, ButtonLoading } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusCircle, Send } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  adminSendInvitationForm,
  useSendInvitation
} from "../hooks/useSendInvitation"
import { DEMO_INSTITUTION_ID } from "@/utils/request-header"
import { USER_ROLES } from "@/common"

export function DialogSendInvite() {
  const [open, setOpen] = useState(false)

  const onOpenChange = (open: boolean) => {
    if (!open) {
      form.reset()
    }
    setOpen(open)
  }

  const form = useForm<z.infer<typeof adminSendInvitationForm>>({
    resolver: zodResolver(adminSendInvitationForm),
    defaultValues: {
      email: "",
      roles: "",
      institutionId: ""
    }
  })

  const { mutate, isPending } = useSendInvitation()

  const formSubmit = form.handleSubmit((data) =>
    mutate(data, {
      onSuccess() {
        onOpenChange(false)
      }
    })
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button type="button">
          <PlusCircle size={16} className="text-sm mr-1.5" />
          Invite
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite user</DialogTitle>
          <DialogDescription>Sends email invitations</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={formSubmit} className="flex flex-col space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="">
                    <FormLabel>Email</FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      placeholder="user@gmail.com"
                      wrapperClassName="col-span-3 w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* TODO: Support multiple select */}
            <FormField
              control={form.control}
              name="roles"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(USER_ROLES).map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="institutionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an institution" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="00000000-0000-0000-0000-000000000000">
                        Foresight
                      </SelectItem>
                      {DEMO_INSTITUTION_ID !==
                        "00000000-0000-0000-0000-000000000000" && (
                        <SelectItem value={DEMO_INSTITUTION_ID}>
                          CapSight
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <ButtonLoading type="submit" isLoading={isPending}>
                Send {!isPending && <Send className="ml-1.5" size="16" />}
              </ButtonLoading>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
