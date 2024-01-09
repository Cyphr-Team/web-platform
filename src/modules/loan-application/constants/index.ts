import { Icons } from "@/components/ui/icons"
import { NavItem } from "@/types"
import { APP_PATH } from "@/constants"

export const navItems: NavItem[] = [
  {
    title: "Onboarding",
    href: APP_PATH.LOAN_APPLICATION,
    icon: Icons.route,
    label: "Onboarding"
  }
]

export const TEXTS = {
  title: "ARTCap Express Loan Application",
  supportingText: `Submit the following form if you are an artist or creative seeking $1,000 - $10,000 in business financing and you live in either Missouri, Kansas, or Texas. \n
  If you do not meet these requirements and you are still interested in acquiring a loan, please contact info@altcap.org or call (833) 549-2890.\n
  The information you provide in this application will be reviewed by our lending team and held strictly confidential.`,
  buttonText: `Start Application Process`
}
