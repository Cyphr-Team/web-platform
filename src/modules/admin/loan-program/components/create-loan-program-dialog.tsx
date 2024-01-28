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
import { Plus, PlusCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  createLoanProgramForm,
  useCreateLoanProgram
} from "../hooks/useCreateLoanProgram"
import { LOAN_TYPE } from "@/common/loan-program.type"

export function CreateLoanProgramDialog() {
  const [open, setOpen] = useState(false)

  const onOpenChange = (open: boolean) => {
    if (!open) {
      form.reset()
    }
    setOpen(open)
  }

  const form = useForm<z.infer<typeof createLoanProgramForm>>({
    resolver: zodResolver(createLoanProgramForm),
    defaultValues: {
      name: "Micro loan program",
      type: "MICROLOAN"
    }
  })

  const { mutate, isPending } = useCreateLoanProgram()

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
          Add new
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="">
                    <FormLabel>Name</FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      placeholder="Microloan program"
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
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(LOAN_TYPE).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <ButtonLoading type="submit" isLoading={isPending}>
                Add {!isPending && <Plus className="ml-1.5" size="16" />}
              </ButtonLoading>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
