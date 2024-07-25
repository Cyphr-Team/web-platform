import * as z from "zod"

const subdomainPattern =
  /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

export const onboardingForm = z.object({
  adminEmail: z.string().email({ message: "Enter a valid email address" }),
  name: z.string().min(1, { message: "Institution name is required." }),
  subdomain: z
    .string()
    .min(1, { message: "Institution subdomain is required." })
    .regex(subdomainPattern, "Enter a valid subdomain"),
  key: z.string().min(1, { message: "Key is required" }),
  logo: z.string().min(1, { message: "Logo is required" }),
  textLogo: z.string().min(1, { message: "Text logo is required" }),
  supportEmail: z.string().min(1, { message: "Support email is required" })
})

export type OnboardingFormValue = z.infer<typeof onboardingForm>
