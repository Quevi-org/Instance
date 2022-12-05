/// <reference types="vitest" />

import { defineConfig } from 'vite'
import { configDefaults as vitestConfigDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: '/src' }], // I HATE THE FACT THAT VSCODE FOR SOMEHOW IGNORING THE FACT THAT THERE IS AN ALIAS AT TSCONFIG.JSON AND HERE
  },
  define: {
    "import.meta.vitest": "undefined"
  },
  plugins: [react()],
  test: {
    globals: true,
    includeSource: ['src/**/*.{ts,tsx}'],
    exclude: [...vitestConfigDefaults.exclude, "*.d.ts"]
  }
})
