import {
  type Block,
  FieldType,
  FormTemplate
} from "@/modules/form-template/components/templates/FormTemplate.tsx"
import { memo, useCallback } from "react"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils.ts"
import { Card } from "@/components/ui/card.tsx"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { Button } from "@/components/ui/button.tsx"
import RHFCurrencyInput from "@/modules/form-template/components/molecules/RHFCurrencyInput.tsx"

const enum FormField {
  BANK_NUMBER = "bankNumber",
  BANK_NAME = "bankName",
  EXPIRES = "exp",
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  BALANCE = "BALANCE"
}

const schema = z.object({
  [FormField.FIRST_NAME]: z.string(),
  [FormField.LAST_NAME]: z.string(),
  [FormField.BANK_NUMBER]: z.string(),
  [FormField.BANK_NAME]: z.string(),
  [FormField.EXPIRES]: z.string(),
  [FormField.BALANCE]: z.number().optional()
})

const blocks: Block[] = [
  {
    type: FieldType.TEXT,
    name: FormField.FIRST_NAME,
    props: {
      label: "First name",
      placeholder: "i.e: Cu Khoai Mon",
      className: "col-span-6",
      required: true
    }
  },
  {
    type: FieldType.TEXT,
    name: FormField.LAST_NAME,
    props: {
      label: "Last name",
      placeholder: "i.e: Cu Khoai Mon",
      className: "col-span-6",
      required: true
    }
  },
  {
    type: FieldType.MASK,
    name: FormField.BANK_NUMBER,
    props: {
      label: "Bank number",
      pattern: "0000 0000 0000 00000",
      required: true
    }
  },
  {
    type: FieldType.TEXT,
    name: FormField.BANK_NAME,
    props: {
      label: "Bank Name",
      required: true
    }
  },
  {
    type: FieldType.MASK,
    name: FormField.EXPIRES,
    props: {
      label: "Expires Date",
      pattern: "00-0000",
      className: "col-span-6",
      placeholder: "MM-YYYY",
      required: true
    }
  }
]

function KybFormV2() {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur"
  })

  const onSubmit = form.handleSubmit(() => {
    // console.log(data)
  })

  const renderSubmitButton = useCallback(
    () => (
      <Button className="w-full" type="submit">
        Submit
      </Button>
    ),
    []
  )

  return (
    <Card
      className={cn(Object.values(layout))}
      id={LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION}
    >
      <FormTemplate
        blocks={blocks}
        className="grid grid-cols-12"
        form={form}
        renderSubmit={renderSubmitButton}
        onSubmit={onSubmit}
      >
        <div className="col-span-6">
          <RHFCurrencyInput
            label="Enter your balance"
            name={FormField.BALANCE}
            styleProps={{
              inputClassName: "col-span-4"
            }}
          />
        </div>
        <div className="col-span-12 mb-2 py-2 text-center text-2xl">
          That is another way to render custom field
        </div>
      </FormTemplate>
    </Card>
  )
}

export default memo(KybFormV2)

const layout = {
  base: "border bg-card text-card-foreground shadow-sm flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6 max-w-screen-sm",
  sm: "",
  md: "md:col-span-6 md:col-start-2 md:mx-auto md:w-full",
  lg: ""
}
