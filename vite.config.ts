import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import { resolve } from "path"

export default defineConfig({
  plugins: [react()],

  server: {
    host: "0.0.0.0",
    port: 4000,
  },

  resolve: {
    alias: {
      "@": resolve(__dirname, "/src"),
      "@components": resolve(__dirname,"/src/components"),
      "@public": resolve(__dirname,"/src/public"),
      "@styles": resolve(__dirname,"/src/public/styles"),
      "@interfaces": resolve(__dirname,"/src/interfaces"),
      "@context": resolve(__dirname,"/src/context"),
    }
  },

  build: {
    outDir: "./dist",
    cssMinify: "esbuild",
    minify: "esbuild",
  },

  preview: {
    host: "0.0.0.0",
    port: 5000,
    open: resolve(__dirname, "/dist/index.html"),
  }
});