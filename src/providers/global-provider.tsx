import { AppRouterProvider } from "./router-provider"
import { ThemeProvider } from "./theme-provider"

export function GlobalProvider() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppRouterProvider />
    </ThemeProvider>
  )
}
