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
import type * as z from "zod"
import {
  createLoanProgramForm,
  useCreateLoanProgram
} from "../hooks/useCreateLoanProgram"
import {
  InterestRateType,
  type LoanProgram,
  LoanType,
  ProgramStatus
} from "@/types/loan-program.type"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll"
import { LoadingWrapper } from "@/shared/atoms/LoadingWrapper"
import { useUpdateLoanProgram } from "../hooks/useUpdateLoanProgram"
import { FeatureFlagsRenderer } from "@/shared/layouts/FeatureFlagRenderer"
import { FEATURE_FLAGS } from "@/constants/feature-flag.constants"
import { FormsConfigurationDialog } from "./molecules/form-configuration-dialog"
import { useCreateFormsConfiguration } from "../hooks/useCreateFormsConfiguration"
import { useUpdateFormsConfiguration } from "../hooks/useUpdateFormsConfiguration"

interface Props {
  defaultData?: LoanProgram
  detailId?: string
  isFetching?: boolean
  setDetailId: (id?: string) => void
}

const defaultFormValues = {
  name: "",
  type: "MICRO",
  interestRate: 0,
  interestRateType: InterestRateType.FIXED,
  interestRateDescription: "",
  description: "",
  originationFee: 0,
  minLoanAmount: 0,
  maxLoanAmount: 0,
  minTermInMonth: 0,
  maxTermInMonth: 0
}

export function CreateLoanProgramDialog({
  defaultData,
  detailId,
  setDetailId,
  isFetching
}: React.PropsWithChildren<Props>) {
  const [open, setOpen] = useState(false)
  const [formsConfiguration, setFormsConfiguration] = useState<string[]>([])

  const onOpenChange = (open: boolean) => {
    if (!open) {
      form.reset(defaultFormValues)
      setDetailId(undefined)
    }
    setOpen(open)
  }

  const form = useForm<z.infer<typeof createLoanProgramForm>>({
    resolver: zodResolver(createLoanProgramForm),
    defaultValues: useMemo(
      () =>
        defaultData
          ? {
              name: defaultData?.name,
              type: defaultData?.type,
              interestRate: defaultData?.interestRate,
              interestRateType: defaultData?.interestRateType,
              interestRateDescription: defaultData?.interestRateDescription,
              description: defaultData?.description,
              originationFee: defaultData?.originationFee,
              minLoanAmount: defaultData?.minLoanAmount,
              maxLoanAmount: defaultData?.maxLoanAmount,
              minTermInMonth: defaultData?.minTermInMonth,
              maxTermInMonth: defaultData?.maxTermInMonth
            }
          : defaultFormValues,
      [defaultData]
    )
  })

  const { mutate: createLoanProgram, isPending: isCreateLoanProgramPending } =
    useCreateLoanProgram({ detailId })
  const { mutate: createFormsConfiguration, isPending: isCreateFormsPending } =
    useCreateFormsConfiguration()
  const { mutate: updateFormsConfiguration, isPending: isUpdateFormsPending } =
    useUpdateFormsConfiguration()

  const { mutate: updateLoanProgram, isPending: isUpdateLoanProgramPending } =
    useUpdateLoanProgram({
      loanProgramId: detailId,
      status: ProgramStatus.DRAFT
    })
  const isProcessing =
    isCreateLoanProgramPending ||
    isUpdateLoanProgramPending ||
    isUpdateFormsPending ||
    isCreateFormsPending

  const formSubmit = form.handleSubmit((data) => {
    if (detailId) {
      updateLoanProgram(data, {
        onSuccess: (data) => {
          if (formsConfiguration.length > 0) {
            updateFormsConfiguration({
              loanProgramId: data.data.id,
              forms: formsConfiguration
            })
          }
          onOpenChange(false)
        }
      })
    } else {
      createLoanProgram(data, {
        onSuccess: (data) => {
          if (formsConfiguration.length > 0) {
            createFormsConfiguration({
              loanProgramId: data.data.id,
              forms: formsConfiguration
            })
          }
          onOpenChange(false)
        }
      })
    }
  })

  const onSaveForms = (forms: string[]) => {
    setFormsConfiguration(forms)
  }

  useEffect(() => {
    form.reset(defaultData)
  }, [defaultData, form])

  return (
    <Dialog open={open || !!detailId} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button type="button">
          <PlusCircle className="mr-1.5 text-sm" size={16} />
          Add new
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-0 px-0 sm:max-w-[625px]">
        <DialogHeader className="border-b px-6 pb-4">
          {detailId ? (
            <DialogTitle>Edit Loan Program</DialogTitle>
          ) : (
            <DialogTitle>Create Loan Program</DialogTitle>
          )}
        </DialogHeader>
        <Form {...form}>
          <form className="flex flex-col" onSubmit={formSubmit}>
            <ScrollArea className="h-[70vh]">
              <LoadingWrapper
                className="h-[70vh]"
                isLoading={isFetching ?? false}
              >
                <div className="flex flex-col gap-3 p-6 py-2">
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
                              placeholder="Min Term In Month"
                              type="number"
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
                              placeholder="Max Term In Month"
                              type="number"
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
                          <FormLabel>Min Loan Amount</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Min Loan Amount"
                              type="number"
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
                          <FormLabel>Max Loan Amount</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Max Loan Amount"
                              type="number"
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
                              placeholder="Interest Rate"
                              type="number"
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
                            defaultValue={field.value}
                            onValueChange={field.onChange}
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
                                    className="capitalize"
                                    value={value}
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
                            placeholder="Origination Fee"
                            type="number"
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
                            className="resize-none"
                            placeholder="Interest rate description"
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
                            className="resize-none"
                            placeholder="Description"
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
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.keys(LoanType).map((type) => (
                              <SelectItem key={type} value={type.toLowerCase()}>
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
              </LoadingWrapper>
            </ScrollArea>
            <FeatureFlagsRenderer
              ffKey={FEATURE_FLAGS.LOAN_PROGRAM_FORMS_CONFIGURATION}
            >
              <div className="flex w-full justify-end p-6">
                <FormsConfigurationDialog
                  detailId={detailId}
                  onSave={onSaveForms}
                />
              </div>
            </FeatureFlagsRenderer>
            <DialogFooter className="border-t px-6 pt-4">
              <ButtonLoading isLoading={isProcessing} type="submit">
                {detailId ? "Update" : "Add"}{" "}
                {!isProcessing && <Plus className="ml-1.5" size="16" />}
              </ButtonLoading>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
