import { Toaster } from "@/components/ui/sonner"
import { APP_CONFIGS } from "@/configs"
import { StytchB2BProvider } from "@stytch/nextjs/dist/b2b"
import { createStytchB2BUIClient } from "@stytch/nextjs/dist/b2b/index.ui"
import { HelmetProvider } from "react-helmet-async"
import { QueryProvider } from "./query-provider"
import { AppRouterProvider } from "./router-provider"
import { ThemeProvider } from "./theme-provider"

export function GlobalProvider() {
  const stytch = createStytchB2BUIClient(
    APP_CONFIGS.VITE_STYTCH_PUBLIC_TOKEN ?? ""
  )

  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <StytchB2BProvider stytch={stytch}>
          <QueryProvider>
            <AppRouterProvider />
            <Toaster position="top-right" />
          </QueryProvider>
        </StytchB2BProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
