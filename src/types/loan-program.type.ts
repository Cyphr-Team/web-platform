// ENUM
enum LoanType {
  MICROLOAN = "Microloan"
}

export { LoanType }

// INTERFACE
interface LoanProgram {
  id: string
  institutionId: string
  name: string
  type: string
  createdAt: string
}

export type { LoanProgram }
