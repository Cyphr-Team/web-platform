import { useEffect, useMemo, useState } from "react"
import { Button, ButtonLoading } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
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
import {
  InterestRateType,
  LoanProgram,
  LoanType
} from "@/types/loan-program.type"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll"

type Props = {
  defaultData?: LoanProgram
  detailId?: string
  setDetailId: (id?: string) => void
}

export function CreateLoanProgramDialog({
  defaultData,
  detailId,
  setDetailId
}: React.PropsWithChildren<Props>) {
  const [open, setOpen] = useState(false)

  const onOpenChange = (open: boolean) => {
    if (!open) {
      form.reset()
      setDetailId(undefined)
    }
    setOpen(open)
  }

  const form = useForm<z.infer<typeof createLoanProgramForm>>({
    resolver: zodResolver(createLoanProgramForm),
    defaultValues: useMemo(
      () => ({
        name: defaultData?.name ?? "Micro loan program",
        type: defaultData?.type ?? "MICROLOAN",
        interestRate: defaultData?.interestRate ?? 10,
        interestRateType:
          defaultData?.interestRateType ?? InterestRateType.FIXED,
        interestRateDescription:
          defaultData?.interestRateDescription ?? "Interest rate description",
        description: defaultData?.description ?? "Description",
        originationFee: defaultData?.originationFee ?? 10,
        minLoanAmount: defaultData?.minLoanAmount ?? 1000,
        maxLoanAmount: defaultData?.maxLoanAmount ?? 10000,
        minTermInMonth: defaultData?.minTermInMonth ?? 1,
        maxTermInMonth: defaultData?.maxTermInMonth ?? 12
      }),
      [defaultData]
    )
  })

  const { mutate, isPending } = useCreateLoanProgram({ detailId })

  const formSubmit = form.handleSubmit((data) =>
    mutate(data, {
      onSuccess() {
        onOpenChange(false)
      }
    })
  )

  useEffect(() => {
    form.reset(defaultData)
  }, [defaultData, form])

  return (
    <Dialog open={open || !!detailId} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button type="button">
          <PlusCircle size={16} className="text-sm mr-1.5" />
          Add new
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] px-0 gap-0">
        <DialogHeader className="px-6 border-b pb-4">
          <DialogTitle>Create Loan Program</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={formSubmit} className="flex flex-col">
            <ScrollArea className="max-h-[70vh]">
              <div className="p-6 py-2 flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Name"
                          wrapperClassName="col-span-3 w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between gap-4">
                  <FormField
                    control={form.control}
                    name="minTermInMonth"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Min Term In Month</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Min Term In Month"
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
                    name="maxTermInMonth"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Max Term In Month</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Max Term In Month"
                            wrapperClassName="col-span-3 w-full"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-between gap-4">
                  <FormField
                    control={form.control}
                    name="minLoanAmount"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Max Loan Amount</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Max Loan Amount"
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
                    name="maxLoanAmount"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Min Loan Amount</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Min Loan Amount"
                            wrapperClassName="col-span-3 w-full"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-between gap-4">
                  <FormField
                    control={form.control}
                    name="interestRate"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Interest Rate</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Interest Rate"
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
                    name="interestRateType"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Interest Rate Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="capitalize">
                              <SelectValue placeholder="Select interest rate type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.entries(InterestRateType).map(
                              ([key, value]) => (
                                <SelectItem
                                  key={key}
                                  value={value}
                                  className="capitalize"
                                >
                                  {value}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="originationFee"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Origination Fee</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Origination Fee"
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
                  name="interestRateDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interest Rate Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Interest rate description"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Description"
                          className="resize-none"
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.keys(LoanType).map((type) => (
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
              </div>
            </ScrollArea>
            <DialogFooter className="px-6 border-t pt-4">
              <ButtonLoading type="submit" isLoading={isPending}>
                {detailId ? "Update" : "Add"}{" "}
                {!isPending && <Plus className="ml-1.5" size="16" />}
              </ButtonLoading>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
