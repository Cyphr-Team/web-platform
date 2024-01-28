export enum LOAN_TYPE {
  MICROLOAN = "Microloan"
}

export interface LoanProgram {
  id: string
  institutionId: string
  name: string
  type: string
  createdAt: string
}
