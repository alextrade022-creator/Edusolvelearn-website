import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Honor a PORT env var when provided (e.g. by the preview harness); otherwise
  // fall back to Vite's default. Only affects the dev server, not the build.
  server: {
    port: Number(process.env.PORT) || 5173,
  },
});
