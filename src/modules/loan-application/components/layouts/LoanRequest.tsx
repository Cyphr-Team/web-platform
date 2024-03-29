import { Button } from "@/components/ui/button"
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
import { zodResolver } from "@hookform/resolvers/zod"
import { loanRequestFormSchema } from "../../constants/form"
import { useEffect, useMemo } from "react"
import { useTenant } from "@/providers/tenant-provider"

const LOAN_PURPOSES = [
  { label: "Working Capital", value: "working_capital" },
  { label: "Equipment", value: "equipment" },
  { label: "Materials", value: "materials" },
  { label: "Startup Costs", value: "startup_costs" },
  { label: "Growth Opportunities", value: "growth_opportunities" },
  { label: "Other", value: "other" }
]

export function CardWithForm() {
  const { tenantData } = useTenant()
  const { name } = tenantData ?? {}

  const {
    changeStep,
    changeProgress,
    saveDraftForm,
    setFormIsEdited,
    draftForm
  } = useLoanApplicationContext()
  const { loanProgramDetails } = useLoanProgramDetailContext()

  const minLoanAmount = loanProgramDetails?.minLoanAmount ?? 0
  const maxLoanAmount = loanProgramDetails?.maxLoanAmount ?? 0

  const defaultValues = useMemo(() => {
    return {
      loanAmount: draftForm.loanRequest?.loanAmount ?? minLoanAmount ?? 0,
      loanTermInMonth: loanProgramDetails?.maxTermInMonth ?? 0,
      proposeUseOfLoan: draftForm.loanRequest?.proposeUseOfLoan ?? ""
    }
  }, [draftForm, loanProgramDetails, minLoanAmount])

  const form = useForm({
    resolver: zodResolver(loanRequestFormSchema),
    defaultValues: defaultValues
  })

  useEffect(() => {
    form.reset(defaultValues)
  }, [defaultValues, form])

  useEffect(() => {
    if (form.formState.isDirty && !form.formState.isSubmitted) {
      setFormIsEdited()
    }
  }, [form.formState, setFormIsEdited])

  const handleSubmit = form.handleSubmit(() => {
    if (!loanProgramDetails) return
    saveDraftForm(LOAN_APPLICATION_STEPS.LOAN_REQUEST, {
      loanAmount: form.getValues("loanAmount"),
      loanTermInMonth: loanProgramDetails?.maxTermInMonth ?? 0,
      proposeUseOfLoan: form.getValues("proposeUseOfLoan")
    })
    changeStep(LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION, true)
    changeProgress(LOAN_APPLICATION_STEPS.LOAN_REQUEST)
  })

  return (
    <Card className="rounded-xl col-span-4 col-start-3">
      <CardHeader className="text-center">
        <CardTitle className="text-lg">{loanProgramDetails?.name}</CardTitle>
        <CardDescription>
          Thank you for your interest in working with {name}.{` `}
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
                        <FormLabel>Loan Amount</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Raise your loan amount"
                            className="text-base"
                            value={toCurrency(field.value, 0)}
                            onChange={(event) => {
                              const value =
                                parseFloat(
                                  event.target.value.replace(/[^0-9.]/g, "")
                                ) || 0
                              if (isNaN(value)) return
                              if (value > maxLoanAmount)
                                return field.onChange(maxLoanAmount)
                              field.onChange(value)
                            }}
                            onBlur={(event) => {
                              const value = parseFloat(
                                event.target.value.replace(/[^0-9.]/g, "")
                              )
                              if (isNaN(value)) return
                              if (value < minLoanAmount)
                                return field.onChange(minLoanAmount)
                              if (value > maxLoanAmount)
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
                            step={500}
                          />
                        </FormControl>
                        <div className="flex justify-between pt-2 text-sm">
                          <div>{toCurrency(minLoanAmount, 0)}</div>

                          <div className="text-right">
                            {toCurrency(maxLoanAmount, 0)}
                          </div>
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
                        <FormLabel>Proposed Use of Loan</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
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
            <Button
              className="w-full"
              type="submit"
              disabled={!form.formState.isValid}
            >
              Next <ArrowRight className="ml-1 w-4" />
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export function LoanRequest() {
  return <CardWithForm />
}
