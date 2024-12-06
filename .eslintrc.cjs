const { resolve } = require("node:path")
const project = resolve(__dirname, "tsconfig.json")

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "eslint-config-prettier",
    "prettier",
    "plugin:tailwindcss/recommended",
    require.resolve("@vercel/style-guide/eslint/typescript"),
    require.resolve("@vercel/style-guide/eslint/react")
  ],
  ignorePatterns: ["dist", "node_modules", ".eslintrc.cjs", "vite.config.ts"],
  parser: "@typescript-eslint/parser",
  plugins: ["prettier", "import"],
  parserOptions: {
    ecmaVersion: "latest",
    project
  },
  settings: {
    "import/resolver": {
      typescript: {
        project
      }
    },
    // TODO: fix issue here, using these config for linting styles at object level
    tailwindcss: {
      callees: ["classnames", "clsx", "ctl", "styleProps", "cn"],
      classRegex: "\\S.*(c|C)lassName?"
    }
  },
  rules: {
    "prettier/prettier": [
      "warn",
      {
        arrowParens: "always",
        semi: false,
        trailingComma: "none",
        tabWidth: 2,
        endOfLine: "auto",
        useTabs: false,
        singleQuote: false,
        printWidth: 80,
        jsxSingleQuote: false
      }
    ],
    "import/no-default-export": "off",
    "padding-line-between-statements": [
      "warn",
      { blankLine: "always", prev: "*", next: ["return", "export"] },
      { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
      {
        blankLine: "any",
        prev: ["const", "let", "var"],
        next: ["const", "let", "var"]
      }
    ],
    "no-console": "error",
    "tsdoc/syntax": "off",
    "react/prop-types": "off",
    "react/no-unstable-nested-components": "warn",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react/self-closing-comp": "warn",
    "react/display-name": "warn",
    "react/no-unescaped-entities": ["error", { forbid: [">", "}"] }],
    "react/hook-use-state": "warn",
    "react/jsx-pascal-case": "warn",
    "react/function-component-definition": "off",
    "react/jsx-sort-props": [
      "warn",
      {
        callbacksLast: true,
        shorthandFirst: true,
        noSortAlphabetically: false,
        reservedFirst: true
      }
    ],
    "react/no-array-index-key": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/prefer-literal-enum-member": "warn",
    "@typescript-eslint/no-unsafe-argument": "warn",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-shadow": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-confusing-void-expression": "off",
    "@typescript-eslint/no-unsafe-enum-comparison": "off",
    "@typescript-eslint/prefer-nullish-coalescing": "off",
    /* Too long, I can't fix */
    "@typescript-eslint/naming-convention": "off",
    /**
     * Any expression being used as a condition must be able to evaluate as truthy or falsy in order to be considered "necessary".
     * Conversely, any expression that always evaluates to truthy or always evaluates to falsy,
     * as determined by the type of the expression, is considered unnecessary and will be flagged by this rule.
     * */
    "@typescript-eslint/no-unnecessary-condition": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "after-used",
        ignoreRestSiblings: false,
        argsIgnorePattern: "^_.*?$"
      }
    ],
    "@typescript-eslint/restrict-template-expressions": "warn",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/media-has-caption": "off",
    "jsx-a11y/iframe-has-title": "off",
    "jsx-a11y/heading-has-content": "off",
    "jsx-a11y/anchor-has-content": "off",
    "jsx-a11y/no-autofocus": "error",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "tailwindcss/no-custom-classname": "off"
  }
}
