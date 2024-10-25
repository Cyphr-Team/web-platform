import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import {
  productServiceFormSchema,
  type ProductServiceFormValue
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
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { TextAreaInput } from "@/shared/organisms/form/TextAreaInput"
import { productServiceFormQuestions } from "./constants"
import { FormSubmitButton } from "../../../atoms/FormSubmitButton"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout"

export function ProductServiceForm() {
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
    values: defaultValues
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
    <FormLayout>
      <Form {...form}>
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
                    value={field.value}
                    onValueChange={(value) => {
                      field.onBlur()
                      field.onChange(value.toString())
                    }}
                  >
                    <SelectTrigger className="col-span-6 xl:col-span-2 max-w-40 xl:col-end-7 xl:ml-auto text-sm">
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
              control={form.control}
              label={q.question}
              name={q.field as keyof ProductServiceFormValue}
            />
          ))}
        </form>

        {!isReviewApplicationStep(step) && (
          <FormSubmitButton
            isDisabled={!form.formState.isValid}
            onSubmit={form.handleSubmit(onSubmit)}
          />
        )}
      </Form>
    </FormLayout>
  )
}
