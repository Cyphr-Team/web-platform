import { LoanApplicationStatus } from "@/types/loan-application.type"

const isRound = (
  rounds: LoanApplicationStatus[],
  currentStatus?: LoanApplicationStatus
): boolean => {
  if (!currentStatus) return false

  return rounds.includes(currentStatus.toUpperCase() as LoanApplicationStatus)
}

const isRound1 = (currentStatus?: LoanApplicationStatus) => {
  return isRound(
    [
      LoanApplicationStatus.ROUND_1,
      LoanApplicationStatus.ELIMINATED_AFTER_ROUND_1
    ],
    currentStatus
  )
}

const isRound2 = (currentStatus?: LoanApplicationStatus) => {
  return isRound(
    [
      LoanApplicationStatus.ROUND_2,
      LoanApplicationStatus.ELIMINATED_AFTER_ROUND_2
    ],
    currentStatus
  )
}

const isRound3 = (currentStatus?: LoanApplicationStatus) => {
  return isRound(
    [
      LoanApplicationStatus.ROUND_3,
      LoanApplicationStatus.ELIMINATED_AFTER_ROUND_3
    ],
    currentStatus
  )
}

const hasDecision = (currentStatus?: LoanApplicationStatus) => {
  return isRound(
    [LoanApplicationStatus.DENIED, LoanApplicationStatus.APPROVED],
    currentStatus
  )
}

const isAbleToViewScoreRound2 = (currentStatus?: LoanApplicationStatus) => {
  return (
    isRound2(currentStatus) ||
    isRound3(currentStatus) ||
    hasDecision(currentStatus)
  )
}

const isAbleToViewScoreRound1 = (currentStatus?: LoanApplicationStatus) => {
  return (
    isRound1(currentStatus) ||
    isAbleToViewScoreRound2(currentStatus) ||
    hasDecision(currentStatus)
  )
}

export { isAbleToViewScoreRound1, isAbleToViewScoreRound2 }
