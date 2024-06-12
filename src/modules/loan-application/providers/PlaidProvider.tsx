import { useReducer, Dispatch, ReactNode } from "react"
import { createContext } from "use-context-selector"
import { PlaidAction, PlaidState } from "../constants"

const initialState: PlaidState = {
  linkSuccess: false,
  isItemAccess: true,
  isPaymentInitiation: false,
  linkToken: "", // Don't set to null or error message will show up briefly when site loads
  accessToken: null,
  itemId: null,
  isError: false,
  backend: true,
  products: ["transactions"],
  linkTokenError: {
    errorType: "",
    errorCode: "",
    errorMessage: ""
  },
  institutions: []
}

interface PlaidContext extends PlaidState {
  dispatch: Dispatch<PlaidAction>
}

export const PlaidContext = createContext<PlaidContext>(
  initialState as PlaidContext
)

const { Provider } = PlaidContext

const reducer = (state: PlaidState, action: PlaidAction): PlaidState => {
  switch (action.type) {
    case "SET_STATE":
      return { ...state, ...action.state }
    default:
      return { ...state }
  }
}

export const PlaidProvider: React.FC<{ children: ReactNode }> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <Provider value={{ ...state, dispatch }}>{props.children}</Provider>
}
