import { useReducer } from "react"

// Define loading states as TypeScript enum
export enum LoadingStates {
  END = "END",
  LOADING = "LOADING",
  FINISHING = "FINISHING"
}

interface LoadingState {
  status: LoadingStates
}

type LoadingAction =
  | { type: LoadingStates.END }
  | { type: LoadingStates.LOADING }
  | { type: LoadingStates.FINISHING }

const loadingReducer = (
  state: LoadingState,
  action: LoadingAction
): LoadingState => {
  switch (action.type) {
    case LoadingStates.END:
      return { status: LoadingStates.END }
    case LoadingStates.LOADING:
      return { status: LoadingStates.LOADING }
    case LoadingStates.FINISHING:
      return { status: LoadingStates.FINISHING }
    default:
      return state
  }
}

export const useLoadingFile = () => {
  const [loadingState, dispatch] = useReducer(loadingReducer, {
    status: LoadingStates.END
  })

  const startLoading = () => {
    dispatch({ type: LoadingStates.LOADING })
  }

  const finishLoading = () => {
    dispatch({ type: LoadingStates.FINISHING })
  }

  const endLoading = () => {
    dispatch({ type: LoadingStates.END })
  }

  return {
    loadingState: loadingState.status,
    startLoading,
    finishLoading,
    endLoading
  }
}
