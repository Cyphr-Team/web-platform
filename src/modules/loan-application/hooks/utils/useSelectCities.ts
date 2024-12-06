import { capitalizeWords } from "@/utils"
import STATE_DATA from "@/shared/data/states.json"
import { useState } from "react"

export const getStateCode = (state: string) => {
  return STATE_DATA.find((s) => s.name === state)?.state_code ?? state
}

export const getStateName = (stateCode: string) => {
  return STATE_DATA.find((s) => s.state_code === stateCode)?.name ?? stateCode
}

export const useSelectCities = () => {
  const [state, setState] = useState<string>("")
  const [city, setCity] = useState<string>("")

  const handleChangeState = (value: string) => {
    setState(capitalizeWords(value))
    setCity("")
  }

  const handleChangeCity = (value: string) => {
    setCity(capitalizeWords(value))
  }

  return {
    handleChangeState,
    handleChangeCity,
    getStateCode,
    STATE_DATA,
    state,
    city
  }
}
