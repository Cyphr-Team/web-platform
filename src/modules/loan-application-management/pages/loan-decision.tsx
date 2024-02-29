import { Button, ButtonLoading } from "@/components/ui/button"
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
import { CheckCircle, XCircle } from "lucide-react"
import { ReactNode, useState } from "react"
import { useForm } from "react-hook-form"
import { useSubmitLoanDecision } from "../hooks/useMutation/useSubmitLoanDecision"
import { LoanDecisionEnum } from "../constants/types/application"
import { useLoanApplicationDetailContext } from "../providers/LoanApplicationDetailProvider"
import {
  LoanApplicationStatus,
  UserLoanApplication
} from "@/types/loan-application.type"
import {
  calculateLoanFee,
  calculateMonthlyPayment,
  calculateTotalInterest
} from "../services/loan.service"
import { LoanDecisionSubmitted } from "../components/organisms/LoanDecisionSubmited"
import { useQueryClient } from "@tanstack/react-query"
import { QUERY_KEY } from "../constants/query-key"

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

type LoanAmountDetailProps = {
  loanDetails?: UserLoanApplication
}

const LoanAmountDetail: React.FC<LoanAmountDetailProps> = ({ loanDetails }) => {
  const loanFee = calculateLoanFee(
    loanDetails?.loanAmount ?? 0,
    loanDetails?.loanProgram?.originationFee ?? 0
  )
  const totalAmountOwed = loanFee + (loanDetails?.loanAmount ?? 0)

  const monthlyPayment = calculateMonthlyPayment(
    totalAmountOwed ?? 0,
    loanDetails?.loanProgram.interestRate ?? 10,
    loanDetails?.loanTermInMonth ?? 0
  )
  const totalInterest = calculateTotalInterest(
    totalAmountOwed ?? 0,
    loanDetails?.loanProgram.interestRate ?? 10,
    loanDetails?.loanTermInMonth ?? 0
  )

  return (
    <div className="text-sm">
      <h3 className="mb-2 mt-5 font-medium">Loan details</h3>
      <div className="flex flex-col gap-3">
        <LoanAmountItem
          label="Loan amount"
          value={toCurrency(loanDetails?.loanAmount ?? 0, 0)}
        />
        <LoanAmountItem
          label={`Loan fee (${
            loanDetails?.loanProgram?.originationFee ?? 0
          }% of loan amount)`}
          value={toCurrency(loanFee, 0)}
        />
      </div>
      <Separator className="my-2" />
      <div className="flex flex-col gap-3">
        <LoanAmountItem
          label="Total amount owed"
          value={toCurrency(totalAmountOwed)}
        />
        <LoanAmountItem
          label="Interest rate"
          value={`${loanDetails?.loanProgram.interestRate ?? 10}%`}
        />
        <LoanAmountItem
          label="Loan term"
          value={`${loanDetails?.loanTermInMonth ?? 0} Months`}
        />
        <LoanAmountItem label="Monthly due date" value="Every 15th" />
        <LoanAmountItem
          label="Monthly payment"
          value={toCurrency(monthlyPayment)}
        />
        <LoanAmountItem
          label="Total interest"
          value={toCurrency(totalInterest)}
        />
        <LoanAmountItem
          label={`Total of ${loanDetails?.loanTermInMonth ?? 0} payments`}
          value={toCurrency(totalInterest + totalAmountOwed)}
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

  const { loanApplicationDetails } = useLoanApplicationDetailContext()
  const queryClient = useQueryClient()

  const [decision, setDecision] = useState<LoanDecisionEnum | null>(null)

  const { mutate, isPending } = useSubmitLoanDecision()

  const formSubmit = form.handleSubmit(() => {
    if (!decision) return
    mutate(
      {
        decision: decision,
        note: form.getValues("note")
      },
      {
        onSuccess() {
          form.resetField("note")
          setDecision(null)
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.GET_LOAN_APPLICATION_DETAILS]
          })
        }
      }
    )
  })

  const onDecide = (decision: LoanDecisionEnum) => {
    setDecision(decision)
  }

  return (
    <Form {...form}>
      <form onSubmit={formSubmit}>
        <div>
          <div className="flex-col md:flex-row flex gap-24 flex-wrap">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="loanAmount"
                render={() => (
                  <FormItem className="mb-6">
                    <FormLabel className="text-muted-foreground">
                      Eligible Loan Amount
                    </FormLabel>
                    <h1 className="text-2xl pb-2">
                      {toCurrency(loanApplicationDetails?.loanAmount ?? 0, 0)}
                    </h1>
                    <FormControl>
                      <TwoThumbsSlider
                        value={[loanApplicationDetails?.loanAmount ?? 0]}
                        min={
                          loanApplicationDetails?.loanProgram?.minLoanAmount ??
                          0
                        }
                        max={
                          loanApplicationDetails?.loanProgram?.maxLoanAmount ??
                          0
                        }
                      />
                    </FormControl>
                    <div className="flex justify-between pt-2 text-sm gap-4">
                      <div>
                        <div className="text-muted-foreground">Min</div>
                        {toCurrency(
                          loanApplicationDetails?.loanProgram?.minLoanAmount ??
                            0,
                          0
                        )}
                      </div>

                      <div className="text-right">
                        <div className="text-muted-foreground">Max</div>
                        {toCurrency(
                          loanApplicationDetails?.loanProgram?.maxLoanAmount ??
                            0,
                          0
                        )}
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="loanTerm"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      Loan Term
                    </FormLabel>
                    <h1 className="text-2xl pb-2">
                      {loanApplicationDetails?.loanTermInMonth ?? 0} Months
                    </h1>
                    <FormControl>
                      <TwoThumbsSlider
                        value={[loanApplicationDetails?.loanTermInMonth ?? 0]}
                        min={
                          loanApplicationDetails?.loanProgram?.minTermInMonth ??
                          0
                        }
                        max={
                          loanApplicationDetails?.loanProgram?.maxTermInMonth ??
                          0
                        }
                      />
                    </FormControl>
                    <div className="flex justify-between text-sm pt-2 gap-4">
                      <div>
                        <div className="text-muted-foreground">Min</div>
                        {loanApplicationDetails?.loanProgram?.minTermInMonth ??
                          0}{" "}
                        Months
                      </div>

                      <div className="text-right">
                        <div className="text-muted-foreground">Max</div>
                        {loanApplicationDetails?.loanProgram?.maxTermInMonth ??
                          0}{" "}
                        Months
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <LoanAmountDetail loanDetails={loanApplicationDetails} />
            </div>

            <div className="flex-1">
              {loanApplicationDetails?.status?.toUpperCase() ===
              LoanApplicationStatus.UNDERWRITTEN ? (
                <LoanDecisionSubmitted />
              ) : (
                <>
                  {" "}
                  <div className="flex gap-10 px-4">
                    <Button
                      className="flex-1 h-auto data-[is-active=true]:text-primary"
                      variant="outline"
                      data-is-active={decision === LoanDecisionEnum.APPROVED}
                      onClick={() => onDecide(LoanDecisionEnum.APPROVED)}
                      type="button"
                    >
                      <div className="flex flex-col items-center gap-2.5 mt-3 mb-2.5">
                        <CheckCircle />
                        Approve
                      </div>
                    </Button>
                    <Button
                      type="button"
                      className="flex-1 h-auto data-[is-active=true]:text-error"
                      variant="outline"
                      onClick={() => onDecide(LoanDecisionEnum.DENIED)}
                      data-is-active={decision === LoanDecisionEnum.DENIED}
                    >
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
                    <ButtonLoading
                      size="sm"
                      disabled={!decision}
                      type="submit"
                      isLoading={isPending}
                    >
                      Confirm Loan Decision
                    </ButtonLoading>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}

Component.displayName = "LoanDecision"
