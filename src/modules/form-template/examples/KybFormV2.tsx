import {
  Block,
  FieldType,
  FormTemplate
} from "@/modules/form-template/components/templates/FormTemplate.tsx"
import { memo, useCallback, useState } from "react"

import * as z from "zod"
import { UseFormReturn } from "react-hook-form"

const enum FormField {
  BANK_NUMBER = "bankNumber",
  BANK_ACCOUNT = "bankAccount",
  BANK_NAME = "bankName",
  EXPIRES = "exp",
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  CURRENT_BALANCE = "currentBalance",
  DOB = "dob"
}

const schema = z.object({
  [FormField.FIRST_NAME]: z
    .string()
    .refine((value) => value.includes("Cu Khoai Mon"), {
      message: "First name must contain 'Cu Khoai Mon'"
    }),
  [FormField.LAST_NAME]: z
    .string()
    .refine((value) => value.includes("Cu Khoai Mon"), {
      message: "Last name must contain 'Cu Khoai Mon'"
    }),
  [FormField.DOB]: z.string(),
  [FormField.BANK_NUMBER]: z.string(),
  [FormField.BANK_ACCOUNT]: z.string(),
  [FormField.BANK_NAME]: z.string(),
  [FormField.EXPIRES]: z.string(),
  [FormField.CURRENT_BALANCE]: z.coerce
    .number()
    .gt(1000, { message: "Your balance must greater than 1000$" })
})

type FormValues = z.infer<typeof schema>

const blocks: Block[] = [
  {
    type: FieldType.TEXT,
    name: FormField.FIRST_NAME,
    props: {
      label: "First name",
      placeholder: "i.e: Cu Khoai Mon",
      className: "col-span-4",
      required: true
    }
  },
  {
    type: FieldType.TEXT,
    name: FormField.LAST_NAME,
    props: {
      label: "Last name",
      placeholder: "i.e: Cu Khoai Mon",
      className: "col-span-4",
      required: true
    }
  },
  {
    type: FieldType.CUSTOM,
    name: FormField.DOB,
    props: {
      label: "Date Of Bird",
      className: "col-span-4",
      required: true
    },
    render: (props) => {
      const { label, className } = props!
      return (
        <div className={className}>
          <div>{label}</div>
          <div className="text-xs">Created By Cu Khoai Mon</div>
        </div>
      )
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
    type: FieldType.SELECT,
    name: FormField.BANK_ACCOUNT,
    props: {
      label: "Bank account",
      className: "col-span-4",
      options: [
        { value: "vcb", label: "VCB" },
        { value: "agb", label: "Agribank" },
        { value: "sbb", label: "SBB" },
        { value: "kc88", label: "KC88" }
      ],
      required: true
    }
  },
  {
    type: FieldType.MASK,
    name: FormField.EXPIRES,
    props: {
      label: "Expires Date",
      pattern: "00-0000",
      className: "col-span-4",
      placeholder: "MM-YYYY"
    }
  },
  {
    type: FieldType.NUMBER,
    name: FormField.CURRENT_BALANCE,
    props: {
      label: "Current Balance",
      className: "col-span-4",
      suffix: "$"
    }
  }
]

const KybFormV2 = () => {
  const [count, setCount] = useState(0)

  const blockWithState: Block = {
    name: "CuKhoaiMon",
    type: FieldType.CUSTOM,
    render: () => {
      return (
        <div className="col-span-12">
          <div className="text-2xl">You clicked {count} times</div>
          <button onClick={() => setCount(count + 1)}>Click!</button>
        </div>
      )
    }
  }

  const onSubmit = useCallback(() => {
    console.log("KybFormV2 submitted")
  }, [])

  const onValidating = useCallback((methods: UseFormReturn<FormValues>) => {
    console.log("VALIDATING", methods.getValues())
  }, [])

  return (
    <FormTemplate
      title="Individual Information"
      className="grid grid-cols-12"
      schema={schema}
      blocks={[...blocks, blockWithState]}
      onSubmit={onSubmit}
      onValidating={onValidating}
    />
  )
}

export default memo(KybFormV2)
