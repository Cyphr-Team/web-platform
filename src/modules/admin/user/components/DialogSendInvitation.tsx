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
import { useState } from "react"

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
import type * as z from "zod"
import {
  adminSendInvitationForm,
  useSendInvitation
} from "../hooks/useSendInvitation"

import { useGetUserInformation } from "@/hooks/useGetUserInformation"
import { type Option } from "@/types/common.type"
import { checkIsForesightAdmin } from "@/utils/check-roles"
import { getSubdomain, getTenantDomain } from "@/utils/domain.utils"
import { APP_PATH } from "@/constants"
import { EXPIRATION_DAYS } from "@/modules/admin/user/constants/expiration-days.constants.ts"
import { ExpirationDays } from "@/types/expiration-day.type.ts"
import { useQueryGetListAllInstitution } from "../hooks/useQuery/useQueryGetListAllInstitution"
import { inviteRoleOptions } from "@/modules/admin/user/constants/roles.constants.ts"

export function DialogSendInvite() {
  const [open, setOpen] = useState(false)
  const { data } = useGetUserInformation()
  const isForesightAdmin = checkIsForesightAdmin()

  const listInstitution = useQueryGetListAllInstitution({
    enabled: isForesightAdmin
  })

  const institutionOptions: Option[] =
    listInstitution.data?.map((institution) => ({
      value: institution.id,
      label: institution.name
    })) ?? []

  const onOpenChange = (open: boolean) => {
    if (!open) {
      form.reset()
    }
    setOpen(open)
  }

  const form = useForm<z.infer<typeof adminSendInvitationForm>>({
    resolver: zodResolver(adminSendInvitationForm),
    values: {
      email: "",
      roles: "",
      institutionId: isForesightAdmin ? "" : data?.institutionId ?? "",
      expirationDays: ExpirationDays.THIRTY_DAYS
    }
  })

  const { mutate, isPending } = useSendInvitation()

  const getBaseUrl = (institutionId: string) => {
    const subdomain =
      listInstitution.data?.find(
        (institution) => institution.id === institutionId
      )?.subdomain ?? getSubdomain()

    return `${getTenantDomain(subdomain)}${APP_PATH.ACCEPT_INVITE}`
  }

  const formSubmit = form.handleSubmit((data) => {
    // Foresight admin should send the invitation with the callback URL equals the tenant domain
    const baseUrl = isForesightAdmin
      ? getBaseUrl(data.institutionId)
      : `${window.location.origin}${APP_PATH.ACCEPT_INVITE}`

    mutate(
      { ...data, baseUrl },
      {
        onSuccess() {
          onOpenChange(false)
        }
      }
    )
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button type="button">
          <PlusCircle className="text-sm mr-1.5" size={16} />
          Invite
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite user</DialogTitle>
          <DialogDescription>Sends email invitations</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="flex flex-col space-y-3" onSubmit={formSubmit}>
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
                      placeholder="i.e: user@gmail.com"
                      wrapperClassName="col-span-3 w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      {inviteRoleOptions().map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
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
              name="expirationDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expired in</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="30 Days" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {EXPIRATION_DAYS.map((day) => (
                        <SelectItem key={day.value} value={day.value}>
                          {day.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isForesightAdmin ? (
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
                        {institutionOptions.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}

            <DialogFooter>
              <ButtonLoading isLoading={isPending} type="submit">
                Send {!isPending && <Send className="ml-1.5" size="16" />}
              </ButtonLoading>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
