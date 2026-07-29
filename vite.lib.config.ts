import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      tsconfigPath: "./tsconfig.app.json",
      include: [
        "src/index.ts",
        "src/components",
        "src/integrations",
        "src/lib",
      ],
      exclude: ["src/**/*.test.ts", "src/**/*.test.tsx", "src/test"],
    }),
  ],
  resolve: { alias: { "@": path.resolve(root, "./src") } },
  publicDir: false,
  build: {
    lib: {
      entry: path.resolve(root, "src/index.ts"),
      formats: ["es"],
      fileName: "index",
      cssFileName: "styles",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
  },
});
