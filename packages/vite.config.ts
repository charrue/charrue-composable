import { join } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@charrue/composable": join(__dirname, "composable/index.ts"),
    },
  },
});
