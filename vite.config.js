import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages configuration for Pr-ashant-pawar/AI-TRIP-PLANNER
export default defineConfig({
    plugins: [react()],
    base: '/AI-TRIP-PLANNER/',
    server: {
        port: 5173,
        open: true
    },
    build: {
        outDir: 'dist'
    }
})
