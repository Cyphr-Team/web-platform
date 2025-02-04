import type React from "react"
import { useEffect } from "react"

// Custom hook for click outside detection
const useClickOutside = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  callback: VoidFunction
): void => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside)

    // Remove event listener on cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref, callback]) // Important: Add callback to the dependency array
}

export default useClickOutside
