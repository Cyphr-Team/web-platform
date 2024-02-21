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
import { useLoanApplicationContext } from "../../providers"

const LOAN_PURPOSES = [
  { label: "Working Capital", value: "workingCapital" },
  { label: "Equipment", value: "equipment" },
  { label: "Materials", value: "materials" },
  { label: "Startup Costs", value: "startupCosts" },
  { label: "Growth Opportunities", value: "growth" }
]

export function CardWithForm() {
  const { changeStep } = useLoanApplicationContext()

  const form = useForm({
    defaultValues: {
      loanAmount: 12000,
      proposed: "workingCapital"
    }
  })

  const handleSubmit = form.handleSubmit(() => {
    changeStep(LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION)
  })

  return (
    <Card className="w-auto lg:w-[500px] rounded-xl">
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
                            type="text"
                            placeholder="Raise your loan amount"
                            className="text-base"
                            min={1000}
                            max={10000}
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
                              if (value > 10000) return field.onChange(10000)
                              if (value < 1000) return field.onChange(1000)
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
                            defaultValue={[field.value]}
                            min={1000}
                            max={10000}
                            onValueChange={(vals) => {
                              field.onChange(vals[0])
                            }}
                            value={[field.value]}
                          />
                        </FormControl>
                        <div className="flex justify-between pt-2 text-sm">
                          <div>$1,000</div>

                          <div className="text-right">$10,000</div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="proposed"
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
            <Button className="w-full" type="submit">
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
