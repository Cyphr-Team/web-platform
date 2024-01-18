import { useEffect, useState } from "react"

type props = {
  initialCount: number
  isStart: boolean
}

export const useCountdown = ({ initialCount, isStart }: props) => {
  const [count, setCount] = useState(initialCount)

  useEffect(() => {
    if (!isStart) return

    const intervalId = setInterval(() => {
      setCount((preCount) => Math.max(preCount - 1, 0))
    }, 1000)

    return () => clearInterval(intervalId)
  }, [isStart])

  return { count }
}
