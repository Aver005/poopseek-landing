import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Served from aaaver-app as a static site at /poopseek/ —
// base MUST match the sites/<slug>/ folder name exactly.
export default defineConfig({
  base: '/poopseek/',
  plugins: [react(), tailwindcss()],
})
