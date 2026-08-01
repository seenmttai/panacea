import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    'process.env.HF_TOKEN': JSON.stringify(process.env.HF_TOKEN || process.env.VITE_HF_TOKEN || ''),
    'process.env.VITE_HF_TOKEN': JSON.stringify(process.env.VITE_HF_TOKEN || process.env.HF_TOKEN || ''),
  }
})
