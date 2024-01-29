import { capitalizeWords } from "@/utils"
import STATE_DATA from "@/shared/data/states.json"
import { useState } from "react"

export const useSelectCities = () => {
  const [state, setState] = useState<string>("")
  const [city, setCity] = useState<string>("")

  const handleChangeState = (value: string) => {
    setState(value.toUpperCase())
    setCity("")
  }

  const handleChangeCity = (value: string) => {
    setCity(capitalizeWords(value))
  }

  const STATE_CITIES_DATA =
    STATE_DATA.find((s) => s.state_code === state)?.cities ?? []

  return {
    handleChangeState,
    handleChangeCity,
    STATE_CITIES_DATA,
    STATE_DATA,
    state,
    city
  }
}
