import type { AssessmentResponse } from "@/modules/loanready/types/assessment.ts"
import { LoanReadyPlanEnum } from "@/modules/loanready/constants/package.ts"
import { LoanApplicationStatus } from "@/types/loan-application.type.ts"
import { RatingLevel } from "@/modules/assessment/interface/Rating/type.ts"
import { LoanType } from "@/types/loan-program.type.ts"

export const MOCK_APPLICATIONS: AssessmentResponse[] = [
  {
    id: "assessment-1",
    applicationIdNumber: 1001,
    businessName: "Tech Solutions",
    plan: LoanReadyPlanEnum.PLUS,
    email: "user1@example.com",
    requestedLoanAmount: 50000,
    createdAt: "2024-12-01T10:00:00.000Z",
    submittedAt: "2024-12-05T10:00:00.000Z",
    status: LoanApplicationStatus.SUBMITTED,
    scoreLevel: RatingLevel.GOOD,
    loanProgramId: "program-1",
    programType: LoanType.MICRO
  },
  {
    id: "assessment-2",
    applicationIdNumber: 1002,
    businessName: "Green Ventures",
    plan: LoanReadyPlanEnum.BASIC,
    email: "user2@example.com",
    createdAt: "2024-12-02T11:00:00.000Z",
    submittedAt: undefined,
    status: LoanApplicationStatus.DRAFT,
    scoreLevel: RatingLevel.FAIR,
    loanProgramId: "program-2",
    programType: LoanType.READINESS
  },
  {
    id: "assessment-3",
    applicationIdNumber: 1003,
    businessName: "Solar Energy Co.",
    plan: LoanReadyPlanEnum.PLUS,
    email: "user3@example.com",
    requestedLoanAmount: 30000,
    createdAt: "2024-11-29T08:30:00.000Z",
    submittedAt: "2024-12-03T14:00:00.000Z",
    status: LoanApplicationStatus.SUBMITTED,
    scoreLevel: RatingLevel.VERY_GOOD,
    loanProgramId: "program-3",
    programType: LoanType.LENDERS_FORUM
  },
  {
    id: "assessment-4",
    applicationIdNumber: 1004,
    businessName: "Startup Co.",
    plan: LoanReadyPlanEnum.BASIC,
    email: "user4@example.com",
    requestedLoanAmount: 20000,
    createdAt: "2024-12-03T09:15:00.000Z",
    submittedAt: undefined,
    status: LoanApplicationStatus.DRAFT,
    scoreLevel: RatingLevel.POOR,
    loanProgramId: "program-4",
    programType: LoanType.MICRO
  },
  {
    id: "assessment-5",
    applicationIdNumber: 1005,
    businessName: "NextGen Tech",
    plan: LoanReadyPlanEnum.PLUS,
    email: "user5@example.com",
    requestedLoanAmount: 75000,
    createdAt: "2024-12-04T12:00:00.000Z",
    submittedAt: "2024-12-06T16:00:00.000Z",
    status: LoanApplicationStatus.SUBMITTED,
    scoreLevel: RatingLevel.EXCELLENT,
    loanProgramId: "program-5",
    programType: LoanType.READINESS
  },
  {
    id: "assessment-6",
    applicationIdNumber: 1006,
    businessName: "Eco Farming",
    plan: LoanReadyPlanEnum.BASIC,
    email: "user6@example.com",
    requestedLoanAmount: 45000,
    createdAt: "2024-12-01T14:00:00.000Z",
    submittedAt: "2024-12-03T15:00:00.000Z",
    status: LoanApplicationStatus.SUBMITTED,
    scoreLevel: RatingLevel.GOOD,
    loanProgramId: "program-6",
    programType: LoanType.LENDERS_FORUM
  },
  {
    id: "assessment-7",
    applicationIdNumber: 1007,
    businessName: "Blue Ocean Group",
    plan: LoanReadyPlanEnum.PLUS,
    email: "user7@example.com",
    requestedLoanAmount: 60000,
    createdAt: "2024-12-03T10:30:00.000Z",
    submittedAt: undefined,
    status: LoanApplicationStatus.DRAFT,
    scoreLevel: RatingLevel.FAIR,
    loanProgramId: "program-7",
    programType: LoanType.MICRO
  },
  {
    id: "assessment-8",
    applicationIdNumber: 1008,
    businessName: "Urban Tech Solutions",
    plan: LoanReadyPlanEnum.BASIC,
    email: "user8@example.com",
    createdAt: "2024-11-28T11:00:00.000Z",
    submittedAt: undefined,
    status: LoanApplicationStatus.DRAFT,
    scoreLevel: RatingLevel.POOR,
    loanProgramId: "program-8",
    programType: LoanType.READINESS
  },
  {
    id: "assessment-9",
    applicationIdNumber: 1009,
    businessName: "Smart Builders",
    plan: LoanReadyPlanEnum.PLUS,
    email: "user9@example.com",
    requestedLoanAmount: 80000,
    createdAt: "2024-12-02T12:00:00.000Z",
    submittedAt: "2024-12-04T13:00:00.000Z",
    status: LoanApplicationStatus.SUBMITTED,
    scoreLevel: RatingLevel.EXCELLENT,
    loanProgramId: "program-9",
    programType: LoanType.LENDERS_FORUM
  },
  {
    id: "assessment-10",
    applicationIdNumber: 1010,
    businessName: "Tech Innovators",
    plan: LoanReadyPlanEnum.BASIC,
    email: "user10@example.com",
    requestedLoanAmount: 25000,
    createdAt: "2024-12-03T10:00:00.000Z",
    submittedAt: undefined,
    status: LoanApplicationStatus.DRAFT,
    scoreLevel: RatingLevel.FAIR,
    loanProgramId: "program-10",
    programType: LoanType.MICRO
  },
  {
    id: "assessment-11",
    applicationIdNumber: 1011,
    businessName: "Green Leaf Ltd",
    plan: LoanReadyPlanEnum.PLUS,
    email: "user11@example.com",
    requestedLoanAmount: 70000,
    createdAt: "2024-11-30T09:00:00.000Z",
    submittedAt: "2024-12-02T11:00:00.000Z",
    status: LoanApplicationStatus.SUBMITTED,
    scoreLevel: RatingLevel.GOOD,
    loanProgramId: "program-11",
    programType: LoanType.READINESS
  },
  {
    id: "assessment-12",
    applicationIdNumber: 1012,
    businessName: "New Vision Co.",
    plan: LoanReadyPlanEnum.BASIC,
    email: "user12@example.com",
    requestedLoanAmount: 55000,
    createdAt: "2024-12-04T10:00:00.000Z",
    submittedAt: undefined,
    status: LoanApplicationStatus.DRAFT,
    scoreLevel: RatingLevel.FAIR,
    loanProgramId: "program-12",
    programType: LoanType.LENDERS_FORUM
  },
  {
    id: "assessment-13",
    applicationIdNumber: 1013,
    businessName: "Farming Innovations",
    plan: LoanReadyPlanEnum.PLUS,
    email: "user13@example.com",
    createdAt: "2024-11-27T08:00:00.000Z",
    submittedAt: undefined,
    status: LoanApplicationStatus.DRAFT,
    scoreLevel: RatingLevel.POOR,
    loanProgramId: "program-13",
    programType: LoanType.MICRO
  },
  {
    id: "assessment-14",
    applicationIdNumber: 1014,
    businessName: "Urban Green Co.",
    plan: LoanReadyPlanEnum.BASIC,
    email: "user14@example.com",
    requestedLoanAmount: 65000,
    createdAt: "2024-12-03T09:00:00.000Z",
    submittedAt: "2024-12-06T10:00:00.000Z",
    status: LoanApplicationStatus.SUBMITTED,
    scoreLevel: RatingLevel.VERY_GOOD,
    loanProgramId: "program-14",
    programType: LoanType.READINESS
  },
  {
    id: "assessment-15",
    applicationIdNumber: 1015,
    businessName: "Bright Ideas",
    plan: LoanReadyPlanEnum.PLUS,
    email: "user15@example.com",
    requestedLoanAmount: 90000,
    createdAt: "2024-12-05T08:30:00.000Z",
    submittedAt: undefined,
    status: LoanApplicationStatus.DRAFT,
    scoreLevel: RatingLevel.GOOD,
    loanProgramId: "program-15",
    programType: LoanType.LENDERS_FORUM
  },
  {
    id: "assessment-16",
    applicationIdNumber: 1016,
    businessName: "Green Planet",
    plan: LoanReadyPlanEnum.BASIC,
    email: "user16@example.com",
    requestedLoanAmount: 40000,
    createdAt: "2024-12-02T12:30:00.000Z",
    submittedAt: "2024-12-04T14:00:00.000Z",
    status: LoanApplicationStatus.SUBMITTED,
    scoreLevel: RatingLevel.EXCELLENT,
    loanProgramId: "program-16",
    programType: LoanType.READINESS
  },
  {
    id: "assessment-17",
    applicationIdNumber: 1017,
    businessName: "Solar Future",
    plan: LoanReadyPlanEnum.PLUS,
    email: "user17@example.com",
    requestedLoanAmount: 30000,
    createdAt: "2024-11-30T11:00:00.000Z",
    submittedAt: undefined,
    status: LoanApplicationStatus.DRAFT,
    scoreLevel: RatingLevel.FAIR,
    loanProgramId: "program-17",
    programType: LoanType.MICRO
  },
  {
    id: "assessment-18",
    applicationIdNumber: 1018,
    businessName: "Smart Farms",
    plan: LoanReadyPlanEnum.BASIC,
    email: "user18@example.com",
    requestedLoanAmount: 70000,
    createdAt: "2024-12-03T11:15:00.000Z",
    submittedAt: "2024-12-07T11:30:00.000Z",
    status: LoanApplicationStatus.SUBMITTED,
    scoreLevel: RatingLevel.VERY_GOOD,
    loanProgramId: "program-18",
    programType: LoanType.LENDERS_FORUM
  },
  {
    id: "assessment-19",
    applicationIdNumber: 1019,
    businessName: "Bright Technologies",
    plan: LoanReadyPlanEnum.PLUS,
    email: "user19@example.com",
    requestedLoanAmount: 65000,
    createdAt: "2024-11-28T12:00:00.000Z",
    submittedAt: undefined,
    status: LoanApplicationStatus.DRAFT,
    scoreLevel: RatingLevel.POOR,
    loanProgramId: "program-19",
    programType: LoanType.READINESS
  },
  {
    id: "assessment-20",
    applicationIdNumber: 1020,
    businessName: "Future Builders",
    plan: LoanReadyPlanEnum.BASIC,
    email: "user20@example.com",
    requestedLoanAmount: 60000,
    createdAt: "2024-12-01T13:00:00.000Z",
    submittedAt: "2024-12-05T13:30:00.000Z",
    status: LoanApplicationStatus.SUBMITTED,
    scoreLevel: RatingLevel.EXCELLENT,
    loanProgramId: "program-20",
    programType: LoanType.MICRO
  }
]
