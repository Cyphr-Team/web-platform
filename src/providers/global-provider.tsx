import { Toaster } from "@/components/ui/sonner"
import { QueryProvider } from "./query-provider"
import { AppRouterProvider } from "./router-provider"
import { ThemeProvider } from "./theme-provider"

export function GlobalProvider() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryProvider>
        <AppRouterProvider />
        <Toaster position="top-right" />
      </QueryProvider>
    </ThemeProvider>
  )
}
