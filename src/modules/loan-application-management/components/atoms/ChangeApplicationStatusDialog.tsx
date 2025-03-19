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
import { type LoanApplicationStatus } from "@/types/loan-application.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight } from "lucide-react"
import { useForm } from "react-hook-form"
import { useSubmitLoanDecision } from "../../hooks/useMutation/useSubmitLoanDecision"
import { getSelectInfoByDecision } from "../../services"
import { useQueryClient } from "@tanstack/react-query"
import { QUERY_KEY } from "@/modules/dashboard-v2/constants/dashboard.constants"

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
  const queryClient = useQueryClient()

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
          queryClient.invalidateQueries({ queryKey: [QUERY_KEY.DASHBOARD_V2] })
        }
      }
    )
  }

  const fromDecisionInfo = getSelectInfoByDecision(fromDecision || undefined)
  const toDecisionInfo = getSelectInfoByDecision(toDecision || undefined)

  return (
    <AlertDialog open={!!toDecision}>
      <AlertDialogContent className="gap-0 overflow-hidden border-0 p-0">
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
