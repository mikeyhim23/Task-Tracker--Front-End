import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/user': 'https://task-tracker-back-end.onrender.com',
      '/task': 'https://task-tracker-back-end.onrender.com',
      '/project': 'https://task-tracker-back-end.onrender.com',
      '/user_task': 'https://task-tracker-back-end.onrender.com',
    }
  }
})
