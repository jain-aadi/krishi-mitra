import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
  // Move Vite cache out of node_modules to avoid OneDrive locking issues
  cacheDir: path.resolve(__dirname, ".vite-cache"),
});


