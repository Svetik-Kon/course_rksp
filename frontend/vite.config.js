import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',   // ← обязательно, чтобы Docker открыл порт наружу
    port: 5173         // ← явно указываем порт
  }
})
