import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    includeSource: ["src/**/*.test.ts"],
  },
  define: {
    "import.meta.vitest": false,
  },
  build: {
    lib: {
      formats: ["es", "cjs"],
      entry: resolve(__dirname, "src/index.ts"),
      fileName: "index",
    },
  },
});
