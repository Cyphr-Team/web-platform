import { cn } from "@/lib/utils"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "../../providers"
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Controller, useForm } from "react-hook-form"
import {
  currentLoansFormSchema,
  CurrentLoansFormValue
} from "../../constants/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ArrowRight, Plus } from "lucide-react"
import { FORM_ACTION } from "../../providers/LoanApplicationFormProvider"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/constants"
import { useEffect, useMemo, useState } from "react"
import { CurrentLoansFormItem } from "../molecules/CurrentLoansFormItem"

export const CurrentLoansForm = () => {
  const { dispatchFormAction, currentLoansForm } =
    useLoanApplicationFormContext()
  const { finishCurrentStep } = useLoanApplicationProgressContext()
  const [loanCount, setLoanCount] = useState(0)

  const defaultValues = useMemo(() => {
    return {
      hasOutstandingLoans:
        currentLoansForm?.hasOutstandingLoans.toString() ?? "",
      loans: currentLoansForm?.loans ?? []
    }
  }, [currentLoansForm?.hasOutstandingLoans, currentLoansForm?.loans])

  const form = useForm<CurrentLoansFormValue>({
    resolver: zodResolver(currentLoansFormSchema),
    defaultValues,
    mode: "onChange"
  })

  const handleAddLoan = () => {
    form.setValue(`loans.${loanCount}`, {
      id: loanCount.toString(), // Default values for the new loan item
      lenderName: "",
      loanType: "",
      loanBalance: 0,
      monthlyPayment: 0,
      remainingDuration: ""
    })
    setLoanCount(loanCount + 1)
  }

  const handleRemoveLoan = (index: number) => {
    const currentLoans = form.getValues().loans
    const updatedLoans = currentLoans.filter((_, i) => i !== index)
    form.setValue("loans", updatedLoans)
    setLoanCount(loanCount - 1)
  }

  const onSubmit = (data: CurrentLoansFormValue) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.CURRENT_LOANS,
      state: data
    })
    finishCurrentStep()
  }

  const checkIfLoansAvailable = () => {
    const hasOutstandingLoans = form.getValues().hasOutstandingLoans === "true"
    if (hasOutstandingLoans && loanCount == 0) {
      // Add default loan form when user chooses YES
      handleAddLoan()
    }
    return hasOutstandingLoans
  }

  useEffect(() => {
    if (form.formState.isValidating) {
      const data = form.getValues()
      dispatchFormAction({
        action: FORM_ACTION.SET_DATA,
        key: LOAN_APPLICATION_STEPS.CURRENT_LOANS,
        state: data
      })
    }
  }, [form.formState.isValidating, form, dispatchFormAction])

  return (
    <div
      className={cn(
        "flex flex-col gap-3xl overflow-auto col-span-8 mx-6",
        "md:col-span-6 md:col-start-2 md:mx-0"
      )}
    >
      <div className="flex flex-col gap-3xl overflow-auto">
        <Form {...form}>
          <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit">
            <h5 className="text-lg font-semibold">Current Loans</h5>
            <Separator />
            <form>
              <Controller
                control={form.control}
                name="hasOutstandingLoans"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 gap-x-2xl">
                    <FormLabel className="text-text-secondary col-span-6 lg:col-span-4">
                      <p className="text-sm text-text-secondary font-medium">
                        Does your business currently have outstanding loans?
                      </p>
                      <p className="text-sm text-text-tertiary font-medium">
                        (ex: term loans, revolving credit, equipment financing,
                        etc.)
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange({ target: { value } })
                        }}
                        value={field.value}
                      >
                        <SelectTrigger className="text-base col-span-6 lg:col-span-2 lg:col-end-7">
                          <SelectValue placeholder="Please select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">
                            <span>Yes</span>
                          </SelectItem>
                          <SelectItem value="false">
                            <span>No</span>
                          </SelectItem>
                          <SelectItem value="not-sure">
                            <span>Not sure</span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
            {checkIfLoansAvailable() && (
              <div className="mt-6 flex flex-col gap-3xl">
                {form.getValues().loans.map((item, index: number) => (
                  <CurrentLoansFormItem
                    key={item.id}
                    index={index}
                    onRemove={handleRemoveLoan}
                  />
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="ml-auto mr-0 mt-4 col-span-1 max-w-36"
                  onClick={handleAddLoan}
                >
                  <Plus className="mr-1 w-4" /> Add Loan
                </Button>
              </div>
            )}
          </Card>
          <Button
            disabled={!form.formState.isValid}
            onClick={form.handleSubmit(onSubmit)}
          >
            Next <ArrowRight className="ml-1 w-4" />
          </Button>
        </Form>
      </div>
    </div>
  )
}
