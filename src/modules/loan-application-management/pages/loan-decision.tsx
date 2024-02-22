import { Button } from "@/components/ui/button"
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
import { TwoThumbsSlider } from "@/components/ui/two-thumbs-slider"
import { toCurrency } from "@/utils"
import { CheckCircle, Recycle, XCircle } from "lucide-react"
import { ReactNode } from "react"
import { useForm } from "react-hook-form"

const LoanAmountItem = ({
  label,
  value
}: {
  label: ReactNode
  value: ReactNode
}) => {
  return (
    <div className="flex justify-between gap-4">
      <label className="text-muted-foreground whitespace-nowrap">{label}</label>
      <p className="font-medium">{value}</p>
    </div>
  )
}

const LoanAmountDetail = () => {
  return (
    <div className="text-sm">
      <h3 className="mb-2 mt-5 font-medium">Loan details</h3>
      <div className="flex flex-col gap-3">
        <LoanAmountItem label="Loan amount" value={toCurrency(18750)} />
        <LoanAmountItem
          label="Loan fee (10% of loan amount)"
          value={toCurrency(1875)}
        />
      </div>
      <Separator className="my-2" />
      <div className="flex flex-col gap-3">
        <LoanAmountItem label="Total amount owed" value={toCurrency(20625)} />
        <LoanAmountItem label="Interest rate" value="11.50%" />
        <LoanAmountItem label="Loan term" value="48 Months" />
        <LoanAmountItem label="Monthly due date" value="Every 15th" />
        <LoanAmountItem label="Monthly payment" value={toCurrency(489.17)} />
        <LoanAmountItem label="Total interest" value={toCurrency(5203.12)} />
        <LoanAmountItem
          label="Total of 48 payments"
          value={toCurrency(25828.12)}
        />
      </div>
    </div>
  )
}

export const Component = () => {
  const form = useForm({
    defaultValues: {
      loanAmount: [12000, 18750],
      loanTerm: [12, 48],
      note: ""
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => data)}>
        <div>
          <div className="flex-col md:flex-row flex gap-24 flex-wrap">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="loanAmount"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    <FormLabel className="text-muted-foreground">
                      Eligible Loan Amount
                    </FormLabel>
                    <h1 className="text-2xl pb-2">
                      {toCurrency(field.value[1], 0)}
                    </h1>
                    <FormControl>
                      <TwoThumbsSlider
                        defaultValue={field.value}
                        min={12000}
                        max={25000}
                      />
                    </FormControl>
                    <div className="flex justify-between pt-2 text-sm gap-4">
                      <div>
                        <div className="text-muted-foreground">Min</div>
                        $12,000
                      </div>

                      <div className="text-right">
                        <div className="text-muted-foreground">Max</div>
                        $25,000
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="loanTerm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      Loan Term
                    </FormLabel>
                    <h1 className="text-2xl pb-2">{field.value[1]} Months</h1>
                    <FormControl>
                      <TwoThumbsSlider
                        defaultValue={field.value}
                        min={12}
                        max={48}
                      />
                    </FormControl>
                    <div className="flex justify-between text-sm pt-2 gap-4">
                      <div>
                        <div className="text-muted-foreground">Min</div>
                        12 Months
                      </div>

                      <div className="text-right">
                        <div className="text-muted-foreground">Max</div>
                        48 Months
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <LoanAmountDetail />
            </div>

            <div className="flex-1">
              <div className="flex gap-10 px-4">
                <Button className="flex-1 h-auto" variant="outline">
                  <div className="flex flex-col items-center gap-2.5 mt-3 mb-2.5">
                    <CheckCircle />
                    Approve
                  </div>
                </Button>
                <Button className="flex-1 h-auto" variant="outline">
                  <div className="flex flex-col items-center gap-2.5 mt-3 mb-2.5">
                    <Recycle />
                    Follow Up
                  </div>
                </Button>
                <Button className="flex-1 h-auto" variant="outline">
                  <div className="flex flex-col items-center gap-2.5 mt-3 mb-2.5">
                    <XCircle />
                    Deny
                  </div>
                </Button>
              </div>

              <div className="mt-6">
                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Select a decision"
                          className="resize-none min-h-36"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-6 text-right">
                <Button size="sm" disabled>
                  Confirm Loan Decision
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}

Component.displayName = "LoanDecision"
