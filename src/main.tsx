import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import "react-phone-number-input/style.css"

window.addEventListener("vite:preloadError", (e) => {
  // Refresh the page when load lazy import component
  // https://vitejs.dev/guide/build.html#load-error-handling
  e.preventDefault()
  window.location.reload()
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
