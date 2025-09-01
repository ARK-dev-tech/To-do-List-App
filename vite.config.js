import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/To-do-List-App/',
  plugins: [tailwindcss()] // Tailwind as a Vite plugin
})