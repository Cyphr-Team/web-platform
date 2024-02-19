import { ASSETS } from "@/assets"
import { LoanProgramData } from "./type"

const ALTCAP_ARTCAP_EXPRESS: LoanProgramData = {
  id: "artcap-express",
  type: "Microloan",
  name: "ARTcap Express",
  loanAmountRange: "Up to",
  amount: 25000,
  heroImage: ASSETS.artCapExpressHeroImg,
  meta: {
    term: "Term: 3 - 5 years",
    rate: "Rate: Fixed at 9%",
    collateralRequired: "No collateral required",
    minimumCreditScore: "No minimum credit score required",
    decisionTime: "Decision in 5 - 7 business days"
  },
  description:
    "Artists and creatives serve vital roles in our communities but have historically lacked access to flexible, patient capital. AltCap's ARTcap microloan was designed by professional artists to meet the needs of artists and their businesses. ARTcap loans are for creatives in every discipline and at any stage of growth.",
  faqs: {
    about:
      "New in 2023, ARTcap Express will allow artists and creatives in Missouri, Kansas and Texas to quickly access small-dollar loans under $10,000.",
    eligibility:
      "We work with creatives in every discipline and at any stage of growth. If you’re not sure which loan is right for you, schedule a time to consult with one of our Artist Coaches at coaches@altcap.org",
    loan_terms: `An ARTCap Express loan provides artists and creatives in Missouri, Kansas, or Texas with $1,000 to $10,000. Apply with ARTcap Express links lower in this page.

For ARTcap Express, applicants must have a minimum credit score of 600 and lending decisions can be made within 5-7 business days. Interest rates are fixed at 9% with 3–5-year terms. No collateral is required.`,
    fees: `For ARTcap loans over $10,000, applicants will be charged an origination fee of 4% depending on your loan amount. Other fees may include UCC filings, vehicle lien filings, or title recording fees.

ARTcap Express loans under $10,000, applicants will only be charged an origination fee of 5%.
      `,
    how_to_get_started: `For AltCap Express loans under $10,000, select your state below and click Apply Now and for loans over $10,000 select Begin the Loan Process to submit an Intake Form.

If you need more assistance or have additional questions, you can contact one of our Artist Coaches at coaches@altcap.org.`,
    "Para asistencia en español":
      "Si necesita un préstamo para pequeñas empresas y necesita ayuda en español, comuníquese con Karina Lopez al (833) 549-2890 o karina@altcap.org.",
    required_documents: `1. One form of Picture ID
2. Resume / Portfolio / Work Experience
3. Most recent year of both Business and Personal Tax Returns including all schedules
4. Two most recent paystubs (if applicable)
5. Fictitious Name Certification (for Sole Proprietors)

Applicants with registered businesses will also be required to submit (if applicable):

1. EIN Tax Forms
2. 3 months business bank statements
3. Business tax returns and debt schedule
4. Certificate of Good Standing and Articles of Organization (for LLCs)
5. Operating Agreement (for LLCs) or By-Laws (for Corporations)`
  }
}

const ALTCAP_SMALL_BUSINESS_LOAN: LoanProgramData = {
  id: "small-business-loans",
  type: "SMB",
  name: "Small Business Loans",
  loanAmountRange: "Up to",
  amount: 250000,
  meta: {
    term: "Term: 3 years",
    rate: "Rate: Fixed, up to 12.5%",
    collateralRequired: "No collateral required",
    minimumCreditScore: "No minimum credit score required",
    decisionTime: "Decision in 15 business days"
  }
}

const ALTCAP_REVENUE_BASED_FINANCING: LoanProgramData = {
  id: "revenue-based-financing",
  type: "SMB",
  name: "Revenue-Based Financing",
  loanAmountRange: "Up to",
  amount: "1.5x revenue",
  meta: {
    term: "Term: 60 months",
    rate: "Rate: Capped at 20% APY/APR",
    payment: "Payment: 8% of total monthly revenue",
    collateralRequired: "No minimum credit score required",
    decisionTime: "Decision in 15 business days"
  }
}

const ALTCAP_NEW_MARKETS_TAX_CREDITS: LoanProgramData = {
  id: "new-markets-tax-credits",
  type: "Community Projects",
  name: "New Markets Tax Credits",
  loanAmountRange: "",
  amount: "Project-based",
  meta: {
    term: "Term: 84 months",
    rate: "Rate: Below market interest rate",
    payment: "Payment: Interest-only payments",
    collateralRequired: "Loan-to-Value (LTV): 125% on average",
    decisionTime: "DSCR: Lower than standard 1.0 "
  }
}

const ALTCAP_LOAN_PROGRAMS: LoanProgramData[] = [
  ALTCAP_ARTCAP_EXPRESS,
  ALTCAP_SMALL_BUSINESS_LOAN,
  ALTCAP_REVENUE_BASED_FINANCING,
  ALTCAP_NEW_MARKETS_TAX_CREDITS
]

export { ALTCAP_LOAN_PROGRAMS }
