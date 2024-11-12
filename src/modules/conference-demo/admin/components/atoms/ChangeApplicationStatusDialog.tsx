import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { Button, ButtonLoading } from "@/components/ui/button"

import { z } from "zod"

import { Badge } from "@/components/ui/badge"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight } from "lucide-react"
import { useForm } from "react-hook-form"
import { type Dispatch, type SetStateAction, useState } from "react"
import { getSelectInfoByDecision, LoanApplicationStatus } from "../../types"

const FormSchema = z.object({
  note: z.string().optional(),
  decision: z.string().optional()
})

type FormValue = z.infer<typeof FormSchema> & {
  decision: LoanApplicationStatus
}

export function ChangeApplicationStatusDialog({
  fromDecision,
  toDecision,
  onCancel,
  setIsReferToLoanReady,
  setDecision
}: {
  onCancel: () => void
  fromDecision: LoanApplicationStatus | undefined
  toDecision: LoanApplicationStatus
  setIsReferToLoanReady: Dispatch<SetStateAction<boolean>>
  setDecision: Dispatch<SetStateAction<LoanApplicationStatus | undefined>>
}) {
  const [isPending, setIsPending] = useState(false)
  const form = useForm<FormValue>({
    resolver: zodResolver(FormSchema),
    defaultValues: { note: "", decision: toDecision }
  })

  function onSubmit() {
    // Fake API call
    setIsPending(true)
    setTimeout(() => {
      setIsPending(false)
      onCancel()
      setDecision?.(toDecision)
      if (toDecision === LoanApplicationStatus.REFER_TO_LOANREADY) {
        setIsReferToLoanReady?.(true)
      }
    }, 1000)
  }

  const fromDecisionInfo = getSelectInfoByDecision(fromDecision || undefined)
  const toDecisionInfo = getSelectInfoByDecision(toDecision || undefined)

  return (
    <AlertDialog open={!!toDecision}>
      <AlertDialogContent className="finovate gap-0 overflow-hidden border-0 p-0">
        <AlertDialogHeader className="p-0">
          <AlertDialogTitle asChild>
            <div className="flex items-center justify-between pl-8">
              <h5 className="text-2xl">Change Status</h5>
              <div>
                <Button
                  className="h-16 rounded-none px-8 font-semibold"
                  variant="secondary"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
                <ButtonLoading
                  className="h-16 rounded-none px-8 font-semibold"
                  isLoading={isPending}
                  onClick={form.handleSubmit(onSubmit)}
                >
                  Submit
                </ButtonLoading>
              </div>
            </div>
          </AlertDialogTitle>
        </AlertDialogHeader>

        <Separator />

        <Form {...form}>
          <form
            className="px-8 pb-8 pt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="mb-8 flex items-center gap-4">
              <Badge
                isDot
                className="py-1"
                variantColor={fromDecisionInfo.variantColor}
              >
                {fromDecisionInfo.label}
              </Badge>
              <ArrowRight className="w-5" />
              <Badge
                isDot
                className="py-1"
                variantColor={toDecisionInfo.variantColor}
              >
                {toDecisionInfo.label}
              </Badge>
            </div>

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-secondary-700">
                    Notes (optional)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Leave a note for this decision"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
