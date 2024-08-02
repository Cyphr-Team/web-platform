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
import { useEffect, useRef, useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { PlusCircle, Send } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  adminSendBulkInvitationForm,
  useSendBulkInvitation
} from "../hooks/useSendInvitation"

import { BulkUploadCsv } from "./molecules/BulkUploadCsv"
import { InvitationInput } from "./molecules/InvitationInput"
import { APP_PATH } from "@/constants"
import { AccessList } from "./molecules/AccessList"

export function DialogSendBulkInvite() {
  const contentRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }, [])

  const onOpenChange = (open: boolean) => {
    if (!open) {
      form.reset()
    }
    setOpen(open)
  }

  const form = useForm<z.infer<typeof adminSendBulkInvitationForm>>({
    resolver: zodResolver(adminSendBulkInvitationForm),
    defaultValues: {
      invitations: []
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
      <DialogContent className="sm:max-w-[700px] max-h-full md:h-auto md:max-h-dvh overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex flex-row items-center">
            Invite members to LaunchKC
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <BulkUploadCsv />
        <Form {...form}>
          <form onSubmit={formSubmit} className="flex flex-col space-y-3">
            <InvitationInput />

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
