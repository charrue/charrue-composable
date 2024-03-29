import { join } from "path";
import { defineConfig } from "vite";
import { mdPlugin } from "./.vitepress/plugins/md";

export default defineConfig({
  resolve: {
    alias: {
      "@charrue/composable": join(__dirname, "composable/index.ts"),
    },
  },
  plugins: [mdPlugin()],
});
