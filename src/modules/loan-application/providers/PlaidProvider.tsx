import {
  type Dispatch,
  type PropsWithChildren,
  useMemo,
  useReducer
} from "react"
import { createContext } from "use-context-selector"
import { type PlaidAction, type PlaidState } from "../constants"
import { type LoanApplicationBankAccount } from "@/modules/loan-application/constants/type"
import { transformToConnectedAccounts } from "@/modules/loan-application/hooks/form-cash-flow/useQueryGetPlaidConnectedBankAccountsByApplicationId.ts"

const initialState: PlaidState = {
  linkSuccess: false,
  isItemAccess: true,
  isPaymentInitiation: false,
  linkToken: "", // Don't set to null or error message will show up briefly when site loads
  accessToken: null,
  itemId: null,
  itemIds: [],
  fetchedItemIds: [],
  isError: false,
  backend: true,
  products: ["transactions"],
  linkTokenError: {
    errorType: "",
    errorCode: "",
    errorMessage: ""
  },
  isConnecting: false,
  institutions: []
}

interface PlaidContext extends PlaidState {
  dispatch: Dispatch<PlaidAction>
  connectedAccounts: LoanApplicationBankAccount[]
}

export const PlaidContext = createContext<PlaidContext>(
  initialState as PlaidContext
)

const { Provider } = PlaidContext

const reducer = (state: PlaidState, action: PlaidAction): PlaidState => {
  switch (action.type) {
    case "SET_STATE": {
      const newItemIds = action.state.itemId
        ? [...new Set([...state.itemIds, action.state.itemId])]
        : action.state.itemIds ?? state.itemIds

      return { ...state, ...action.state, itemIds: newItemIds }
    }
    default:
      return { ...state }
  }
}

export function PlaidProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const connectedAccounts = useMemo((): LoanApplicationBankAccount[] => {
    return transformToConnectedAccounts(state.institutions)
  }, [state.institutions])

  return (
    <Provider value={{ ...state, connectedAccounts, dispatch }}>
      {children}
    </Provider>
  )
}
