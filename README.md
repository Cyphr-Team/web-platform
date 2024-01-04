# web-platform

## Introduction

The main service for the project Foresight report

## Features

- **ReactJS:** A JavaScript library for building user interfaces.
- **Vite:** A fast, opinionated web dev build tool that serves your code via native ES Module imports during development.
- **TypeScript:** A superset of JavaScript that adds static types to the language.

## Getting Started

1. Clone the repository:

   ```bash
   git clone git@github.com:foresight-reporting/web-platform.git
   ```

2. Navigate to the project folder:

   ```bash
   cd web-platform
   ```

3. Install dependencies:

   ```bash
   yarn install
   ```

4. Start the development server:

   ```bash
   yarn dev
   ```

   This will open the development server at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
├── App.css
├── App.tsx
├── assets // All images, icons will be here
│   └── react.svg
├── common // Common constants, enums etc....
│   ├── constants.ts
│   ├── enums.ts
│   └── index.ts
├── configs // All configs will be here
│   └── index.ts
├── hooks // React common custom hooks will be here.
│   └── index.ts
├── index.css
├── main.tsx
├── modules // This folder contains specific business domain folders and files.
│   ├── domain-a // Specific domain A files will be here
│   │   ├── components // React UI components if this domain will be here
│   │   ├── hooks // React custom hooks of this domain
│   │   │   └── index.ts
│   │   ├── providers // React context provider files of this domain
│   │   │   └── index.ts
│   │   └── services // Service files of this domain
│   │       └── index.ts
├── providers // Common React context providers will be here
│   └── index.ts
├── services // Common service files will be here
│   └── index.ts
├── shared // Shared common React components of this project.
│   ├── atoms // Apply Atomic designs pattern to organize folders and files.
│   │   └── index.ts
│   ├── index.ts
│   ├── layouts
│   │   └── index.ts
│   ├── molecules
│   │   └── index.ts
│   └── organisms
│       └── index.ts
├── utils // util or helper function files will be here.
│   └── index.ts
├── routes // all router files will be here.
│   └── index.ts
├── styles // all style related files will be here.
│   ├── theme.ts
│   ├── colors.ts
│   └── fonts.ts
```

## Commands

- **yarn dev:** Start the development server.
- **yarn build:** Build the production-ready app.
