import { z } from "zod"

export const TransactionsFormSchema = z.object({
  transactions: z
    .array(
      z.object({
        id: z.string(),
        category: z.string(),
        accounts: z.string(),
        transaction: z.string(),
        primary: z.string(),
        total: z.string(),
        expenseCategory: z.string()
      })
    )
    .optional()
})

export const EMPTY_TRANSACTION_ITEM = {
  id: "",
  category: "",
  accounts: "",
  transaction: "",
  primary: "",
  total: "",
  expenseCategory: ""
}

export const TRANSACTIONS_DEFAULT_VALUE = {
  transactions: []
}

export type TransactionsFormValue = z.infer<typeof TransactionsFormSchema>
