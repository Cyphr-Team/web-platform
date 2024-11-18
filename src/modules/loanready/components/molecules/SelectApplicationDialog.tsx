import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/ui/icons.tsx"
import { useSearchOrderLoanApplications } from "@/modules/loanready/hooks/applications/order-list.ts"
import { formatDate } from "@/utils/date.utils.ts"
import { FORMAT_DATE_M_D_Y } from "@/constants/date.constants.ts"
import { LoanReadyPlan } from "@/modules/loanready/types/payment.ts"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

interface SelectApplicationDialogProps {
  isOpen: boolean
  onClose: VoidFunction
  onConfirmed: (applicationId?: string) => void
}

// Define schema for form
const applicationSchema = z.object({
  applicationId: z.string().optional() // Optional if creating a new application
})

export function SelectApplicationDialog({
  isOpen,
  onClose,
  onConfirmed
}: SelectApplicationDialogProps) {
  // Setup useForm
  const form = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      applicationId: undefined
    }
  })

  // Query list applications filtering plan BASIC
  const { data, isFetching } = useSearchOrderLoanApplications({
    request: {
      limit: 100,
      offset: 0,
      filter: {
        plan: [LoanReadyPlan.BASIC]
      }
    }
  })
  // TODO: User can select LoanReady/Ready+ subscriptions which has not been drafted yet

  // Handle form submission
  const handleConfirm = () => {
    const { applicationId } = form.getValues()

    onConfirmed(applicationId)
  }

  const handleCancel = () => {
    form.setValue("applicationId", undefined)
    onClose()
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="flex h-2/3 flex-col px-0 pb-0">
        <AlertDialogHeader className="px-6">
          <AlertDialogTitle>Select application</AlertDialogTitle>
          <AlertDialogDescription className="break-keep">
            Choose an application below to use for Loan Ready+, or start a new
            one if you prefer. By selecting 'Done,' you confirm your purchase.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="mt-2 grow space-y-3 px-6">
          <p className="text-base font-semibold">Applications</p>
          <div className="max-h-80 overflow-y-auto">
            {!isFetching &&
              data?.data.data.map((application) => (
                <div key={application.id}>
                  <Separator />
                  <label
                    className="flex cursor-pointer items-center justify-between py-3 pr-2"
                    htmlFor={`application-${application.id}`}
                  >
                    <div className="text-sm">
                      <p className="font-medium">
                        {application.businessName ?? application.id}
                      </p>
                      <p className="text-gray-600">
                        {application.submittedAt
                          ? `Submitted on ${formatDate(
                              application.submittedAt,
                              FORMAT_DATE_M_D_Y
                            )}`
                          : "Not submitted yet"}
                      </p>
                    </div>
                    <div className="relative flex items-center">
                      <input
                        className="peer size-5 cursor-pointer appearance-none rounded-full border border-slate-300 transition-all checked:border-slate-400"
                        id={`application-${application.id}`}
                        type="radio"
                        value={application.id}
                        {...form.register("applicationId")} // Connect input to useForm
                      />
                      <span className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-800 opacity-0 transition-opacity duration-200 peer-checked:opacity-100" />
                    </div>
                  </label>
                </div>
              ))}
          </div>
        </div>
        <Separator />
        <AlertDialogFooter className="px-6 pb-4 sm:justify-between">
          <Button variant="outline" onClick={() => handleConfirm()}>
            <Icons.newApplication className="mr-1" />
            New application
          </Button>
          <div className="flex space-x-2">
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={!form.watch("applicationId")} // Disable when no application selected
              onClick={form.handleSubmit(handleConfirm)}
            >
              Done
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
