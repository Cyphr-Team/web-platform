import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

import { LoanDecisionEnum } from "../../constants/types/application"

import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { toastSuccess } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Badge } from "@/components/ui/badge"
import { getSelectInfoByDecision } from "../../services"
import { ArrowRight } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const FormSchema = z.object({
  note: z.string().optional()
})

export function ChangeApplicationStatusDialog({
  fromDecision,
  toDecision,
  onCancel
}: {
  onCancel: () => void
  fromDecision: LoanDecisionEnum | null
  toDecision?: LoanDecisionEnum
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  function onSubmit() {
    toastSuccess({
      title: "Change application status",
      description: "Your decision has been successfully submitted"
    })
    onCancel()
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
                <Button
                  className="rounded-none font-semibold h-16 px-8"
                  onClick={form.handleSubmit(onSubmit)}
                >
                  Submit
                </Button>
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
