const calculateLoanFee = (amount: number, fee: number) => {
  return (amount * fee) / 100
}

const calculateMonthlyPayment = (
  amount: number, // Loan amount
  interestRate: number, // Annual interest rate (in percentage)
  term: number // Loan term (in months)
) => {
  // Convert annual interest rate to decimal
  const rate = interestRate / 100

  // Convert annual interest rate to monthly interest rate
  const monthlyRate = rate / 12

  // Total number of payments (same as loan term in months)
  const totalPayments = term

  // Calculate the monthly payment using the formula
  // M = P * [ r(1 + r)^n ] / [ (1 + r)^n – 1]
  // M = monthly payment
  // P = principal loan amount
  // r = monthly interest rate
  // n = number of months required to repay the loan
  // Source: https://www.thebalance.com/loan-payment-calculations-315564
  const monthlyPayment =
    (amount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
    (Math.pow(1 + monthlyRate, totalPayments) - 1)

  // Return the calculated monthly payment
  return monthlyPayment
}

// Function to calculate the total interest paid over the term of a loan
const calculateTotalInterest = (
  amount: number, // Loan amount
  interestRate: number, // Annual interest rate (in percentage)
  term: number // Loan term (in months)
) => {
  // Calculate the monthly payment using the calculateMonthlyPayment function
  const monthlyPayment = calculateMonthlyPayment(amount, interestRate, term)

  // Calculate the total amount paid over the term (monthly payment times the number of months)
  const totalAmountPaid = monthlyPayment * term

  // Subtract the initial loan amount to get the total interest paid
  const totalInterestPaid = totalAmountPaid - amount

  // Return the total interest paid
  return totalInterestPaid
}

export { calculateLoanFee, calculateMonthlyPayment, calculateTotalInterest }
