import type { Preview } from "@storybook/react"

import "../src/styles/themes/capitalcollab.css"
import "../src/styles/themes/launch-kc.css"
import "../src/styles/themes/sbb.css"
import "../src/index.css"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
