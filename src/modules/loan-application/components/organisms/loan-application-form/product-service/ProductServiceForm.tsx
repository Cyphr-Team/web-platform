import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  productServiceFormSchema,
  ProductServiceFormValue
} from "@/modules/loan-application/constants/form"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { ArrowRight } from "lucide-react"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { TextAreaInput } from "@/shared/organisms/form/TextAreaInput"
import { productServiceFormQuestions } from "./constants"

export const ProductServiceForm = () => {
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()
  const { productServiceForm, loanRequest, dispatchFormAction } =
    useLoanApplicationFormContext()
  const defaultValues = {
    id: productServiceForm?.id ?? "",
    loanApplicationId:
      productServiceForm?.loanApplicationId ?? loanRequest?.applicationId ?? "",
    businessType: productServiceForm?.businessType ?? "",
    solutionFocus: productServiceForm?.solutionFocus ?? "",
    businessValue: productServiceForm?.businessValue ?? "",
    proofOfMarket: productServiceForm?.proofOfMarket ?? "",
    intellectualProperty: productServiceForm?.intellectualProperty ?? ""
  }
  const form = useForm<ProductServiceFormValue>({
    resolver: zodResolver(productServiceFormSchema),
    mode: "onBlur",
    defaultValues
  })

  const onSubmit = (data: ProductServiceFormValue) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.PRODUCT_SERVICE,
      state: data
    })
    finishCurrentStep()
  }

  useEffect(() => {
    if (form.formState.isValidating) {
      const data = form.getValues()
      dispatchFormAction({
        action: FORM_ACTION.SET_DATA,
        key: LOAN_APPLICATION_STEPS.PRODUCT_SERVICE,
        state: data
      })
    }
  }, [form.formState.isValidating, form, dispatchFormAction])

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.PRODUCT_SERVICE)

  return (
    <div
      className={cn(
        "flex flex-col gap-3xl overflow-auto col-span-8 mx-6",
        "md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-sm"
      )}
    >
      <div className="flex flex-col gap-3xl overflow-auto">
        <Form {...form}>
          <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit">
            <h5 className="text-lg font-semibold">Product and Service</h5>
            <Separator />
            <form className="flex flex-col gap-4xl">
              <Controller
                control={form.control}
                name="businessType"
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormLabel className="text-text-secondary">
                      <p className="text-sm text-text-secondary font-medium">
                        Is your core business a product or service?
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onBlur()
                          field.onChange(value.toString())
                        }}
                        value={field.value}
                      >
                        <SelectTrigger className="text-base col-span-6 xl:col-span-2 max-w-40 xl:col-end-7 xl:ml-auto">
                          <SelectValue placeholder="Please select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="product">
                            <span>Product</span>
                          </SelectItem>
                          <SelectItem value="service">
                            <span>Service</span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {productServiceFormQuestions.map((q) => (
                <TextAreaInput
                  key={q.field}
                  label={q.question}
                  control={form.control}
                  name={q.field as keyof ProductServiceFormValue}
                />
              ))}
            </form>
          </Card>

          {!isReviewApplicationStep(step) && (
            <Button
              disabled={!form.formState.isValid}
              onClick={form.handleSubmit(onSubmit)}
            >
              Next <ArrowRight className="ml-1 w-4" />
            </Button>
          )}
        </Form>
      </div>
    </div>
  )
}
