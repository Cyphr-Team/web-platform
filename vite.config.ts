import react from "@vitejs/plugin-react"
import { createRequire } from "node:module"
import path from "path"
import { defineConfig, normalizePath } from "vite"
import { viteStaticCopy } from "vite-plugin-static-copy"

/**
 * Support for non-latin characters
 * https://github.com/wojtekmaj/react-pdf?tab=readme-ov-file#support-for-non-latin-characters
 */
const require = createRequire(import.meta.url)
const cMapsDir = normalizePath(
  path.join(path.dirname(require.resolve("pdfjs-dist/package.json")), "cmaps")
)
const standardFontsDir = normalizePath(
  path.join(
    path.dirname(require.resolve("pdfjs-dist/package.json")),
    "standard_fonts"
  )
)

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: cMapsDir, dest: "" },
        { src: standardFontsDir, dest: "" }
      ]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
})
