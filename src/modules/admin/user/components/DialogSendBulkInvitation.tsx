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
import { Form } from "@/components/ui/form"
import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { PlusCircle, Send } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  adminSendBulkInvitationForm,
  useSendBulkInvitation
} from "../hooks/useSendInvitation"

import { BulkUploadCsv } from "./molecules/BulkUploadCsv"
import { MultiTagInput } from "./molecules/MultiTagInput"
import { APP_PATH } from "@/constants"
import { AccessList } from "./molecules/AccessList"

export function DialogSendBulkInvite() {
  const [open, setOpen] = useState(false)
  const onOpenChange = (open: boolean) => {
    if (!open) {
      form.reset()
    }
    setOpen(open)
  }

  const form = useForm<z.infer<typeof adminSendBulkInvitationForm>>({
    resolver: zodResolver(adminSendBulkInvitationForm),
    values: {
      emails: [""],
      role: ""
    }
  })

  const { mutate: mutateSendInputList, isPending: isPendingInputList } =
    useSendBulkInvitation()

  const formSubmit = form.handleSubmit((data) => {
    const baseUrl = `${window.location.origin}${APP_PATH.ACCEPT_INVITE}`
    const expirationDays = "SEVEN_DAYS"
    mutateSendInputList(
      { ...data, baseUrl, expirationDays },
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
          <PlusCircle size={16} className="text-sm mr-1.5" />
          Invite
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] h-full md:h-auto md:max-h-[900px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Invite members to LaunchKC</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <BulkUploadCsv />
        <Form {...form}>
          <form onSubmit={formSubmit} className="flex flex-col space-y-3">
            <MultiTagInput />

            <AccessList />

            <DialogFooter className="flex w-full">
              <Button
                variant="outline"
                type="button"
                className="w-full mb-2"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <ButtonLoading
                type="submit"
                className="w-full mb-2"
                isLoading={isPendingInputList}
                disabled={!form.formState.isValid}
              >
                Send {<Send className="ml-1.5" size="16" />}
              </ButtonLoading>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
