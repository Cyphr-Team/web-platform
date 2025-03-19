export const useMutateRecurringCharge = () => {
  const mutateAsync = async (rawData: { id: string }) => {
    const action = rawData?.id?.length ? useSubmit : useUpdate

    return action()
  }

  return {
    mutateAsync
  }
}

const useSubmit = () => {
  return
}

const useUpdate = () => {
  return
}
