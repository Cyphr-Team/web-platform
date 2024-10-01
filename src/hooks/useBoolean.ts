import React, { useCallback, useState } from "react"

// ----------------------------------------------------------------------

export interface UseBooleanReturn {
  value: boolean
  onTrue: () => void
  onFalse: () => void
  onToggle: () => void
  setValue: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Usage:
 * const error = useBoolean(true)
 *
 * <Button onClick={error.onTrue}>Set Error True</Button>
 * <Button onClick={error.onFalse}>Set Error False</Button>
 *
 * <div>{error.value ? "Error" : "no error"}</div>
 *
 * @param defaultValue
 */
export default function useBoolean(defaultValue?: boolean): UseBooleanReturn {
  const [value, setValue] = useState(!!defaultValue)

  const onTrue = useCallback(() => {
    setValue(true)
  }, [])

  const onFalse = useCallback(() => {
    setValue(false)
  }, [])

  const onToggle = useCallback(() => {
    setValue((prev) => !prev)
  }, [])

  return {
    value,
    onTrue,
    onFalse,
    onToggle,
    setValue
  }
}
