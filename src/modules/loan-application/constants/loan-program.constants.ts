import { ASSETS } from "@/assets"
import { LoanProgramData } from "./type"

const ALTCAP_ARTCAP_EXPRESS: LoanProgramData = {
  id: "artcap-express",
  type: "Microloan",
  name: "micro Loan Program",
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
    how_to_get_started: `For AltCap Express loans under $10,000, select your state below and click Start Application and for loans over $10,000 select Begin the Loan Process to submit an Intake Form.

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
  },
  contact: {
    mail: "coaches@altcap.org",
    phone: "(833) 549-2890",
    location: "300 E 39th St, Suite 3G, Kansas City, MO 64111"
  },
  isUnderConstruction: false
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
  },
  description:
    "AltCap believes that small businesses can create vibrant, thriving communities. Our alternative approach to financing allows us to support small businesses that other lenders overlook — regardless of their size or industry. We lend flexible, patient capital and tailor financial solutions to meet entrepreneurs where they’re at.",
  faqs: {
    terms:
      "AltCap provides entrepreneurs $5,000 to $250,000 in debt capital to launch, operate or grow their micro-enterprise or small business. Interest rates are fixed rates up to 12.5% with 3-year terms.",
    eligibility:
      "Eligible businesses can be from any industry and at any stage of the business life cycle—from start-up to mature.  As a Community Development Financial Institution (CDFI), AltCap focuses its capital deployment to entrepreneurs who have been overlooked by mainstream financial institutions. An AltCap Business Development Officer can help you decide if a loan is right for your business.",
    locations:
      "We currently serve small businesses in Colorado, Kansas, Missouri, Nebraska, and Texas.  Our affiliate partner, AltCap California, provides services in California.",
    fees: "AltCap charges an origination fee of 4% depending on your loan amount. Other fees may include UCC filings, servicing fees, vehicle lien filings, or title recording fees.",
    "Compare AltCap's rates":
      "As a non-profit CDFI, AltCap strives to provide competitive rates for all our loans.",
    how_we_set_our_rates: `Our interest rates are based on The Federal Reserve sets, plus 4%. The prime rate is the interest rate commercial banks charge their most creditworthy customers. The Federal Reserve sets the federal funds rate which serves as the basis for the prime rate, which is the starting point for other interest rates.

Although the Federal Reserve has no direct role in setting the prime rate, many banks choose to set their prime rates based partly on the target level of the federal funds rate, which is the rate that banks charge each other for short-term loans.`,
    "Para asistencia en español":
      "Si necesita un préstamo para pequeñas empresas y necesita ayuda en español, comuníquese con Karina Lopez al (833) 549-2890 o karina@altcap.org.",
    questions_about_my_existing_altCap_loan: `If you have an existing AltCap loan and have questions about your loan terms or if you need to update your information, please contact Viva Young at 816-269-7809 or viva@altcap.org.
      
If you need to make a payment on your existing AltCap loan, please contact Viva Young at 816-269-7809 or viva@altcap.org.`,
    how_to_get_started: `Small business owners who have questions about the process should contact a Business Development Officer at info@altcap.org or (833) 549-2890.
    
If you are ready to begin the process, select the Apply button below and follow the directions to submit an Intake Form.`,
    required_documents: `To apply for a small business loan, you will be asked to provide the following documents:

Personal Documentation:
• Two forms of ID (each signer) – One with a picture other with a name only  

Business Documentation:
• Business Plan (if the business is under one year in operation)  

• EIN (Tax ID) Form  

• Articles of Organization / Incorporation  

• Certificate of Good Standing 

• Operating Agreement (for LLC) or By-Laws (for Corporations)  

• Business Insurance/Liability Insurance 

Financial Documentation:
• Two years of personal tax returns including all schedules and 1099s  

• Income Statement, Balance Sheet, and Cash Flow Statement (projections)  

• Business Debt Schedule  

• Last three months of personal and business bank statements. Startups should provide a business plan and financial projections in lieu of historical financial statements.  
`
  },
  contact: {
    mail: "info@altcap.org",
    phone: "(833) 549-2890",
    location: "300 E 39th St, Suite 3G, Kansas City, MO 64111"
  },
  isUnderConstruction: true
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
  },
  description:
    "Revenue-Based Financing allows small businesses to raise funds by pledging a percentage of future, ongoing revenues in exchange for capital provided by a lender. Revenue-Based Financing is distinct from debt financing — interest is not paid on an outstanding loan balance and there are no fixed payments. Instead, payments are proportional to a firm’s performance, offering businesses a flexible, patient source of financing.",
  faqs: {
    terms: `These terms are subject to change.

• Term: 60 months

• Multiple: 1.5x
    
• Monthly payment: 8% of total monthly revenue
    
• Cap APY/APR: 20%
    
• Origination Fee: 4%
    
• No prepayment penalty`,
    eligibility: `Eligible businesses can be from any industry and at any stage of the business life cycle — from startup to mature — however AltCap is initially targeting entrepreneurs that are looking for capital to fuel significant growth.  Revenue-based financing is not meant to use to finance normal working capital needs — i.e. to maintain existing levels of business activity — or to refinance existing debt.

An AltCap Business Development Officer can help you decide if revenue-based financing is right for your business.`,
    "Para asistencia en español":
      "Si necesita un préstamo para pequeñas empresas y necesita ayuda en español, comuníquese con Karina Lopez al (833) 549-2890 o karina@altcap.org.",
    questions_about_my_existing_altCap_loan: `If you have an existing revenue-based financing loan and have questions about your loan terms or if you need to update your information, please contact Viva Young at 816-269-7809 or viva@altcap.org.

If you need to make a payment on your existing AltCap loan, please contact Viva Young at 816-269-7809 or viva@altcap.org.`,
    how_to_apply: `Small business owners who have questions about the application process should contact a Business Development Officer at info@altcap.org or (833) 549-2890.

If you are ready to begin the process, select the Start the Process button below and follow the directions to submit an Intake Form.`,
    required_documents: `To apply for a revenue-based financing, you will be asked to provide the following documents: 

Personal Documentation
• Two forms of ID (each signer) – One with a picture other with a name only  

Business Documentation
• Business Plan (if the business is under one year in operation)  

• EIN (Tax ID) Form  

• Articles of Organization / Incorporation

• Certificate of Good Standing 

• Operating Agreement (for LLC) or By-Laws (for Corporations)  

• Business Insurance/Liability Insurance  
    
Financial Documentation
• Three years of financial 
    
Projections
• Last three years of business tax
    
Returns including all schedules   
• Last three years of financial
    
Statements
• Business Debt Schedule
    
• Last six months of business bank statements`
  },
  contact: {
    mail: "info@altcap.org",
    phone: "(833) 549-2890",
    location: "300 E 39th St, Suite 3G, Kansas City, MO 64111"
  },
  isUnderConstruction: true
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
  },
  description:
    "The New Markets Tax Credit (NMTC) program fuels community-impact projects by incentivizing private investment in economically-distressed communities. As a certified Community Development Entity, AltCap has been awarded nearly $220 million in NMTC allocation and has facilitated more than $250 million in NMTC transactions in Missouri and Kansas. We also provide comprehensive consulting services, ranging from educational sessions and allocation sourcing to transaction management and compliance.",
  faqs: {
    eligibility: `•	Businesses Ownership. Applicants can be for-profit or not-for-profit

•	Geographic. The business must be located in a low-income census tract. 
      
•	Business type. The business must NOT be one of the following, 1) Gaming, 2) Farming, 3) Liquor Store, 4) Massage Parlor, 5) Golf Course, or 6) Non-mixed-use rental housing`,
    loan_terms: `• Below market interest rate

•	No origination fees 

•	84-month interest-only payments 

•	Average LTV of 125% 

•	Non-traditional collateral: unsecured debt, negative pledge agreements, pledge of membership interest or collateral on non-related assets 

•	Lower than standard DSCR: 1.0 

•	Subordination when required by senior sources`,
    community_impact: `Proposed projects should provide some of the following community impacts:

•	Living wage jobs with benefits 

•	Be a minority-owned business 

•	Workforce development/on the job training 

•	Community services provided to low-income people, such as healthcare, childcare, substance abuse treatment, education, etc. 

•	Commercial goods and services provided to low-income people – healthy food, business incubation, commercial kitchens, etc. 

•	Below-market rental space`,
    time_line: `NMTC lenders operate on an annual cycle. They receive allocations of tax credits in the fall/early winter and look to deploy the credits to eligible projects the following year. 

It is never too early to reach out regarding a project’s eligibility and attractiveness for NMTC facilitated financing. Contact Jeff White to learn more jeff@altcap.org.`
  },
  contact: {
    mail: "jeff@altcap.org",
    phone: "(833) 549-2890",
    location: "300 E 39th St, Suite 3G, Kansas City, MO 64111"
  },
  isUnderConstruction: true
}

const ALTCAP_LOAN_PROGRAMS: LoanProgramData[] = [
  ALTCAP_ARTCAP_EXPRESS,
  ALTCAP_SMALL_BUSINESS_LOAN,
  ALTCAP_REVENUE_BASED_FINANCING,
  ALTCAP_NEW_MARKETS_TAX_CREDITS
]

export { ALTCAP_LOAN_PROGRAMS }
