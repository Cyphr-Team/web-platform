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
import { LoanApplicationStatus } from "@/types/loan-application.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight } from "lucide-react"
import { useForm } from "react-hook-form"
import { useSubmitLoanDecision } from "../../hooks/useMutation/useSubmitLoanDecision"
import { getSelectInfoByDecision } from "../../services"

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
  setSuccess
}: {
  onCancel: () => void
  fromDecision: LoanApplicationStatus | null
  toDecision: LoanApplicationStatus
  setSuccess?: (value?: boolean) => void
}) {
  const { mutate, isPending } = useSubmitLoanDecision()

  const form = useForm<FormValue>({
    resolver: zodResolver(FormSchema),
    defaultValues: { note: "", decision: toDecision }
  })

  function onSubmit(value: FormValue) {
    mutate(
      {
        ...value,
        decision: value.decision.toLowerCase() as LoanApplicationStatus
      },
      {
        onSuccess: () => {
          onCancel()
          setSuccess?.(true)
        }
      }
    )
  }

  const fromDecisionInfo = getSelectInfoByDecision(fromDecision || undefined)
  const toDecisionInfo = getSelectInfoByDecision(toDecision || undefined)

  return (
    <AlertDialog open={!!toDecision}>
      <AlertDialogContent className="p-0 border-0 gap-0 overflow-hidden">
        <AlertDialogHeader className="p-0">
          <AlertDialogTitle asChild>
            <div className="flex items-center justify-between pl-8">
              <h5 className="text-2xl">Change Status</h5>
              <div>
                <Button
                  variant="secondary"
                  className="rounded-none font-semibold h-16 px-8"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
                <ButtonLoading
                  className="rounded-none font-semibold h-16 px-8"
                  onClick={form.handleSubmit(onSubmit)}
                  isLoading={isPending}
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
            onSubmit={form.handleSubmit(onSubmit)}
            className="px-8 pt-4 pb-8"
          >
            <div className="flex items-center gap-4 mb-8">
              <Badge
                isDot
                variantColor={fromDecisionInfo.variantColor}
                className="py-1"
              >
                {fromDecisionInfo.label}
              </Badge>
              <ArrowRight className="w-5" />
              <Badge
                isDot
                variantColor={toDecisionInfo.variantColor}
                className="py-1"
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
