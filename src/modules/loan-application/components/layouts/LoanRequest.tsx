import { ButtonLoading } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { toCurrency } from "@/utils"
import { useForm } from "react-hook-form"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { LOAN_APPLICATION_STEPS } from "../../constants"
import {
  useLoanApplicationContext,
  useLoanProgramDetailContext
} from "../../providers"
import { useCreateLoanApplication } from "../../hooks/useCreateLoanApplication"
import { zodResolver } from "@hookform/resolvers/zod"
import { loanRequestFormSchema } from "../../constants/form"

const LOAN_PURPOSES = [
  { label: "Working Capital", value: "workingCapital" },
  { label: "Equipment", value: "equipment" },
  { label: "Materials", value: "materials" },
  { label: "Startup Costs", value: "startupCosts" },
  { label: "Growth Opportunities", value: "growth" }
]

export function CardWithForm() {
  const { changeStep, changeLoanApplicationId, changeProgress } =
    useLoanApplicationContext()
  const { loanProgramDetails } = useLoanProgramDetailContext()

  const minLoanAmount = loanProgramDetails?.minLoanAmount ?? 0
  const maxLoanAmount = loanProgramDetails?.maxLoanAmount ?? 0

  const minTermInMonth = loanProgramDetails?.minTermInMonth ?? 0
  const maxTermInMonth = loanProgramDetails?.maxTermInMonth ?? 0

  const { mutate, isPending } = useCreateLoanApplication()

  const form = useForm({
    resolver: zodResolver(loanRequestFormSchema),
    defaultValues: {
      loanAmount: minLoanAmount,
      loanTermInMonth: minTermInMonth,
      proposeUseOfLoan: "workingCapital"
    }
  })

  const handleSubmit = form.handleSubmit(() => {
    if (!loanProgramDetails) return
    mutate(
      {
        loanAmount: form.getValues("loanAmount"),
        loanTermInMonth: form.getValues("loanTermInMonth"),
        proposeUseOfLoan: "other",
        loanProgramId: loanProgramDetails?.id
      },
      {
        onSuccess(res) {
          changeLoanApplicationId(res.data.id)
          changeStep(LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION)
          changeProgress(LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION)
        }
      }
    )
  })

  return (
    <Card className="w-auto lg:w-[500px] rounded-xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-lg">ARTcap Express</CardTitle>
        <CardDescription>
          Thank you for your interest in working with AltCap.
          <span className="block">What amount will you be requesting?</span>
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div>
              <div className="flex">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="loanAmount"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="font-normal">
                          Loan Amount
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Raise your loan amount"
                            className="text-base"
                            min={minLoanAmount}
                            max={maxLoanAmount}
                            value={toCurrency(field.value, 0)}
                            onChange={(event) => {
                              const value = parseFloat(
                                event.target.value.replace(/[^0-9.]/g, "")
                              )
                              if (isNaN(value)) return
                              field.onChange(value)
                            }}
                            onBlur={(event) => {
                              const value = parseFloat(
                                event.target.value.replace(/[^0-9.]/g, "")
                              )
                              if (isNaN(value)) return
                              if (value > minLoanAmount)
                                return field.onChange(minLoanAmount)
                              if (value < maxLoanAmount)
                                return field.onChange(maxLoanAmount)
                              return field.onChange(value)
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="loanAmount"
                    render={({ field }) => (
                      <FormItem className="mb-6 mt-4">
                        <FormControl>
                          <Slider
                            {...field}
                            defaultValue={[field.value]}
                            min={minLoanAmount}
                            max={maxLoanAmount}
                            onValueChange={(vals) => {
                              field.onChange(vals[0])
                            }}
                            value={[field.value]}
                          />
                        </FormControl>
                        <div className="flex justify-between pt-2 text-sm">
                          <div>{toCurrency(minLoanAmount)}</div>

                          <div className="text-right">
                            {toCurrency(maxLoanAmount)}
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="loanTermInMonth"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="font-normal">
                          Loan Term (Months)
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Raise your loan amount"
                            className="text-base"
                            min={minTermInMonth}
                            max={maxTermInMonth}
                            value={field.value}
                            onChange={(event) => {
                              const value = parseFloat(
                                event.target.value.replace(/[^0-9.]/g, "")
                              )
                              if (isNaN(value)) return
                              field.onChange(value)
                            }}
                            onBlur={(event) => {
                              const value = parseFloat(
                                event.target.value.replace(/[^0-9.]/g, "")
                              )
                              if (isNaN(value)) return
                              if (value > minTermInMonth)
                                return field.onChange(minTermInMonth)
                              if (value < maxTermInMonth)
                                return field.onChange(maxTermInMonth)
                              return field.onChange(value)
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="loanTermInMonth"
                    render={({ field }) => (
                      <FormItem className="mb-6 mt-4">
                        <FormControl>
                          <Slider
                            {...field}
                            defaultValue={[field.value]}
                            min={minTermInMonth}
                            max={maxTermInMonth}
                            onValueChange={(vals) => {
                              field.onChange(vals[0])
                            }}
                            value={[field.value]}
                          />
                        </FormControl>
                        <div className="flex justify-between pt-2 text-sm">
                          <div>{minTermInMonth}</div>

                          <div className="text-right">{maxTermInMonth}</div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="proposeUseOfLoan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-normal">
                          Proposed Use of Loan
                        </FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Please select..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {LOAN_PURPOSES.map((purpose) => (
                              <SelectItem
                                key={purpose.value}
                                value={purpose.value}
                              >
                                {purpose.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <ButtonLoading
              className="w-full"
              type="submit"
              isLoading={isPending}
              disabled={!form.formState.isValid}
            >
              Next <ArrowRight className="ml-1 w-4" />
            </ButtonLoading>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export function LoanRequest() {
  return <CardWithForm />
}
