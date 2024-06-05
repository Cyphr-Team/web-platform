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
import { PlusCircle } from "lucide-react"

import { Option } from "@/types/common.type"
import { checkIsForesightAdmin } from "@/utils/check-roles"
import { useQueryGetListAllInstitution } from "@/modules/admin/user/hooks/useQuery/useQueryGetListAllInstitution"
import { useForm } from "react-hook-form"

export function DialogAddWhitelistedUser() {
  const [open, setOpen] = useState(false)

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
    setOpen(open)
  }

  const form = useForm({
    values: {
      institutionId: "",
      email: ""
    }
  })

  const formSubmit = form.handleSubmit((data) => {
    // Foresight admin should send the invitation with the callback URL equals the tenant domain
    console.log(data)
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button type="button">
          <PlusCircle size={16} className="text-sm mr-1.5" />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add user to whitelist</DialogTitle>
          <DialogDescription>Add user to whitelist</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={formSubmit} className="flex flex-col space-y-3">
            <FormField
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

            <FormField
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

            <DialogFooter>
              <ButtonLoading type="submit" isLoading={false}>
                Add
              </ButtonLoading>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
