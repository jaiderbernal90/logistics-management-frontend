import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "auth",
      filename: "remoteEntry.js",
      exposes: {
        "./AuthContext": "./src/context/AuthContext.tsx",
        "./AuthProvider": "./src/context/AuthProvider.tsx",
        "./LoginPage": "./src/pages/LoginPage.tsx",
        "./RegisterPage": "./src/pages/RegisterPage.tsx",
      },
      shared: ["react", "react-dom", "react-router-dom"],
    }),
  ],
  server: {
    port: 5001,
  },
  preview: {
    port: 5001,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
