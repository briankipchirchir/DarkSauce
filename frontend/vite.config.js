import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// In development, /api is forwarded to the Spring Boot backend so the browser sees one origin
// (this is what lets the SameSite=Strict refresh cookie work). In production, make your frontend
// host proxy /api/* to the backend the same way.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": { target: "http://localhost:8080" },
    },
  },
});
